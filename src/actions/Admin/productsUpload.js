import productActions from '../../constants/products';

export default function productsUpload(context, payload, done) {
    context.dispatch(productActions.PRODUCTS_UPLOAD);
    context.api.products.upload(payload.resource, payload.file).then(function successFn(result) {
        context.dispatch(productActions.PRODUCTS_UPLOAD_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(productActions.PRODUCTS_UPLOAD_ERROR, err.result);
        done && done();
    });
}
