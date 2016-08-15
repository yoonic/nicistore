/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

import {slugify} from '../../../utils/strings';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Heading from '../typography/Heading';
import Text from '../typography/Text';

/**
 * Component
 */
class ArticleSuggestions extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ArticleSuggestions.scss');
    }
    
    //*** Template ***//
    
    render() {
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: intlStore.getCurrentLocale()}; // Base route params
        return (
            <div className="article-suggestions">
                {this.props.children ?
                    <Heading size="small" align="center">{this.props.children}</Heading>
                    :
                    null
                }
                <div className="article-suggestions__list">
                    {this.props.articles.map(function (article) {
                        let articleRouteParams = Object.assign({
                            contentId: article.id,
                            contentSlug: slugify(intlStore.getMessage(article.name))
                        }, routeParams);
                        return (
                            <div className="article-suggestions__item">
                                <div className="article-suggestions__item-icon">
                                    <i className="fa fa-file-text-o fa-2x" aria-hidden="true" />
                                </div>
                                <div className="article-suggestions__title">
                                    <Link className="article-suggestions__link"
                                          to="article-slug"
                                          params={articleRouteParams}>
                                        <Text>
                                            <FormattedMessage message={intlStore.getMessage(article.name)}
                                                              locales={intlStore.getCurrentLocale()} />
                                        </Text>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default ArticleSuggestions;
