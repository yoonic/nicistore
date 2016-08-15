/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import productActions from '../../constants/products';

/**
 * Store
 */
class ProductContentsStore extends BaseStore {

    static storeName = 'ProductContentsStore';

    static handlers = {
        [productActions.PRODUCTS_CONTENTS]: 'handleRequest',
        [productActions.PRODUCTS_CONTENTS_SUCCESS]: 'handleSuccess',
        [productActions.PRODUCTS_CONTENTS_ERROR]: 'handleError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.contents = [];
    }

    getState() {
        return {
            contents: this.contents
        }
    }

    //
    // Isomorphic stuff
    //

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.contents = state.contents;
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

    getContents() {
        if (this.contents && this.contents.items) {
            return this.contents.items;
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
        this.contents = payload;
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
export default ProductContentsStore;
