/**
 * Imports
 */
import React from 'react';

// Required components
import Spinner from './Spinner';

/**
 * Component
 */
class OverlayLoader extends React.Component {
    
    //*** Component Lifecycle ***//
    
    componentDidMount() {
        
        // Component styles
        require('./OverlayLoader.scss');
    }
    
    //*** Template ***//

    render() {
        return (
            <div className="overlay-loader">
                <div className="overlay-loader__container">
                    <div className="overlay-loader__content">
                        <Spinner />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default OverlayLoader;