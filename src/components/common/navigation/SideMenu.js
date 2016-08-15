/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import AccountStore from '../../../stores/Account/AccountStore';
import IntlStore from '../../../stores/Application/IntlStore';

import triggerDrawer from '../../../actions/Application/triggerDrawer';

// Required Components
import Text from '../typography/Text';

// Translation data for this component
import intlData from './SideMenu.intl';

/**
 * Component
 */
class SideMenu extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        user: this.context.getStore(AccountStore).getAccountDetails()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./SideMenu.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({user: nextProps._user});
    }

    //*** View Controllers ***//

    handleItemClick = () => {
        this.context.executeAction(triggerDrawer, null); // Close drawer
    };

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: intlStore.getCurrentLocale()};
        return (
            <div className="side-menu">
                <nav>
                    <ul className="side-menu__homepage">
                        <li className="side-menu__item side-menu__collection-item" onClick={this.handleItemClick}>
                            <Link to='homepage' params={routeParams}>
                                <Text size="small">
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'homepage')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Text>
                            </Link>
                        </li>
                    </ul>
                    <ul className="side-menu__collections">
                        {this.props.collections && this.props.collections.map((obj, idx) => {
                            return (
                                <li key={idx} className="side-menu__item side-menu__collection-item" onClick={this.handleItemClick}>
                                    <Link to={obj.to} params={Object.assign(obj.params || {}, routeParams)}>
                                        <Text size="medium">{obj.name}</Text>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    {this.state.user ?
                        <ul className="side-menu__account">
                            <li className="side-menu__item side-menu__account-item" onClick={this.handleItemClick}>
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
                            </li>
                            <li className="side-menu__item side-menu__account-item" onClick={this.handleItemClick}>
                                <Link to='logout' params={routeParams}>
                                    <Text size="small" weight="bold">
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'logout')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Text>
                                </Link>
                            </li>
                        </ul>
                        :
                        <ul className="side-menu__account">
                            <li className="side-menu__item side-menu__account-item" onClick={this.handleItemClick}>
                                <Link to='login' params={routeParams}>
                                    <Text size="small" weight="bold">
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'login')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Text>
                                </Link>
                            </li>
                            <li className="side-menu__item side-menu__account-item" onClick={this.handleItemClick}>
                                <Link to='register' params={routeParams}>
                                    <Text size="small" weight="bold">
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'register')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Text>
                                </Link>
                            </li>
                        </ul>
                    }
                </nav>
            </div>
        );
    }
}

/**
 * Flux
 */
SideMenu = connectToStores(SideMenu, [AccountStore], (context) => {
    return {
        _user: context.getStore(AccountStore).getAccountDetails()
    };
});

/**
 * Exports
 */
export default SideMenu;
