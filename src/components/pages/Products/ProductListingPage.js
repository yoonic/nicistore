/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

// Flux
import CollectionsStore from '../../../stores/Collections/CollectionsStore';
import IntlStore from '../../../stores/Application/IntlStore';
import ProductsListStore from '../../../stores/Products/ProductsListStore';

import fetchProducts from '../../../actions/Products/fetchProducts';

// Required components
import Breadcrumbs from '../../common/navigation/Breadcrumbs';
import ProductList from '../../common/products/ProductList';
import ProductsSortingSelect from '../../common/products/ProductsSortingSelect';

// Translation data for this component
import intlData from './ProductListingPage.intl';

/**
 * Component
 */
class ProductListingPage extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired,
        router: React.PropTypes.func.isRequired
    };

    //*** Required Data ***//

    static fetchData = function (context, params, query, done) {
        let productsQuery = {};
        if (query.page) {
            productsQuery.page = query.page;
        }
        if (query.sort) {
            productsQuery.sort = query.sort;
        }
        context.executeAction(fetchProducts, productsQuery, done);
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: context.getStore(IntlStore).getMessage(intlData, 'pageTitle')
        }
    };

    //*** Initial State ***//

    state = {
        categories: this.context.getStore(CollectionsStore).getCollections(['category']),
        collections: this.context.getStore(CollectionsStore).getCollections(['collection']),
        products: this.context.getStore(ProductsListStore).getProducts(),
        totalPages: this.context.getStore(ProductsListStore).getTotalPages(),
        currentPage: this.context.getStore(ProductsListStore).getCurrentPage()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductListingPage.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            categories: nextProps._categories,
            collections: nextProps._collections,
            products: nextProps._products,
            totalPages: nextProps._totalPages,
            currentPage: nextProps._currentPage
        });
    }

    //*** View Controllers ***//

    handleSortChange = (value) => {
        this.context.router.transitionTo('products', {
            locale: this.context.getStore(IntlStore).getCurrentLocale()
        }, {sort: value});
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: intlStore.getCurrentLocale()}; // Base route params

        // Breadcrumbs
        var breadcrumbs = [
            {
                name: <FormattedMessage
                    message={intlStore.getMessage(intlData, 'homepage')}
                    locales={intlStore.getCurrentLocale()} />,
                to: 'homepage',
                params: routeParams
            },
            {
                name: <FormattedMessage
                    message={intlStore.getMessage(intlData, 'productsList')}
                    locales={intlStore.getCurrentLocale()} />
            }
        ];

        // Products SideMenu
        var filters = [
            {
                name: {en: 'Categories', pt: 'Categorias'},
                collections: this.state.categories
            },
            {
                name: {en: 'Collections', pt: 'Colecções'},
                collections: this.state.collections
            }
        ];

        //
        // Return
        //
        return (
            <div className="product-listing-page">
                <div>
                    <div className="product-listing-page__header">
                        <div className="product-listing-page__breadcrumbs">
                            <Breadcrumbs links={breadcrumbs}>
                                {this.state.totalPages > 0 ?
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'pagination')}
                                        locales={intlStore.getCurrentLocale()}
                                        currentPage={this.state.currentPage}
                                        totalPages={this.state.totalPages} />
                                    :
                                    null
                                }
                            </Breadcrumbs>
                        </div>
                        <div className="product-listing-page__sorting">
                            <ProductsSortingSelect onChange={this.handleSortChange} />
                        </div>
                    </div>

                    <div className="product-listing-page__products">
                        <ProductList title={<FormattedMessage
                                                    message={intlStore.getMessage(intlData, 'pageTitle')}
                                                    locales={intlStore.getCurrentLocale()} />}
                                     filters={filters}
                                     products={this.state.products}
                                     paginateTo="products"
                                     routeParams={routeParams}
                                     totalPages={this.state.totalPages}
                                     currentPage={this.state.currentPage} />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
ProductListingPage = connectToStores(ProductListingPage, [CollectionsStore, ProductsListStore], (context) => {
    return {
        _products: context.getStore(ProductsListStore).getProducts(),
        _totalPages: context.getStore(ProductsListStore).getTotalPages(),
        _currentPage: context.getStore(ProductsListStore).getCurrentPage(),
        _categories: context.getStore(CollectionsStore).getCollections(['category']),
        _collections: context.getStore(CollectionsStore).getCollections(['collection'])
    };
});

/**
 * Exports
 */
export default ProductListingPage;
