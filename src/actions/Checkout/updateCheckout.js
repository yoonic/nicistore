/**
 * Imports
 */
import ga from 'react-ga';

// Flux
import CheckoutStore from '../../stores/Checkout/CheckoutStore';
import CollectionsStore from '../../stores/Collections/CollectionsStore';
import IntlStore from '../../stores/Application/IntlStore';
import checkoutActions from '../../constants/checkout';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Partial checkout update
 */
export default function updateCheckout(context, payload, done) {

    // Send hit to Google Analytics
    try {
        let checkout = context.getStore(CheckoutStore).getCheckout();
        if (payload.data.hasOwnProperty('customer') || payload.data.hasOwnProperty('paymentMethod') || payload.data.hasOwnProperty('shippingMethod')) {
            checkout.cart.products.forEach(function (product) {
                let categoryName;
                if (product.details.metadata.mainCollection) {
                    let collection = context.getStore(CollectionsStore).getCollection(product.details.metadata.mainCollection);
                    categoryName = context.getStore(IntlStore).getMessage(collection.name);
                }
                ga.plugin.execute('set', '&cu', product.details.pricing.currency);
                ga.plugin.execute('ec', 'addProduct', {
                    id: product.id,
                    name: context.getStore(IntlStore).getMessage(product.details.name),
                    category: categoryName,
                    price: product.details.pricing.retail,
                    quantity: product.quantity
                });
            });

            if (payload.data.customer) {
                ga.plugin.execute('ec', 'setAction', 'checkout', {step: 1});
            } else if (payload.data.shippingMethod) {
                ga.plugin.execute('ec', 'setAction', 'checkout', {step: 2});
            } else if (payload.data.paymentMethod) {
                ga.plugin.execute('ec', 'setAction', 'checkout', {
                    step: 3,
                    option: payload.data.paymentMethod
                });
            }

            ga.plugin.execute('send', 'pageview');
        }
    } catch (err) {
        debug('Unable to send hit to Google Analytics', err);
    }

    // Send hit to Facebook Pixel
    if (payload.data.hasOwnProperty('paymentMethod')) {
        try {
            fbq('track', 'AddPaymentInfo');
        } catch (err) {
            debug('Unable to send hit to Facebook Pixel', err);
        }
    }

    // Make API call
    context.dispatch(checkoutActions.CHECKOUT_UPDATE);
    context.api.checkouts.patch(payload.checkoutId, payload.data, payload.cartAccessToken).then(function successFn(result) {
        context.dispatch(checkoutActions.CHECKOUT_UPDATE_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(checkoutActions.CHECKOUT_UPDATE_ERROR, err.result);
        done && done();
    });
};
