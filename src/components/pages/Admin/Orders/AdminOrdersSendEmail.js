/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../../stores/Application/IntlStore';

// Required components
import Button from '../../../common/buttons/Button';
import InputField from '../../../common/forms/InputField';
import Select from '../../../common/forms/Select';

// Translation data for this component
import intlData from './AdminOrdersSendEmail.intl';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class AdminOrdersSendEmail extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        template: undefined,
        email: undefined,
        subject: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminOrdersSendEmail.scss');
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (nextProps.error && nextProps.error.validation && nextProps.error.validation.keys) {
            nextProps.error.validation.keys.forEach(function (field) {
                fieldErrors[field] = nextProps.error.validation.details[field];
            });
        }

        this.setState({fieldErrors: fieldErrors});
    }

    //*** View Controllers ***//

    handleTemplateChange = (value) => {
        this.setState({template: value});
    };

    handleEmailAddressChange = (value) => {
        this.setState({email: value});
    };

    handleSubjectChange = (value) => {
        this.setState({subject: value});
    };

    handleSubmitClick = () => {
        let intlStore = this.context.getStore(IntlStore);

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.template) {
            fieldErrors.template = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.email) {
            fieldErrors.email = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.subject) {
            fieldErrors.subject = intlStore.getMessage(intlData, 'fieldRequired');
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                template: this.state.template,
                email: this.state.email,
                subject: this.state.subject
            });
        }
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        // Build list of available email templates for given order
        let emailTemplateOptions = [
            {name: intlStore.getMessage(intlData, 'orderCreated'), value: 'order.created'}
        ];
        if (this.props.order.status === 'paid') {
            emailTemplateOptions.push({name: intlStore.getMessage(intlData, 'orderPaid'), value: 'order.paid'});
        }
        if (this.props.order.status === 'pendingPayment') {
            emailTemplateOptions.push({name: intlStore.getMessage(intlData, 'orderPendingPayment'), value: 'order.pendingPayment'});
        }

        //
        // Return
        //
        return (
            <div className="admin-orders-send-email">
                <div className="admin-orders-send-email__form-item">
                    <Select label={intlStore.getMessage(intlData, 'template')}
                            placeholder
                            options={emailTemplateOptions}
                            onChange={this.handleTemplateChange}
                            error={this.state.fieldErrors.template} />
                </div>
                <div className="admin-orders-send-email__form-item">
                    <InputField label={intlStore.getMessage(intlData, 'emailAddress')}
                                onChange={this.handleEmailAddressChange}
                                error={this.state.fieldErrors.email}/>
                </div>
                <div className="admin-orders-send-email__form-item">
                    <InputField label={intlStore.getMessage(intlData, 'subject')}
                                onChange={this.handleSubjectChange}
                                error={this.state.fieldErrors.subject}/>
                </div>
                <div className="admin-orders-send-email__actions">
                    <div className="admin-orders-send-email__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'cancel')}
                                locales={intlStore.getCurrentLocale()} />
                        </Button>
                    </div>
                    <div className="admin-orders-send-email__button">
                        <Button type="primary" onClick={this.handleSubmitClick} disabled={this.props.loading}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'submit')}
                                locales={intlStore.getCurrentLocale()} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
AdminOrdersSendEmail.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default AdminOrdersSendEmail;
