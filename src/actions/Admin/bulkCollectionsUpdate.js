import applicationActions from '../../constants/application';
import collectionActions from '../../constants/collections';

let debug = require('debug')('nicistore');

export default async function bulkCollectionsUpdate(context, payload, done) {
    context.dispatch(collectionActions.COLLECTIONS_BULK_SAVE);
    let promises = payload.map(function (collection) {
        let id = collection.id;
        let payload = Object.assign({}, collection);
        delete payload.id;
        delete payload.description;
        delete payload.slug;
        delete payload.createdAt;
        delete payload.updatedAt;
        return context.api.collections.update(id, payload);
    });
    try {
        await * promises;
        context.dispatch(collectionActions.COLLECTIONS_BULK_SAVE_SUCCESS, payload);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'success',
            message: 'Saved'
        });
    } catch (err) {
        context.dispatch(collectionActions.COLLECTIONS_BULK_SAVE_ERROR, err);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'error',
            message: 'Unable to save'
        });
    }
    done && done();
}
