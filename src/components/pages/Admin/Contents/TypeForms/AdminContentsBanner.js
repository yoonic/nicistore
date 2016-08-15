/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../../../stores/Application/IntlStore';

// Required components
import Button from '../../../../common/buttons/Button';
import FormLabel from '../../../../common/forms/FormLabel';
import InputField from '../../../../common/forms/InputField';

// Translation data for this component
import intlData from './AdminContentsBanner.intl';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class AdminContentsBanner extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminContentsBanner.scss');
    }

    //*** View Controllers ***//

    handleFieldChange = (field, value) => {
        let body = this.props.body;
        body[field] = value;
        this.props.onChange(body);
    };

    handleImageURLChange = (value) => {
        let body = this.props.body;
        body.image = {url: value};
        this.props.onChange(body);
    };

    handleRemoveImageClick = () => {
        let body = this.props.body;
        body.image = null;
        this.props.onChange(body);
    };

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="admin-contents-banner">
                <div className="admin-contents-banner__form-item">
                    <InputField label={intlStore.getMessage(intlData, 'link')}
                                onChange={this.handleFieldChange.bind(null, 'link')}
                                value={this.props.body.link} />
                </div>
                <div className="admin-contents-banner__form-item">
                    <div className="admin-contents-banner__image-label">
                        <FormLabel>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'imageLabel')}
                                locales={intlStore.getCurrentLocale()} />
                        </FormLabel>
                    </div>
                    {this.props.body.image && this.props.body.image.url ?
                        <div className="admin-contents-banner__image-placeholder">
                            <img src={`//${this.props.body.image.url}`} />
                            <div className="admin-contents-banner__placeholder-overlay">
                                <div>
                                    <Button type="primary" onClick={this.handleRemoveImageClick}>
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'delete')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <InputField onChange={this.handleImageURLChange} />
                        </div>
                    }

                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
AdminContentsBanner.defaultProps = {
    onChange: function (value) { debug('onChange not defined', value); }
};

/**
 * Exports
 */
export default AdminContentsBanner;
