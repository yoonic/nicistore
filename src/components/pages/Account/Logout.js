/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

// Flux
import AccountStore from '../../../stores/Account/AccountStore';
import IntlStore from '../../../stores/Application/IntlStore';
import logout from '../../../actions/Account/logout';

// Required components
import Spinner from '../../common/indicators/Spinner';
import Text from '../../common/typography/Text';

// Translation data for this component
import intlData from './Logout.intl';

/**
 * Component
 */
class Logout extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired,
        router: React.PropTypes.func.isRequired
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context) {
        return {
            title: context.getStore(IntlStore).getMessage(intlData, 'header')
        }
    };

    //*** Initial State ***//

    state = {
        loading: this.context.getStore(AccountStore).isLoading(),
        error: this.context.getStore(AccountStore).getError(),
        accountDetails: this.context.getStore(AccountStore).getAccountDetails()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Logout.scss');

        if (!this.context.getStore(AccountStore).getAccountDetails()) {
            this.context.router.transitionTo('homepage', {locale: this.context.getStore(IntlStore).getCurrentLocale()});
        } else {
            this.context.executeAction(logout);
        }
    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps._accountDetails) {
            this.context.router.transitionTo('homepage', {locale: this.context.getStore(IntlStore).getCurrentLocale()});
        }

        this.setState({
            loading: nextProps._loading,
            error: nextProps._error,
            accountDetails: nextProps._accountDetails
        })
    }

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="logout">
                <div className="logout__container">
                    <div className="logout__header">
                        <Text size="medium">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'header')}
                                locales={intlStore.getCurrentLocale()} />
                        </Text>
                    </div>
                    <div className="logout__spinner">
                        <Spinner />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
Logout = connectToStores(Logout, [AccountStore], (context) => {
    return {
        _loading: context.getStore(AccountStore).isLoading(),
        _error: context.getStore(AccountStore).getError(),
        _accountDetails: context.getStore(AccountStore).getAccountDetails(),
    };
});

/**
 * Logout
 */
export default Logout;
