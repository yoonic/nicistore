import contentActions from '../../constants/contents';

export default function fetchContents(context, payload, done) {
    context.dispatch(contentActions.CONTENTS_FIND);
    context.api.contents.find(payload).then(function successFn(result) {
        context.dispatch(contentActions.CONTENTS_FIND_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(contentActions.CONTENTS_FIND_ERROR, err.result);
        done && done();
    });
}
