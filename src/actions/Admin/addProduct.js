import productActions from '../../constants/products';

export default function addProduct(context, payload, done) {
    context.dispatch(productActions.PRODUCTS_ADD);
    context.api.products.create(payload).then(function successFn(result) {
        context.dispatch(productActions.PRODUCTS_ADD_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(productActions.PRODUCTS_ADD_ERROR, err.result);
        done && done();
    });
}
