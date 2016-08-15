import applicationActions from '../../constants/application';

export default function popNotification(context, payload, done) {
    context.dispatch(applicationActions.APPLICATION_POP_NOTIFICATION);
    done && done();
}