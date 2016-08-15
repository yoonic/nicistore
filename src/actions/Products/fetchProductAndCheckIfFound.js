import applicationActions from '../../constants/application';
import productActions from '../../constants/products';

export default function fetchProductAndCheckIfFound(context, payload, done) {
    context.dispatch(productActions.PRODUCTS_ITEM);
    context.api.products.get(payload).then(function successFn(result) {
        context.dispatch(productActions.PRODUCTS_ITEM_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(productActions.PRODUCTS_ITEM_ERROR, err.result);
        context.dispatch(applicationActions.APPLICATION_ROUTE_ERROR, err.status);
        done && done();
    });
}
