import applicationActions from '../../constants/application';

export default function triggerDrawer(context, payload, done) {
    context.dispatch(applicationActions.APPLICATION_DRAWER_TRIGGER, payload);
}
