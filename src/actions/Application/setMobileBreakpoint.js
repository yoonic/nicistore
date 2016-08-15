import applicationActions from '../../constants/application';

export default function setMobileBreakpoint(context, payload, done) {
    context.dispatch(applicationActions.APPLICATION_MOBILE_BREAKPOINT_SET, payload);
    done && done();
}
