/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';
import ResetStore from '../../../stores/Account/ResetStore';

import resetConfirm from '../../../actions/Account/resetConfirm';

// Required components
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import InputField from '../../common/forms/InputField';
import Modal from '../../common/modals/Modal';
import Text from '../../common/typography/Text';

// Translation data for this component
import intlData from './ResetConfirm.intl';

/**
 * Component
 */
class ResetConfirm extends React.Component {

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
        loading: this.context.getStore(ResetStore).isLoading(),
        error: this.context.getStore(ResetStore).getError(),

        password: undefined,
        passwordConfirm: undefined,
        fieldErrors: {},
        errorMessage: undefined,
        showSuccessModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ResetConfirm.scss');
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (this.state.loading && !nextProps._loading && nextProps._error) {
            if (nextProps._error.validation && nextProps._error.validation.keys) {
                nextProps._error.validation.keys.forEach((field) => {
                    fieldErrors[field] = nextProps._error.validation.details[field];
                    if (field === 'token') {
                        this.setState({errorMessage: nextProps._error.validation.details[field]});
                    }
                });
            } else if (nextProps._error.hasOwnProperty('message')) {
                this.setState({errorMessage: nextProps._error.message});
            } else {
                this.setState({
                    errorMessage: this.context.getStore(IntlStore).getMessage(intlData, 'unknownError')
                });
            }
        }

        // Check for a successful reset request
        if (this.state.loading && !nextProps._loading && !nextProps._error) {
            this.setState({showSuccessModal: true});
        }

        // Update state
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

        this.setState({errorMessage: null});
        this.setState({fieldErrors: {}});
        let fieldErrors = {};
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
            this.context.executeAction(resetConfirm, {
                token: this.props.params.token,
                password: this.state.password
            });
        }
    };

    handleModalContinueClick = () => {
        this.context.router.transitionTo('login', {locale: this.context.getStore(IntlStore).getCurrentLocale()});
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);

        let successModal = () => {
            if (this.state.showSuccessModal) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'successModalTitle')}>
                        <div className="reset-confirm__modal-body">
                            <Text size="medium">
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'successModalBody')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Text>
                        </div>
                        <div className="reset-confirm__modal-footer">
                            <Button type="primary" onClick={this.handleModalContinueClick}>
                                <FormattedMessage message={intlStore.getMessage(intlData, 'successModalContinue')}
                                                  locales={intlStore.getCurrentLocale()} />
                            </Button>
                        </div>
                    </Modal>
                );
            }
        };

        //
        // Return
        //
        return (
            <div className="reset-confirm">
                {successModal()}
                <div className="reset-confirm__container">
                    <div className="reset-confirm__header">
                        <Heading>
                            <FormattedMessage message={intlStore.getMessage(intlData, 'title')}
                                              locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    {this.state.errorMessage ?
                        <div className="reset-confirm__error-message">
                            <Text size="small">{this.state.errorMessage}</Text>
                        </div>
                        :
                        null
                    }
                    <div className="reset-confirm__form">
                        <div className="reset-confirm__form-item">
                            <InputField type="password"
                                        label={intlStore.getMessage(intlData, 'password')}
                                        onChange={this.handleFieldChange.bind(null, 'password')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['password']}
                                        value={this.state.password} />
                        </div>
                        <div className="reset-confirm__form-item">
                            <InputField type="password"
                                        label={intlStore.getMessage(intlData, 'passwordConfirm')}
                                        onChange={this.handleFieldChange.bind(null, 'passwordConfirm')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['passwordConfirm']}
                                        value={this.state.passwordConfirm} />
                        </div>
                        <div className="reset-confirm__form-actions">
                            <Button type="primary" onClick={this.handleSubmitClick} disabled={this.state.loading}>
                                <FormattedMessage message={intlStore.getMessage(intlData, 'submit')}
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
ResetConfirm = connectToStores(ResetConfirm, [ResetStore], (context) => {
    return {
        _error: context.getStore(ResetStore).getError(),
        _loading: context.getStore(ResetStore).isLoading()
    };
});

/**
 * Exports
 */
export default ResetConfirm;
