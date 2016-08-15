/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../typography/Heading';

/**
 * Component
 */
class Modal extends React.Component {

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Modal.scss');
    }

    //*** Template ***//

    render() {
        return (
            <div className="modal">
                <div className="modal__container">
                    <div className="modal__content">
                        <div className="modal__header">
                            <div className="modal__title">
                                <Heading size="medium">{this.props.title}</Heading>
                            </div>
                            <div className="modal__close">
                                {this.props.onCloseClick ?
                                    <a role="button" className="modal__close-button" onClick={this.props.onCloseClick}>&times;</a>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className="modal__body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default Modal;
