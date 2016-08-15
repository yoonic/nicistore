/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

// Flux
import FileUploadStore from '../../../stores/Files/FileUploadStore';
import IntlStore from '../../../stores/Application/IntlStore';

import uploadFile from '../../../actions/Admin/uploadFile';

// Required components
import FormLabel from '../../common/forms/FormLabel';
import ImageLibrary from '../../common/images/ImageLibrary';
import ImageUpload from '../../common/images/ImageUpload';

// Translation data for this component
import intlData from './ImageLibraryManager.intl';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class ImageLibraryManager extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        fileUpload: this.context.getStore(FileUploadStore).getState(),
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ImageLibraryManager.scss');
    }

    componentWillReceiveProps(nextProps) {

        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
                fieldErrors[field] = nextProps._error.validation.details[field];
            });
        }

        // Check if a file was uploaded
        if (this.state.fileUpload.loading && !nextProps._fileUpload.loading && !nextProps._fileUpload.error) {
            let images = this.props.images;
            images.push(nextProps._fileUpload.file);
            this.props.onChange(images);
        }

        this.setState({
            fileUpload: nextProps._fileUpload,
            fieldErrors: fieldErrors
        });
    }

    //*** View Controllers ***//

    handleImageSubmit = (file) => {
        this.context.executeAction(uploadFile, {
            resource: 'products',
            file: file
        });
    };

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="image-library-manager">
                <FormLabel>
                    <FormattedMessage message={intlStore.getMessage(intlData, 'gallery')}
                                      locales={intlStore.getCurrentLocale()} />
                </FormLabel>
                <div className="image-library-manager__gallery">
                    <div className="image-library-manager__upload">
                        <ImageUpload onSubmit={this.handleImageSubmit}
                                     disabled={this.state.fileUpload.loading} />
                    </div>
                    <div className="image-library-manager__images">
                        <ImageLibrary images={this.props.images}
                                      onChange={this.props.onChange} />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
ImageLibraryManager.defaultProps = {
    onChange: function (images) { debug('onChange not defined.', images); }
};

/**
 * Flux
 */
ImageLibraryManager = connectToStores(ImageLibraryManager, [FileUploadStore], (context) => {
    return {
        _fileUpload: context.getStore(FileUploadStore).getState()
    };
});

/**
 * Exports
 */
export default ImageLibraryManager;