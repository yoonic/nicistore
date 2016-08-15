import collectionActions from '../../constants/collections';

export default function addCollection(context, payload, done) {
    context.dispatch(collectionActions.COLLECTIONS_ADD);
    context.api.collections.create(payload).then(function successFn(result) {
        context.dispatch(collectionActions.COLLECTIONS_ADD_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(collectionActions.COLLECTIONS_ADD_ERROR, err.result);
        done && done();
    });
}
