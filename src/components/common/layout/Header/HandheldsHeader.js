/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {Link} from 'react-router';

// Flux
import CartStore from '../../../../stores/Cart/CartStore';
import DrawerStore from '../../../../stores/Application/DrawerStore';
import IntlStore from '../../../../stores/Application/IntlStore';
import triggerDrawer from '../../../../actions/Application/triggerDrawer';

// Required components
import Badge from '../../indicators/Badge';

/**
 * Component
 */
class HandheldsHeader extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        cartTotalItems: this.context.getStore(CartStore).getTotalItems(),
        openedDrawer: this.context.getStore(DrawerStore).getOpenedDrawer()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./HandheldsHeader.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cartTotalItems: nextProps._cartTotalItems,
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
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()};

        // Return
        return (
            <div className="handhelds-header">
                <div className="handhelds-header__left-actions">
                    {this.state.openedDrawer !== 'menu' ?
                        <div className="handhelds-header__menu-button" onClick={this.handleBtnClick.bind(null, 'menu')}></div>
                        :
                        <div className="handhelds-header__close-button" onClick={this.handleBtnClick.bind(null, 'menu')}></div>
                    }
                </div>
                <div className="handhelds-header__title">
                    <Link to='homepage' params={routeParams}>
                        <div className="handhelds-header__logo"></div>
                    </Link>
                </div>
                <div className="handhelds-header__right-actions">
                    {this.state.openedDrawer !== 'cart' ?
                        <Badge value={this.state.cartTotalItems > 0 ? this.state.cartTotalItems : null}>
                            <div className="handhelds-header__cart-button" onClick={this.handleBtnClick.bind(null, 'cart')}></div>
                        </Badge>
                        :
                        <div className="handhelds-header__close-button" onClick={this.handleBtnClick.bind(null, 'cart')}></div>
                    }
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
HandheldsHeader = connectToStores(HandheldsHeader, [CartStore, DrawerStore], (context) => {
    return {
        _cartTotalItems: context.getStore(CartStore).getTotalItems(),
        _openedDrawer: context.getStore(DrawerStore).getOpenedDrawer()
    };
});

/**
 * Exports
 */
export default HandheldsHeader;
