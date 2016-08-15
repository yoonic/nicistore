import applicationActions from '../../constants/application';
import collectionActions from '../../constants/collections';

export default async function updateHomepageFeaturedCollections(context, payload, done) {
    context.dispatch(collectionActions.COLLECTIONS_HOMEPAGE_FEATURED_UPDATE);
    if (payload.length === 0) {
        context.dispatch(collectionActions.COLLECTIONS_HOMEPAGE_FEATURED_UPDATE_SUCCESS);
        done && done();
    } else {
        let promises = payload.map(function (collection) {
            let id = collection.id;
            let payload = Object.assign({}, collection);
            if (!payload.hasOwnProperty('images')) {
                payload.images = [];
            }
            delete payload.id;
            delete payload.slug;
            delete payload.createdAt;
            delete payload.updatedAt;
            return context.api.collections.update(id, payload);
        });
        try {
            await * promises;
            context.dispatch(collectionActions.COLLECTIONS_HOMEPAGE_FEATURED_UPDATE_SUCCESS);
            context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
                type: 'success',
                message: 'Saved'
            });
        } catch (err) {
            context.dispatch(collectionActions.COLLECTIONS_HOMEPAGE_FEATURED_UPDATE_ERROR, err);
            context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
                type: 'error',
                message: 'Unable to save'
            });
        }
        done && done();
    }
}
