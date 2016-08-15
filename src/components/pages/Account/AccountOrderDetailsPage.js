/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';
import OrderDetailsStore from '../../../stores/Orders/OrderDetailsStore';
import fetchOrderAndCheckIfFound from '../../../actions/Orders/fetchOrderAndCheckIfFound';

// Required components
import Heading from '../../common/typography/Heading';
import NotFound from '../NotFound/NotFound';
import OrderDetails from '../../common/orders/OrderDetails';
import Spinner from '../../common/indicators/Spinner';

// Translation data for this component
import intlData from './AccountOrderDetailsPage.intl';

/**
 * Component
 */
class AccountOrderDetailsPage extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        order: undefined,
        loading: true
    };
    
    //*** Component Lifecycle ***//
    
    componentDidMount() {

        // Component styles
        require('./AccountOrderDetailsPage.scss');

        // Load required data
        this.context.executeAction(fetchOrderAndCheckIfFound, this.props.params.orderId);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            order: nextProps._order,
            loading: nextProps._loading
        });
    }

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="account-order-details-page">
                <div className="account-order-details-page__title">
                    <Heading size="medium">
                        <FormattedMessage message={intlStore.getMessage(intlData, 'title')}
                                          locales={intlStore.getCurrentLocale()} />
                    </Heading>
                </div>
                {this.state.loading ?
                    <div className="account-order-details-page__loader">
                        <Spinner />
                    </div>
                    :
                    <div>
                        {!this.state.order ?
                            <NotFound />
                            :
                            <div className="account-order-details-page__content">
                                <OrderDetails order={this.state.order} customerDetails={false} />
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

/**
 * Flux
 */
AccountOrderDetailsPage = connectToStores(AccountOrderDetailsPage, [OrderDetailsStore], (context) => {
    return {
        _order: context.getStore(OrderDetailsStore).getOrder(),
        _loading: context.getStore(OrderDetailsStore).isLoading()
    };
});

/**
 * Exports
 */
export default AccountOrderDetailsPage;