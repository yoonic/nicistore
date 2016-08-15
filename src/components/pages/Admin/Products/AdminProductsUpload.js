/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../../stores/Application/IntlStore';

// Required components
import Button from '../../../common/buttons/Button';
import Select from '../../../common/forms/Select';
import Text from '../../../common/typography/Text';

// Translation data for this component
import intlData from './AdminProductsUpload.intl';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class AdminProductsUpload extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        content: undefined,
        file: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminProductsUpload.scss');
    }

    //*** View Controllers ***//

    handleTypeChange = (value) => {
        this.setState({type: value});
    };

    handleFileChange = (evt) => {
        this.setState({file: evt.target.files[0]});
    };

    handleSubmitClick = () => {
        let intlStore = this.context.getStore(IntlStore);

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.type) {
            fieldErrors.type = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.file) {
            fieldErrors.file = intlStore.getMessage(intlData, 'fieldRequired');
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                resource: this.state.type,
                file: this.state.file
            });
        }
    };

    //*** Template ***//
    
    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        let uploadTypeOptions = [
            {name: intlStore.getMessage(intlData, 'catalog'), value: 'catalog'},
            {name: intlStore.getMessage(intlData, 'images'), value: 'images'}
        ];

        //
        // Return
        //
        return (
            <div className="admin-products-upload">
                <div className="admin-products-upload__form-item">
                    <Select label={intlStore.getMessage(intlData, 'type')}
                            placeholder
                            options={uploadTypeOptions}
                            onChange={this.handleTypeChange}
                            error={this.state.fieldErrors.type} />
                </div>
                <div className="admin-products-upload__form-item">
                    <input ref="input" type="file" className="admin-products-upload__input" onChange={this.handleFileChange} />
                    {this.state.fieldErrors.file ?
                        <div className="admin-products-upload__error">
                            <Text size="small">{this.state.fieldErrors.file}</Text>
                        </div>
                        :
                        null
                    }
                </div>
                <div className="admin-products-upload__actions">
                    <div className="admin-products-upload__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'cancel')}
                                locales={intlStore.getCurrentLocale()} />
                        </Button>
                    </div>
                    <div className="admin-products-upload__button">
                        <Button type="primary" onClick={this.handleSubmitClick} disabled={this.props.loading}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'submit')}
                                locales={intlStore.getCurrentLocale()} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
AdminProductsUpload.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default AdminProductsUpload;
