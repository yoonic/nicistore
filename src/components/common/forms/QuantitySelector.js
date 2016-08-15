/**
 * Imports
 */
import React from 'react';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class QuantitySelector extends React.Component {

    //*** Initial State ***//

    state = {
        value: this.props.value || 0
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./QuantitySelector.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value});
    }

    //*** View Controllers ***//

    handleMinusClick = () => {
        let value = this.state.value;
        if (value > 0) {
            value -= 1;
        }
        this.setState({value: value});
        this.props.onChange(value);
    };

    handlePlusClick = () => {
        let value = this.state.value;
        this.setState({value: ++value});
        this.props.onChange(value);
    };

    //*** Template ***//

    render() {
        return (
            <div className="quantity-selector">
                <div className="minus" onClick={this.handleMinusClick}>-</div>
                <div className="value">{this.props.value || this.state.value}</div>
                <div className="plus" onClick={this.handlePlusClick}>+</div>
            </div>
        );
    }
}

/**
 * Default Props
 */
QuantitySelector.defaultProps = {
    onChange: function (value) { debug(`onChange not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default QuantitySelector;
