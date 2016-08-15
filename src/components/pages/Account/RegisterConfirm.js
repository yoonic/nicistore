/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

// Flux
import AccountStore from '../../../stores/Account/AccountStore';
import IntlStore from '../../../stores/Application/IntlStore';
import RegisterStore from '../../../stores/Account/RegisterStore';

import confirmAccount from '../../../actions/Account/confirmAccount';

// Required components
import Spinner from '../../common/indicators/Spinner';
import Text from '../../common/typography/Text';

// Translation data for this component
import intlData from './RegisterConfirm.intl';

/**
 * Component
 */
class RegisterConfirm extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired,
        router: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        loading: undefined,
        error: undefined,
        user: this.context.getStore(AccountStore).getAccountDetails(),
        userLoading: this.context.getStore(AccountStore).isLoading(),
        userError: this.context.getStore(AccountStore).getError(),
        errorMessage: undefined
    };
    
    //*** Component Lifecycle ***//
    
    componentDidMount() {
        
        // Component styles
        require('./RegisterConfirm.scss');

        // a) User is logged in
        if (this.state.user) {
            this.setState({errorMessage: this.context.getStore(IntlStore).getMessage(intlData, 'logoutFirst')});
        }
        // b) Trigger account confirmation using provided token
        else {
            this.context.executeAction(confirmAccount, {token: this.props.params.token});
        }
    }

    componentWillReceiveProps(nextProps) {

        // Check for confirmation error
        if (this.state.loading && !nextProps._loading && nextProps._error) {
            this.setState({errorMessage: nextProps._error.message});
        }

        // Check for successful login
        if (!this.state.user && nextProps._user) {
            this.context.router.transitionTo('account', {locale: this.context.getStore(IntlStore).getCurrentLocale()});
        }

        // Update state
        this.setState({
            loading: nextProps._loading,
            error: nextProps._error,
            user: nextProps._user,
            userLoading: nextProps._userLoading,
            userError: nextProps._userError
        });
    }

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="register-confirm">
                <div className="register-confirm__message">
                    {this.state.errorMessage ?
                        <div className="register-confirm__error-message">
                            <Text size="small">{this.state.errorMessage}</Text>
                        </div>
                        :
                        <div>
                            {this.state.userLoading ?
                                <Text>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'loggingIn')}
                                        locales={intlStore.getCurrentLocale()} />...
                                </Text>
                                :
                                <Text>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'confirmingAccount')}
                                        locales={intlStore.getCurrentLocale()} />...
                                </Text>
                            }
                        </div>
                    }
                </div>
                {this.state.loading || this.state.userLoading ?
                    <div className="register-confirm__loader">
                        <Spinner />
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
RegisterConfirm = connectToStores(RegisterConfirm, [AccountStore, RegisterStore], (context) => {
    return {
        _loading: context.getStore(RegisterStore).isLoading(),
        _error: context.getStore(RegisterStore).getError(),
        _user: context.getStore(AccountStore).getAccountDetails(),
        _userLoading: context.getStore(AccountStore).isLoading(),
        _userError: context.getStore(AccountStore).getError()
    };
});

/**
 * Exports
 */
export default RegisterConfirm;
