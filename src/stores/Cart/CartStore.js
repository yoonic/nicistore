/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import cartActions from '../../constants/cart';

/**
 * Store
 */
class CartStore extends BaseStore {

    static storeName = 'CartStore';

    static handlers = {
        [cartActions.CART_FETCH]: 'handleFetchRequest',
        [cartActions.CART_FETCH_SUCCESS]: 'handleFetchSuccess',
        [cartActions.CART_FETCH_ERROR]: 'handleFetchError',

        [cartActions.CART_CREATE]: 'handleCreateRequest',
        [cartActions.CART_CREATE_SUCCESS]: 'handleCreateSuccess',
        [cartActions.CART_CREATE_ERROR]: 'handleCreateError',

        [cartActions.CART_CLAIM]: 'handleClaimRequest',
        [cartActions.CART_CLAIM_SUCCESS]: 'handleClaimSuccess',
        [cartActions.CART_CLAIM_ERROR]: 'handleClaimError',

        [cartActions.CART_MERGE]: 'handleCreateRequest', // Same workflow as create
        [cartActions.CART_MERGE_SUCCESS]: 'handleCreateSuccess', // Same workflow as create
        [cartActions.CART_MERGE_ERROR]: 'handleCreateError', // Same workflow as create

        [cartActions.CART_UPDATE]: 'handleFetchRequest', // Same workflow as fetch
        [cartActions.CART_UPDATE_SUCCESS]: 'handleFetchSuccess', // Same workflow as fetch
        [cartActions.CART_UPDATE_ERROR]: 'handleFetchError', // Same workflow as fetch

        [cartActions.CART_LOAD]: 'handleCreateRequest', // Same workflow as create
        [cartActions.CART_LOAD_SUCCESS]: 'handleCreateSuccess', // Same workflow as create
        [cartActions.CART_LOAD_ERROR]: 'handleCreateError' // Same workflow as create
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.cart = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            cart: this.cart
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
        this.cart = state.cart;
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

    getCartId() {
        if (typeof localStorage != 'undefined') {
            return localStorage.getItem('cartId');
        } else {
            return null;
        }
    }

    getCartAccessToken() {
        if (typeof localStorage != 'undefined') {
            return localStorage.getItem('cartAccessToken');
        } else {
            return null;
        }
    }

    getCart() {
        return this.cart;
    }

    getProducts() {
        return (this.cart) ? this.cart.products : [];
    }

    getTotalItems() {
        let products = this.getProducts();
        if (products.length === 0) {
            return 0;
        } else {
            let totalItems = 0;
            products.forEach(function (product) {
                totalItems += product.quantity;
            });
            return totalItems;
        }
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
        this.cart = payload;
        this.emitChange();
    }

    handleFetchError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }

    // Create

    handleCreateRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleCreateSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.cart = payload;
        localStorage.setItem('cartId', payload.id);
        if (!payload.userId && payload.accessToken) {
            localStorage.setItem('cartAccessToken', payload.accessToken);
        } else {
            localStorage.removeItem('cartAccessToken');
        }
        this.emitChange();
    }

    handleCreateError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }

    // Claim

    handleClaimRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleClaimSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.cart = payload;
        localStorage.setItem('cartId', payload.id);
        localStorage.removeItem('cartAccessToken');
        this.emitChange();
    }

    handleClaimError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default CartStore;
