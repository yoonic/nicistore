import applicationActions from '../../constants/application';
import orderActions from '../../constants/orders';

export default function sendOrderEmail(context, payload, done) {
    context.dispatch(orderActions.ORDERS_SEND_EMAIL);
    context.api.orders.sendEmail(payload.orderId, payload.data).then(function successFn(result) {
        context.dispatch(orderActions.ORDERS_SEND_EMAIL_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(orderActions.ORDERS_SEND_EMAIL_ERROR, err);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'error',
            message: 'Unable to send email'
        });
        done && done();
    });
}
