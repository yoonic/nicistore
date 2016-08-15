import orderActions from '../../constants/orders';

export default function fetchOrders(context, payload, done) {
    context.dispatch(orderActions.ORDERS_FIND);
    context.api.orders.find(payload).then(function successFn(result) {
        context.dispatch(orderActions.ORDERS_FIND_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(orderActions.ORDERS_FIND_ERROR, err.result);
        done && done();
    });
}
