/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import moment from 'moment';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../../stores/Application/IntlStore';
import CustomersListStore from '../../../../stores/Customers/CustomersListStore';
import fetchCustomers from '../../../../actions/Customers/fetchCustomers';

// Required components
import Heading from '../../../common/typography/Heading';
import Spinner from '../../../common/indicators/Spinner';
import StatusIndicator from '../../../common/indicators/StatusIndicator';
import Table from '../../../common/tables/Table';
import Text from '../../../common/typography/Text';

// Translation data for this component
import intlData from './AdminCustomers.intl';

/**
 * Component
 */
class AdminCustomers extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        customers: this.context.getStore(CustomersListStore).getCustomers(),
        loading: this.context.getStore(CustomersListStore).isLoading()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminCustomers.scss');

        // Request required data
        this.context.executeAction(fetchCustomers, {});

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            customers: nextProps._customers,
            loading: nextProps._loading
        });
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        let headings = [
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'nameHeading')}
                locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'emailHeading')}
                locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'createdAtHeading')}
                locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'status')}
                locales={intlStore.getCurrentLocale()} />
        ];

        let rows = this.state.customers.map(function (customer) {
            let status;
            switch (customer.status) {
                case 'active':
                    status = 'success';
                    break;
                case 'pendingConfirmation':
                    status = 'warning';
                    break;
                case 'disabled':
                    status = 'default';
                    break;
                default:
                    status = 'error';
                    break;
            }
            return {
                data: [
                    <Text size="medium">{customer.name}</Text>,
                    <Text size="medium">{customer.email}</Text>,
                    <Text size="medium">{moment(customer.createdAt).format('YYYY/MM/DD HH:mm:ss')}</Text>,
                    <StatusIndicator status={status} />
                ]
            };
        });

        //
        // Return
        //
        return (
            <div className="admin-customers">
                <div className="admin-customers__header">
                    <div className="admin-customers__title">
                        <Heading size="medium">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'title')}
                                locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                </div>

                {this.state.loading ?
                    <div className="admin-customers__spinner">
                        <Spinner />
                    </div>
                    :
                    <div className="admin-customers__list">
                        <Table headings={headings} rows={rows} />
                    </div>
                }
            </div>
        );
    }
}

/**
 * Flux
 */
AdminCustomers = connectToStores(AdminCustomers, [CustomersListStore], (context) => {
    return {
        _customers: context.getStore(CustomersListStore).getCustomers(),
        _loading: context.getStore(CustomersListStore).isLoading()
    };
});

/**
 * Exports
 */
export default AdminCustomers;
