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
import intlData from './AdminContentsAddForm.intl';

// Instantiate debugger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class AdminContentsAddForm extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        name: {en: '', pt: ''},
        type: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminContentsAddForm.scss');
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
        if (!this.state.type) {
            fieldErrors.type = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.name.en) {
            fieldErrors['name.en'] = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.name.pt) {
            fieldErrors['name.pt'] = intlStore.getMessage(intlData, 'fieldRequired');
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                type: this.state.type,
                name: this.state.name
            });
        }
    };

    handleTypeChange = (value) => {
        this.setState({type: value});
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        let contentTypeOptions = [
            {name: intlStore.getMessage(intlData, 'article'), value: 'article'},
            {name: intlStore.getMessage(intlData, 'banner'), value: 'banner'}
        ];

        let fieldError = (field) => {
            return this.state.fieldErrors[field];
        };

        //
        // Return
        //
        return (
            <div className="admin-contents-add-form">
                <div className="admin-contents-add-form__item">
                    <Select label={intlStore.getMessage(intlData, 'type')}
                            placeholder
                            options={contentTypeOptions}
                            onChange={this.handleTypeChange}
                            error={fieldError('type')} />
                </div>
                <div className="admin-contents-add-form__item">
                    <InputField label={intlStore.getMessage(intlData, 'name') + ' (EN)'}
                                onChange={this.handleNameChange.bind(null, 'en')}
                                error={fieldError('name.en')} />
                </div>
                <div className="admin-contents-add-form__item">
                    <InputField label={intlStore.getMessage(intlData, 'name') + ' (PT)'}
                                onChange={this.handleNameChange.bind(null, 'pt')}
                                error={fieldError('name.pt')} />
                </div>
                <div className="admin-contents-add-form__actions">
                    <div className="admin-contents-add-form__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'cancel')}
                                locales={intlStore.getCurrentLocale()} />
                        </Button>
                    </div>
                    <div className="admin-contents-add-form__button">
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
AdminContentsAddForm.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug('onSubmitClick not defined', data); }
};

/**
 * Exports
 */
export default AdminContentsAddForm;
