/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';

// Flux
import ResponsiveStore from '../../stores/Application/ResponsiveStore';

/**
 * Component
 */
class Breakpoint extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State & Defaults ***//

    state = {
        breakpoint: this.context.getStore(ResponsiveStore).getBreakPoint()
    };

    //*** Component Lifecycle ***//

    componentWillReceiveProps(nextProps) {
        this.setState({breakpoint: nextProps._breakpoint});
    }

    //*** Template ***//

    render() {
        if (this.state.breakpoint === this.props.point) {
            return <div>{this.props.children}</div>;
        } else {
            return null;
        }
    }
}

/**
 * Flux
 */
Breakpoint = connectToStores(Breakpoint, [ResponsiveStore], (context) => {
    return {
        _breakpoint: context.getStore(ResponsiveStore).getBreakPoint()
    };
});

/**
 * Export
 */
export default Breakpoint;
