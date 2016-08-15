/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import accountActions from '../../constants/account';

/**
 * Store
 */
class AccountStore extends BaseStore {

    static storeName = 'AccountStore';

    static handlers = {
        [accountActions.ACCOUNT_FETCH]: 'handleAccountFetchRequest',
        [accountActions.ACCOUNT_FETCH_SUCCESS]: 'handleAccountFetchSuccess',
        [accountActions.ACCOUNT_FETCH_ERROR]: 'handleAccountFetchError',

        [accountActions.ACCOUNT_LOGOUT_SUCCESS]: 'handleLogoutSuccess',

        [accountActions.ACCOUNT_UPDATE]: 'handleAccountUpdateRequest',
        [accountActions.ACCOUNT_UPDATE_SUCCESS]: 'handleAccountUpdateSuccess',
        [accountActions.ACCOUNT_UPDATE_ERROR]: 'handleAccountUpdateError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.accountDetails = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            accountDetails: this.accountDetails
        };
    }

    //
    // Isomorphic stuff
    //

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.loading = state.loading;
        this.error = state.error;
        this.accountDetails = state.accountDetails;
    }

    //
    // Getters
    //

    isLoading() {
        return this.loading;
    }

    getError() {
        return this.error;
    }

    getAccountDetails() {
        return this.accountDetails;
    }

    isAuthorized(scope) {
        let authorized = false;
        if (this.accountDetails) {
            authorized = true;
            scope.forEach((value) => {
                if (!this.accountDetails.scope || this.accountDetails.scope.indexOf(value) === -1) {
                    authorized = false;
                }
            });
        }
        return authorized;
    }

    //
    // Handlers
    //

    handleAccountFetchRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleAccountFetchSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.accountDetails = payload;
        this.emitChange();
    }

    handleAccountFetchError(payload) {
        this.loading = false;
        if (payload.status === 401) {
            this.error = null;
            this.accountDetails = null;
        } else {
            this.error = payload.result;
        }
        this.emitChange();
    }

    // Logout

    handleLogoutSuccess() {
        this.loading = false;
        this.error = null;
        this.accountDetails = null;
        this.emitChange();
    }

    // Update

    handleAccountUpdateRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleAccountUpdateSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.accountDetails = payload;
        this.emitChange();
    }

    handleAccountUpdateError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default AccountStore;
