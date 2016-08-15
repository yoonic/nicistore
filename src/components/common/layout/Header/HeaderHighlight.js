/**
 * Imports
 */
import React from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';

// Flux
import IntlStore from '../../../../stores/Application/IntlStore';

// Required components
import Text from '../../typography/Text';

// Translation data for this component
import intlData from './HeaderHighlight.intl';

/**
 * Component
 */
class HeaderHighlight extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./HeaderHighlight.scss');
    }

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="header-highlight">
                <div className="header-highlight__shipping-icon">
                    <i className="fa fa-truck" aria-hidden="true" />
                </div>
                <div className="header-highlight__shipping-text">
                    <Text size="small" weight="bold">
                        <FormattedMessage message={intlStore.getMessage(intlData, 'freeShipping')}
                                          locales={intlStore.getCurrentLocale()} />
                        &nbsp;
                        <FormattedNumber value="19.90"
                                         style="currency"
                                         currency="EUR" />
                    </Text>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default HeaderHighlight;
