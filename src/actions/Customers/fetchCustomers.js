import customerActions from '../../constants/customers';

export default function fetchCustomers(context, payload, done) {
    context.dispatch(customerActions.CUSTOMERS_FIND);
    context.api.customers.find(payload).then(function successFn(result) {
        context.dispatch(customerActions.CUSTOMERS_FIND_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(customerActions.CUSTOMERS_FIND_ERROR, err.result);
        done && done();
    });
}
