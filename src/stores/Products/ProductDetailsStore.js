/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import productActions from '../../constants/products';

/**
 * Store
 */
class ProductDetailsStore extends BaseStore {

    static storeName = 'ProductDetailsStore';

    static handlers = {
        [productActions.PRODUCTS_ITEM]: 'handleRequest',
        [productActions.PRODUCTS_ITEM_SUCCESS]: 'handleSuccess',
        [productActions.PRODUCTS_ITEM_ERROR]: 'handleError',
        [productActions.PRODUCTS_ITEM_SAVE]: 'handleRequest',
        [productActions.PRODUCTS_ITEM_SAVE_SUCCESS]: 'handleSuccess',
        [productActions.PRODUCTS_ITEM_SAVE_ERROR]: 'handleError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.product = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            product: this.product
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
        this.product = state.product;
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

    getProduct() {
        return this.product;
    }

    //
    // Handlers
    //

    handleRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.product = payload;
        this.emitChange();
    }

    handleError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default ProductDetailsStore;
