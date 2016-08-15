/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import checkoutActions from '../../constants/checkout';

/**
 * Store
 */
class CheckoutStore extends BaseStore {

    static storeName = 'CheckoutStore';

    static handlers = {
        [checkoutActions.CHECKOUT_CREATE]: 'handleCreateRequest',
        [checkoutActions.CHECKOUT_CREATE_SUCCESS]: 'handleCreateSuccess',
        [checkoutActions.CHECKOUT_CREATE_ERROR]: 'handleCreateError',
        
        [checkoutActions.CHECKOUT_SET_PAYMENT_OPTIONS]: 'handleSetPaymentOptions',

        [checkoutActions.CHECKOUT_UPDATE]: 'handleUpdateRequest',
        [checkoutActions.CHECKOUT_UPDATE_SUCCESS]: 'handleUpdateSuccess',
        [checkoutActions.CHECKOUT_UPDATE_ERROR]: 'handleUpdateError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.checkout = undefined;
        this.paymentOptions = [];
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            checkout: this.checkout,
            paymentOptions: this.paymentOptions
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
        this.checkout = state.checkout;
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

    getCheckout() {
        return this.checkout;
    }
    
    getPaymentOptions() {
        let paymentOptions = this.paymentOptions.map(p => p);
        if (this.checkout && this.checkout.paymentOptions) {
            this.checkout.paymentOptions.forEach(function (po) { paymentOptions.push(po); });
        }
        return paymentOptions;
    }

    //
    // Handlers
    //

    // Create

    handleCreateRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleCreateSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.checkout = payload;
        this.emitChange();
    }

    handleCreateError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }

    // Payment Options

    handleSetPaymentOptions(payload) {
        this.paymentOptions = payload;
        this.emitChange();
    }

    // Update

    handleUpdateRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleUpdateSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.checkout = payload;
        this.emitChange();
    }

    handleUpdateError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default CheckoutStore;
