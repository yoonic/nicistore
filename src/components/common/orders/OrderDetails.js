/**
 * Imports
 */
import React from 'react';
import moment from 'moment';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import AddressPreview from '../forms/AddressPreview';
import Breakpoint from '../../core/Breakpoint';
import Heading from '../typography/Heading';
import Table from '../tables/Table';
import Text from '../typography/Text';

import OrderStatus from './OrderStatus';

// Translation data for this component
import intlData from './OrderDetails.intl';

/**
 * Component
 */
class OrderDetails extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./OrderDetails.scss');
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        // Order products list table
        let headings = [
            <FormattedMessage message={intlStore.getMessage(intlData, 'nameHeading')}
                              locales={intlStore.getCurrentLocale()} />,
            <span>ID</span>,
            <FormattedMessage message={intlStore.getMessage(intlData, 'skuHeading')}
                              locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage message={intlStore.getMessage(intlData, 'quantityHeading')}
                              locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage message={intlStore.getMessage(intlData, 'priceHeading')}
                              locales={intlStore.getCurrentLocale()} />
        ];
        let rows = this.props.order.checkout.cart.products.map((product) => {
            return {
                data: [
                    <Text size="medium">
                        <FormattedMessage message={intlStore.getMessage(product.details.name)}
                                          locales={intlStore.getCurrentLocale()} />
                    </Text>,
                    <span className="order-details__link">
                        <Link to="product" params={Object.assign({productId: product.id}, routeParams)}>
                            <Text size="small">{product.id}</Text>
                        </Link>
                    </span>,
                    <Text size="medium">{product.details.sku}</Text>,
                    <Text size="medium">{product.quantity}</Text>,
                    <FormattedNumber value={product.details.pricing.retail}
                                     style="currency"
                                     currency={this.props.order.checkout.currency} />
                ]
            };
        });

        //
        // Return
        //
        return (
            <div className="order-details">
                <div className="order-details__overview">
                    {this.props.customerDetails !== false ?
                        <div className="order-details__overview-item">
                            <div className="order-details__overview-item-label">
                                <Text size="medium" weight="bold">
                                    <FormattedMessage message={intlStore.getMessage(intlData, 'customer')}
                                                      locales={intlStore.getCurrentLocale()} />:
                                </Text>
                            </div>
                            <div className="order-details__overview-item-value">
                                <Text size="medium">
                                    {this.props.order.customer.name} ({this.props.order.customer.email})
                                    {this.props.order.customer.userId ?
                                        <span className="order-details__user-icon">
                                        <i className="fa fa-user" aria-hidden="true" />
                                    </span>
                                        :
                                        null
                                    }
                                </Text>
                            </div>
                        </div>
                        :
                        null
                    }
                    <div className="order-details__overview-item">
                        <div className="order-details__overview-item-label">
                            <Text size="medium" weight="bold">
                                <FormattedMessage message={intlStore.getMessage(intlData, 'createdAt')}
                                                  locales={intlStore.getCurrentLocale()} />:
                            </Text>
                        </div>
                        <div className="order-details__overview-item-value">
                            <Text size="medium">
                                {moment(this.props.order.createdAt).format('YYYY/MM/DD HH:mm:ss')}
                            </Text>
                        </div>
                    </div>
                    <div className="order-details__overview-item">
                        <div className="order-details__overview-item-label">
                            <Text size="medium" weight="bold">
                                <FormattedMessage message={intlStore.getMessage(intlData, 'id')}
                                                  locales={intlStore.getCurrentLocale()} />:
                            </Text>
                        </div>
                        <div className="order-details__overview-item-value">
                            <Text size="small">
                                {this.props.order.id}
                            </Text>
                        </div>
                    </div>
                    <div className="order-details__overview-item">
                        <div className="order-details__overview-item-label">
                            <Text size="medium" weight="bold">
                                <FormattedMessage message={intlStore.getMessage(intlData, 'status')}
                                                  locales={intlStore.getCurrentLocale()} />:
                            </Text>
                        </div>
                        <div className="order-details__overview-item-value">
                            <OrderStatus status={this.props.order.status} />
                        </div>
                    </div>
                </div>
                <div className="order-details__detail">
                    <Heading size="medium">
                        <FormattedMessage message={intlStore.getMessage(intlData, 'billingDetails')}
                                          locales={intlStore.getCurrentLocale()} />
                    </Heading>
                    <div className="order-details__detail-content">
                        <div>
                            <AddressPreview address={this.props.order.checkout.billingAddress} />
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                <FormattedMessage message={intlStore.getMessage(intlData, 'paymentMethod')}
                                                  locales={intlStore.getCurrentLocale()} />:
                            </Text>
                            <br />
                            <Text size="medium">{this.props.order.checkout.paymentMethod}</Text>
                        </div>
                    </div>

                </div>
                <div className="order-details__detail">
                    <Heading size="medium">
                        <FormattedMessage message={intlStore.getMessage(intlData, 'shippingDetails')}
                                          locales={intlStore.getCurrentLocale()} />
                    </Heading>
                    <div className="order-details__detail-content">
                        <div>
                            <AddressPreview address={this.props.order.checkout.shippingAddress} />
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                <FormattedMessage message={intlStore.getMessage(intlData, 'shippingMethod')}
                                                  locales={intlStore.getCurrentLocale()} />:
                            </Text>
                            <br />
                            <Text size="medium">{this.props.order.checkout.shippingMethod}</Text>
                            <br />
                            <br />
                            <Text size="medium" weight="bold">
                                <FormattedMessage message={intlStore.getMessage(intlData, 'shippingCost')}
                                                  locales={intlStore.getCurrentLocale()} />:
                            </Text>
                            <br />
                            <Text size="medium">
                                <FormattedNumber value={this.props.order.checkout.shippingCost}
                                                 style="currency"
                                                 currency={this.props.order.checkout.currency} />
                            </Text>
                        </div>
                    </div>
                </div>
                <div className="order-details__detail">
                    <Heading size="medium">
                        <FormattedMessage message={intlStore.getMessage(intlData, 'products')}
                                          locales={intlStore.getCurrentLocale()} />
                    </Heading>
                    <div className="order-details__detail-content">
                        <Breakpoint point="handhelds">
                            {rows.map(function (row, idx) {
                                return (
                                    <div key={idx} className="order-details__product-block">
                                        <div className="order-details__product-name">
                                            {row.data[0]}
                                        </div>
                                        <div className="order-details__product-quantity">
                                            {row.data[3]}&nbsp;x&nbsp;{row.data[4]}
                                        </div>
                                    </div>
                                );
                            })}
                        </Breakpoint>
                        <Breakpoint point="medium-screens">
                            <Table headings={headings} rows={rows} />
                        </Breakpoint>
                        <Breakpoint point="wide-screens">
                            <Table headings={headings} rows={rows} />
                        </Breakpoint>
                    </div>
                    <div className="order-details__detail-content order-details__detail-content--column">
                        <div>
                            <Text size="medium" weight="bold">
                                <FormattedMessage message={intlStore.getMessage(intlData, 'subTotal')}
                                                  locales={intlStore.getCurrentLocale()} />:
                            </Text>
                            <br />
                            <FormattedNumber value={this.props.order.checkout.subTotal}
                                             style="currency"
                                             currency={this.props.order.checkout.currency} />
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                <FormattedMessage message={intlStore.getMessage(intlData, 'shipping')}
                                                  locales={intlStore.getCurrentLocale()} />:
                            </Text>
                            <br />
                            <FormattedNumber value={this.props.order.checkout.shippingCost}
                                             style="currency"
                                             currency={this.props.order.checkout.currency} />
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                <FormattedMessage message={intlStore.getMessage(intlData, 'vat')}
                                                  locales={intlStore.getCurrentLocale()} />:
                            </Text>
                            <br />
                            <FormattedNumber value={this.props.order.checkout.vatTotal}
                                             style="currency"
                                             currency={this.props.order.checkout.currency} />
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                <FormattedMessage message={intlStore.getMessage(intlData, 'total')}
                                                  locales={intlStore.getCurrentLocale()} />:
                            </Text>
                            <br />
                            <FormattedNumber value={this.props.order.checkout.total}
                                             style="currency"
                                             currency={this.props.order.checkout.currency} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default OrderDetails;
