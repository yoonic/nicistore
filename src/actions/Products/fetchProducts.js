import productActions from '../../constants/products';

export default function fetchProducts(context, payload, done) {
    context.dispatch(productActions.PRODUCTS_FIND);
    context.api.products.find(payload).then(function successFn(result) {
        context.dispatch(productActions.PRODUCTS_FIND_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(productActions.PRODUCTS_FIND_ERROR, err.result);
        done && done();
    });
}
