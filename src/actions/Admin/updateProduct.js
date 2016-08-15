import applicationActions from '../../constants/application';
import productActions from '../../constants/products';

export default function updateProduct(context, payload, done) {
    context.dispatch(productActions.PRODUCTS_ITEM_SAVE);
    context.api.products.update(payload.id, payload.data).then(function successFn(result) {
        context.dispatch(productActions.PRODUCTS_ITEM_SAVE_SUCCESS, result);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'success',
            message: 'Saved'
        });
        done && done();
    }, function errorFn(err) {
        context.dispatch(productActions.PRODUCTS_ITEM_SAVE_ERROR, err.result);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'error',
            message: 'Unable to save'
        });
        done && done();
    });
}
