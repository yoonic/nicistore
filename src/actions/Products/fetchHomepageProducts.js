import productActions from '../../constants/products';

export default function fetchHomepageProducts(context, payload, done) {
    context.dispatch(productActions.PRODUCTS_HOMEPAGE);
    context.api.products.find({tags: 'homepage'}).then(function successFn(result) {
        context.dispatch(productActions.PRODUCTS_HOMEPAGE_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(productActions.PRODUCTS_HOMEPAGE_ERROR, err.result);
        done && done();
    });
}
