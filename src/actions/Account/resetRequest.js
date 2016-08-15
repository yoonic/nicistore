import accountActions from '../../constants/account';

export default function resetRequest(context, payload, done) {
    context.dispatch(accountActions.ACCOUNT_RESET);
    context.api.account.resetRequest(payload.email).then(function successFn(result) {
        context.dispatch(accountActions.ACCOUNT_RESET_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(accountActions.ACCOUNT_RESET_ERROR, err.result);
        done && done();
    });
};
