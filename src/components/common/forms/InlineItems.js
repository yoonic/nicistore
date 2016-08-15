/**
 * Imports
 */
import React from 'react';

// Required components
import FormLabel from './FormLabel';

/**
 * Component
 */
class InlineItems extends React.Component {

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./InlineItems.scss');
    }

    //*** Template ***//

    render() {
        return (
            <div className="inline-items">
                <div className="inline-items__label">
                    <FormLabel>{this.props.label}</FormLabel>
                </div>
                <div className="inline-items__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default InlineItems;
