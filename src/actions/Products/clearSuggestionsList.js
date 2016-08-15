import productActions from '../../constants/products';

export default function clearSuggestionsList(context, payload, done) {
    context.dispatch(productActions.PRODUCTS_SUGGESTIONS_CLEAR);
    done && done();
}
