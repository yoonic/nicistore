/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import CollectionDetailsStore from '../../../../stores/Collections/CollectionDetailsStore';
import CollectionsStore from '../../../../stores/Collections/CollectionsStore';
import IntlStore from '../../../../stores/Application/IntlStore';

import fetchCollectionAndCheckIfFound from '../../../../actions/Collections/fetchCollectionAndCheckIfFound';
import updateCollection from '../../../../actions/Admin/updateCollection';

// Required components
import Button from '../../../common/buttons/Button';
import Checkbox from '../../../common/forms/Checkbox';
import FormLabel from '../../../common/forms/FormLabel';
import Heading from '../../../common/typography/Heading';
import ImageLibraryManager from '../../../containers/images/ImageLibraryManager';
import InputField from '../../../common/forms/InputField';
import NotFound from '../../NotFound/NotFound';
import Select from '../../../common/forms/Select';
import Textarea from '../../../common/forms/Textarea';
import TreeMenu from '../../../common/navigation/TreeMenu';
import ToggleSwitch from '../../../common/buttons/ToggleSwitch';

// Translation data for this component
import intlData from './AdminCollectionsEdit.intl';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class AdminCollectionsEdit extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Required Data ***//

    static fetchData = function (context, params, query, done) {
        context.executeAction(fetchCollectionAndCheckIfFound, params.collectionId, done);
    };

    //*** Initial State ***//

    state = {
        collection: this.context.getStore(CollectionDetailsStore).getCollection(),
        error: this.context.getStore(CollectionDetailsStore).getError(),
        loading: this.context.getStore(CollectionDetailsStore).isLoading(),
        collectionsTree: this.context.getStore(CollectionsStore).getCollectionsTree(),
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminCollectionsEdit.scss');
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            collection: nextProps._collection,
            error: nextProps._error,
            loading: nextProps._loading,
            collectionsTree: nextProps._collectionsTree
        });
    }

    //*** View Controllers ***//

    handleEnabledChange = () => {
        let collection = this.state.collection;
        collection.enabled = !(collection.enabled === true);
        this.setState({collection: collection});
    };

    handleTypeChange = (value) => {
        let collection = this.state.collection;
        if (value === 'category') {
            collection.tags.splice(collection.tags.indexOf('collection'), 1);
            collection.tags.push('category');
        } else if (value === 'collection') {
            collection.tags.splice(collection.tags.indexOf('category'), 1);
            collection.tags.push('collection');
        } else {
            debug(`(ERROR) Invalid collection type: ${value}`);
        }
        this.setState({collection: collection});
    };

    handleSectionChange = (tag) => {
        let collection = this.state.collection;
        if (collection.tags.indexOf(tag) === -1) {
            collection.tags.push(tag);
        } else {
            collection.tags.splice(collection.tags.indexOf(tag), 1);
        }
        this.setState({collection: collection});
    };

    handleNameChange = (locale, value) => {
        let collection = this.state.collection;
        collection.name[locale] = value;
        this.setState({collection: collection});
    };

    handleIntlFieldChange = (field, locale, value) => {
        let collection = this.state.collection;
        if (!collection[field]) {
            collection[field] = {};
        }
        collection[field][locale] = value;
        this.setState({collection: collection});
    };

    handleImageLibraryChange = (images) => {
        let collection = this.state.collection;
        collection.images = images;
        this.setState({collection: collection});
    };

    handleParentCollectionChange = (collectionId) => {
        let collection = this.state.collection;
        collection.parentId = collectionId;
        this.setState({collection: collection});
    };

    handleSaveClick = () => {

        let intlStore = this.context.getStore(IntlStore);

        // Client-side validations
        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.collection.name.en) {
            fieldErrors.nameEN = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.collection.name.pt) {
            fieldErrors.namePT = intlStore.getMessage(intlData, 'fieldRequired');
        }
        this.setState({fieldErrors: fieldErrors});

        // Client-side validation checked, trigger update request
        if (Object.keys(fieldErrors).length === 0) {
            let collection = this.state.collection;
            this.context.executeAction(updateCollection, {
                id: collection.id,
                data: {
                    enabled: collection.enabled,
                    name: collection.name,
                    description: collection.description,
                    tags: collection.tags,
                    images: collection.images,
                    parentId: collection.parentId,
                    metadata: collection.metadata
                }
            });
        }
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        let collectionTypeOptions = [
            {name: intlStore.getMessage(intlData, 'category'), value: 'category'},
            {name: intlStore.getMessage(intlData, 'collection'), value: 'collection'}
        ];

        let selectedOption;
        // Won't work if we are in "404 Not Found", thus, no collection object
        if (this.state.collection) {
            if (this.state.collection.tags.indexOf('category') != -1) {
                selectedOption = 'category';
            } else if (this.state.collection.tags.indexOf('collection') != -1) {
                selectedOption = 'collection';
            }
        }

        let fieldError = (field) => {
            return this.state.fieldErrors[field];
        };

        //
        // Return
        //
        return (
            <div className="admin-collections-edit">
                <div className="admin-collections-edit__header">
                    <div className="admin-collections-edit__title">
                        <Heading size="medium">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'title')}
                                locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    {this.state.collection ?
                        <div className="admin-collections-edit__toolbar">
                            <div className="admin-collections-edit__toolbar-item">
                                <Link to="adm-collections" params={routeParams}>
                                    <Button type="default" disabled={this.state.loading}>
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'back')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Button>
                                </Link>
                            </div>
                            <div className="admin-collections-edit__toolbar-item">
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
                {!this.state.collection ?
                    <NotFound />
                    :
                    <div className="admin-collections-edit__form">
                        <div className="admin-collections-edit__left-column">
                            <div className="admin-collection-edit__form-item">
                                <ToggleSwitch label={intlStore.getMessage(intlData, 'enabled')}
                                              enabled={this.state.collection.enabled === true}
                                              onChange={this.handleEnabledChange} />
                            </div>
                            <div className="admin-collection-edit__form-item">
                                <Select label={intlStore.getMessage(intlData, 'type')}
                                        placeholder
                                        options={collectionTypeOptions}
                                        onChange={this.handleTypeChange}
                                        value={selectedOption} />
                            </div>
                            <div className="admin-collection-edit__form-item">
                                <div className="admin-collection-edit__checkbox-inline">
                                    <div className="admin-collection-edit__checkbox-inline-label">
                                        <FormLabel>
                                            <FormattedMessage
                                                message={intlStore.getMessage(intlData, 'sections')}
                                                locales={intlStore.getCurrentLocale()} />
                                        </FormLabel>
                                    </div>
                                    <div className="admin-collection-edit__checkbox-inline-items">
                                        <Checkbox label={intlStore.getMessage(intlData, 'mainNavigation')}
                                                  onChange={this.handleSectionChange.bind(null, 'mainNavigation')}
                                                  checked={this.state.collection.tags.indexOf('mainNavigation') !== -1} />
                                        <Checkbox label={intlStore.getMessage(intlData, 'homepage')}
                                                  onChange={this.handleSectionChange.bind(null, 'homepage')}
                                                  checked={this.state.collection.tags.indexOf('homepage') !== -1} />
                                        <Checkbox label={intlStore.getMessage(intlData, 'homepageFeatured')}
                                                  onChange={this.handleSectionChange.bind(null, 'homepageFeatured')}
                                                  checked={this.state.collection.tags.indexOf('homepageFeatured') !== -1} />
                                    </div>
                                </div>
                            </div>
                            <div className="admin-collection-edit__form-item">
                                <InputField label={intlStore.getMessage(intlData, 'name') + ' (EN)'}
                                            onChange={this.handleNameChange.bind(null, 'en')}
                                            value={this.state.collection.name.en}
                                            error={fieldError('nameEN')} />
                            </div>
                            <div className="admin-collection-edit__form-item">
                                <InputField label={intlStore.getMessage(intlData, 'name') + ' (PT)'}
                                            onChange={this.handleNameChange.bind(null, 'pt')}
                                            value={this.state.collection.name.pt}
                                            error={fieldError('namePT')} />
                            </div>
                            <div className="admin-collection-edit__form-item">
                                    <Textarea label={intlStore.getMessage(intlData, 'description') + ' (EN)'}
                                              rows="5"
                                              onChange={this.handleIntlFieldChange.bind(null, 'description', 'en')}
                                              value={this.state.collection.description ? this.state.collection.description.en : null}
                                              error={fieldError('description.en')} />
                            </div>
                            <div className="admin-collection-edit__form-item">
                                    <Textarea label={intlStore.getMessage(intlData, 'description') + ' (PT)'}
                                              rows="5"
                                              onChange={this.handleIntlFieldChange.bind(null, 'description', 'pt')}
                                              value={this.state.collection.description ? this.state.collection.description.pt : null}
                                              error={fieldError('description.pt')} />
                            </div>
                            <div className="admin-collection-edit__form-item">
                                <ImageLibraryManager images={this.state.collection.images}
                                                     onChange={this.handleImageLibraryChange} />
                            </div>
                        </div>
                        <div className="admin-collections-edit__right-column">
                            <TreeMenu items={this.state.collectionsTree}
                                      selected={this.state.collection.parentId}
                                      self={this.state.collection.id}
                                      onClick={this.handleParentCollectionChange}>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'parent')}
                                    locales={intlStore.getCurrentLocale()} />
                            </TreeMenu>
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
AdminCollectionsEdit = connectToStores(AdminCollectionsEdit, [CollectionDetailsStore, CollectionsStore], (context) => {
    return {
        _collection: context.getStore(CollectionDetailsStore).getCollection(),
        _error: context.getStore(CollectionDetailsStore).getError(),
        _loading: context.getStore(CollectionDetailsStore).isLoading(),
        _collectionsTree: context.getStore(CollectionsStore).getCollectionsTree()
    };
});

/**
 * Exports
 */
export default AdminCollectionsEdit;
