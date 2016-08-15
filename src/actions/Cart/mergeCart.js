import cartActions from '../../constants/cart';

export default function mergeCart(context, payload, done) {
    context.dispatch(cartActions.CART_MERGE);
    context.api.cart.patch(payload.cartId, {mergeId: payload.mergeId}).then(function successFn(result) {
        context.dispatch(cartActions.CART_MERGE_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(cartActions.CART_MERGE_ERROR, err.result);
        done && done();
    });
}
