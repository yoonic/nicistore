import applicationActions from '../../constants/application';

export default function pageWidthChanged(context, payload, done) {
    context.dispatch(applicationActions.APPLICATION_PAGE_WIDTH_CHANGED, payload);
    done && done();
}
