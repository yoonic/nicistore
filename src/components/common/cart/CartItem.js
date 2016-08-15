/**
 * Imports
 */
import React from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';
import triggerDrawer from '../../../actions/Application/triggerDrawer';

// Required components
import QuantitySelector from '../forms/QuantitySelector';
import Text from '../typography/Text';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class CartItem extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        placeholderImage: undefined
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CartItem.scss');

        // Load static files
        this.setState({placeholderImage: require('../images/image_placeholder.png')});
    }

    //*** View Controllers ***//

    handleLinkClick = () => {
        this.context.executeAction(triggerDrawer, null);
    };

    //*** Template ***//

    render() {

        let intlStore = this.context.getStore(IntlStore);
        let product = this.props.product.details;
        let linkParams = {
            locale: intlStore.getCurrentLocale(),
            productId: product.id
        };

        return (
            <div className="cart-item">
                <div className="cart-item__frame">
                    <Link className="cart-item__link"
                          to="product" params={linkParams}
                          onClick={this.handleLinkClick}>
                        <img className="cart-item__image" src={product.images && product.images.length > 0 ? `//${product.images[0].url}` : this.state.placeholderImage} />
                    </Link>
                </div>
                <div className="cart-item__details">
                    <div className="name">
                        <Text size="small">
                            <Link className="cart-item__link"
                                  to="product" params={linkParams}
                                  onClick={this.handleLinkClick}>
                                <FormattedMessage message={intlStore.getMessage(product.name)}
                                                  locales={intlStore.getCurrentLocale()} />
                            </Link>
                        </Text>
                    </div>
                    <div className="cart-item__price">
                        <Text size="small" weight="bold">
                            <FormattedNumber value={product.pricing.retail}
                                             style="currency"
                                             currency={product.pricing.currency} />
                        </Text>
                    </div>
                    <div className="cart-item__quantity">
                        <QuantitySelector value={this.props.product.quantity}
                                          onChange={this.props.onQuantityChange} />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
CartItem.defaultProps = {
    onQuantityChange: function (value) { debug(`onQuantityChange not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default CartItem;
