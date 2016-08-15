import applicationActions from '../../constants/application';
import contentActions from '../../constants/contents';

export default function fetchContentAndCheckIfFound(context, payload, done) {
    context.dispatch(contentActions.CONTENTS_ITEM);
    context.api.contents.get(payload).then(function successFn(result) {
        context.dispatch(contentActions.CONTENTS_ITEM_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(contentActions.CONTENTS_ITEM_ERROR, err.result);
        context.dispatch(applicationActions.APPLICATION_ROUTE_ERROR, err.status);
        done && done();
    });
}
