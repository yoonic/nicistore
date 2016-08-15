/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import orderActions from '../../constants/orders';

/**
 * Store
 */
class OrderDetailsStore extends BaseStore {

    static storeName = 'OrderDetailsStore';

    static handlers = {
        [orderActions.ORDERS_ITEM]: 'handleFetchRequest',
        [orderActions.ORDERS_ITEM_SUCCESS]: 'handleFetchSuccess',
        [orderActions.ORDERS_ITEM_ERROR]: 'handleFetchError',

        [orderActions.ORDERS_UPDATE]: 'handleSaveRequest',
        [orderActions.ORDERS_UPDATE_SUCCESS]: 'handleSaveSuccess',
        [orderActions.ORDERS_UPDATE_ERROR]: 'handleSaveError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.saving = false;
        this.error = undefined;
        this.order = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            saving: this.saving,
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
        this.saving = state.saving;
        this.error = state.error;
        this.order = state.order;
    }

    //
    // Getters
    //

    isLoading() {
        return this.loading === true;
    }

    isSaving() {
        return this.saving === true;
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

    // Fetch

    handleFetchRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleFetchSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.order = payload;
        this.emitChange();
    }

    handleFetchError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }

    // Save

    handleSaveRequest() {
        this.saving = true;
        this.emitChange();
    }

    handleSaveSuccess(payload) {
        this.saving = false;
        this.error = null;
        this.order = payload;
        this.emitChange();
    }

    handleSaveError(payload) {
        this.saving = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default OrderDetailsStore;
