/**
 * Imports
 */
import React from 'react';

// Required components
import Text from '../typography/Text';

/**
 * Component
 */
class FormLabel extends React.Component {

    //*** Template ***//

    render() {

        let size = 'medium'; // Default label size
        if (['small', 'large'].indexOf(this.props.size) !== -1) {
            size = this.props.size;
        }

        let weight = 'bold'; // Default label weight
        if (this.props.weight === 'normal') {
            weight = this.props.weight;
        }

        return (
            <label className="form-label" htmlFor={this.props.for}>
                <Text size={size} weight={weight}>{this.props.children}</Text>
            </label>
        );
    }
}

/**
 * Exports
 */
export default FormLabel;
