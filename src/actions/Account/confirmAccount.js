import processAuthToken from './processAuthToken';
import accountActions from '../../constants/account';

export default function confirmAccount(context, payload, done) {
    context.dispatch(accountActions.ACCOUNT_REGISTER);
    context.api.account.confirm(payload.token).then(function (result) {
        context.dispatch(accountActions.ACCOUNT_REGISTER_SUCCESS, result);
        processAuthToken(context, result, done);
    }, function (err) {
        context.dispatch(accountActions.ACCOUNT_REGISTER_ERROR, err.result);
        done && done();
    });
}
