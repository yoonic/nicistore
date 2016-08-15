import accountActions from '../../constants/account';

export default function updateAccountDetails(context, payload, done) {
    context.dispatch(accountActions.ACCOUNT_UPDATE);
    context.api.account.update(payload).then(function successFn(result) {
        context.dispatch(accountActions.ACCOUNT_UPDATE_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(accountActions.ACCOUNT_UPDATE_ERROR, err.result);
        done && done();
    });
};
