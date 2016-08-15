/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import productActions from '../../constants/products';

/**
 * Store
 */
class ProductsAddStore extends BaseStore {

    static storeName = 'ProductsAddStore';

    static handlers = {
        [productActions.PRODUCTS_ADD]: 'handleAddRequest',
        [productActions.PRODUCTS_ADD_SUCCESS]: 'handleAddSuccess',
        [productActions.PRODUCTS_ADD_ERROR]: 'handleAddError'
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

    handleAddRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleAddSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.product = payload;
        this.emitChange();
    }

    handleAddError(payload) {
        this.loading = false;
        this.error = payload || 'unknown';
        this.emitChange();
    }
}

/**
 * Export
 */
export default ProductsAddStore;
