/**
 * Imports.
 */
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {host, port, config} from './dev.config.js';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Webpack DEV server.
 */
const options = {
    contentBase: `http://${host}:${port}`,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
};
const compiler = Webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(port, host, function (err, result) {
    if (err) {
        debug('Error starting webpack dev server', err);
    } else {
        debug('Webpack at %s running in port: %s', host, port);    
    }
});
