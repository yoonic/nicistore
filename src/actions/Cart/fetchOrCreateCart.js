import cartActions from '../../constants/cart';
import createCart from './createCart';

export default function fetchOrCreateCart(context, payload, done) {
    if (payload.cartId && payload.cartId !== '') {
        context.dispatch(cartActions.CART_FETCH);
        context.api.cart.get(payload.cartId, payload.cartAccessToken).then(function successFn(result) {
            if (result.archived !== true) {
                context.dispatch(cartActions.CART_FETCH_SUCCESS, result);
                done && done();
            } else {
                context.executeAction(createCart, {}, done);
            }
        }, function errorFn(err) {
            if (err.status === 404 || err.status === 403) {
                context.executeAction(createCart, {}, done);
            } else {
                context.dispatch(cartActions.CART_FETCH_ERROR, err.result);
                done && done();
            }
        });
    } else {
        context.executeAction(createCart, {}, done);
    }
}
