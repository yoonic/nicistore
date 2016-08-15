/**
 * Imports
 */
import React from 'react';

// Flux
import ApplicationStore from '../../../stores/Application/ApplicationStore';

// Required components
import FormLabel from '../forms/FormLabel';
import Text from '../typography/Text';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class InputField extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./InputField.scss');
    }

    //*** View Controllers ***//

    handleChange = (evt) => {
        this.props.onChange(evt.target.value);
    };

    handleKeyDown = (evt) => {
        if (evt.keyCode == 13) {
            this.props.onEnterPress();
        }
    };

    //*** Template ***//

    render() {

        let id = `input-field-${this.context.getStore(ApplicationStore).uniqueId()}`;

        let inputClass = 'input-field__input';
        if (this.props.error) {
            inputClass += ' input-field__input--error';
        }

        let inputType = 'text';
        if (['password'].indexOf(this.props.type) !== -1) {
            inputType = this.props.type;
        }

        return (
            <div className="input-field">
                {this.props.label ?
                    <div className="input-field__label">
                        <FormLabel for={id} size={this.props.labelSize} weight={this.props.labelWeight}>
                            {this.props.label}
                        </FormLabel>
                    </div>
                    :
                    null
                }
                <div>
                    <input id={id}
                           className={inputClass}
                           type={inputType}
                           placeholder={this.props.placeholder}
                           onChange={this.handleChange}
                           onKeyDown={this.handleKeyDown}
                           value={this.props.value} />
                </div>
                {this.props.error ?
                    <div className="input-field__error">
                        <Text size="small">{this.props.error}</Text>
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
InputField.defaultProps = {
    onChange: function (value) { debug(`onChange not defined. Value: ${value}`); },
    onEnterPress: function () { debug('onEnterPress not defined'); }
};

/**
 * Exports
 */
export default InputField;
