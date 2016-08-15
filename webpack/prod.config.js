/**
 * Imports
 */
var path = require('path');
var webpack = require('webpack');
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

/**
 * Settings
 */
var dist = path.resolve(__dirname, '../static/dist');

/**
 * Production Settings
 */
var config = {
    devtool: 'source-map',
    entry: './src/client.js',
    output: {
        path: dist,
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/static/dist/'
    },
    module: {
        loaders: [
            {test: /\.(jpe?g|png|gif|svg)$/, loader: 'file'},
            {test: /\.js$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel?stage=0&optional=runtime']},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!sass')},
            {test: /\.woff(2)?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
            {test: /\.(ttf|eot)$/, loader: 'file'}
        ]
    },
    progress: true,
    plugins: [

        // css files from the extract-text-plugin loader
        new ExtractTextPlugin('[name]-[chunkhash].css'),

        // ignore dev config
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

        // set global vars
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('production'),
                ATLAS_BASE_URL: JSON.stringify(process.env.ATLAS_BASE_URL),
                GOOGLE_ANALYTICS_TRACKING_ID: JSON.stringify(process.env.GOOGLE_ANALYTICS_TRACKING_ID),
                FACEBOOK_PIXEL_ID: JSON.stringify(process.env.FACEBOOK_PIXEL_ID),
                CRISP_WEBSITE_ID: JSON.stringify(process.env.CRISP_WEBSITE_ID),
                MAILCHIMP_SIGNUP_FORM_POST_URL: JSON.stringify(process.env.MAILCHIMP_SIGNUP_FORM_POST_URL),
                SWITCH_PUBLIC_KEY: JSON.stringify(process.env.SWITCH_PUBLIC_KEY)
            }
        }),

        // optimizations
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        // Write out stats.json file to build directory.
        new StatsWriterPlugin({
            transform: function (data) {
                return JSON.stringify({
                    main: data.assetsByChunkName.main[0],
                    css: data.assetsByChunkName.main[1]
                });
            }
        })
    ]
};

/**
 * Export
 */
module.exports = config;
