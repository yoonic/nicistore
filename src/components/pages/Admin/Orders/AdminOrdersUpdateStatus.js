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
import intlData from './AdminOrdersUpdateStatus.intl';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class AdminOrdersUpdateStatus extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        status: undefined,
        description: undefined,
        fieldErrors: {}
    };
    
    //*** Component Lifecycle ***//
    
    componentDidMount() {
        
        // Component styles
        require('./AdminOrdersUpdateStatus.scss');
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

    handleStatusChange = (value) => {
        this.setState({status: value});
    };

    handleDescriptionChange = (value) => {
        this.setState({description: value});
    };

    handleSubmitClick = () => {
        let intlStore = this.context.getStore(IntlStore);

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.status) {
            fieldErrors.status = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.description) {
            fieldErrors.description = intlStore.getMessage(intlData, 'fieldRequired');
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                status: this.state.status,
                description: this.state.description
            });
        }
    };

    //*** Template ***//

    render() {
        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        let statusOptions = [];
        if (['created', 'pendingPayment', 'paymentError', 'paid', 'processing', 'ready'].indexOf(this.props.order.status) !== -1) {
            statusOptions.push({name: intlStore.getMessage(intlData, 'cancelOrder'), value: 'canceled'});
        }
        if (this.props.order.status === 'paid') {
            statusOptions.push({name: intlStore.getMessage(intlData, 'processing'), value: 'processing'});
        }
        if (this.props.order.status === 'processing') {
            statusOptions.push({name: intlStore.getMessage(intlData, 'ready'), value: 'ready'});
        }
        if (this.props.order.status === 'ready') {
            statusOptions.push({name: intlStore.getMessage(intlData, 'shipped'), value: 'shipped'});
        }

        //
        // Return
        //
        return (
            <div className="admin-orders-update-status">
                <div className="admin-orders-update-status__form-item">
                    <Select label={intlStore.getMessage(intlData, 'status')}
                            placeholder
                            options={statusOptions}
                            onChange={this.handleStatusChange}
                            error={this.state.fieldErrors.status} />
                </div>
                <div className="admin-orders-update-status__form-item">
                    <InputField label={intlStore.getMessage(intlData, 'description')}
                                onChange={this.handleDescriptionChange}
                                error={this.state.fieldErrors.description}/>
                </div>
                <div className="admin-orders-update-status__actions">
                    <div className="admin-orders-update-status__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'cancel')}
                                locales={intlStore.getCurrentLocale()} />
                        </Button>
                    </div>
                    <div className="admin-orders-update-status__button">
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
AdminOrdersUpdateStatus.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default AdminOrdersUpdateStatus;
