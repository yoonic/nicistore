/**
 * Imports
 */
import React from 'react';
import {RouteHandler} from 'react-router';

// Required components
import AuthenticatedComponent from '../../core/AuthenticatedComponent';

/**
 * Component
 */
class AccountBase extends React.Component {

    //*** Template ***//

    render() {
        return (
            <div className="account-base">
                <RouteHandler />
            </div>
        );
    }
}

/**
 * This component requires Authentication
 */
const AccountWrapper = AuthenticatedComponent(AccountBase);

/**
 * Exports
 */
export default AccountWrapper;
