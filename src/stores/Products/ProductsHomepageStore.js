/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import productActions from '../../constants/products';

/**
 * Store
 */
class ProductsHomepageStore extends BaseStore {

    static storeName = 'ProductsHomepageStore';

    static handlers = {
        [productActions.PRODUCTS_HOMEPAGE]: 'handleRequest',
        [productActions.PRODUCTS_HOMEPAGE_SUCCESS]: 'handleSuccess',
        [productActions.PRODUCTS_HOMEPAGE_ERROR]: 'handleError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.products = [];
    }

    getState() {
        return {
            products: this.products
        }
    }

    //
    // Isomorphic stuff
    //

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.products = state.products;
    }

    //
    // Getters
    //

    isLoading() {
        return this.loading === true;
    }

    getProducts() {
        if (this.products && this.products.items) {
            return this.products.items;
        } else {
            return [];
        }
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
        this.products = payload;
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
export default ProductsHomepageStore;
