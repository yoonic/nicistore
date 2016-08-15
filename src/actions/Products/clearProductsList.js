import productActions from '../../constants/products';

export default function clearProductsList(context, payload, done) {
    context.dispatch(productActions.PRODUCTS_FIND_SUCCESS, {items: []});
    done && done();
}
