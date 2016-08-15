/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import CollectionsStore from '../../../../stores/Collections/CollectionsStore';
import IntlStore from '../../../../stores/Application/IntlStore';
import ProductDetailsStore from '../../../../stores/Products/ProductDetailsStore';

import fetchProductAndCheckIfFound from '../../../../actions/Products/fetchProductAndCheckIfFound';
import updateProduct from '../../../../actions/Admin/updateProduct';

// Required components
import Button from '../../../common/buttons/Button';
import Checkbox from '../../../common/forms/Checkbox';
import CollectionPicker from '../../../common/collections/CollectionPicker';
import Heading from '../../../common/typography/Heading';
import ImageLibraryManager from '../../../containers/images/ImageLibraryManager';
import InlineItems from '../../../common/forms/InlineItems';
import InputField from '../../../common/forms/InputField';
import NotFound from '../../NotFound/NotFound';
import Select from '../../../common/forms/Select';
import Spinner from '../../../common/indicators/Spinner';
import Textarea from '../../../common/forms/Textarea';
import ToggleSwitch from '../../../common/buttons/ToggleSwitch';

// Translation data for this component
import intlData from './AdminProductsEdit.intl';

/**
 * Component
 */
class AdminProductsEdit extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        product: this.context.getStore(ProductDetailsStore).getProduct(),
        error: this.context.getStore(ProductDetailsStore).getError(),
        loading: this.context.getStore(ProductDetailsStore).isLoading(),
        categories: this.context.getStore(CollectionsStore).getCollections(['category']),
        collections: this.context.getStore(CollectionsStore).getCollections(['collection']),
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminProductsEdit.scss');

        // Load required data
        this.context.executeAction(fetchProductAndCheckIfFound, this.props.params.productId);
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
                if (field === 'description') {
                    fieldErrors['description.en'] = nextProps._error.validation.details[field];
                    fieldErrors['description.pt'] = nextProps._error.validation.details[field];
                } else {
                    fieldErrors[field] = nextProps._error.validation.details[field];
                }
            });
        }

        this.setState({
            product: nextProps._product,
            error: nextProps._error,
            loading: nextProps._loading,
            categories: nextProps._categories,
            collections: nextProps._collections,
            fieldErrors: fieldErrors
        });
    }

    //*** View Controllers ***//

    handleEnabledChange = () => {
        let product = this.state.product;
        product.enabled = !(product.enabled === true);
        this.setState({product: product});
    };

    handleFieldChange = (field, value) => {
        let product = this.state.product;
        product[field] = value;
        this.setState({product: product});
    };

    handleIntlFieldChange = (field, locale, value) => {
        let product = this.state.product;
        if (!product[field]) {
            product[field] = {};
        }
        product[field][locale] = value;
        this.setState({product: product});
    };

    handleSectionChange = (tag) => {
        let product = this.state.product;
        if (!product.tags) {
            product.tags = [tag];
        } else if (product.tags.indexOf(tag) === -1) {
            product.tags.push(tag);
        } else {
            product.tags.splice(product.tags.indexOf(tag), 1);
        }
        this.setState({product: product});
    };

    handleCollectionPickerChange = (collections) => {
        let product = this.state.product;
        product.collections = collections;
        this.setState({product: product});
    };

    handleMainCategoryChange = (collectionId) => {
        let product = this.state.product;
        product.metadata.mainCategory = collectionId;
        this.setState({product: product});
    };

    handleMainCollectionChange = (collectionId) => {
        let product = this.state.product;
        product.metadata.mainCollection = collectionId;
        this.setState({product: product});
    };

    handleNameChange = (locale, value) => {
        let product = this.state.product;
        product.name[locale] = value;
        this.setState({product: product});
    };

    handlePricingChange = (param, value) => {
        let product = this.state.product;
        product.pricing[param] = value;
        this.setState({product: product});
    };

    handleImageLibraryChange = (images) => {
        let product = this.state.product;
        product.images = images;
        this.setState({product: product});
    };

    handleSaveClick = () => {

        let intlStore = this.context.getStore(IntlStore);

        // Client-side validations
        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.product.name.en) {
            fieldErrors.nameEN = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.product.name.pt) {
            fieldErrors.namePT = intlStore.getMessage(intlData, 'fieldRequired');
        }
        this.setState({fieldErrors: fieldErrors});

        // Client-side validation checked, trigger update request
        if (Object.keys(fieldErrors).length === 0) {
            let product = this.state.product;
            this.context.executeAction(updateProduct, {
                id: product.id,
                data: {
                    enabled: product.enabled,
                    sku: product.sku,
                    name: product.name,
                    description: product.description,
                    images: product.images,
                    pricing: {
                        currency: product.pricing.currency,
                        list: parseFloat(product.pricing.list),
                        retail: parseFloat(product.pricing.retail),
                        vat: parseInt(product.pricing.vat)
                    },
                    stock: parseInt(product.stock),
                    tags: product.tags,
                    collections: product.collections,
                    metadata: product.metadata
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

        let getCollectionType = (collectionId) => {
            let collection = this.context.getStore(CollectionsStore).getCollection(collectionId);
            if (collection && collection.tags.indexOf('category') !== -1 && collection.tags.indexOf('collection') === -1) {
                return 'category';
            } else if (collection && collection.tags.indexOf('collection') !== -1 && collection.tags.indexOf('category') === -1) {
                return 'collection';
            } else {
                return null;
            }
        };

        // Stuff that won't work if we are in "404 Not Found", thus, no product object
        let productCategories;
        let productCollections;
        if (this.state.product) {
            productCategories = this.state.product.collections.filter((collectionId) => {
                return getCollectionType(collectionId) === 'category';
            }).map((collectionId) => {
                let category = this.context.getStore(CollectionsStore).getCollection(collectionId);
                return {
                    value: category.id,
                    name: intlStore.getMessage(category.name)
                }
            });

            productCollections = this.state.product.collections.filter((collectionId) => {
                return getCollectionType(collectionId) === 'collection';
            }).map((collectionId) => {
                let collection = this.context.getStore(CollectionsStore).getCollection(collectionId);
                return {
                    value: collection.id,
                    name: intlStore.getMessage(collection.name)
                }
            });
        }

        let fieldError = (field) => {
            return this.state.fieldErrors[field];
        };

        //
        // Return
        //
        return (
            <div className="admin-products-edit">
                <div className="admin-products-edit__header">
                    <div className="admin-products-edit__title">
                        <Heading size="medium">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'title')}
                                locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    {this.state.product ?
                        <div className="admin-products-edit__toolbar">
                            <div className="admin-products-edit__toolbar-item">
                                <Link to="adm-products" params={routeParams}>
                                    <Button type="default" disabled={this.state.loading}>
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'back')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Button>
                                </Link>
                            </div>
                            <div className="admin-products-edit__toolbar-item">
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

                {this.state.loading ?
                    <div className="admin-products-edit__spinner">
                        <Spinner />
                    </div>
                    :
                    null
                }
                {!this.state.loading && !this.state.product  ?
                    <NotFound />
                    :
                    null
                }
                {!this.state.loading && this.state.product ?
                    <div className="admin-products-edit__form">
                        <div className="admin-products-edit__left-column">
                            <div className="admin-products-edit__form-item">
                                <ToggleSwitch label={intlStore.getMessage(intlData, 'enabled')}
                                              enabled={this.state.product.enabled === true}
                                              onChange={this.handleEnabledChange} />
                            </div>
                            <div className="admin-products-edit__form-item">
                                <InlineItems>
                                    <InputField label={intlStore.getMessage(intlData, 'sku')}
                                                onChange={this.handleFieldChange.bind(null, 'sku')}
                                                value={this.state.product.sku}
                                                error={fieldError('sku')} />
                                    <InputField label={intlStore.getMessage(intlData, 'stock')}
                                                onChange={this.handleFieldChange.bind(null, 'stock')}
                                                value={this.state.product.stock}
                                                error={fieldError('stock')} />
                                    <Select label={intlStore.getMessage(intlData, 'mainCategory')}
                                            placeholder
                                            options={productCategories}
                                            value={this.state.product.metadata.mainCategory}
                                            error={fieldError('mainCategory')}
                                            onChange={this.handleMainCategoryChange} />
                                    <Select label={intlStore.getMessage(intlData, 'mainCollection')}
                                            placeholder
                                            options={productCollections}
                                            value={this.state.product.metadata.mainCollection}
                                            error={fieldError('mainCategory')}
                                            onChange={this.handleMainCollectionChange} />
                                </InlineItems>
                            </div>
                            <div className="admin-products-edit__form-item">
                                <InlineItems label={<FormattedMessage
                                    message={intlStore.getMessage(intlData, 'sections')}
                                    locales={intlStore.getCurrentLocale()} />}>
                                    <Checkbox label={intlStore.getMessage(intlData, 'homepage')}
                                              onChange={this.handleSectionChange.bind(null, 'homepage')}
                                              checked={this.state.product.tags && this.state.product.tags.indexOf('homepage') !== -1} />
                                </InlineItems>
                            </div>
                            <div className="admin-products-edit__form-item">
                                <InputField label={intlStore.getMessage(intlData, 'name') + ' (EN)'}
                                            onChange={this.handleNameChange.bind(null, 'en')}
                                            value={this.state.product.name.en}
                                            error={fieldError('nameEN')} />
                            </div>
                            <div className="admin-products-edit__form-item">
                                <InputField label={intlStore.getMessage(intlData, 'name') + ' (PT)'}
                                            onChange={this.handleNameChange.bind(null, 'pt')}
                                            value={this.state.product.name.pt}
                                            error={fieldError('namePT')} />
                            </div>
                            <div className="admin-products-edit__form-item">
                                <Textarea label={intlStore.getMessage(intlData, 'description') + ' (EN)'}
                                          rows="5"
                                          onChange={this.handleIntlFieldChange.bind(null, 'description', 'en')}
                                          value={this.state.product.description ? this.state.product.description.en : null}
                                          error={fieldError('description.en')} />
                            </div>
                            <div className="admin-products-edit__form-item">
                                <Textarea label={intlStore.getMessage(intlData, 'description') + ' (PT)'}
                                          rows="5"
                                          onChange={this.handleIntlFieldChange.bind(null, 'description', 'pt')}
                                          value={this.state.product.description ? this.state.product.description.pt : null}
                                          error={fieldError('description.pt')} />
                            </div>
                            <div className="admin-products-edit__form-item">
                                <InlineItems label={<FormattedMessage
                                    message={intlStore.getMessage(intlData, 'pricing')}
                                    locales={intlStore.getCurrentLocale()} />}>
                                    <InputField label={intlStore.getMessage(intlData, 'currency')}
                                                labelSize="small" labelWeight="normal"
                                                value={this.state.product.pricing.currency}
                                                error={fieldError('pricing.currency')} />
                                    <InputField label={intlStore.getMessage(intlData, 'listPrice')}
                                                labelSize="small" labelWeight="normal"
                                                value={this.state.product.pricing.list}
                                                onChange={this.handlePricingChange.bind(null, 'list')}
                                                error={fieldError('pricing.list')} />
                                    <InputField label={intlStore.getMessage(intlData, 'retailPrice')}
                                                labelSize="small" labelWeight="normal"
                                                value={this.state.product.pricing.retail}
                                                onChange={this.handlePricingChange.bind(null, 'retail')}
                                                error={fieldError('pricing.retail')} />
                                    <InputField label={intlStore.getMessage(intlData, 'vat')}
                                                labelSize="small" labelWeight="normal"
                                                value={this.state.product.pricing.vat}
                                                onChange={this.handlePricingChange.bind(null, 'vat')}
                                                error={fieldError('pricing.vat')} />
                                </InlineItems>
                            </div>
                            <div className="admin-products-edit__form-item">
                                <ImageLibraryManager images={this.state.product.images}
                                                     onChange={this.handleImageLibraryChange} />
                            </div>
                        </div>
                        <div className="admin-products-edit__right-column">
                            <div className="admin-products-edit__form-item">
                                <CollectionPicker collections={this.state.categories}
                                                  checked={this.state.product.collections}
                                                  onChange={this.handleCollectionPickerChange}>
                                    <FormattedMessage message={intlStore.getMessage(intlData, 'categories')}
                                                      locales={intlStore.getCurrentLocale()} />
                                </CollectionPicker>
                            </div>
                            <div className="admin-products-edit__form-item">
                                <CollectionPicker collections={this.state.collections}
                                                  checked={this.state.product.collections}
                                                  onChange={this.handleCollectionPickerChange}>
                                    <FormattedMessage message={intlStore.getMessage(intlData, 'collections')}
                                                      locales={intlStore.getCurrentLocale()} />
                                </CollectionPicker>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

/**
 * Flux
 */
AdminProductsEdit = connectToStores(AdminProductsEdit, [CollectionsStore, ProductDetailsStore], (context) => {
    return {
        _product: context.getStore(ProductDetailsStore).getProduct(),
        _error: context.getStore(ProductDetailsStore).getError(),
        _loading: context.getStore(ProductDetailsStore).isLoading(),
        _categories: context.getStore(CollectionsStore).getCollections(['category']),
        _collections: context.getStore(CollectionsStore).getCollections(['collection'])
    };
});

/**
 * Exports
 */
export default AdminProductsEdit;
