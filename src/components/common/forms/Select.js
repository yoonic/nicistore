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
class Select extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        value: this.props.value || ''
    };

    //*** Componet Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Select.scss');
    }

    //*** View Controllers ***//

    handleSelectChange = (evt) => {
        let value = evt.target.value;
        this.setState({value: value});
        this.props.onChange(value);
    };

    //*** Template ***//

    render() {

        //
        // Helper methods and variables
        //
        let id = `select-${this.context.getStore(ApplicationStore).uniqueId()}`;
        let options = this.props.options || [];

        let componentClass = 'select';
        if (this.props.className) {
            componentClass += ` ${this.props.className}`;
        }

        let selectClass = 'select__select';
        if (this.props.error) {
            selectClass += ' select__select--error';
        }

        // Size
        if (['small', 'large'].indexOf(this.props.size) != -1) {
            selectClass += ` select__select--${this.props.size}`;
        } else {
            selectClass += ' select__select--medium';
        }

        //
        // Return
        //
        return (
            <div className={componentClass}>
                {this.props.label ?
                    <div className="select__label">
                        <FormLabel for={id} weight={this.props.labelWeight} size={this.props.labelSize}>
                            {this.props.label}
                        </FormLabel>
                    </div>
                    :
                    null
                }
                <select key={id}
                        id={id}
                        className={selectClass}
                        value={this.state.value}
                        onChange={this.handleSelectChange}>
                    {this.props.placeholder ?
                        <option value="" disabled>{this.props.placeholder}</option>
                        :
                        null
                    }
                    {options.map((opt, idx) => {
                        return (
                            <option key={idx} value={opt.value}>
                                {opt.name}
                            </option>
                        );
                    })}
                </select>
                {this.props.error ?
                    <div className="select__error">
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
Select.defaultProps = {
    onChange: function (value) { debug(`onChange not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default Select;
