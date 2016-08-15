/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

import config from '../../../config';

// Flux
import AccountStore from '../../../stores/Account/AccountStore';
import CartStore from '../../../stores/Cart/CartStore';
import CheckoutStore from '../../../stores/Checkout/CheckoutStore';
import IntlStore from '../../../stores/Application/IntlStore';
import OrderStore from '../../../stores/Orders/OrderStore';

import clearOrder from '../../../actions/Orders/clearOrder';
import createCart from '../../../actions/Cart/createCart';
import createCheckout from '../../../actions/Checkout/createCheckout';
import createOrder from '../../../actions/Orders/createOrder';
import updateCheckout from '../../../actions/Checkout/updateCheckout';

// Required components
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import InlineItems from '../../common/forms/InlineItems';
import Modal from '../../common/modals/Modal';
import Spinner from '../../common/indicators/Spinner';
import Text from '../../common/typography/Text';

import CheckoutBillingInformation from './CheckoutBillingInformation';
import CheckoutCustomerDetails from './CheckoutCustomerDetails';
import CheckoutSection from './CheckoutSection';
import CheckoutShippingInformation from './CheckoutShippingInformation';
import CheckoutSummary from './CheckoutSummary';

// Translation data for this component
import intlData from './Checkout.intl';

/**
 * Component
 */
