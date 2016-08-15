/**
 * Imports
 */
import React from 'react';

// Flux
import ApplicationStore from '../../../stores/Application/ApplicationStore';

// Required components
import Text from '../typography/Text';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Components
 */
class Checkbox extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Checkbox.scss');
    }

    //*** Template ***//

    render() {
        let id = `checkbox-${this.context.getStore(ApplicationStore).uniqueId()}`;
        return (
            <div className="checkbox">
                <div className="checkbox__input">
                    <input id={id} type="checkbox"
                           checked={this.props.checked} onChange={this.props.onChange} />
                </div>
                {this.props.label ?
                    <div className="checkbox__label">
                        <label htmlFor={id}>
                            <Text size="small">{this.props.label}</Text>
                        </label>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

/**
 * Default Props
 */
Checkbox.defaultProps = {
    onChange: function () { debug('onChange not defined'); }
};

/**
 * Exports
 */
export default Checkbox;
