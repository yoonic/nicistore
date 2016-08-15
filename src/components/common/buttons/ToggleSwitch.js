/**
 * Imports
 */
import React from 'react';

// Flux
import ApplicationStore from '../../../stores/Application/ApplicationStore';

// Required components
import FormLabel from '../forms/FormLabel';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class ToggleSwitch extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ToggleSwitch.scss');
    }

    //*** Template ***//

    render() {

        let id = `toggle-switch-${this.context.getStore(ApplicationStore).uniqueId()}`;

        let toggleClass = 'toggle-switch';
        if (['small', 'large'].indexOf(this.props.size) !== -1) {
            toggleClass += ` toggle-switch-${this.props.size}`;
        } else {
            toggleClass += ' toggle-switch-medium';
        }
        if (this.props.inline) {
            toggleClass += ' toggle-switch--inline';
        }

        let inputClass = 'cmn-toggle';
        if (this.props.type === 'flat') {
            inputClass += ' cmn-toggle-round-flat';
        } else {
            inputClass += ' cmn-toggle-round';
        }

        let labelClass = 'toggle-switch__label';
        if (this.props.inline) {
            labelClass += ' toggle-switch__label--inline';
        }

        return (
            <div className={toggleClass}>
                {this.props.label ?
                    <div className={labelClass}>
                        <FormLabel for={id}>{this.props.label}</FormLabel>
                    </div>
                    :
                    null
                }
                <input id={id} className={inputClass} type="checkbox"
                       checked={this.props.enabled} onChange={this.props.onChange} />
                <label htmlFor={id} />
            </div>
        );
    }
}

/**
 * Default Props
 */
ToggleSwitch.defaultProps = {
    onChange: function () { debug('onChange not defined'); }
};

/**
 * Exports
 */
export default ToggleSwitch;
