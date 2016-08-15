import applicationActions from '../../constants/application';
import orderActions from '../../constants/orders';

export default function fetchOrderAndCheckIfFound(context, payload, done) {
    context.dispatch(orderActions.ORDERS_ITEM);
    context.api.orders.get(payload).then(function successFn(result) {
        context.dispatch(orderActions.ORDERS_ITEM_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(orderActions.ORDERS_ITEM_ERROR, err.result);
        context.dispatch(applicationActions.APPLICATION_ROUTE_ERROR, err.status);
        done && done();
    });
}
