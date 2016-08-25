/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import AccountStore from '../../../../stores/Account/AccountStore';
import CartStore from '../../../../stores/Cart/CartStore';
import DrawerStore from '../../../../stores/Application/DrawerStore';
import IntlStore from '../../../../stores/Application/IntlStore';
import triggerDrawer from '../../../../actions/Application/triggerDrawer';

// Required components
import Badge from '../../indicators/Badge';
import CollectionTreeMenu from '../../navigation/CollectionTreeMenu';
import MainNavigation from '../../navigation/MainNavigation';
import Text from '../../typography/Text';

// Translation data for this component
import intlData from './DesktopHeader.intl';

/**
 * Component
 */
class DesktopHeader extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired,
        router: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        cartTotalItems: this.context.getStore(CartStore).getTotalItems(),
        user: this.context.getStore(AccountStore).getAccountDetails(),
        openedDrawer: this.context.getStore(DrawerStore).getOpenedDrawer(),
        collectionsTreeMenuEnabled: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./DesktopHeader.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cartTotalItems: nextProps._cartTotalItems,
            user: nextProps._user,
            openedDrawer: nextProps._openedDrawer
        });
    }

    //*** View Controllers ***//

    handleBtnClick = (drawer) => {
        this.context.executeAction(triggerDrawer, drawer);
    };

    //*** Template ***//

    render() {

        // Helper variables
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()};

        // Return
        return (
            <div className="desktop-header">
                <div className="desktop-header__container">
                    <div className="desktop-header__row">
                        <div className="desktop-header__container-left-column">
                            <Link className="desktop-header__logo-link" to='homepage' params={routeParams}>
                                <div className="desktop-header__logo"></div>
                            </Link>
                            <div className="desktop-header__navigation">
                                <MainNavigation links={this.props.collections} />
                            </div>
                        </div>
                        <div className="desktop-header__container-right-column">
                            {this.state.user ?
                                <div className="desktop-header__account">
                                    <div className="desktop-header__logout-button">
                                        <Link to='logout' params={routeParams}>
                                            <Text size="small">
                                                <FormattedMessage
                                                    message={intlStore.getMessage(intlData, 'logout')}
                                                    locales={intlStore.getCurrentLocale()} />
                                            </Text>
                                        </Link>
                                    </div>
                                    <div className="desktop-header__account-button">
                                        <Link to='account' params={routeParams}>
                                            <div>
                                                <Text size="small">
                                                    <FormattedMessage
                                                        message={intlStore.getMessage(intlData, 'hi')}
                                                        locales={intlStore.getCurrentLocale()} />, {this.state.user.name.split(' ')[0]}
                                                </Text>
                                            </div>
                                            <div>
                                                <Text size="small" weight="bold">
                                                    <FormattedMessage
                                                        message={intlStore.getMessage(intlData, 'myAccount')}
                                                        locales={intlStore.getCurrentLocale()} />
                                                </Text>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                :
                                <div className="desktop-header__account">
                                    <div className="desktop-header__register-button">
                                        <Link to='register' params={routeParams}>
                                            <Text size="medium">
                                                <FormattedMessage
                                                    message={intlStore.getMessage(intlData, 'register')}
                                                    locales={intlStore.getCurrentLocale()} />
                                            </Text>
                                        </Link>
                                    </div>
                                    <div className="desktop-header__login-button">
                                        <Link to='login' params={routeParams}>
                                            <Text size="medium">
                                                <FormattedMessage
                                                    message={intlStore.getMessage(intlData, 'login')}
                                                    locales={intlStore.getCurrentLocale()} />
                                            </Text>
                                        </Link>
                                    </div>
                                </div>
                            }
                            <div className="desktop-header__cart" onClick={this.handleBtnClick.bind(null, 'cart')}>
                                <Badge value={this.state.cartTotalItems > 0 ? this.state.cartTotalItems : null} />
                            </div>
                        </div>
                    </div>
                    {this.state.collectionsTreeMenuEnabled && this.props.collectionsTree ?
                        <div className="desktop-header__row">
                            <CollectionTreeMenu collections={this.props.collectionsTree} />
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
DesktopHeader = connectToStores(DesktopHeader, [AccountStore, CartStore, DrawerStore], (context) => {
    return {
        _cartTotalItems: context.getStore(CartStore).getTotalItems(),
        _user: context.getStore(AccountStore).getAccountDetails(),
        _openedDrawer: context.getStore(DrawerStore).getOpenedDrawer()
    };
});

/**
 * Exports
 */
export default DesktopHeader;
