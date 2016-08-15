import accountActions from '../../constants/account';

export default function resetConfirm(context, payload, done) {
    context.dispatch(accountActions.ACCOUNT_RESET);
    context.api.account.resetConfirm(payload.token, payload.password).then(function successFn(result) {
        context.dispatch(accountActions.ACCOUNT_RESET_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(accountActions.ACCOUNT_RESET_ERROR, err.result);
        done && done();
    });
};
