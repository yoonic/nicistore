/**
 * Imports
 */
import React from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {Link} from 'react-router';

import {slugify} from '../../../utils/strings';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Text from '../typography/Text';

/**
 * Component
 */
class ProductListItem extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        productPlaceholderImage: undefined
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductListItem.scss');

        // Load static files
        this.setState({
            productPlaceholderImage: require('../images/image_placeholder.png')
        });
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        // Base route params
        let routeParams = {locale: intlStore.getCurrentLocale()};

        // Link params for this product
        let linkParams = Object.assign({
            productId: this.props.product.id,
            productSlug: slugify(intlStore.getMessage(this.props.product.name))
        }, routeParams);

        //
        // Return
        //
        return (
            <div className="product-list-item" itemScope itemType="http://schema.org/Product">
                <Link to="product-slug" params={linkParams}>
                    <div className="product-list-item__image">
                        {this.props.product.images && this.props.product.images.length > 0 ?
                            <span style={{display: 'none'}} itemProp="image">
                                {`//${this.props.product.images[0].url}`}
                            </span>
                            :
                            null
                        }
                        {this.props.product.images && this.props.product.images.length > 0 ?
                            <img src={`//${this.props.product.images[0].url}`} />
                            :
                            <img src={this.state.productPlaceholderImage} />
                        }
                    </div>
                    <div className="product-list-item__name" itemProp="name">
                        <Text size="small">
                            <FormattedMessage
                                message={intlStore.getMessage(this.props.product.name)}
                                locales={intlStore.getCurrentLocale()} />
                        </Text>
                        <span style={{display: 'none'}} itemProp="sku">{this.props.product.sku}</span>
                    </div>
                    {this.props.product.pricing ?
                        <div className="product-list-item__price" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                            <div style={{display: 'none'}} itemProp="price">
                                {this.props.product.pricing.retail}
                            </div>
                            <div style={{display: 'none'}} itemProp="priceCurrency">
                                {this.props.product.pricing.currency}
                            </div>
                            <div>
                                <Text size="medium" weight="bold">
                                    <FormattedNumber
                                        value={this.props.product.pricing.retail}
                                        style="currency"
                                        currency={this.props.product.pricing.currency} />
                                </Text>
                            </div>
                        </div>
                        :
                        null
                    }
                </Link>
            </div>
        );
    }
}

/**
 * Exports
 */
export default ProductListItem;
