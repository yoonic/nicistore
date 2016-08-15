/**
 * Imports
 */
import React from 'react';

// Required components
import Button from '../buttons/Button';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class ImageUpload extends React.Component {

    //*** Initial State ***//

    state = {
        file: undefined,
        image: undefined
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ImageUpload.scss');

        // Load static content
        this.setState({
            image: require('./image_placeholder.png')
        });
    }

    //*** View Controllers ***//

    handlePlaceholderClick = () => {
        this.refs.input.getDOMNode().click();
    };

    handleFileChange = (evt) => {
        let file = evt.target.files[0];
        let fileType = /image.*/; // Image files
        if (file.type.match(fileType)) {
            var reader = new FileReader();
            reader.onload = (e) => {
                let img = new Image();
                img.src = reader.result;
                this.setState({image: img.src});
            };
            reader.readAsDataURL(file);
            this.setState({file: file});
        }
    };

    handleSubmitClick = () => {
        this.props.onSubmit(this.state.file);
    };

    //*** Template ***//

    render() {
        return (
            <div className="image-upload">
                <input ref="input" type="file" className="image-upload__input" onChange={this.handleFileChange} />
                <div className="image-upload__placeholder" onClick={this.handlePlaceholderClick}>
                    <img src={this.state.image} />
                </div>
                <div className="image-upload__actions">
                    <Button type="primary" disabled={this.props.disabled === true || !this.state.file} onClick={this.handleSubmitClick}>
                        Upload
                    </Button>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
ImageUpload.defaultProps = {
    onSubmit: function (file) { debug('onSubmit not defined.', file); }
};

/**
 * Exports
 */
export default ImageUpload;
