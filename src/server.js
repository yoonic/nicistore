/**
 * Imports
 */
import Debug from 'debug';
import Express from 'express';
import React from 'react';
import Router from 'react-router';
import Serialize from 'serialize-javascript';
import {FluxibleComponent} from 'fluxible-addons-react';

import fetchData from './utils/fetchData';
import fetchPageTitleAndSnippets from './utils/fetchPageTitleAndSnippets';
import isMobileUA from './utils/isMobileUA';
import webpackStats from '../webpack/stats';

// Flux
import ApplicationStore from './stores/Application/ApplicationStore';

import clearRouteErrors from './actions/Application/clearRouteErrors';
import fetchAllCollections from './actions/Collections/fetchAllCollections';
import navigateAction from './actions/Application/navigate';
import setLocale from './actions/Application/setLocale';
import setMobileBreakpoint from './actions/Application/setMobileBreakpoint';

// Required components
import BaseHtml from './components/core/BaseHtml';
import NotFound from './components/pages/NotFound/NotFound';
import ServerError from './components/pages/ServerError/ServerError';

// Initialize debugging utility
let debug = Debug('nicistore');

// App fluxible wrapper, configurations, base html component and router action
import app from './app';
import config from './config';

/**
 * Emitted when an exception bubbles all the way back to the event loop.
 * If a listener is added for this exception, the default action
 * (which is to print a stack trace and exit) will not occur.
 * Node.js Docs: https://nodejs.org/api/process.html#process_event_uncaughtexception
 *
 * This was put here because of a Superagent core limitation which would crash the app
 * from time to time (https://github.com/visionmedia/superagent/issues/741). However,
 * perhaps should be investigated if in production the best way is to let the app
 * crash and let the process monitor handle the restart (http://debuggable.com/posts/node-js-dealing-with-uncaught-exceptions:4c933d54-1428-443c-928d-4e1ecbdd56cb)
 */
/*process.on('uncaughtException', function(err) {
    debug('uncaughtException', err);
});*/

/**
 * Helper methods
 */

function dispatchClearRouteErrors(context) {
    return new Promise(function (resolve, reject) {
        context.executeAction(clearRouteErrors, {}, function () { resolve(); });
    });
}

function dispatchFetchAllCollections(context) {
    return new Promise(function (resolve, reject) {
        context.executeAction(fetchAllCollections, {}, function () { resolve(); });
    });
}

function dispatchSetLocale(context, locale) {
    return new Promise(function (resolve, reject) {
        context.executeAction(setLocale, locale, function () { resolve(); });
    });
}

function dispatchSetMobileBreakpoint(context, isMobile) {
    return new Promise(function (resolve, reject) {
        context.executeAction(setMobileBreakpoint, isMobile, function () { resolve(); });
    });
}

/**
 * Express server
 */
let server = Express();

//
// a) Routes (remember, order is relevant!)
//

// 1) Serve static files
server.use('/static', Express.static(__dirname + '/../static'));
server.use('/robots.txt', Express.static(__dirname + '/../static/robots.txt'));

// 2) If requesting root URL, redirect to default locale
server.get('/', function (req, res, next) {
    let defaultLocale = config.app.locale.default || 'en';
    debug(`Redirecting to default locale: ${defaultLocale}`);
    return res.redirect(301, `/${defaultLocale}`);
});

// 3) Process requested route and render respective React component
server.use(async function (req, res, next) {

    try {

        let context = app.createContext({config: config});

        // Locale:
        // - Fetch locale from URL
        // - Check if locale is available/enabled
        // - Trigger respective action
        let locale = req.path.split('/')[1];
        if (!config.app.locale.available || config.app.locale.available.indexOf(locale) === -1) {
            let NotFoundComponent = React.createFactory(NotFound);
            let html = React.renderToStaticMarkup(NotFoundComponent());
            return res.status(404).send(html);
        }
        await dispatchSetLocale(context, locale);

        // Decide initial responsive store state according to User Agent, whether
        // it is a mobile one or not
        let isMobile = req.get('User-Agent') ? isMobileUA(req.get('User-Agent')) : false;
        debug('Is mobile User-Agent?', isMobile);
        await dispatchSetMobileBreakpoint(context, isMobile);

        // Collections
        // Fetch all the collections from the beginning of the application lifecycle.
        // These are required, for example, for the main navigation links and since
        // the data is rather "static" doesn't make much sense to be constantly fetching
        // it with every other route change.
        await dispatchFetchAllCollections(context);

        debug('Executing navigate action');
        Router.run(app.getComponent(), req.originalUrl, async function (Handler, state) {

            // Trigger fetching and wait for the data required by the components of the given route
            await fetchData(context, state);

            // Fetch page title and snippets from the route handlers
            let pageTitleAndSnippets = fetchPageTitleAndSnippets(context, state);
            let pageTitle = pageTitleAndSnippets ? pageTitleAndSnippets.title : null;

            // Route Errors (i.e. most likely 404 Not Found)
            // There are are routes that may be valid in the sense that they "exist" but,
            // in reality, are invalid because the underlying resource does not exist (e.g. Product ID not found).
            // We should catch those here and act accordingly, like rendering Not Found page or setting
            // proper HTTP status code.
            //
            // *** IMPORTANT ***
            // Getting and clearing this info must be done BEFORE dehydrating the state or else,
            // on first route change in the client, it will still think there's an error.
            let routeError = context.getStore(ApplicationStore).getRouteError();
            await dispatchClearRouteErrors(context); // Very important!!!
            if (routeError) {
                debug(`(Server) Route Error ${routeError}`);
            }

            // Fire navigate action
            context.executeAction(navigateAction, state, function (err) {

                debug('Exposing context state');
                let exposed = 'window.App=' + Serialize(app.dehydrate(context)) + ';';

                debug('Rendering Application component into html');
                let Component = React.createFactory(Handler);
                let BaseHtmlComponent = React.createFactory(BaseHtml);
                let html = React.renderToStaticMarkup(BaseHtmlComponent({
                    context: context.getComponentContext(),
                    state: exposed,
                    markup: React.renderToString(
                        React.createElement(
                            FluxibleComponent,
                            { context: context.getComponentContext() },
                            Component()
                        )
                    ),
                    css: webpackStats.css,
                    scripts: webpackStats.scripts,
                    locale: locale,
                    title: pageTitle || config.app.title,
                    staticURL: '/static'
                }));

                // Figure out appopriate HTTP status code:
                // 1) Not Found component -> 404
                // 2) Route Error -> whichever is returned
                // 3) Business as usual -> 200
                let responseStatus;
                if (routeError) {
                    responseStatus = routeError;
                } else {
                    responseStatus = state.routes.some(route => route.name == 'not-found') ? 404 : 200;
                }

                // Return rendered component with appropriate status code.
                debug('Sending markup');
                return res.status(responseStatus).send(html);
            });
        });

    } catch (err) {
        debug('Unhandled Server Error (Oops!)', err);
        let ServerErrorComponent = React.createFactory(ServerError);
        let html = React.renderToStaticMarkup(ServerErrorComponent());
        return res.status(500).send(html);
    }
});

//
// b) Start server
//
const host = '0.0.0.0';
const port = 3000;
server.listen(port, host);
debug('Storefront Isomorphic Server running. Host: %s, Port: %s', host, port);
