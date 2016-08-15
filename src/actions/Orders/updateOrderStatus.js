import orderActions from '../../constants/orders';

export default function updateOrderStatus(context, payload, done) {
    context.dispatch(orderActions.ORDERS_UPDATE);
    context.api.orders.updateStatus(payload.orderId, payload.status, payload.description).then(function successFn(result) {
        context.dispatch(orderActions.ORDERS_UPDATE_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(orderActions.ORDERS_UPDATE_ERROR, err.result);
        done && done();
    });
}
