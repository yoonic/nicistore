/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {RouteHandler} from 'react-router';

import {slugify} from '../../../utils/strings';

// Flux
import AccountStore from '../../../stores/Account/AccountStore';
import ApplicationStore from '../../../stores/Application/ApplicationStore';
import CollectionsStore from '../../../stores/Collections/CollectionsStore';
import DrawerStore from '../../../stores/Application/DrawerStore';
import IntlStore from '../../../stores/Application/IntlStore';
import NotificationQueueStore from '../../../stores/Application/NotificationQueueStore';
import PageLoadingStore from '../../../stores/Application/PageLoadingStore';

import popNotification from '../../../actions/Application/popNotification';
import triggerDrawer from '../../../actions/Application/triggerDrawer';

// Required components
import Drawer from '../../common/layout/Drawer/Drawer';
import Footer from '../../common/layout/Footer';
import Header from '../../common/layout/Header';
import Heading from '../../common/typography/Heading';
import OverlayLoader from '../../common/indicators/OverlayLoader';
import SideCart from '../../common/cart/SideCart';
import SideMenu from '../../common/navigation/SideMenu';

import PopTopNotification from '../../common/notifications/PopTopNotification';

/**
 * Component
 */
class Application extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired,
        router: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        navCollections: this.context.getStore(CollectionsStore).getMainNavigationCollections(),
        collectionsTree: this.context.getStore(CollectionsStore).getCollectionsTree(),
        notification: this.context.getStore(NotificationQueueStore).pop(),
        openedDrawer: this.context.getStore(DrawerStore).getOpenedDrawer(),
        pageLoading: this.context.getStore(PageLoadingStore).isLoading()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Load styles
        require('./Application.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            navCollections: nextProps._navCollections,
            collectionsTree: nextProps._collectionsTree,
            notification: nextProps._notification,
            openedDrawer: nextProps._openedDrawer,
            pageLoading: nextProps._pageLoading
        });
    }

    //*** View Controllers ***//

    handleNotificationDismissClick = () => {
        this.context.executeAction(popNotification);
    };

    handleOverlayClick = () => {
        this.context.executeAction(triggerDrawer, null);
    };

    //*** Template ***//

    render() {
        
        let intlStore = this.context.getStore(IntlStore);

        // Main navigation menu items
        let collections = this.state.navCollections.map(function (collection) {
            return {
                name: intlStore.getMessage(collection.name),
                to: 'collection-slug',
                params: {
                    collectionId: collection.id,
                    collectionSlug: slugify(intlStore.getMessage(collection.name))
                }
            };
        });

        // Compute CSS classes for the overlay
        let overlayClass = 'application__overlay';
        if (this.state.openedDrawer === 'menu') {
            overlayClass += ' application__overlay--left-drawer-open';
        } else if (this.state.openedDrawer === 'cart') {
            overlayClass += ' application__overlay--right-drawer-open';
        }

        // Compute CSS classes for the content
        let contentClass = 'application__container';
        if (this.state.openedDrawer === 'menu') {
            contentClass += ' application__container--left-drawer-open';
        } else if (this.state.openedDrawer === 'cart') {
            contentClass += ' application__container--right-drawer-open';
        }

        // Check if user logged-in is an Admin
        let isAdmin = this.context.getStore(AccountStore).isAuthorized(['admin']);

        // Return
        return (
            <div className="application">
                {this.state.pageLoading ?
                    <OverlayLoader />
                    :
                    null
                }

                {this.state.notification ?
                    <PopTopNotification key={this.context.getStore(ApplicationStore).uniqueId()}
                                        type={this.state.notification.type}
                                        onDismissClick={this.handleNotificationDismissClick}>
                        {this.state.notification.message}
                    </PopTopNotification>
                    :
                    null
                }
                <Drawer position="left" open={this.state.openedDrawer === 'menu'}>
                    <SideMenu collections={collections} />
                </Drawer>
                <Drawer position="right" open={this.state.openedDrawer === 'cart'}>
                    <SideCart />
                </Drawer>
                <div className={overlayClass} onClick={this.handleOverlayClick}>
                    <div className="application__overlay-content"></div>
                </div>
                <div className={contentClass}>
                    {isAdmin ?
                        <div className="application__admin-warning">
                            <Heading>*** ADMIN ACCOUNT ***</Heading>
                        </div>
                        :
                        null
                    }
                    <Header collections={collections} collectionsTree={this.state.collectionsTree} />
                    <div className="application__container-wrapper">
                        <div className="application__container-content">
                            <RouteHandler />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
Application = connectToStores(Application, [
    AccountStore,
    CollectionsStore,
    DrawerStore,
    NotificationQueueStore,
    PageLoadingStore
], (context) => {
    return {
        _navCollections: context.getStore(CollectionsStore).getMainNavigationCollections(),
        _collectionsTree: context.getStore(CollectionsStore).getCollectionsTree(),
        _notification: context.getStore(NotificationQueueStore).pop(),
        _openedDrawer: context.getStore(DrawerStore).getOpenedDrawer(),
        _pageLoading: context.getStore(PageLoadingStore).isLoading()
    };
});

/**
 * Exports
 */
export default Application;
