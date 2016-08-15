import cartActions from '../../constants/cart';

export default function archiveCart(context, payload, done) {
    context.dispatch(cartActions.CART_ARCHIVE);
    context.api.cart.patch(payload, {archive: true}).then(function successFn(result) {
        context.dispatch(cartActions.CART_ARCHIVE_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(cartActions.CART_ARCHIVE_SUCCESS, err.result);
        done && done();
    });
}
