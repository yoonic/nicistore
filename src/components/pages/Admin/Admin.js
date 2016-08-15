/**
 * Imports
 */
import React from 'react';
import {RouteHandler} from 'react-router';

import config from '../../../config';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';
import fetchAllCollections from '../../../actions/Collections/fetchAllCollections';

// Required components
import AuthenticatedComponent from '../../core/AuthenticatedComponent';
import Heading from '../../common/typography/Heading';
import MainNavigation from '../../common/navigation/MainNavigation';

// Translation data for this component
import intlData from './Admin.intl';

/**
 * Component
 */
class Admin extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context) {
        return {
            title: `[ADMIN] ${config.app.title}`
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Load styles
        require('./Admin.scss');

        // Request Collections refresh because, if we're here, then we want
        // to see all the collections in Product page (for example) and not only
        // the ones enabled which are the ones with which the app is loaded on the
        // server-side
        this.context.executeAction(fetchAllCollections);
    }

    //*** Template ***//

    render() {

        let intlStore = this.context.getStore(IntlStore);

        // Links
        const links = [
            {name: intlStore.getMessage(intlData, 'dashboard'), to: 'adm-dashboard'},
            {name: intlStore.getMessage(intlData, 'orders'), to: 'adm-orders'},
            {name: intlStore.getMessage(intlData, 'customers'), to: 'adm-customers'},
            {name: intlStore.getMessage(intlData, 'collections'), to: 'adm-collections'},
            {name: intlStore.getMessage(intlData, 'products'), to: 'adm-products'},
            {name: intlStore.getMessage(intlData, 'contents'), to: 'adm-contents'}
        ];

        // Return
        return (
            <div className="admin">
                <div className="admin-header">
                    <div className="admin-title">
                        <Heading size="large">Admin</Heading>
                    </div>
                    <div className="admin-nav">
                        <MainNavigation links={links} />
                    </div>
                </div>
                <div className="admin-container">
                    <RouteHandler />
                </div>
            </div>
        );
    }
}

/**
 * This component requires Authentication
 */
const AdminWrapper = AuthenticatedComponent(Admin, ['admin']);

/**
 * Exports
 */
export default AdminWrapper;
