/**
 * Imports
 */
import React from 'react';

/**
 * Component
 */
class Spinner extends React.Component {

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Spinner.scss');
    }

    //*** Template ***//

    render() {
        
        let spinner = () => {
            if (this.props.type === 'doubleBounce') {
                return (
                    <div className="spinner__double-bounce">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                );
            } else {
                return (
                    <div className="spinner__fading-circle">
                        <div className="sk-circle1 sk-circle"></div>
                        <div className="sk-circle2 sk-circle"></div>
                        <div className="sk-circle3 sk-circle"></div>
                        <div className="sk-circle4 sk-circle"></div>
                        <div className="sk-circle5 sk-circle"></div>
                        <div className="sk-circle6 sk-circle"></div>
                        <div className="sk-circle7 sk-circle"></div>
                        <div className="sk-circle8 sk-circle"></div>
                        <div className="sk-circle9 sk-circle"></div>
                        <div className="sk-circle10 sk-circle"></div>
                        <div className="sk-circle11 sk-circle"></div>
                        <div className="sk-circle12 sk-circle"></div>
                    </div>
                );
            }
        };

        return (
            <div className="spinner">{spinner()}</div>
        );
    }
}

/**
 * Exports
 */
export default Spinner;
