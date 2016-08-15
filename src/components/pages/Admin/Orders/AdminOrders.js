/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import moment from 'moment';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../../stores/Application/IntlStore';
import OrdersListStore from '../../../../stores/Orders/OrdersListStore';
import fetchOrders from '../../../../actions/Orders/fetchOrders';

// Required components
import Heading from '../../../common/typography/Heading';
import OrderStatus from '../../../common/orders/OrderStatus';
import Spinner from '../../../common/indicators/Spinner';
import Table from '../../../common/tables/Table';
import Text from '../../../common/typography/Text';
import ToggleSwitch from '../../../common/buttons/ToggleSwitch';

// Translation data for this component
import intlData from './AdminOrders.intl';

/**
 * Component
 */
class AdminOrders extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        orders: this.context.getStore(OrdersListStore).getOrders(),
        loading: this.context.getStore(OrdersListStore).isLoading(),
        showAllOrders: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminOrders.scss');

        // Load required data
        this.context.executeAction(fetchOrders, {open: true}); // By default, only opened orders
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            orders: nextProps._orders,
            loading: nextProps._loading
        });
    }

    //*** View Controllers ***//

    handleShowAllOrdersChange = () => {
        if (!this.state.loading) {
            let showAllOrders = !this.state.showAllOrders;
            this.context.executeAction(fetchOrders, (showAllOrders) ? {} : {open: true});
            this.setState({showAllOrders: showAllOrders});
        }
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        // Order list table headings
        let headings = [
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'dateHeading')}
                locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'idHeading')}
                locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'emailHeading')}
                locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'statusHeading')}
                locales={intlStore.getCurrentLocale()} />
        ];

        // Order list table rows
        let rows = this.state.orders.map(function (order) {
            return {
                data: [
                    <Text size="medium">{moment(order.createdAt).format('YYYY/MM/DD HH:mm:ss')}</Text>,
                    <span className="admin-orders__link">
                        <Link to="adm-order-edit" params={Object.assign({orderId: order.id}, routeParams)}>
                            <Text size="small">{order.id}</Text>
                        </Link>
                    </span>,
                    <Text size="medium">
                        {order.customer.email}
                        {order.customer.userId ?
                            <span className="adm-orders__user-icon">
                                <i className="fa fa-user" aria-hidden="true" />
                            </span>
                            :
                            null
                        }
                    </Text>,
                    <OrderStatus status={order.status} />
                ]
            };
        });

        //
        // Return
        //
        return (
            <div className="admin-orders">
                <div className="admin-orders__header">
                    <div className="admin-orders__title">
                        <Heading size="medium">
                            <FormattedMessage message={intlStore.getMessage(intlData, 'title')}
                                              locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    <div className="admin-orders__toolbar">
                        <div className="admin-orders__toolbar-item">
                            <ToggleSwitch label={intlStore.getMessage(intlData, 'showAll')}
                                          inline
                                          enabled={this.state.showAllOrders}
                                          onChange={this.handleShowAllOrdersChange} />
                        </div>
                    </div>
                </div>
                {this.state.loading ?
                    <div className="admin-orders__spinner">
                        <Spinner />
                    </div>
                    :
                    null
                }
                {!this.state.loading && this.state.orders.length > 0 ?
                    <div className="admin-orders__list">
                        <Table headings={headings} rows={rows} />
                    </div>
                    :
                    null
                }
                {!this.state.loading && this.state.orders.length === 0 ?
                    <div className="admin-orders__no-results">
                        <Text size="small">
                            <FormattedMessage message={intlStore.getMessage(intlData, 'noResults')}
                                              locales={intlStore.getCurrentLocale()} />
                        </Text>
                    </div>
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
AdminOrders = connectToStores(AdminOrders, [OrdersListStore], (context) => {
    return {
        _orders: context.getStore(OrdersListStore).getOrders(),
        _loading: context.getStore(OrdersListStore).isLoading()
    };
});

/**
 * Exports
 */
export default AdminOrders;
