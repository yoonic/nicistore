/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import accountActions from '../../constants/account';

/**
 * Store
 */
class RegisterStore extends BaseStore {

    static storeName = 'RegisterStore';

    static handlers = {
        [accountActions.ACCOUNT_REGISTER]: 'handleRegisterRequest',
        [accountActions.ACCOUNT_REGISTER_SUCCESS]: 'handleRegisterSuccess',
        [accountActions.ACCOUNT_REGISTER_ERROR]: 'handleRegisterError'
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

    handleRegisterRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleRegisterSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.emitChange();
    }

    handleRegisterError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default RegisterStore;
