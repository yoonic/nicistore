/**
 * Imports
 */
import API from '../api';

// Flux
import LoginStore from '../stores/Account/LoginStore';

/**
 * Plugin that gives actions access to the API wrappers
 */
const apiPlugin = {
    // Required unique name property
    name: 'ApiPlugin',

    /**
     * Called after context creation to dynamically create a context plugin
     * @method plugContext
     * @param {Object} options Options passed into createContext
     * @param {Object} context FluxibleContext instance
     * @param {Object} app Fluxible instance
     */
    plugContext: function (options, context, app) {
        // `options` is the same as what is passed into `Fluxible.createContext(options)`
        let config = options.config && options.config.api;

        // Returns a context plugin
        return {
            /**
             * Method called to allow modification of the action context
             * @method plugActionContext
             * @param {Object} actionContext Options passed into createContext
             * @param {Object} context FluxibleContext instance
             * @param {Object} app Fluxible instance
             */
            plugActionContext: function (actionContext, context, app) {
                actionContext.api = new API({
                    options: config,
                    getAuthToken: context.getStore(LoginStore).getToken
                });
            },

            /**
             * Allows context plugin settings to be persisted between server and client. Called on server
             * to send data down to the client
             * @method dehydrate
             */
            dehydrate: function () {
                return {
                    config: config
                };
            },

            /**
             * Called on client to rehydrate the context plugin settings
             * @method rehydrate
             * @param {Object} state Object to rehydrate state
             */
            rehydrate: function (state) {
                config = state.config;
            }
        };
    },

    /**
     * Allows dehydration of application plugin settings
     * @method dehydrate
     */
    dehydrate: function () { return {}; },

    /**
     * Allows rehydration of application plugin settings
     * @method rehydrate
     * @param {Object} state Object to rehydrate state
     */
    rehydrate: function (state) {}
};

/**
 * Export
 */
export default apiPlugin;
