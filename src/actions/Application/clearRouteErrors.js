import applicationActions from '../../constants/application';

export default function clearRouteErrors(context, payload, done) {
    context.dispatch(applicationActions.APPLICATION_ROUTE_ERROR, null);
    done && done();
}
