/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../../stores/Application/IntlStore';

import fetchContents from '../../../../actions/Contents/fetchContents';

// Required Components
import Heading from '../../../common/typography/Heading';

import AdminHomepageSettings from './AdminHomepageSettings';
import AdminMainNavigation from './AdminMainNavigation';

// Translation data for this component
import intlData from './AdminDashboard.intl';

/**
 * Component
 */
class AdminDashboard extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Required Data ***//

    static fetchData = function (context, params, query, done) {
        context.executeAction(fetchContents, {type: 'banner', tags: 'homepage'}, done);
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminDashboard.scss');
    }

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="admin-dashboard">
                <div className="admin-dashboard__header">
                    <div className="admin-dashboard__title">
                        <Heading size="medium">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'title')}
                                locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    <div className="admin-dashboard__toolbar"></div>
                </div>

                <div className="admin-dashboard__settings-block">
                    <div className="admin-dashboard__settings-title">
                        <Heading size="medium">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'mainNavigationSettingsTitle')}
                                locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    <AdminMainNavigation />
                </div>

                <div className="admin-dashboard__settings-block">
                    <div className="admin-dashboard__settings-title">
                        <Heading size="medium">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'homepageSettingsTitle')}
                                locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    <AdminHomepageSettings />
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default AdminDashboard;
