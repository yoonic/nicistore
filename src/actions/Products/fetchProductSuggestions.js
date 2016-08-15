import productActions from '../../constants/products';

export default function fetchProductSuggestions(context, payload, done) {
    context.dispatch(productActions.PRODUCTS_SUGGESTIONS);
    context.api.products.find({collections: payload.metadata.mainCollection}).then(function successFn(result) {
        context.dispatch(productActions.PRODUCTS_SUGGESTIONS_SUCCESS, {product: payload, suggestions: result});
        done && done();
    }, function errorFn(err) {
        context.dispatch(productActions.PRODUCTS_SUGGESTIONS_ERROR, err.result);
        done && done();
    });
}
