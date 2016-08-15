/**
 * Imports
 */
import React from 'react';

/**
 * Component
 */
class Text extends React.Component {

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Text.scss');
    }

    //*** Template ***//

    render() {

        //
        // Process CSS classes according to settings
        //
        let textClass = 'text';

        // Size
        if (['small', 'medium', 'large'].indexOf(this.props.size) != -1) {
            textClass += ` text-${this.props.size}`;
        } else {
            textClass += ' text-medium';
        }

        // Transform
        if (['lowercase', 'uppercase', 'capitalize'].indexOf(this.props.transform) != -1) {
            textClass += ` text-${this.props.transform}`;
        }

        // Weight
        if (['normal', 'bold'].indexOf(this.props.weight) != -1) {
            textClass += ` text-${this.props.weight}`;
        } else {
            textClass += ' text-normal';
        }

        // Specified class name
        if (this.props.className) {
            textClass += ` ${this.props.className}`;
        }

        //
        // Return
        //
        return (
            <span className={textClass}>
                {this.props.children}
            </span>
        );
    }
}

/**
 * Exports
 */
export default Text;
