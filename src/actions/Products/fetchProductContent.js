import productActions from '../../constants/products';

export default function fetchProductContent(context, payload, done) {
    context.dispatch(productActions.PRODUCTS_CONTENTS);
    context.api.contents.find({type: 'article', tags: 'productPage'}).then(function successFn(result) {
        context.dispatch(productActions.PRODUCTS_CONTENTS_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(productActions.PRODUCTS_CONTENTS_ERROR, err.result);
        done && done();
    });
}
