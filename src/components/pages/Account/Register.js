/**
 * Imports.
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import AccountStore from '../../../stores/Account/AccountStore';
import IntlStore from '../../../stores/Application/IntlStore';
import RegisterStore from '../../../stores/Account/RegisterStore';

import registerAccount from '../../../actions/Account/registerAccount';

// Required components
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import InputField from '../../common/forms/InputField';
import Modal from '../../common/modals/Modal';
import Text from '../../common/typography/Text';

// Translation data for this component
import intlData from './Register.intl';

/**
 * Component.
 */
class Register extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired,
        router: React.PropTypes.func.isRequired
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context) {
        return {
            title: context.getStore(IntlStore).getMessage(intlData, 'title')
        }
    };

    //*** Initial State ***//

    state = {
        name: undefined,
        email: undefined,
        password: undefined,
        passwordConfirm: undefined,
        loading: this.context.getStore(RegisterStore).isLoading(),
        error: this.context.getStore(RegisterStore).getError(),
        fieldErrors: {},
        showSuccessModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Register.scss');
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
                fieldErrors[field] = nextProps._error.validation.details[field];
            });
        }

        // Check for a successful register
        if (this.state.loading && !nextProps._loading && !nextProps._error) {
            this.setState({showSuccessModal: true});
        }

        this.setState({
            loading: nextProps._loading,
            error: nextProps._error,
            fieldErrors: fieldErrors
        })
    }

    //*** View Controllers ***//

    handleFieldChange = (param, value) => {
        this.setState({[param]: value});
    };

    handleSubmitClick = () => {

        let intlStore = this.context.getStore(IntlStore);

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.name) {
            fieldErrors.name = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.email) {
            fieldErrors.email = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.password) {
            fieldErrors.password = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.passwordConfirm) {
            fieldErrors.passwordConfirm = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (this.state.password && this.state.passwordConfirm && this.state.password != this.state.passwordConfirm) {
            fieldErrors.passwordConfirm = intlStore.getMessage(intlData, 'passwordMismatch');
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.context.executeAction(registerAccount, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            });
        }
    };

    handleModalContinueClick = () => {
        this.context.router.transitionTo('homepage', {locale: this.context.getStore(IntlStore).getCurrentLocale()});
    };

    //*** Template ***//

    render() {

        let intlStore = this.context.getStore(IntlStore);

        let successModal = () => {
            if (this.state.showSuccessModal) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'successModalTitle')}>
                        <div className="register__modal-body">
                            <Text size="medium">
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'successModalBody')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Text>
                        </div>
                        <div className="register__modal-footer">
                            <Button type="primary" onClick={this.handleModalContinueClick}>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'successModalContinue')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Button>
                        </div>
                    </Modal>
                );
            }
        };

        return (
            <div className="register">
                {successModal()}

                <div className="register__container">
                    <div className="register__header">
                        <Heading>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'title')}
                                locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    <div className="register__form">
                        <div className="register__form-item">
                            <InputField label={intlStore.getMessage(intlData, 'name')}
                                        onChange={this.handleFieldChange.bind(null, 'name')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['name']} />
                        </div>
                        <div className="register__form-item">
                            <InputField label={intlStore.getMessage(intlData, 'email')}
                                        onChange={this.handleFieldChange.bind(null, 'email')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['email']} />
                        </div>
                        <div className="register__form-item">
                            <InputField type="password"
                                        label={intlStore.getMessage(intlData, 'password')}
                                        onChange={this.handleFieldChange.bind(null, 'password')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['password']} />
                        </div>
                        <div className="register__form-item">
                            <InputField type="password"
                                        label={intlStore.getMessage(intlData, 'passwordConfirm')}
                                        onChange={this.handleFieldChange.bind(null, 'passwordConfirm')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['passwordConfirm']} />
                        </div>
                        <div className="register__form-actions">
                            <Button type="primary" onClick={this.handleSubmitClick} disabled={this.state.loading}>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'submit')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
Register = connectToStores(Register, [RegisterStore], (context) => {
    return {
        _error: context.getStore(RegisterStore).getError(),
        _loading: context.getStore(RegisterStore).isLoading()
    };
});

/**
 * Export
 */
export default Register;
