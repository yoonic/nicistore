/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import OrderDetailsStore from '../../../../stores/Orders/OrderDetailsStore';
import OrderEmailStore from '../../../../stores/Orders/OrderEmailStore';
import IntlStore from '../../../../stores/Application/IntlStore';

import fetchOrderAndCheckIfFound from '../../../../actions/Orders/fetchOrderAndCheckIfFound';
import sendOrderEmail from '../../../../actions/Orders/sendOrderEmail';
import updateOrderStatus from '../../../../actions/Orders/updateOrderStatus';

// Required components
import Button from '../../../common/buttons/Button';
import Heading from '../../../common/typography/Heading';
import Modal from '../../../common/modals/Modal';
import NotFound from '../../NotFound/NotFound';
import OrderDetails from '../../../common/orders/OrderDetails';
import Spinner from '../../../common/indicators/Spinner';

import AdminOrdersSendEmail from './AdminOrdersSendEmail';
import AdminOrdersUpdateStatus from './AdminOrdersUpdateStatus';

// Translation data for this component
import intlData from './AdminOrdersEdit.intl';

/**
 * Component
 */
class AdminOrdersEdit extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        order: this.context.getStore(OrderDetailsStore).getOrder(),
        error: this.context.getStore(OrderDetailsStore).getError(),
        loading: this.context.getStore(OrderDetailsStore).isLoading(),
        saving: this.context.getStore(OrderDetailsStore).isSaving(),
        emailLoading: this.context.getStore(OrderEmailStore).isLoading(),
        emailError: this.context.getStore(OrderEmailStore).getError(),
        showEmailModal: false,
        showUpdateModal: false,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminOrdersEdit.scss');

        // Load required data
        this.context.executeAction(fetchOrderAndCheckIfFound, this.props.params.orderId);
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
                fieldErrors[field] = nextProps._error.validation.details[field];
            });
        }

        // Check if email was sent successfully
        if (this.state.emailLoading && !nextProps._emailLoading && !nextProps._emailError) {
            this.setState({showEmailModal: false});
        }

        // If updated successfully, check if any modal should be closed
        if (this.state.showUpdateModal && this.state.saving && !nextProps._saving && !nextProps._error) {
            this.setState({showUpdateModal: false});
        }

        // Update state
        this.setState({
            order: nextProps._order,
            error: nextProps._error,
            loading: nextProps._loading,
            saving: nextProps._saving,
            emailLoading: nextProps._emailLoading,
            emailError: nextProps._emailError
        });
    }

    //*** View Controllers ***//

    // Send email modal

    handleSendEmailClick = () => {
        this.setState({showEmailModal: true});
    };

    handleSendEmailCloseClick = () => {
        this.setState({showEmailModal: false});
    };

    handleSendEmailSubmitClick = (data) => {
        this.context.executeAction(sendOrderEmail, {orderId: this.state.order.id, data: data});
    };

    // Update status modal

    handleUpdateStatusClick = () => {
        this.setState({showUpdateModal: true});
    };

    handleUpdateStatusCloseClick = () => {
        this.setState({showUpdateModal: false});
    };

    handleUpdateStatusSubmitClick = (data) => {
        this.context.executeAction(updateOrderStatus, {
            orderId: this.state.order.id,
            status: data.status,
            description: data.description
        });
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        // Return block regarding the send email modal
        let sendEmailModal = () => {
            if (this.state.showEmailModal) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'sendEmailModalTitle')}
                           onCloseClick={this.handleSendEmailCloseClick}>
                        <AdminOrdersSendEmail onCancelClick={this.handleSendEmailCloseClick}
                                              onSubmitClick={this.handleSendEmailSubmitClick}
                                              order={this.state.order}
                                              loading={this.state.emailLoading}
                                              error={this.state.emailError} />
                    </Modal>
                );
            }
        };

        // Return block regarding the order status update
        let updateModal = () => {
            if (this.state.showUpdateModal) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'updateModalTitle')}
                           onCloseClick={this.handleUpdateStatusCloseClick}>
                        <AdminOrdersUpdateStatus onCancelClick={this.handleUpdateStatusCloseClick}
                                                 onSubmitClick={this.handleUpdateStatusSubmitClick}
                                                 order={this.state.order}
                                                 loading={this.state.saving}
                                                 error={this.state.error} />
                    </Modal>
                );
            }
        };

        //
        // Return
        //
        return (
            <div className="admin-orders-edit">
                {sendEmailModal()}
                {updateModal()}
                <div className="admin-orders-edit__header">
                    <div className="admin-orders-edit__title">
                        <Heading size="medium">
                            <FormattedMessage message={intlStore.getMessage(intlData, 'title')}
                                              locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    {this.state.order ?
                        <div className="admin-orders-edit__toolbar">
                            <div className="admin-orders-edit__toolbar-item">
                                <Link to="adm-orders" params={routeParams}>
                                    <Button type="default" disabled={this.state.loading || this.state.saving}>
                                        <FormattedMessage message={intlStore.getMessage(intlData, 'back')}
                                                          locales={intlStore.getCurrentLocale()} />
                                    </Button>
                                </Link>
                            </div>
                            <div className="admin-orders-edit__toolbar-item">
                                <Button type="primary" onClick={this.handleSendEmailClick} disabled={this.state.loading || this.state.saving}>
                                    <FormattedMessage message={intlStore.getMessage(intlData, 'sendEmail')}
                                                      locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                            {['created', 'pendingPayment', 'paid', 'processing', 'ready'].indexOf(this.state.order.status) !== -1 ?
                                <div className="admin-orders-edit__toolbar-item">
                                    <Button type="primary" onClick={this.handleUpdateStatusClick} disabled={this.state.loading || this.state.saving}>
                                        <FormattedMessage message={intlStore.getMessage(intlData, 'updateStatus')}
                                                          locales={intlStore.getCurrentLocale()} />
                                    </Button>
                                </div>
                                :
                                null
                            }
                        </div>
                        :
                        null
                    }
                </div>
                {this.state.loading ?
                    <div className="admin-orders-edit__spinner">
                        <Spinner />
                    </div>
                    :
                    null
                }
                {!this.state.loading && !this.state.order  ?
                    <NotFound />
                    :
                    null
                }
                {!this.state.loading && this.state.order ?
                    <OrderDetails order={this.state.order} />
                    :
                    null
                }
            </div>
        );
    }
}

/**
 * Flux
 */
AdminOrdersEdit = connectToStores(AdminOrdersEdit, [OrderDetailsStore, OrderEmailStore], (context) => {
    return {
        _order: context.getStore(OrderDetailsStore).getOrder(),
        _error: context.getStore(OrderDetailsStore).getError(),
        _loading: context.getStore(OrderDetailsStore).isLoading(),
        _saving: context.getStore(OrderDetailsStore).isSaving(),
        _emailLoading: context.getStore(OrderEmailStore).isLoading(),
        _emailError: context.getStore(OrderEmailStore).getError()
    };
});

/**
 * Exports
 */
export default AdminOrdersEdit;
