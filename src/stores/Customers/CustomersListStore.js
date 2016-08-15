/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import customerActions from '../../constants/customers';

/**
 * Store
 */
class CustomersListStore extends BaseStore {

    static storeName = 'CustomersListStore';

    static handlers = {
        [customerActions.CUSTOMERS_FIND]: 'handleListRequest',
        [customerActions.CUSTOMERS_FIND_SUCCESS]: 'handleListSuccess',
        [customerActions.CUSTOMERS_FIND_ERROR]: 'handleListError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.customers = [];
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            customers: this.customers
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
        this.customers = state.customers;
    }

    //
    // Getters
    //

    isLoading() {
        return this.loading === true;
    }

    getCustomers() {
        if (this.customers && this.customers.items) {
            return this.customers.items;
        } else {
            return [];
        }
    }

    getTotalPages() {
        return (this.customers && this.customers.pagination) ? this.customers.pagination.totalPages : 0;
    }

    getCurrentPage() {
        return (this.customers && this.customers.pagination) ? this.customers.pagination.page : 0;
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
        this.customers = payload;
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
export default CustomersListStore;
