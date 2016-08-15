import accountActions from '../../constants/account';

export default function fetchAccountDetails(context, payload, done) {
    context.dispatch(accountActions.ACCOUNT_FETCH);
    context.api.account.get().then(function successFn(result) {
        context.dispatch(accountActions.ACCOUNT_FETCH_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(accountActions.ACCOUNT_FETCH_ERROR, err.result);
        done && done();
    });
}
