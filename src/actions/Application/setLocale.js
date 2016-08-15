import applicationActions from '../../constants/application';

export default function setLocale(context, payload, done) {
    context.dispatch(applicationActions.APPLICATION_LOCALE_SET, payload);
    done && done();
}
