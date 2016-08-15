/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../../stores/Application/IntlStore';

// Required Components
import Heading from '../../typography/Heading';
import NewsletterSubscription from '../../forms/NewsletterSubscription';
import Text from '../../typography/Text';

// Translation data for this component
import intlData from './Footer.intl';

/**
 * Component
 */
class Footer extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Footer.scss');
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: intlStore.getCurrentLocale()};

        // Stores
        let storeLinks = [
            {name: 'Arrábida Shopping', link: {to: 'stores', params: routeParams}},
            {name: 'Mar Shopping', link: {to: 'stores', params: routeParams}},
            {name: 'Loja Foz', link: {to: 'stores', params: routeParams}},
            {name: 'Loja Outlet', link: {to: 'stores', params: routeParams}}
        ];

        // Info links
        let infoLinks = [
            {name: 'Apoio ao Cliente', link: {to: 'info', params: routeParams}},
            {name: 'Portes de Envio', link: {to: 'info', params: routeParams}},
            {name: 'Termos e Condições', link: {to: 'info', params: routeParams}}
        ];

        // Return a content block's items
        let blockItems = (items) => {
            return items.map(function (item, idx) {
                return (
                    <li key={idx} className="footer__list-item">
                        <Link className="footer__link" to={item.link.to} params={item.link.params}>
                            <Text size="small">{item.name}</Text>
                        </Link>
                    </li>
                );
            });
        };

        //
        // Return
        //

        return (
            <div className="footer">
                <div className="footer__container">
                    <div className="footer__content">

                        <div className="footer__block">
                            <div className="footer__block-title">
                                <Heading size="small">
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'storesTitle')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Heading>
                            </div>
                            <div className="footer__block-content">
                                <ul>
                                    {blockItems(storeLinks)}
                                </ul>
                            </div>
                        </div>

                        <div className="footer__block">
                            <div className="footer__block-title">
                                <Heading size="small">
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'infoTitle')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Heading>
                            </div>
                            <div className="footer__block-content">
                                <ul>
                                    {blockItems(infoLinks)}
                                </ul>
                            </div>
                        </div>

                        <div className="footer__block">
                            <div className="footer__block-title">
                                <Heading size="small">
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'socialTitle')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Heading>
                            </div>
                            <div className="footer__block-content">
                                <ul>
                                    <li className="footer__social-item">
                                        <div className="footer__social-icon footer__facebook-icon"></div>
                                        <div>
                                            <a className="footer__link footer__social-link" href="//facebook.com/nicistore" target="_blank">
                                                <Text size="small">Facebook</Text>
                                            </a>
                                        </div>
                                    </li>
                                    <li className="footer__social-item">
                                        <div className="footer__social-icon footer__instagram-icon"></div>
                                        <div>
                                            <a className="footer__link footer__social-link" href="//instagram.com/nicistore" target="_blank">
                                                <Text size="small">Instagram</Text>
                                            </a>
                                        </div>
                                    </li>
                                    <li className="footer__social-item">
                                        <div className="footer__social-icon footer__pinterest-icon"></div>
                                        <div>
                                            <a className="footer__link footer__social-link" href="//pinterest.com/nicistore" target="_blank">
                                                <Text size="small">Pinterest</Text>
                                            </a>
                                        </div>
                                    </li>
                                    <li className="footer__social-item">
                                        <div className="footer__social-icon footer__twitter-icon"></div>
                                        <div>
                                            <a className="footer__link footer__social-link" href="//twitter.com/nicistore" target="_blank">
                                                <Text size="small">Twitter</Text>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="footer__block">
                            <div className="footer__block-title">
                                <Heading size="small">
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'newsletterTitle')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Heading>
                            </div>
                            <div className="footer__block-content">
                                <NewsletterSubscription />
                            </div>
                        </div>

                    </div>
                    <div className="footer__copyright">
                        <Text size="small">© {new Date().getFullYear()} NICI</Text>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default Footer;
