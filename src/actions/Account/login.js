/**
 * Imports
 */

// Flux
import processAuthToken from './processAuthToken';

// Actions
import accountActions from '../../constants/account';

/**
 * Action Creator
 */
export default function login(context, payload, done) {
    context.dispatch(accountActions.ACCOUNT_LOGIN);
    context.api.account.login(payload).then(function (result) {
        processAuthToken(context, result, done);
    }, function (err) {
        context.dispatch(accountActions.ACCOUNT_LOGIN_ERROR, err.result);
        done && done();
    });
};
