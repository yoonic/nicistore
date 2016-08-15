/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Label from '../indicators/Label';
import StatusIndicator from '../indicators/StatusIndicator';

// Translation data for this component
import intlData from './OrderStatus.intl';

/**
 * Component
 */
class OrderStatus extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Template ***//

    render() {
        
        //
        // Component configurable props
        //

        let labelSize = 'small';
        if (['medium', 'large'].indexOf(this.props.labelSize) != -1) {
            labelSize = this.props.labelSize;
        }

        let labelType = 'default';
        let labelWeight = 'normal';
        switch (this.props.status) {
            case 'created':
                labelType = 'dark';
                break;
            case 'pendingPayment':
                labelType = 'warning';
                break;
            case 'paymentError':
                labelType = 'error';
                break;
            case 'paid':
                labelType = 'success';
                break;
            case 'processing':
                labelType = 'primary';
                break;
            case 'ready':
                labelType = 'info';
                break;
            case 'shipped':
                labelWeight = 'bold';
                break;
            default:
                break;
        }
        
        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);
        
        //
        // Return
        //
        return (
            <div className="order-status">
                {this.props.label !== false ?
                    <Label type={labelType} size={labelSize} weight={labelWeight}>
                        <FormattedMessage message={intlStore.getMessage(intlData, this.props.status)}
                                          locales={intlStore.getCurrentLocale()} />
                    </Label>
                    :
                    <StatusIndicator status={labelType} />
                }
            </div>
        );
    }
}

/**
 * Exports
 */
export default OrderStatus;
