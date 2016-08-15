/**
 * Imports.
 */
import applicationActions from '../../constants/application';
import createStore from 'fluxible/addons/createStore';

let debug = require('debug')('nicistore');

/**
 * Create Store.
 */
const ApplicationStore = createStore({

    storeName: 'ApplicationStore',

    handlers: {
        [applicationActions.APPLICATION_CHANGE_ROUTE]: 'handleNavigate',
        [applicationActions.APPLICATION_ROUTE_ERROR]: 'handleRouteError'
    },

    initialize: function () {
        this.currentRoute = undefined;
        this.routeError = undefined;
        this.currentId = 0;
    },

    getState: function () {
        return {
            currentRoute: this.currentRoute,
            routeError: this.routeError,
            currentId: this.currentId
        };
    },

    //
    // Isomorphic stuff.
    //

    dehydrate: function () {
        return this.getState();
    },

    rehydrate: function (state) {
        this.currentRoute = state.currentRoute;
        this.routeError = state.routeError;
        this.currentId = state.currentId;
    },

    //
    // Getters
    //

    getRouteError: function () {
        return this.routeError;
    },

    /*
     * Unique Id
     * Often used for HTML ids, return the current value and increment it.
     * Using a store is required to keep server/client state and avoid checksum
     * warnings (a javascript closure would have different ID value for server and client)
     */
    uniqueId: function () {
        return this.currentId++;
    },

    //
    // Handlers
    //

    handleNavigate: function (route) {
        if (this.currentRoute && route.path === this.currentRoute.path) {
            return;
        }
        this.currentRoute = route;
        this.emitChange();
    },

    handleRouteError: function (statusCode) {
        this.routeError = statusCode;
        this.emitChange();
    }
});

/**
 * Export Store.
 */
export default ApplicationStore;
