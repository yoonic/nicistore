/**
 * Imports
 */
import React from 'react';

/**
 * Component
 */
class StatusIndicator extends React.Component {

    //*** Component lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./StatusIndicator.scss');
    }

    //*** Template ***//

    render() {
        let statusClass = 'status-indicator';
        if (['primary', 'info', 'success', 'warning', 'error', 'dark'].indexOf(this.props.status) !== -1) {
            statusClass += ` status-indicator-${this.props.status}`;
        } else {
            statusClass += ' status-indicator-default';
        }
        return (
            <div className={statusClass}></div>
        );
    }
}

/**
 * Exports
 */
export default StatusIndicator;
