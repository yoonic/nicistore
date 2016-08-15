/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Checkbox from '../forms/Checkbox';
import FormLabel from '../forms/FormLabel';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class CollectionPicker extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };
    
    //*** Component Lifecycle ***//
    
    componentDidMount() {
        
        // Component styles
        require('./CollectionPicker.scss');
    }

    //*** View Controllers ***//

    handleCollectionChange = (collectionId) => {
        if (!this.props.checked) {
            this.props.onChange([collectionId]);
        } else if (this.props.checked.indexOf(collectionId) === -1) {
            let result = this.props.checked;
            result.push(collectionId);
            this.props.onChange(result);
        } else {
            let checked = this.props.checked;
            checked.splice(checked.indexOf(collectionId), 1);
            this.props.onChange(checked);
        }
    };

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="collection-picker">
                {this.props.children ?
                    <FormLabel>{this.props.children}</FormLabel>
                    :
                    null
                }
                {this.props.collections.map((collection, idx) => {
                    let name = <FormattedMessage message={intlStore.getMessage(collection.name)}
                                                 locales={intlStore.getCurrentLocale()} />;
                    let checkboxClass = 'collection-picker__checkbox';
                    if (collection.enabled !== true) {
                        checkboxClass += ' collection-picker__checkbox--disabled';
                    }
                    return (
                        <div key={idx} className={checkboxClass}>
                            <Checkbox label={name}
                                      onChange={this.handleCollectionChange.bind(null, collection.id)}
                                      checked={this.props.checked.indexOf(collection.id) !== -1} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

/**
 * Default Props
 */
CollectionPicker.defaultProps = {
    onChange: function () { debug('onChange not defined'); }
};

/**
 * Exports
 */
export default CollectionPicker;
