/**
 * Imports
 */
import React from 'react';

/**
 * Component
 */
class Drawer extends React.Component {

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Drawer.scss');
    }

    //*** Template ***//

    render() {

        let drawerClass = 'drawer';

        if (this.props.position === 'left') {
            drawerClass += ' drawer-left';
        } else if (this.props.position === 'right') {
            drawerClass += ' drawer-right';
        }

        if (this.props.open && drawerClass.split(' ').length === 2) {
            drawerClass += ` ${drawerClass.split(' ')[1]}-open`;
        }

        return (
            <div className={drawerClass}>{this.props.children}</div>
        );
    }
}

/**
 * Exports
 */
export default Drawer;
