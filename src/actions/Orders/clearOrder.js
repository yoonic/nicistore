import orderActions from '../../constants/orders';

export default function clearOrder(context, payload, done) {
    context.dispatch(orderActions.ORDER_CLEAR);
    done && done();
}
