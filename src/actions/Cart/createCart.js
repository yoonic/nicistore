import cartActions from '../../constants/cart';

export default function (context, payload, done) {
    context.dispatch(cartActions.CART_CREATE);
    context.api.cart.create().then(function cartCreateSuccess(result) {
        context.dispatch(cartActions.CART_CREATE_SUCCESS, result);
        done && done();
    }, function cartCreateError(err) {
        context.dispatch(cartActions.CART_CREATE_ERROR, err.result);
        done && done();
    });
}
