/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../buttons/Button';
import Text from '../typography/Text';

// Translation data for this component
import intlData from './AddressPreview.intl';

/**
 * Component
 */
class AddressPreview extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AddressPreview.scss');
    }

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="address-preview">
                <div className="address-preview__name">
                    <Text weight="bold">{this.props.address.name}</Text>
                </div>
                {this.props.address.phone ?
                    <div className="address-preview__phone">
                        <Text size="small">{this.props.address.phone}</Text>
                    </div>
                    :
                    null
                }
                {this.props.address.vatin ?
                    <div className="address-preview__vatin">
                        <Text>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'vatLabel')}
                                locales={intlStore.getCurrentLocale()} />: {this.props.address.vatin}
                        </Text>
                    </div>
                    :
                    null
                }
                <div className="address-preview__address-line-1">
                    <Text>{this.props.address.addressLine1}</Text>
                </div>
                {this.props.address.addressLine2 ?
                    <div className="address-preview__address-line-2">
                        <Text>{this.props.address.addressLine2}</Text>
                    </div>
                    :
                    null
                }
                <div className="address-preview__postal-code">
                    <Text>{this.props.address.postalCode}</Text>
                </div>
                <div className="address-preview__city">
                    <Text>{this.props.address.city}</Text>
                </div>
                {this.props.address.state ?
                    <div className="address-preview__state">
                        <Text>{this.props.address.state}</Text>
                    </div>
                    :
                    null
                }
                <div className="address-preview__country">
                    <Text>{this.props.address.country}</Text>
                </div>
                <div className="address-preview__actions">
                    {this.props.onEditClick ?
                        <div className="address-preview__edit" onClick={this.props.onEditClick}>
                            <Text weight="bold">
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'edit')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Text>
                        </div>
                        :
                        null
                    }
                    {this.props.onDeleteClick ?
                        <div className="address-preview__delete" onClick={this.props.onDeleteClick}>
                            <Text>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'delete')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Text>
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
 * Exports
 */
export default AddressPreview;
