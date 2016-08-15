/**
 * Imports.
 */
import createStore from 'fluxible/addons/createStore';

import accountActions from '../../constants/account';

let debug = require('debug')('nicistore');

/**
 * Create Store.
 */
const LoginStore = createStore({

    storeName: 'LoginStore',

    handlers: {
        [accountActions.ACCOUNT_LOGIN]: 'handleLoginRequest',
        [accountActions.ACCOUNT_LOGIN_SUCCESS]: 'handleLoginSuccess',
        [accountActions.ACCOUNT_LOGIN_ERROR]: 'handleLoginError',

        [accountActions.ACCOUNT_LOGOUT_SUCCESS]: 'handleLogoutSuccess'
    },

    initialize: function () {
        this.loading = false;
        this.error = undefined;
    },

    getState: function () {
        return {
            loading: this.loading,
            error: this.error
        };
    },

    //
    // Isomorphic stuff.
    //

    dehydrate: function () {
        return this.getState();
    },

    rehydrate: function (state) {
        this.loading = state.loading;
        this.error = state.error;
    },

    //
    // Getters.
    //

    isLoading: function () {
        return this.loading;
    },

    isLoggedIn: function () {
        return !!this.getToken();
    },

    getError: function () {
        return this.error;
    },

    getToken: function () {
        if (typeof localStorage != 'undefined') {
            return localStorage.getItem('authToken');
        } else {
            return null;
        }
    },

    //
    // Handlers.
    //

    handleLoginRequest: function () {
        this.loading = true;
        this.emitChange();
    },

    handleLoginSuccess: function (payload) {
        this.loading = false;
        this.error = null;
        localStorage.setItem('authToken', payload.authToken);
        this.emitChange();
    },

    handleLoginError: function (payload) {
        this.loading = false;
        this.error = payload;
        localStorage.removeItem('authToken');
        this.emitChange();
    },

    handleLogoutSuccess: function () {
        this.loading = false;
        this.error = null;
        localStorage.removeItem('authToken');
        this.emitChange();
    }
});

/**
 * Export Store.
 */
export default LoginStore;
