import applicationActions from '../../constants/application';
import contentActions from '../../constants/contents';

let debug = require('debug')('nicistore');

export default async function bulkBannerUpdates(context, payload, done) {
    context.dispatch(contentActions.CONTENTS_BULK_SAVE);
    let promises = payload.map(function (banner) {
        let id = banner.id;
        let payload = Object.assign({}, banner);
        delete payload.id;
        delete payload.type;
        delete payload.comments;
        delete payload.createdAt;
        delete payload.updatedAt;
        return context.api.contents.update(id, payload);
    });
    try {
        await * promises;
        context.dispatch(contentActions.CONTENTS_BULK_SAVE_SUCCESS, payload);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'success',
            message: 'Saved'
        });
    } catch (err) {
        context.dispatch(contentActions.CONTENTS_BULK_SAVE_ERROR, err);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'error',
            message: 'Unable to save'
        });
    }
    done && done();
}
