/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

// Flux
import AccountStore from '../../../stores/Account/AccountStore';
import OrderDetailsStore from '../../../stores/Orders/OrderDetailsStore';
import OrdersListStore from '../../../stores/Orders/OrdersListStore';
import IntlStore from '../../../stores/Application/IntlStore';

import fetchAccountDetails from '../../../actions/Account/fetchAccountDetails';
import fetchUserLastOrder from '../../../actions/Orders/fetchUserLastOrder';
import updateAccountDetails from '../../../actions/Account/updateAccountDetails';

// Required components
import Button from '../../common/buttons/Button';
import FormLabel from '../../common/forms/FormLabel';
import Heading from '../../common/typography/Heading';
import InlineItems from '../../common/forms/InlineItems';
import InputField from '../../common/forms/InputField';
import Modal from '../../common/modals/Modal';
import Select from '../../common/forms/Select';
import Text from '../../common/typography/Text';

import AccountOrders from './AccountOrders';

// Translation data for this component
import intlData from './Account.intl';

// Instantiate debugger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class Account extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context) {
        return {
            title: context.getStore(IntlStore).getMessage(intlData, 'title')
        }
    };

    //*** Initial State ***//

    state = {
        user: Object.assign({}, this.context.getStore(AccountStore).getAccountDetails()),
        loading: undefined,
        error: undefined,
        lastOrder: undefined,
        lastOrderLoading: true,
        lastOrderError: undefined,
        orders: undefined,
        openModal: null,
        newPassword: {},
        address: {},
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Account.scss');

        //*** Required Data ***//
        this.context.executeAction(fetchAccountDetails);
        this.context.executeAction(fetchUserLastOrder, {userId: this.state.user.id});
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
                fieldErrors[field] = nextProps._error.validation.details[field];
            });
        }

        // Only update state's user if there's no error (i.e. was successfully updated)
        if (!nextProps._loading && !nextProps._error) {
            this.setState({
                user: Object.assign({}, nextProps._user)
            });
        }

        // If account was being updated and was successful, close modal
        if (this.state.loading && !nextProps._loading && !nextProps._error) {
            this.setState({openModal: null});
        }

        this.setState({
            loading: nextProps._loading,
            error: nextProps._error,
            lastOrder: nextProps._lastOrder,
            lastOrderLoading: nextProps._lastOrderLoading,
            lastOrderError: nextProps._lastOrderError,
            orders: nextProps._orders,
            fieldErrors: fieldErrors
        })
    }

    //*** View Controllers ***//

    handleFieldChange = (field, value) => {
        let user = this.state.user;
        user[field] = value;
        this.setState({user: user});
    };

    handlePasswordFieldChange = (field, value) => {
        let newPassword = this.state.newPassword;
        newPassword[field] = value;
        this.setState({newPassword: newPassword});
    };

    handleAddressFieldChange = (field, value) => {
        let address = this.state.address;
        address[field] = value;
        this.setState({address: address});
    };

    handleOpenModalClick = (modal, data) => {
        if (modal === 'newAddress' || modal === 'editAddress' || modal === 'deleteAddress') {
            this.setState({
                openModal: modal,
                address: Object.assign({}, data)
            });
        } else {
            this.setState({openModal: modal});
        }
    };

    handleModalCloseClick = () => {
        this.setState({
            openModal: null,
            fieldErrors: {}
        });
    };

    handleModalSubmitClick = (details, data) => {

        let intlStore = this.context.getStore(IntlStore);

        if (details === 'name') {
            this.context.executeAction(updateAccountDetails, {
                name: this.state.user.name
            });
        } else if (details === 'password') {

            // Client-side validations
            let fieldErrors = {};

            if (!this.state.newPassword.oldPassword) {
                fieldErrors.oldPassword = intlStore.getMessage(intlData, 'fieldRequired');
            }

            if (!this.state.newPassword.newPassword) {
                fieldErrors.newPassword = intlStore.getMessage(intlData, 'fieldRequired');
            }

            if (!this.state.newPassword.confirmPassword) {
                fieldErrors.confirmPassword = intlStore.getMessage(intlData, 'fieldRequired');
            } else if (this.state.newPassword.newPassword !== this.state.newPassword.confirmPassword) {
                fieldErrors.confirmPassword = intlStore.getMessage(intlData, 'passwordMismatch');
            }

            this.setState({fieldErrors: fieldErrors});

            // Validation passed, trigger request
            if (Object.keys(fieldErrors).length === 0) {
                this.context.executeAction(updateAccountDetails, {
                    oldPassword: this.state.newPassword.oldPassword,
                    newPassword: this.state.newPassword.newPassword
                });
            }
        } else if (details === 'address') {

            // Client-side validations
            let fieldErrors = {};

            if (!this.state.address.name) {
                fieldErrors.name = intlStore.getMessage(intlData, 'fieldRequired');
            }

            if (!this.state.address.addressLine1) {
                fieldErrors.addressLine1 = intlStore.getMessage(intlData, 'fieldRequired');
            }

            if (!this.state.address.postalCode) {
                fieldErrors.postalCode = intlStore.getMessage(intlData, 'fieldRequired');
            }

            if (!this.state.address.city) {
                fieldErrors.city = intlStore.getMessage(intlData, 'fieldRequired');
            }

            if (!this.state.address.country) {
                fieldErrors.country = intlStore.getMessage(intlData, 'fieldRequired');
            }

            this.setState({fieldErrors: fieldErrors});

            // Validation passed, trigger request
            if (Object.keys(fieldErrors).length === 0) {
                this.context.executeAction(updateAccountDetails, {
                    address: this.state.address
                });
            }
        } else if (details === 'deleteAddress') {
            let addresses = this.props._user.addresses.filter(function (address) {
                return address.id !== data.id;
            });
            this.context.executeAction(updateAccountDetails, {
                addresses: addresses
            });
        } else {
            debug(`Unsupported details update "${details}"`);
        }
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        let countryOptions = [
            {name: 'Portugal', value: 'PT'}
        ];

        let modal = () => {
            if (this.state.openModal === 'editDetails') {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'editDetails')}
                           onCloseClick={this.handleModalCloseClick}>
                        <div className="account__modal-form-item">
                            <InputField label={intlStore.getMessage(intlData, 'name')}
                                        value={this.state.user.name}
                                        onChange={this.handleFieldChange.bind(null, 'name')}
                                        error={this.state.fieldErrors['name']} />
                        </div>
                        <div className="account__modal-form-actions">
                            <div className="account__modal-form-action-item">
                                <Button type="default"
                                        onClick={this.handleModalCloseClick}
                                        disabled={this.state.loading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'cancel')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                            <div className="account__modal-form-action-item">
                                <Button type="primary"
                                        onClick={this.handleModalSubmitClick.bind(null, 'name')}
                                        disabled={this.state.loading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'update')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                        </div>
                    </Modal>
                );
            } else if (this.state.openModal === 'changePassword') {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'changePassword')}
                           onCloseClick={this.handleModalCloseClick}>
                        <div className="account__modal-form-item">
                           <InputField label={intlStore.getMessage(intlData, 'oldPassword')}
                                       type="password"
                                       onChange={this.handlePasswordFieldChange.bind(null, 'oldPassword')}
                                       error={this.state.fieldErrors['oldPassword']} />
                        </div>
                        <div className="account__modal-form-item">
                           <InputField label={intlStore.getMessage(intlData, 'newPassword')}
                                       type="password"
                                       onChange={this.handlePasswordFieldChange.bind(null, 'newPassword')}
                                       error={this.state.fieldErrors['newPassword']} />
                        </div>
                        <div className="account__modal-form-item">
                           <InputField label={intlStore.getMessage(intlData, 'confirmPassword')}
                                       type="password"
                                       onChange={this.handlePasswordFieldChange.bind(null, 'confirmPassword')}
                                       error={this.state.fieldErrors['confirmPassword']} />
                        </div>
                        <div className="account__modal-form-actions">
                            <div className="account__modal-form-action-item">
                                <Button type="default"
                                        onClick={this.handleModalCloseClick}
                                        disabled={this.state.loading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'cancel')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                            <div className="account__modal-form-action-item">
                                <Button type="primary"
                                        onClick={this.handleModalSubmitClick.bind(null, 'password')}
                                        disabled={this.state.loading}>
                                    <FormattedMessage message={intlStore.getMessage(intlData, 'update')}
                                                      locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                        </div>
                    </Modal>
                );
            } else if (this.state.openModal === 'newAddress' || this.state.openModal === 'editAddress') {
                let title = (this.state.openModal === 'newAddress') ? intlStore.getMessage(intlData, 'newAddress') : intlStore.getMessage(intlData, 'editAddress');
                let submitLabel = (this.state.openModal === 'newAddress') ? intlStore.getMessage(intlData, 'save') : intlStore.getMessage(intlData, 'update');
                return (
                    <Modal title={title}
                           onCloseClick={this.handleModalCloseClick}>
                        <div className="account__modal-form-item">
                            <InlineItems>
                                <InputField label={intlStore.getMessage(intlData, 'name')}
                                            value={this.state.address.name}
                                            onChange={this.handleAddressFieldChange.bind(null, 'name')}
                                            error={this.state.fieldErrors['name']} />
                                <InputField label={intlStore.getMessage(intlData, 'phoneNumber')}
                                            value={this.state.address.phone}
                                            onChange={this.handleAddressFieldChange.bind(null, 'phone')}
                                            error={this.state.fieldErrors['phone']} />
                            </InlineItems>
                        </div>
                        <div className="account__modal-form-item">
                            <InputField label={intlStore.getMessage(intlData, 'vatin')}
                                        value={this.state.address.vatin}
                                        onChange={this.handleAddressFieldChange.bind(null, 'vatin')}
                                        error={this.state.fieldErrors['vatin']} />
                        </div>
                        <div className="account__modal-form-item">
                            <InputField label={intlStore.getMessage(intlData, 'address')}
                                        value={this.state.address.addressLine1}
                                        onChange={this.handleAddressFieldChange.bind(null, 'addressLine1')}
                                        error={this.state.fieldErrors['addressLine1']} />
                        </div>
                        <div className="account__modal-address-line2">
                            <InputField onChange={this.handleAddressFieldChange.bind(null, 'addressLine2')}
                                        value={this.state.address.addressLine2}
                                        error={this.state.fieldErrors['addressLine2']} />
                        </div>
                        <div className="account__modal-form-item">
                            <InlineItems>
                                <InputField label={intlStore.getMessage(intlData, 'postalCode')}
                                            value={this.state.address.postalCode}
                                            onChange={this.handleAddressFieldChange.bind(null, 'postalCode')}
                                            error={this.state.fieldErrors['postalCode']} />
                                <InputField label={intlStore.getMessage(intlData, 'city')}
                                            value={this.state.address.city}
                                            onChange={this.handleAddressFieldChange.bind(null, 'city')}
                                            error={this.state.fieldErrors['city']} />
                            </InlineItems>
                        </div>
                        <div className="account__modal-form-item">
                            <InlineItems>
                                <InputField label={intlStore.getMessage(intlData, 'state')}
                                            value={this.state.address.state}
                                            onChange={this.handleAddressFieldChange.bind(null, 'state')}
                                            error={this.state.fieldErrors['state']} />
                                <Select label={intlStore.getMessage(intlData, 'country')} placeholder options={countryOptions}
                                        value={this.state.address.country}
                                        onChange={this.handleAddressFieldChange.bind(null, 'country')}
                                        error={this.state.fieldErrors['country']} />
                            </InlineItems>
                        </div>
                        <div className="account__modal-form-actions">
                            <div className="account__modal-form-action-item">
                                <Button type="default"
                                        onClick={this.handleModalCloseClick}
                                        disabled={this.state.loading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'cancel')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                            <div className="account__modal-form-action-item">
                                <Button type="primary"
                                        onClick={this.handleModalSubmitClick.bind(null, 'address')}
                                        disabled={this.state.loading}>
                                    {submitLabel}
                                </Button>
                            </div>
                        </div>
                    </Modal>
                );
            } else if (this.state.openModal === 'deleteAddress') {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'deleteAddress')}
                           onCloseClick={this.handleModalCloseClick}>
                        <div className="account__modal-form-item">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'deleteAddressConfirm')}
                                locales={intlStore.getCurrentLocale()} />
                        </div>
                        <div className="account__modal-form-actions">
                            <div className="account__modal-form-action-item">
                                <Button type="default"
                                        onClick={this.handleModalCloseClick}
                                        disabled={this.state.loading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'cancel')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                            <div className="account__modal-form-action-item">
                                <Button type="primary"
                                        onClick={this.handleModalSubmitClick.bind(null, 'deleteAddress', this.state.address)}
                                        disabled={this.state.loading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'delete')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                        </div>
                    </Modal>
                );
            } else if (this.state.openModal !== null) {
                debug(`Unsupported modal "${this.state.openModal}"`);
            }
        };

        //
        // Return
        //
        return (
            <div className="account">
                {modal()}

                <div className="account__title">
                    <Heading size="large">
                        <FormattedMessage
                            message={intlStore.getMessage(intlData, 'title')}
                            locales={intlStore.getCurrentLocale()} />
                    </Heading>
                </div>
                <div className="account__content">
                    <div className="account__left-column">
                        <div className="account__details">
                            <div className="account__details-title">
                                <Heading size="medium">
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'details')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Heading>
                            </div>
                            <div className="account__details-item">
                                <div className="account__details-item-label">
                                    <FormLabel>
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'name')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </FormLabel>
                                </div>
                                <div className="account__details-item-value">
                                    <Text>{this.props._user.name}</Text>
                                </div>
                            </div>
                            <div className="account__details-item">
                                <div className="account__details-item-label">
                                    <FormLabel>
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'email')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </FormLabel>
                                </div>
                                <div className="account__details-item-value">
                                    <Text>{this.props._user.email}</Text>
                                </div>
                            </div>
                            <div className="account__details-actions">
                                <Button className="account__details-action-button"
                                        type="default"
                                        fontSize="small"
                                        onClick={this.handleOpenModalClick.bind(null, 'editDetails')}
                                        disabled={this.state.loading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'editDetails')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                                <Button className="account__details-action-button"
                                        type="default"
                                        fontSize="small"
                                        onClick={this.handleOpenModalClick.bind(null, 'changePassword')}
                                        disabled={this.state.loading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'changePassword')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                        </div>

                        <div className="account__addresses">
                            <div className="account__addresses-title">
                                <Heading size="medium">
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'addresses')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Heading>
                            </div>
                            <div className="account__addresses-actions">
                                <Button className="account__addresses-new-button"
                                        type="default"
                                        fontSize="small"
                                        onClick={this.handleOpenModalClick.bind(null, 'newAddress', {})}
                                        disabled={this.state.loading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'newAddress')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                            <div className="account__addresses-list">
                                {this.props._user.addresses && this.props._user.addresses.map((address, idx) => {
                                    return (
                                        <div key={idx} className="account__addresses-item">
                                            <div className="account__address-name">
                                                <Text weight="bold">{address.name}</Text>
                                            </div>
                                            {address.phone ?
                                                <div className="account__address-phone">
                                                    <Text size="small">{address.phone}</Text>
                                                </div>
                                                :
                                                null
                                            }
                                            {address.vatin ?
                                                <div className="account__address-vatin">
                                                    <Text>
                                                        <FormattedMessage
                                                            message={intlStore.getMessage(intlData, 'vatLabel')}
                                                            locales={intlStore.getCurrentLocale()} />: {address.vatin}
                                                    </Text>
                                                </div>
                                                :
                                                null
                                            }
                                            <div className="account__address-line-1">
                                                <Text>{address.addressLine1}</Text>
                                            </div>
                                            {address.addressLine2 ?
                                                <div className="account__address-line-2">
                                                    <Text>{address.addressLine2}</Text>
                                                </div>
                                                :
                                                null
                                            }
                                            <div className="account__address-postal-code">
                                                <Text>{address.postalCode}</Text>
                                            </div>
                                            <div className="account__address-city">
                                                <Text>{address.city}</Text>
                                            </div>
                                            {address.state ?
                                                <div className="account__address-state">
                                                    <Text>{address.state}</Text>
                                                </div>
                                                :
                                                null
                                            }
                                            <div className="account__address-country">
                                                <Text>{address.country}</Text>
                                            </div>
                                            <div className="account__address-actions">
                                                <div className="account__address-edit" onClick={this.handleOpenModalClick.bind(null, 'editAddress', address)}>
                                                    <Text weight="bold">
                                                        <FormattedMessage
                                                            message={intlStore.getMessage(intlData, 'edit')}
                                                            locales={intlStore.getCurrentLocale()} />
                                                    </Text>
                                                </div>
                                                <div className="account__address-delete" onClick={this.handleOpenModalClick.bind(null, 'deleteAddress', address)}>
                                                    <Text>
                                                        <FormattedMessage
                                                            message={intlStore.getMessage(intlData, 'delete')}
                                                            locales={intlStore.getCurrentLocale()} />
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="account__right-column">
                        <AccountOrders loading={this.state.lastOrderLoading} lastOrder={this.state.lastOrder} orders={this.state.orders} />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
Account = connectToStores(Account, [AccountStore, OrderDetailsStore, OrdersListStore], (context) => {
    return {
        _user: context.getStore(AccountStore).getAccountDetails(),
        _loading: context.getStore(AccountStore).isLoading(),
        _error: context.getStore(AccountStore).getError(),
        _lastOrder: context.getStore(OrderDetailsStore).getOrder(),
        _lastOrderLoading: context.getStore(OrderDetailsStore).isLoading(),
        _lastOrderError: context.getStore(OrderDetailsStore).getError(),
        _orders: context.getStore(OrdersListStore).getOrders()
    };
});

/**
 * Exports
 */
export default Account;
