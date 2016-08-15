import accountActions from '../../constants/account';

export default function registerAccount(context, payload, done) {
    context.dispatch(accountActions.ACCOUNT_REGISTER);
    context.api.account.register(payload).then(function successFn(result) {
        context.dispatch(accountActions.ACCOUNT_REGISTER_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(accountActions.ACCOUNT_REGISTER_ERROR, err.result);
        done && done();
    });
};
