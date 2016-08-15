/**
 * Imports
 */
import React from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import OrderSummary from '../../common/orders/OrderSummary';
import Text from '../../common/typography/Text';

// Translation data for this component
import intlData from './CheckoutSummary.intl';

/**
 * Component
 */
class CheckoutSummary extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CheckoutSummary.scss');
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);

        let missingInfo = [];
        if (!this.props.checkout.customer && !this.props.checkout.cart.userId) {
            missingInfo.push(`1 - ${intlStore.getMessage(intlData, 'customerDetails')}`);
        }
        if (!this.props.checkout.shippingAddress || Object.keys(this.props.checkout.shippingAddress).length === 0) {
            missingInfo.push(`2 - ${intlStore.getMessage(intlData, 'shippingAddress')}`);
        }
        if (!this.props.checkout.shippingMethod) {
            missingInfo.push(`2.1 - ${intlStore.getMessage(intlData, 'shippingMethod')}`);
        }
        if (!this.props.useShippingAddressForBilling && (!this.props.checkout.billingAddress || Object.keys(this.props.checkout.billingAddress).length === 0)) {
            missingInfo.push(`3 - ${intlStore.getMessage(intlData, 'billingAddress')}`);
        }
        if (!this.props.checkout.paymentMethod) {
            missingInfo.push(`3.1 - ${intlStore.getMessage(intlData, 'paymentMethod')}`);
        }

        //
        // Return
        //
        return (
            <div className="checkout-summary">
                <div className="checkout-summary__order">
                    <OrderSummary checkout={this.props.checkout} />
                </div>
                {missingInfo.length > 0 ?
                    <div className="checkout-summary__warning">
                        <Heading size="small">
                            <FormattedMessage message={intlStore.getMessage(intlData, 'whatsMissing')}
                                              locales={intlStore.getCurrentLocale()} />
                        </Heading>
                        {missingInfo.map(function (detail, idx) {
                            return (
                                <div className="checkout-summary__warning-item">
                                    <Text key={idx} size="small">{detail}</Text>
                                </div>
                            );
                        })}
                    </div>
                    :
                    null
                }
                <div className="checkout-summary__row checkout-summary__submit">
                    <div className="checkout-summary__submit-button">
                        <Button type="primary" disabled={!this.props.readyForCheckout} onClick={this.props.onCheckoutClick}>
                            <FormattedMessage message={intlStore.getMessage(intlData, 'checkout')} 
                                              locales={intlStore.getCurrentLocale()} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default CheckoutSummary;
