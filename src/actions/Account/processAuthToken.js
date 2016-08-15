/**
 * Imports
 */

// Flux
import CartStore from '../../stores/Cart/CartStore';

// Actions
import accountActions from '../../constants/account';
import cartActions from '../../constants/cart';

/**
 * Action Creator
 */
export default function processAuthToken(context, payload, done) {

    // 1) Save authToken
    context.dispatch(accountActions.ACCOUNT_LOGIN_SUCCESS, payload);

    // 2) Fetch Account Details
    context.dispatch(accountActions.ACCOUNT_FETCH);
    context.api.account.get().then(function fetchAccountSuccessFn(accountResult) {
        context.dispatch(accountActions.ACCOUNT_FETCH_SUCCESS, accountResult);

        // 3) Claim Anonymous Cart
        context.dispatch(cartActions.CART_CLAIM);
        let cartId = context.getStore(CartStore).getCartId();
        let cartAccessToken = context.getStore(CartStore).getCartAccessToken();
        context.api.cart.patch(cartId, {userId: accountResult.id}, cartAccessToken).then(function claimCartSuccessFn(claimResult) {
            context.dispatch(cartActions.CART_CLAIM_SUCCESS, claimResult);
            done && done();

            // Error claiming cart
        }, function claimCartErrorFn(claimErr) {
            context.dispatch(cartActions.CART_CLAIM_ERROR, claimErr.result);
            done && done();
        });

        // Error fetching Account Details
    }, function fetchAccountErrorFn(accountErr) {
        context.dispatch(accountActions.ACCOUNT_FETCH_ERROR, accountErr.result);
        done && done();
    });
};
