/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../../stores/Application/IntlStore';

// Required components
import Button from '../../../common/buttons/Button';
import InputField from '../../../common/forms/InputField';
import Select from '../../../common/forms/Select';

// Translation data for this component
import intlData from './AdminCollectionsAddForm.intl';

// Instantiate debugger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class AdminCollectionsAddForm extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        name: {en: '', pt: ''},
        tags: [],
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminCollectionsAddForm.scss');
    }

    //*** View Controllers ***//

    handleNameChange = (locale, value) => {
        let name = this.state.name;
        name[locale] = value;
        this.setState({name: name});
    };

    handleSubmitClick = () => {
        let intlStore = this.context.getStore(IntlStore);

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (this.state.tags.indexOf('category') === -1 && this.state.tags.indexOf('collection') === -1) {
            fieldErrors.type = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.name.en) {
            fieldErrors.nameEN = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.name.pt) {
            fieldErrors.namePT = intlStore.getMessage(intlData, 'fieldRequired');
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                name: this.state.name,
                tags: this.state.tags
            });
        }
    };

    handleTypeChange = (value) => {
        this.setState({tags: [value]});
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        let collectionTypeOptions = [
            {name: intlStore.getMessage(intlData, 'category'), value: 'category'},
            {name: intlStore.getMessage(intlData, 'collection'), value: 'collection'}
        ];

        let fieldError = (field) => {
            return this.state.fieldErrors[field];
        };

        //
        // Return
        //
        return (
            <div className="admin-collections-add-form">
                <div className="admin-collections-add-form__item">
                    <Select label={intlStore.getMessage(intlData, 'type')}
                            placeholder
                            options={collectionTypeOptions}
                            onChange={this.handleTypeChange}
                            error={fieldError('type')} />
                </div>
                <div className="admin-collections-add-form__item">
                    <InputField label={intlStore.getMessage(intlData, 'name') + ' (EN)'}
                                onChange={this.handleNameChange.bind(null, 'en')}
                                error={fieldError('nameEN')} />
                </div>
                <div className="admin-collections-add-form__item">
                    <InputField label={intlStore.getMessage(intlData, 'name') + ' (PT)'}
                                onChange={this.handleNameChange.bind(null, 'pt')}
                                error={fieldError('namePT')} />
                </div>
                <div className="admin-collections-add-form__actions">
                    <div className="admin-collections-add-form__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'cancel')}
                                locales={intlStore.getCurrentLocale()} />
                        </Button>
                    </div>
                    <div className="admin-collections-add-form__button">
                        <Button type="primary" onClick={this.handleSubmitClick} disabled={this.props.loading}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'add')}
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
AdminCollectionsAddForm.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default AdminCollectionsAddForm;
