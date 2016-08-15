import contentActions from '../../constants/contents';

export default function addContent(context, payload, done) {
    context.dispatch(contentActions.CONTENTS_ADD);
    context.api.contents.create(payload).then(function successFn(result) {
        context.dispatch(contentActions.CONTENTS_ADD_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(contentActions.CONTENTS_ADD_ERROR, err.result);
        done && done();
    });
}
