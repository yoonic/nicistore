/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import accountActions from '../../constants/account';

/**
 * Store
 */
class ResetStore extends BaseStore {

    static storeName = 'ResetStore';

    static handlers = {
        [accountActions.ACCOUNT_RESET]: 'handleResetRequest',
        [accountActions.ACCOUNT_RESET_SUCCESS]: 'handleResetSuccess',
        [accountActions.ACCOUNT_RESET_ERROR]: 'handleResetError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error
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

    //
    // Handlers
    //

    handleResetRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleResetSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.emitChange();
    }

    handleResetError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default ResetStore;
