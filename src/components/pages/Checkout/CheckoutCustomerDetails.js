/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../../common/buttons/Button';
import InlineItems from '../../common/forms/InlineItems';
import InputField from '../../common/forms/InputField';
import Text from '../../common/typography/Text';

// Translation data for this component
import intlData from './CheckoutCustomerDetails.intl';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class CheckoutCustomerDetails extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        email: (this.props.user) ? this.props.user.email : '',
        name: (this.props.user) ? this.props.user.name : '',

        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CheckoutCustomerDetails.scss');
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (nextProps.error && nextProps.error.validation && nextProps.error.validation.keys) {
            nextProps.error.validation.keys.forEach(function (field) {
                fieldErrors[field] = nextProps.error.validation.details[field];
            });
        }

        // Update state
        this.setState({fieldErrors: fieldErrors});
    }

    //*** View Controllers ***//

    handleInputChange = (field, value) => {
        this.setState({[field]: value});
    };

    handleSaveClick = () => {

        let intlStore = this.context.getStore(IntlStore);

        // Client-side validations
        let fieldErrors = {};

        if (!this.state.name) {
            fieldErrors['customer.name'] = intlStore.getMessage(intlData, 'fieldRequired');
        }

        if (!this.state.email) {
            fieldErrors['customer.email'] = intlStore.getMessage(intlData, 'fieldRequired');
        }

        this.setState({fieldErrors: fieldErrors});

        // Validation passed, trigger request
        if (Object.keys(fieldErrors).length === 0) {
            this.props.onDetailsSubmit({
                email: this.state.email,
                name: this.state.name
            });
        }
    };

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="checkout-customer-details">
                {this.props.editing && !this.props.user ?
                    <div className="checkout-customer-details__form">
                        <div className="checkout-customer-details__item">
                            <InlineItems>
                                <InputField label={intlStore.getMessage(intlData, 'name')}
                                            labelWeight="normal"
                                            value={this.state.name}
                                            onChange={this.handleInputChange.bind(null, 'name')}
                                            error={this.state.fieldErrors['customer.name']} />
                                <InputField label={intlStore.getMessage(intlData, 'email')}
                                            labelWeight="normal"
                                            value={this.state.email}
                                            onChange={this.handleInputChange.bind(null, 'email')}
                                            error={this.state.fieldErrors['customer.email']} />
                            </InlineItems>
                        </div>
                        <div className="checkout-customer-details__item">
                            <InlineItems>
                                <div></div>
                                <div>
                                    <Button type="primary"
                                            onClick={this.handleSaveClick}
                                            loading={this.props.loading}>
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'save')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Button>
                                </div>
                            </InlineItems>
                        </div>
                    </div>
                    :
                    <div>
                        <div>
                            <Text>{this.state.name}</Text>
                        </div>
                        <div>
                            <Text>{this.state.email}</Text>
                        </div>
                        {!this.props.user ?
                            <div className="checkout-customer-details__actions">
                                <div className="checkout-customer-details__edit" onClick={this.props.onEditClick}>
                                    <Text weight="bold">
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'edit')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Text>
                                </div>
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
CheckoutCustomerDetails.defaultProps = {
    onDetailsSubmit: function (value) { debug(`onDetailsSubmit not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default CheckoutCustomerDetails;
