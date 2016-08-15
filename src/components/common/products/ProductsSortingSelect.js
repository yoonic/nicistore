/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Select from '../forms/Select';
import Text from '../typography/Text';

// Translation data for this component
import intlData from './ProductsSortingSelect.intl';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class ProductsSortingSelect extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductsSortingSelect.scss');
    }

    //*** Template ***//
    
    render() {

        let intlStore = this.context.getStore(IntlStore);

        // Sorting Options
        var sortOptions = [
            /*{
             name: <FormattedMessage
             message={intlStore.getMessage(intlData, 'sortFeatured')}
             locales={intlStore.getCurrentLocale()} />,
             value: 'featured'
             },
             {
             name: <FormattedMessage
             message={intlStore.getMessage(intlData, 'sortBestSelling')}
             locales={intlStore.getCurrentLocale()} />,
             value: 'best-selling'
             },*/
            {
                name: <FormattedMessage
                    message={intlStore.getMessage(intlData, 'sortAlphabetically')}
                    locales={intlStore.getCurrentLocale()} />,
                value: 'alphabetically'
            },
            {
                name: <FormattedMessage
                    message={intlStore.getMessage(intlData, 'sortAlphabeticallyReverse')}
                    locales={intlStore.getCurrentLocale()} />,
                value: '-alphabetically'
            },
            {
                name: <FormattedMessage
                    message={intlStore.getMessage(intlData, 'sortPrice')}
                    locales={intlStore.getCurrentLocale()} />,
                value: 'price'
            },
            {
                name: <FormattedMessage
                    message={intlStore.getMessage(intlData, 'sortPriceReverse')}
                    locales={intlStore.getCurrentLocale()} />,
                value: '-price'
            },
            {
                name: <FormattedMessage
                    message={intlStore.getMessage(intlData, 'sortRecent')}
                    locales={intlStore.getCurrentLocale()} />,
                value: '-date'
            },
            {
                name: <FormattedMessage
                    message={intlStore.getMessage(intlData, 'sortOldest')}
                    locales={intlStore.getCurrentLocale()} />,
                value: 'date'
            }
        ];
        
        return (
            <div className="products-sorting-select">
                <div className="products-sorting-select__label">
                    <Text size="small" weight="bold">
                        <FormattedMessage message={intlStore.getMessage(intlData, 'sortLabel')}
                                          locales={intlStore.getCurrentLocale()} />
                    </Text>
                </div>
                <div className="products-sorting-select__options">
                    <Select size="small"
                            options={sortOptions}
                            placeholder
                            onChange={this.props.onChange} />
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
Select.defaultProps = {
    onChange: function (value) { debug(`onChange not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default ProductsSortingSelect;