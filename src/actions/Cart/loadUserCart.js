import cartActions from '../../constants/cart';

export default function loadUserCart(context, payload, done) {
    context.dispatch(cartActions.CART_LOAD);
    context.api.cart.get(payload).then(function successFn(result) {
        context.dispatch(cartActions.CART_LOAD_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(cartActions.CART_LOAD_ERROR, err.result);
        done && done();
    });
}
