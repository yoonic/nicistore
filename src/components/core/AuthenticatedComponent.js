/**
 * Imports.
 */
import React from 'react';

// Flux.
import AccountStore from '../../stores/Account/AccountStore';
import IntlStore from '../../stores/Application/IntlStore';

// Required components
import Spinner from '../common/indicators/Spinner';

/**
 * Returns a function that wraps the component passed to it and only renders it
 * if there is an authenticated user. Otherwise, redirects to login page.
 * @param ComposedComponent
 * @returns {*}
 */
export default (ComposedComponent, scope) => {

    /**
     * Wrapper Component.
     */
    class AuthenticatedComponent extends React.Component {

        static contextTypes = {
            executeAction: React.PropTypes.func.isRequired,
            getStore: React.PropTypes.func.isRequired,
            router: React.PropTypes.func.isRequired
        };

        //*** Page Title and Snippets ***//

        static pageTitleAndSnippets = ComposedComponent.pageTitleAndSnippets;

        //*** Initial State & Defaults ***//

        state = {
            processed: false
        };

        //*** Component Lifecycle ***//

        componentDidMount() {

            // Component styles
            require('./AuthenticatedComponent.scss');

            let isLoading = this.context.getStore(AccountStore).isLoading();
            let accountDetails = this.context.getStore(AccountStore).getAccountDetails();
            let isAuthorized = scope ? this.context.getStore(AccountStore).isAuthorized(scope) : true;
            if (!isLoading && accountDetails && isAuthorized) {
                this.setState({processed: true});
            } else if (!isLoading) {
                this.context.router.transitionTo(
                    'login',
                    {locale: this.context.getStore(IntlStore).getCurrentLocale()},
                    {next: this.context.router.getCurrentPath()}
                );
            }
        }

        //*** Template ***//

        render() {
            return (
                <div className="authenticated-component">
                    {!this.state.processed ?
                        <div className="authenticated-component__spinner">
                            <Spinner />
                        </div>
                        :
                        <ComposedComponent {...this.props} />
                    }
                </div>
            );
        }
    }

    /**
     * Return Component.
     */
     return AuthenticatedComponent;
};
