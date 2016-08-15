import applicationActions from '../../constants/application';
import collectionActions from '../../constants/collections';

export default function updateCollection(context, payload, done) {
    context.dispatch(collectionActions.COLLECTIONS_ITEM_SAVE);
    context.api.collections.update(payload.id, payload.data).then(function successFn(result) {
        context.dispatch(collectionActions.COLLECTIONS_ITEM_SAVE_SUCCESS, result);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'success',
            message: 'Saved'
        });
        done && done();
    }, function errorFn(err) {
        context.dispatch(collectionActions.COLLECTIONS_ITEM_SAVE_ERROR, err.result);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'error',
            message: 'Unable to save'
        });
        done && done();
    });
}
