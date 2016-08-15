/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import orderActions from '../../constants/orders';

/**
 * Store
 */
class OrderStore extends BaseStore {

    static storeName = 'OrderStore';

    static handlers = {
        [orderActions.ORDER_CREATE]: 'handleCreateRequest',
        [orderActions.ORDER_CREATE_SUCCESS]: 'handleCreateSuccess',
        [orderActions.ORDER_CREATE_ERROR]: 'handleCreateError',

        [orderActions.ORDER_CLEAR]: 'handleOrderClear'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.order = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            order: this.order
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
        this.order = state.order;
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

    getOrder() {
        return this.order;
    }

    //
    // Handlers
    //

    // Create

    handleCreateRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleCreateSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.order = payload;
        this.emitChange();
    }

    handleCreateError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }

    // Clear store

    handleOrderClear() {
        this.loading = false;
        this.order = null;
        this.error = null;
        this.emitChange();
    }
}

/**
 * Export
 */
export default OrderStore;
