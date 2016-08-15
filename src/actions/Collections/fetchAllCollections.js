import collectionActions from '../../constants/collections';

export default function fetchAllCollections(context, payload, done) {
    context.dispatch(collectionActions.COLLECTIONS);
    context.api.collections.getAll().then(function successFn(result) {
        context.dispatch(collectionActions.COLLECTIONS_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(collectionActions.COLLECTIONS_ERROR, err.result);
        done && done();
    });
}
