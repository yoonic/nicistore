import contentActions from '../../constants/contents';

export default function submitComment(context, payload, done) {
    context.dispatch(contentActions.CONTENTS_ITEM_SAVE);
    context.api.contents.addComment(payload.contentId, payload.message).then(function successFn(result) {
        context.dispatch(contentActions.CONTENTS_ITEM_SAVE_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(contentActions.CONTENTS_ITEM_SAVE_ERROR, err.result);
        done && done();
    });
}
