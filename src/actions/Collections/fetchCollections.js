import collectionActions from '../../constants/collections';

export default function fetchCollections(context, payload, done) {
    context.dispatch(collectionActions.COLLECTIONS_FIND);
    context.api.collections.find(payload).then(function successFn(result) {
        context.dispatch(collectionActions.COLLECTIONS_FIND_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(collectionActions.COLLECTIONS_FIND_ERROR, err.result);
        done && done();
    });
}
