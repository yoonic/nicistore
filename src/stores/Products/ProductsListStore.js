/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import productActions from '../../constants/products';

/**
 * Store
 */
class ProductsListStore extends BaseStore {

    static storeName = 'ProductsListStore';

    static handlers = {
        [productActions.PRODUCTS_FIND]: 'handleListRequest',
        [productActions.PRODUCTS_FIND_SUCCESS]: 'handleListSuccess',
        [productActions.PRODUCTS_FIND_ERROR]: 'handleListError'
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

    getTotalPages() {
        return (this.products && this.products.pagination) ? this.products.pagination.totalPages : 0;
    }

    getCurrentPage() {
        return (this.products && this.products.pagination) ? this.products.pagination.page : 0;
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
        this.products = payload;
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
export default ProductsListStore;
