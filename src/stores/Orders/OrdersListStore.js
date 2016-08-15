/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import orderActions from '../../constants/orders';

/**
 * Store
 */
class OrdersListStore extends BaseStore {

    static storeName = 'OrdersListStore';

    static handlers = {
        [orderActions.ORDERS_FIND]: 'handleListRequest',
        [orderActions.ORDERS_FIND_SUCCESS]: 'handleListSuccess',
        [orderActions.ORDERS_FIND_ERROR]: 'handleListError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.orders = [];
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            orders: this.orders
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
        this.orders = state.orders;
    }

    //
    // Getters
    //

    isLoading() {
        return this.loading === true;
    }

    getOrders() {
        if (this.orders && this.orders.items) {
            return this.orders.items;
        } else {
            return [];
        }
    }

    getTotalPages() {
        return (this.orders && this.orders.pagination) ? this.orders.pagination.totalPages : 0;
    }

    getCurrentPage() {
        return (this.orders && this.orders.pagination) ? this.orders.pagination.page : 0;
    }

    //
    // Handlers
    //

    handleListRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleListSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.orders = payload;
        this.emitChange();
    }

    handleListError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default OrdersListStore;
