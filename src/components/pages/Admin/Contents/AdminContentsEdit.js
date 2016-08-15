/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

import config from '../../../../config';

// Flux
import CollectionsStore from '../../../../stores/Collections/CollectionsStore';
import ContentDetailsStore from '../../../../stores/Contents/ContentDetailsStore';
import IntlStore from '../../../../stores/Application/IntlStore';

import fetchContentAndCheckIfFound from '../../../../actions/Contents/fetchContentAndCheckIfFound';
import updateContent from '../../../../actions/Admin/updateContent';

// Required components
import Button from '../../../common/buttons/Button';
import Checkbox from '../../../common/forms/Checkbox';
import CollectionPicker from '../../../common/collections/CollectionPicker';
import FormLabel from '../../../common/forms/FormLabel';
import Heading from '../../../common/typography/Heading';
import ImageLibraryManager from '../../../containers/images/ImageLibraryManager';
import InputField from '../../../common/forms/InputField';
import NotFound from '../../../pages/NotFound/NotFound';
import Select from '../../../common/forms/Select';
import Text from '../../../common/typography/Text';
import ToggleSwitch from '../../../common/buttons/ToggleSwitch';

import AdminContentsArticle from './TypeForms/AdminContentsArticle';
import AdminContentsBanner from './TypeForms/AdminContentsBanner';

// Translation data for this component
import intlData from './AdminContentsEdit.intl';

/**
 * Component
 */
