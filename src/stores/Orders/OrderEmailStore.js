/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import orderActions from '../../constants/orders';

/**
 * Store
 */
class OrderEmailStore extends BaseStore {

    static storeName = 'OrderEmailStore';

    static handlers = {
        [orderActions.ORDERS_SEND_EMAIL]: 'handleSendRequest',
        [orderActions.ORDERS_SEND_EMAIL_SUCCESS]: 'handleSendSuccess',
        [orderActions.ORDERS_SEND_EMAIL_ERROR]: 'handleSendError'
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
        }
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
        return this.loading === true;
    }

    getError() {
        return this.error;
    }

    //
    // Handlers
    //

    handleSendRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleSendSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.emitChange();
    }

    handleSendError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default OrderEmailStore;
