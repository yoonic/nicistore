import orderActions from '../../constants/orders';

export default function fetchUserLastOrder(context, payload, done) {
    context.dispatch(orderActions.ORDERS_ITEM);

    context.api.orders.find({userId: payload.userId}).then(function (userOrders) {
        context.dispatch(orderActions.ORDERS_FIND_SUCCESS, userOrders);
        if (userOrders.items.length > 0) {
            context.api.orders.get(userOrders.items[0].id).then(function (order) {
                context.dispatch(orderActions.ORDERS_ITEM_SUCCESS, order);
                done && done();
            }, function (err) {
                context.dispatch(orderActions.ORDERS_ITEM_ERROR, err.result);
                done && done();
            });
        } else {
            context.dispatch(orderActions.ORDERS_ITEM_SUCCESS, null);
            done && done();
        }
    }, function (err) {
        context.dispatch(orderActions.ORDERS_FIND_ERROR, err.result);
        context.dispatch(orderActions.ORDERS_ITEM_ERROR, err.result);
        done && done();
    });
}
