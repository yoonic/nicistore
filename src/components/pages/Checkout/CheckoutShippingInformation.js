/**
 * Imports
 */
import React from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import AddressField from '../../common/forms/AddressField';
import AddressPreview from '../../common/forms/AddressPreview';
import RadioSelect from '../../common/forms/RadioSelect';

import CheckoutSection from './CheckoutSection';

// Translation data for this component
import intlData from './CheckoutShippingInformation.intl';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class CheckoutShippingInformation extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CheckoutShippingInformation.scss');
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        let shippingOptions = (this.props.shippingOptions) ? this.props.shippingOptions.map(function (option) {
            let name = (
                <FormattedMessage message={intlStore.getMessage(option.name)}
                                  locales={intlStore.getCurrentLocale()} />
            );
            let price = (
                <FormattedNumber
                    value={option.price}
                    style="currency"
                    currency={option.currency} />
            );
            return {
                value: option.value,
                name: name,
                detail: price
            };
        }) : null;

        //
        // Return
        //
        return (
            <div className="checkout-shipping-information">
                {this.props.editingAddress ?
                    <div className="checkout-shipping-information__content">
                        <AddressField labelWeight="normal"
                                      address={this.props.address}
                                      savedAddresses={this.props.user && this.props.user.addresses}
                                      onSubmit={this.props.onAddressSubmit}
                                      submitLabel={intlStore.getMessage(intlData, 'save')}
                                      loading={this.props.loading} />
                    </div>
                    :
                    <div className="checkout-shipping-information__content">
                        <div className="checkout-shipping-information__address-preview">
                            <AddressPreview address={this.props.address}
                                            onEditClick={this.props.onAddressEditClick} />
                        </div>
                        {shippingOptions ?
                            <div className="checkout-shipping-information__select-method">
                                <CheckoutSection number="2.1"
                                                 size="small"
                                                 title={intlStore.getMessage(intlData, 'shippingMethodLabel')} />
                                <RadioSelect options={shippingOptions}
                                             onChange={this.props.onShippingOptionChange}
                                             value={this.props.shippingMethod} />
                            </div>
                            :
                            null
                        }
                    </div>
                }
            </div>
        );
    }
}

/**
 * Default Props
 */
CheckoutShippingInformation.defaultProps = {
    onAddressSubmit: function (value) { debug(`onAddressSubmit not defined. Value: ${value}`); },
    onAddressEditClick: function () { debug('onAddressEditClick not defined'); },
    onShippingOptionChange: function (value) { debug(`onShippingOptionChange not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default CheckoutShippingInformation;
