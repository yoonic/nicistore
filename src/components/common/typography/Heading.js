/**
 * Imports
 */
import React from 'react';

/**
 * Component
 */
class Heading extends React.Component {

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Heading.scss');
    }

    //*** Template ***//

    render() {

        //
        // Process CSS classes according to settings
        //
        let headingClass = 'heading';

        // Size
        if (['small', 'medium', 'large'].indexOf(this.props.size) !== -1) {
            headingClass += ` heading-${this.props.size}`;
        } else {
            headingClass += ' heading-medium';
        }

        // Alignment
        if (['left', 'center', 'right'].indexOf(this.props.align) !== -1) {
            headingClass += ` heading--align-${this.props.align}`;
        }

        //
        // Return element with tag according to size
        //
        let el = (children) => {
            if (this.props.size === 'large') {
                return <h1>{children}</h1>;
            } else if (this.props.size === 'small') {
                return <h3>{children}</h3>;
            } else {
                return <h2>{children}</h2>;
            }
        };

        //
        // Return
        //
        return (
            <div className={headingClass}>
                {el(this.props.children)}
            </div>
        );
    }
}

/**
 * Exports
 */
export default Heading;
