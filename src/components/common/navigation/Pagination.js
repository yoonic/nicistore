/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Translation data for this component
import intlData from './Pagination.intl';

/**
 * Component
 */
class Pagination extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Pagination.scss');
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);
        let query = this.props.query || {};
        let previousPage = (this.props.currentPage > 1) ? this.props.currentPage-1 : 1;
        let nextPage = (this.props.currentPage < this.props.totalPages) ? this.props.currentPage+1 : this.props.totalPages;

        let pageLinks = () => {
            let links = [];
            for (let i=0; i<this.props.totalPages; i++) {
                if ((i+1) === this.props.currentPage) {
                    links.push(
                        <li key={i} className="pagination__item pagination__item--selected">
                            {i+1}
                        </li>
                    );
                } else {
                    links.push(
                        <li key={i} className="pagination__item">
                            <Link className="pagination__link" to={this.props.to}
                                  params={this.props.params} query={Object.assign({page: i+1}, query)}>
                                {i+1}
                            </Link>
                        </li>
                    );
                }
            }
            return links;
        };

        //
        // Return
        //
        return (
            <div className="pagination">
                <ul>
                    <li className="pagination__item">
                        <Link className="pagination__link" to={this.props.to}
                            params={this.props.params} query={Object.assign({page: previousPage}, query)}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'previous')}
                                locales={intlStore.getCurrentLocale()} />
                        </Link>
                    </li>
                    {pageLinks()}
                    <li className="pagination__item">
                        <Link className="pagination__link" to={this.props.to}
                              params={this.props.params} query={Object.assign({page: nextPage}, query)}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'next')}
                                locales={intlStore.getCurrentLocale()} />
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

/**
 * Exports
 */
export default Pagination;
