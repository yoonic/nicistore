import accountActions from '../../constants/account';
import createCart from '../Cart/createCart';

export default function logout(context, payload, done) {
    context.dispatch(accountActions.ACCOUNT_LOGOUT_SUCCESS);
    context.executeAction(createCart, {}, done); // Reset cart
}