class AdminContentsEdit extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        content: this.context.getStore(ContentDetailsStore).getContent(),
        error: this.context.getStore(ContentDetailsStore).getError(),
        loading: this.context.getStore(ContentDetailsStore).isLoading(),
        categories: this.context.getStore(CollectionsStore).getCollections(['category']),
        collections: this.context.getStore(CollectionsStore).getCollections(['collection']),
        availableLocales: this.context.getStore(IntlStore).getAvailableLocales(),
        selectedLocale: this.context.getStore(IntlStore).getDefaultLocale(),
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminContentsEdit.scss');

        // Request required data
        this.context.executeAction(fetchContentAndCheckIfFound, this.props.params.contentId);
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
                fieldErrors[field] = nextProps._error.validation.details[field];
            });
        }

        this.setState({
            content: nextProps._content,
            error: nextProps._error,
            loading: nextProps._loading,
            categories: nextProps._categories,
            collections: nextProps._collections,
            fieldErrors: fieldErrors
        });
    }

    //*** View Controllers ***//

    handleSelectedLocaleChange = (value) => {
        this.setState({selectedLocale: value});
    };

    handleEnabledChange = () => {
        let content = this.state.content;
        content.enabled = !(content.enabled === true);
        this.setState({content: content});
    };

    handleCollectionPickerChange = (collections) => {
        let content = this.state.content;
        content.collections = collections;
        this.setState({content: content});
    };

    handleSectionChange = (tag) => {
        let content = this.state.content;
        if (!content.tags) {
            content.tags = [tag];
        } else if (content.tags.indexOf(tag) === -1) {
            content.tags.push(tag);
        } else {
            content.tags.splice(content.tags.indexOf(tag), 1);
        }
        this.setState({content: content});
    };

    handleNameChange = (locale, value) => {
        let content = this.state.content;
        content.name[locale] = value;
        this.setState({content: content});
    };

    handleImageLibraryChange = (images) => {
        let content = this.state.content;
        content.images = images;
        this.setState({content: content});
    };

    handleBodyChange = (value) => {
        let content = this.state.content;
        content.body = value;
        this.setState({content: content});
    };

    handleSaveClick = () => {
        let contentId = this.state.content.id;
        let payload = Object.assign({}, this.state.content);
        delete payload.id;
        delete payload.type;
        delete payload.comments;
        delete payload.createdAt;
        delete payload.updatedAt;
        this.context.executeAction(updateContent, {
            id: contentId,
            data: payload
        });
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        // Stuff that won't work if we are in "404 Not Found", thus, no content object
        if (this.state.content) {

            /**
             * Return the form for editing the specific content of given type
             */
            var typeForm = () => {
                if (this.state.content.type === 'article') {
                    return (
                        <AdminContentsArticle body={this.state.content.body}
                                              selectedLocale={this.state.selectedLocale}
                                              onChange={this.handleBodyChange} />
                    );
                } else if(this.state.content.type === 'banner') {
                    return (
                        <AdminContentsBanner body={this.state.content.body}
                                             selectedLocale={this.state.selectedLocale}
                                             onChange={this.handleBodyChange} />
                    );
                } else {
                    return (
                        <Text className="admin-contents-edit__unsupported-type">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'unsupportedType')}
                                locales={intlStore.getCurrentLocale()} />
                        </Text>
                    );
                }
            };
        }

        //
        // Return
        //
        return (
            <div className="admin-contents-edit">
                <div className="admin-contents-edit__header">
                    <div className="admin-contents-edit__title">
                        <div className="admin-contents-edit__title-text">
                            <Heading size="medium">
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'title')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Heading>
                        </div>
                        {this.state.content ?
                            <div className="admin-contents-edit__locale-select">
                                <Select size="small"
                                        options={this.state.availableLocales.map(l => { return {value: l, name: l}; })}
                                        value={this.state.selectedLocale}
                                        onChange={this.handleSelectedLocaleChange} />
                            </div>
                            :
                            null
                        }
                    </div>
                    {this.state.content ?
                        <div className="admin-contents-edit__toolbar">
                            <div className="admin-contents-edit__toolbar-item">
                                <Link to="adm-contents" params={routeParams}>
                                    <Button type="default" disabled={this.state.loading}>
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'back')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Button>
                                </Link>
                            </div>
                            <div className="admin-contents-edit__toolbar-item">
                                <Button type="primary" onClick={this.handleSaveClick} disabled={this.state.loading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'save')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                {!this.state.content ?
                    <NotFound />
                    :
                    <div className="admin-contents-edit__form">
                        <div className="admin-contents-edit__common">
                            <div className="admin-contents-edit__left-column">
                                <div className="admin-contents-edit__form-item">
                                    <ToggleSwitch label={intlStore.getMessage(intlData, 'enabled')}
                                                  enabled={this.state.content.enabled === true}
                                                  onChange={this.handleEnabledChange} />
                                </div>
                                <div className="admin-contents-edit__form-item">
                                    <div className="admin-contents-edit__checkbox-inline">
                                        <div className="admin-contents-edit__checkbox-inline-label">
                                            <FormLabel>
                                                <FormattedMessage
                                                    message={intlStore.getMessage(intlData, 'sections')}
                                                    locales={intlStore.getCurrentLocale()} />
                                            </FormLabel>
                                        </div>
                                        <div className="admin-contents-edit__checkbox-inline-items">
                                            <Checkbox label={intlStore.getMessage(intlData, 'homepage')}
                                                      onChange={this.handleSectionChange.bind(null, 'homepage')}
                                                      checked={this.state.content.tags && this.state.content.tags.indexOf('homepage') !== -1} />
                                            <Checkbox label={intlStore.getMessage(intlData, 'productPage')}
                                                      onChange={this.handleSectionChange.bind(null, 'productPage')}
                                                      checked={this.state.content.tags && this.state.content.tags.indexOf('productPage') !== -1} />
                                        </div>
                                    </div>
                                </div>
                                <div className="admin-contents-edit__form-item">
                                    <InputField label={
                                                    <div>
                                                        <FormattedMessage
                                                            message={intlStore.getMessage(intlData, 'name')}
                                                            locales={intlStore.getCurrentLocale()} />
                                                        &nbsp;({this.state.selectedLocale})
                                                    </div>
                                                }
                                                onChange={this.handleNameChange.bind(null, this.state.selectedLocale)}
                                                value={this.state.content.name[this.state.selectedLocale]}
                                                error={this.state.fieldErrors[`name.${this.state.selectedLocale}`]} />
                                </div>
                                <div className="admin-contents-edit__form-item">
                                    <ImageLibraryManager images={this.state.content.images}
                                                         onChange={this.handleImageLibraryChange} />
                                </div>
                            </div>
                            <div className="admin-contents-edit__right-column">
                                <div className="admin-contents-edit__form-item">
                                    <CollectionPicker collections={this.state.categories}
                                                      checked={this.state.content.collections}
                                                      onChange={this.handleCollectionPickerChange}>
                                        <FormattedMessage message={intlStore.getMessage(intlData, 'categories')}
                                                          locales={intlStore.getCurrentLocale()} />
                                    </CollectionPicker>
                                </div>
                                <div className="admin-contents-edit__form-item">
                                    <CollectionPicker collections={this.state.collections}
                                                      checked={this.state.content.collections}
                                                      onChange={this.handleCollectionPickerChange}>
                                        <FormattedMessage message={intlStore.getMessage(intlData, 'collections')}
                                                          locales={intlStore.getCurrentLocale()} />
                                    </CollectionPicker>
                                </div>
                            </div>
                        </div>
                        <div className="admin-contents-edit__form-item">
                            {typeForm()}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

/**
 * Flux
 */
AdminContentsEdit = connectToStores(AdminContentsEdit, [CollectionsStore, ContentDetailsStore], (context) => {
    return {
        _content: context.getStore(ContentDetailsStore).getContent(),
        _error: context.getStore(ContentDetailsStore).getError(),
        _loading: context.getStore(ContentDetailsStore).isLoading(),
        _categories: context.getStore(CollectionsStore).getCollections(['category']),
        _collections: context.getStore(CollectionsStore).getCollections(['collection'])
    };
});

/**
 * Exports
 */
export default AdminContentsEdit;
