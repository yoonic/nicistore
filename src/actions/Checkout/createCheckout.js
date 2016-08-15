import checkoutActions from '../../constants/checkout';
import config from '../../config';

// Initialize debugging utility
let debug = require('debug')('nicistore');

export default function createCheckout(context, payload, done) {
    context.dispatch(checkoutActions.CHECKOUT_CREATE);
    context.api.checkouts.create(payload.cartId, payload.cartAccessToken, payload.data).then(function checkoutCreateSuccess(checkout) {

        function dispatchEvents(paymentOptions) {
            context.dispatch(checkoutActions.CHECKOUT_CREATE_SUCCESS, checkout);
            if (paymentOptions) {
                context.dispatch(checkoutActions.CHECKOUT_SET_PAYMENT_OPTIONS, paymentOptions);
            }
            done && done();
        }

        // 0) Send hit to Facebook Pixel
        try {
            fbq('track', 'InitiateCheckout');
        } catch (err) {
            debug('Unable to send hit to Facebook Pixel', err);
        }

        // 1) Fetch available payment methods from Switch Payments before notifying of successful checkout creation
        if (config.switchPayments && config.switchPayments.enabled) {
            let switchJs = new SwitchJs(config.switchPayments.environment, config.switchPayments.publicKey);
            switchJs.chargeTypes().then(function successFn(paymentMethods) {
                let options = paymentMethods.collection;
                for (let i=0, len=options.length; i<len; i++) { // Process response to have expected data
                    options[i].provider = 'switch';
                    options[i].label = {en: options[i].label, pt: options[i].label};
                }
                dispatchEvents(options);
            }, function errorFn(err) {
                debug('Error fetching available payment methods from Switch Payments', err);
                dispatchEvents();
            });
        }

        // 2) Don't fetch payment methods from Switch
        else {
            dispatchEvents();
        }

    }, function checkoutCreateError(err) {
        context.dispatch(checkoutActions.CHECKOUT_CREATE_ERROR, err.result);
        done && done();
    });
}
