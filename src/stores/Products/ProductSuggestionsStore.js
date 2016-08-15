/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import productActions from '../../constants/products';

/**
 * Store
 */
class ProductSuggestionsStore extends BaseStore {

    static storeName = 'ProductSuggestionsStore';

    static handlers = {
        [productActions.PRODUCTS_SUGGESTIONS]: 'handleRequest',
        [productActions.PRODUCTS_SUGGESTIONS_SUCCESS]: 'handleSuccess',
        [productActions.PRODUCTS_SUGGESTIONS_ERROR]: 'handleError',
        [productActions.PRODUCTS_SUGGESTIONS_CLEAR]: 'handleClear'
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

        // Build suggestions list (i.e. cannot be the product we're viewing, limit items, randomize, etc)
        if (payload.product) {
            let filteredSuggestions = [];
            let possibleSuggestions = payload.suggestions.items.filter((product) => {
                return product.id !== payload.product.id;
            });
            for (let i=0, len=Math.min(possibleSuggestions.length, 4); i<len; i++) {
                let idx = Math.floor(Math.random()*possibleSuggestions.length);
                filteredSuggestions.push(possibleSuggestions[idx]);
                possibleSuggestions.splice(idx, 1);
            }
            this.products = {items: filteredSuggestions};
        } else {
            this.products = payload.suggestions;
        }

        this.emitChange();
    }

    handleError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }

    handleClear() {
        this.loading = false;
        this.error = null;
        this.products = {items: []};
        this.emitChange();
    }
}

/**
 * Export
 */
export default ProductSuggestionsStore;