class Checkout extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context) {
        return {
            title: `${context.getStore(IntlStore).getMessage(intlData, 'title')} - ${config.app.title}`
        }
    };

    //*** Helper Methods ***//

    static hasShippingAndBillingAddresses = (checkout) => {
        return (checkout) ? Object.keys(checkout.shippingAddress).length > 0 && Object.keys(checkout.billingAddress).length > 0 : false;
    };

    //*** Initial State ***//

    state = {
        cart: this.context.getStore(CartStore).getCart(),
        cartLoading: this.context.getStore(CartStore).isLoading(),
        cartError: this.context.getStore(CartStore).getError(),

        checkout: this.context.getStore(CheckoutStore).getCheckout(),
        paymentOptions: this.context.getStore(CheckoutStore).getPaymentOptions(),
        checkoutLoading: this.context.getStore(CheckoutStore).isLoading(),
        checkoutError: this.context.getStore(CheckoutStore).getError(),

        order: this.context.getStore(OrderStore).getOrder(),
        orderLoading: this.context.getStore(OrderStore).isLoading(),
        orderError: this.context.getStore(OrderStore).getError(),

        user: this.context.getStore(AccountStore).getAccountDetails(),
        editingCustomerDetails: true,
        customerDetailsUpdateRequested: false,

        editingShippingAddress: !Checkout.hasShippingAndBillingAddresses(this.context.getStore(CheckoutStore).getCheckout()),
        shippingAddressUpdateRequested: false,

        editingBillingAddress: true,
        billingAddressUpdateRequested: false,
        useShippingAddressForBilling: true,
        paymentInstrument: {ready: false},

        showOrderCreatedModal: false,
        showOrderErrorModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Checkout.scss');

        // IMPORTANT:
        // Clear any order that may be loaded in state (e.g. an order just created?)
        this.context.executeAction(clearOrder);

        // Request a new checkout
        let payload = {
            cartId: this.state.cart.id,
            cartAccessToken: this.state.cart.accessToken
        };
        if (this.state.user && this.state.user.addresses && this.state.user.addresses.length > 0) {
            payload.data = {
                shippingAddress: this.state.user.addresses[0],
                billingAddress: this.state.user.addresses[0]
            };
        }
        this.context.executeAction(createCheckout, payload);
    }

    componentWillReceiveProps(nextProps) {

        //
        // Checkout
        //

        // When checkout is first created
        if (!this.state.checkout && nextProps._checkout) {
            if (Checkout.hasShippingAndBillingAddresses(nextProps._checkout)) {
                this.setState({editingShippingAddress: false});
            }
        }

        // If checkout successfully updated, check for any UI element that should change
        // (e.g. address preview)
        if (this.state.checkoutLoading && !nextProps._checkoutLoading && !nextProps._checkoutError) {

            if (this.state.customerDetailsUpdateRequested && this.state.editingCustomerDetails) {
                this.setState({
                    editingCustomerDetails: false,
                    customerDetailsUpdateRequested: false
                });
            }

            if (this.state.shippingAddressUpdateRequested && this.state.editingShippingAddress) {
                this.setState({
                    editingShippingAddress: false,
                    shippingAddressUpdateRequested: false
                });
            }

            if (this.state.billingAddressUpdateRequested && this.state.editingBillingAddress) {
                this.setState({
                    editingBillingAddress: false,
                    billingAddressUpdateRequested: false
                });
            }
        }

        //
        // Order
        //

        // Order created successfully

        if (!this.state.order && nextProps._order && !nextProps._orderError) {
            this.setState({showOrderCreatedModal: true});
        }

        //
        // Update State
        //
        this.setState({
            cart: nextProps._cart,
            cartLoading: nextProps._cartLoading,
            cartError: nextProps._cartError,
            checkout: nextProps._checkout,
            paymentOptions: nextProps._paymentOptions,
            checkoutLoading: nextProps._checkoutLoading,
            checkoutError: nextProps._checkoutError,
            user: nextProps._user,
            order: nextProps._order,
            orderLoading: nextProps._orderLoading,
            orderError: nextProps._orderError
        });
    }

    //*** View Controllers ***//

    //
    // Customer Details
    //

    handleCustomerDetailsEditClick = () => {
        this.setState({editingCustomerDetails: true});
    };

    handleCustomerDetailsSubmit = (customer) => {
        let payload = {
            checkoutId: this.state.checkout.id,
            cartAccessToken: this.state.cart.accessToken,
            data: {
                customer: customer
            }
        };
        this.context.executeAction(updateCheckout, payload);
        this.setState({customerDetailsUpdateRequested: true});
    };

    //
    // Shipping
    //

    handleShippingAddressSubmit = (address) => {
        let payload = {
            checkoutId: this.state.checkout.id,
            cartAccessToken: this.state.cart.accessToken,
            data: {
                shippingAddress: address,
                billingAddress: (this.state.useShippingAddressForBilling) ? address : this.state.checkout.billingAddress
            }
        };
        this.context.executeAction(updateCheckout, payload);
        this.setState({shippingAddressUpdateRequested: true});
    };

    handleShippingAddressEditClick = () => {
        this.setState({editingShippingAddress: true});
    };

    handleShippingOptionChange = (value) => {
        let payload = {
            checkoutId: this.state.checkout.id,
            cartAccessToken: this.state.cart.accessToken,
            data: {
                shippingMethod: value
            }
        };
        this.context.executeAction(updateCheckout, payload);
    };

    //
    // Billing
    //

    handleUseShippingAddressForBillingChange = () => {
        if (!this.state.useShippingAddressForBilling) {
            let payload = {
                checkoutId: this.state.checkout.id,
                cartAccessToken: this.state.cart.accessToken,
                data: {
                    shippingAddress: this.state.checkout.shippingAddress,
                    billingAddress: this.state.checkout.shippingAddress
                }
            };
            this.context.executeAction(updateCheckout, payload);
            this.setState({useShippingAddressForBilling: true});
        } else {
            this.setState({
                useShippingAddressForBilling: false,
                editingBillingAddress: true
            });
        }
    };

    handleBillingAddressSubmit = (address) => {
        let payload = {
            checkoutId: this.state.checkout.id,
            cartAccessToken: this.state.cart.accessToken,
            data: {
                shippingAddress: this.state.checkout.shippingAddress,
                billingAddress: address
            }
        };
        this.context.executeAction(updateCheckout, payload);
        this.setState({billingAddressUpdateRequested: true});
    };

    handleBillingAddressEditClick = () => {
        this.setState({editingBillingAddress: true});
    };

    handlePaymentMethodChange = (value) => {
        let payload = {
            checkoutId: this.state.checkout.id,
            cartAccessToken: this.state.cart.accessToken,
            data: {
                paymentMethod: value
            }
        };
        this.context.executeAction(updateCheckout, payload);
    };

    handlePaymentInstrumentChange = (instrument) => {
        this.setState({paymentInstrument: instrument});
    };

    //
    // Summary
    //

    handleCheckoutClick = () => {
        let payload = {
            checkoutId: this.state.checkout.id,
            cartAccessToken: this.state.cart.accessToken,
            paymentDetails: {
                amount: this.state.checkout.total,
                currency: this.state.checkout.currency,
                chargeType: this.state.checkout.paymentMethod,
                provider: this.state.paymentInstrument.provider,
                instrument: this.state.paymentInstrument.params || {}
            }
        };
        this.context.executeAction(createOrder, payload);
    };

    //
    // Order
    //

    handleOrderErrorModalCloseClick = () => {
        this.setState({showOrderErrorModal: false});
    };

    requestNewCart = () => {
        this.context.executeAction(createCart);
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        let orderModal = () => {
            if (this.state.orderLoading) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'orderModalTitle')}>
                        <div className="checkout__order-loading">
                            <div className="checkout__order-loading-item">
                                <Text size="small">
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'creatingOrder')}
                                        locales={intlStore.getCurrentLocale()} />...
                                </Text>
                            </div>
                            <div className="checkout__order-loading-item">
                                <Spinner />
                            </div>
                        </div>
                    </Modal>
                );
            } else if (this.state.showOrderCreatedModal) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'orderModalTitle')}>
                        <div className="checkout__order-created">
                            <div className="checkout__order-created-item">
                                <Text size="medium">
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'orderCreatedSuccessfully')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Text>
                            </div>
                            <div className="checkout__order-created-item">
                                <Text size="medium">
                                    ID: {this.state.order.id}
                                </Text>
                            </div>
                            <div className="checkout__order-created-item">
                                <InlineItems>
                                    {this.state.user ?
                                        <Link to="account" params={routeParams} className="checkout__order-created-link">
                                            <Button onClick={this.requestNewCart}>
                                                <FormattedMessage
                                                    message={intlStore.getMessage(intlData, 'myAccount')}
                                                    locales={intlStore.getCurrentLocale()} />
                                            </Button>
                                        </Link>
                                        :
                                        null
                                    }
                                    <Link to="homepage" params={routeParams} className="checkout__order-created-link">
                                        <Button type="primary" onClick={this.requestNewCart}>
                                            <FormattedMessage
                                                message={intlStore.getMessage(intlData, 'continueShopping')}
                                                locales={intlStore.getCurrentLocale()} />
                                        </Button>
                                    </Link>
                                </InlineItems>
                            </div>
                        </div>
                    </Modal>
                );
            } else if (this.state.showOrderErrorModal) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'orderModalTitle')} onCloseClick={this.handleOrderErrorModalCloseClick}>
                        <div className="checkout__order-error">
                            <div className="checkout__order-error-item">
                                <Text size="medium">
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'orderError')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Text>
                            </div>
                            <div className="checkout__order-error-item">
                                <Button onClick={this.handleOrderErrorModalCloseClick}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'tryAgain')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                        </div>
                    </Modal>
                );
            }
        };

        //
        // Return
        //
        return (
            <div className="checkout">
                {orderModal()}
                <div className="checkout__title">
                    <Heading size="large">
                        <FormattedMessage
                            message={intlStore.getMessage(intlData, 'title')}
                            locales={intlStore.getCurrentLocale()} />
                    </Heading>
                </div>
                {!this.state.checkout ?
                    <div className="checkout__content">
                        <div className="checkout__loading">
                            <Spinner />
                        </div>
                    </div>
                    :
                    <div className="checkout__content">
                        <div className="checkout__left-column">
                            <CheckoutSection className="checkout__section" number="1" title={intlStore.getMessage(intlData, 'customerDetails')}>
                                <CheckoutCustomerDetails user={this.state.user}
                                                         editing={this.state.editingCustomerDetails}
                                                         onDetailsSubmit={this.handleCustomerDetailsSubmit}
                                                         onEditClick={this.handleCustomerDetailsEditClick}
                                                         loading={this.state.checkoutLoading}
                                                         error={this.state.checkoutError} />
                            </CheckoutSection>
                            <CheckoutSection className="checkout__section" number="2" title={intlStore.getMessage(intlData, 'shippingInformation')}>
                                <CheckoutShippingInformation user={this.state.user}
                                                             address={this.state.checkout.shippingAddress}
                                                             editingAddress={this.state.editingShippingAddress}
                                                             onAddressSubmit={this.handleShippingAddressSubmit}
                                                             onAddressEditClick={this.handleShippingAddressEditClick}
                                                             shippingOptions={this.state.checkout.shippingOptions}
                                                             shippingMethod={this.state.checkout.shippingMethod}
                                                             onShippingOptionChange={this.handleShippingOptionChange}
                                                             loading={this.state.checkoutLoading} />
                            </CheckoutSection>
                            <CheckoutSection className="checkout__section" number="3" title={intlStore.getMessage(intlData, 'billingInformation')}>
                                <CheckoutBillingInformation user={this.state.user}
                                                            address={this.state.checkout.billingAddress}
                                                            useShippingAddress={this.state.useShippingAddressForBilling}
                                                            onUseShippingAddressChange={this.handleUseShippingAddressForBillingChange}
                                                            editingAddress={this.state.editingBillingAddress}
                                                            onAddressSubmit={this.handleBillingAddressSubmit}
                                                            onAddressEditClick={this.handleBillingAddressEditClick}
                                                            paymentOptions={this.state.paymentOptions}
                                                            paymentMethod={this.state.checkout.paymentMethod}
                                                            onPaymentMethodChange={this.handlePaymentMethodChange}
                                                            onPaymentInstrumentChange={this.handlePaymentInstrumentChange}
                                                            loading={this.state.checkoutLoading}  />
                            </CheckoutSection>
                        </div>
                        <div className="checkout__right-column">
                            <CheckoutSection className="checkout__section" number="✓" title={intlStore.getMessage(intlData, 'orderSummary')}>
                                <CheckoutSummary checkout={this.state.checkout}
                                                 useShippingAddressForBilling={this.state.useShippingAddressForBilling}
                                                 readyForCheckout={this.state.checkout.ready && this.state.paymentInstrument.ready}
                                                 onCheckoutClick={this.handleCheckoutClick}/>
                            </CheckoutSection>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

/**
 * Flux
 */
Checkout = connectToStores(Checkout, [AccountStore, CartStore, CheckoutStore, OrderStore], (context) => {
    return {
        _cart: context.getStore(CartStore).getCart(),
        _cartLoading: context.getStore(CartStore).isLoading(),
        _cartError: context.getStore(CartStore).getError(),
        _checkout: context.getStore(CheckoutStore).getCheckout(),
        _paymentOptions: context.getStore(CheckoutStore).getPaymentOptions(),
        _checkoutLoading: context.getStore(CheckoutStore).isLoading(),
        _checkoutError: context.getStore(CheckoutStore).getError(),
        _user: context.getStore(AccountStore).getAccountDetails(),
        _order: context.getStore(OrderStore).getOrder(),
        _orderLoading: context.getStore(OrderStore).isLoading(),
        _orderError: context.getStore(OrderStore).getError()
    };
});

/**
 * Exports
 */
export default Checkout;
