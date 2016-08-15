import applicationActions from '../../constants/application';
import contentActions from '../../constants/contents';

export default function updateContent(context, payload, done) {
    context.dispatch(contentActions.CONTENTS_ITEM_SAVE);
    context.api.contents.update(payload.id, payload.data).then(function successFn(result) {
        context.dispatch(contentActions.CONTENTS_ITEM_SAVE_SUCCESS, result);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'success',
            message: 'Saved'
        });
        done && done();
    }, function errorFn(err) {
        context.dispatch(contentActions.CONTENTS_ITEM_SAVE_ERROR, err.result);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'error',
            message: 'Unable to save'
        });
        done && done();
    });
}
