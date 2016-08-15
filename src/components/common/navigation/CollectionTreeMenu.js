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
import Text from '../typography/Text';

import TreeMenu from './TreeMenu';

/**
 * Component
 */
class CollectionTreeMenu extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        openedDrawer: undefined
    };
    
    //*** Component Lifecycle ***//
    
    componentDidMount() {
        
        // Component styles
        require('./CollectionTreeMenu.scss');
    }

    //*** View Controllers ***//

    handleMouseEnter = (collection) => {
        this.setState({openedDrawer: collection});
    };

    handleMouseLeave = () => {
        this.setState({openedDrawer: null});
    };
    
    //*** Template ***//
    
    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        //
        // Return
        //
        return (
            <div className="collection-tree-menu">
                <nav className="collection-tree-menu__nav" onMouseLeave={this.handleMouseLeave}>
                    <ul>
                        {this.props.collections.map((collection, idx) => {
                            let className = 'collection-tree-menu__root-item';
                            if (this.state.openedDrawer && this.state.openedDrawer.id === collection.id) {
                                className += ' collection-tree-menu__root-item--selected';
                            }
                            let params = Object.assign({
                                collectionId: collection.id,
                                collectionSlug: slugify(intlStore.getMessage(collection.name))
                            }, routeParams);
                            return (
                                <li key={idx} className={className}
                                    onMouseEnter={this.handleMouseEnter.bind(null, collection)}>
                                    <Text className="collection-tree-menu__root-item-label" size="medium">
                                        <Link to='collection-slug' params={params}>
                                            <FormattedMessage
                                                message={intlStore.getMessage(collection.name)}
                                                locales={intlStore.getCurrentLocale()} />
                                        </Link>
                                    </Text>
                                </li>
                            );
                        })}
                    </ul>
                    {this.state.openedDrawer && this.state.openedDrawer.children && this.state.openedDrawer.children.length > 0 ?
                        <div className="collection-tree-menu__drawer">
                            <div className="collection-tree-menu__drawer-block">
                                <TreeMenu links={this.state.openedDrawer.children.map(function (collection) {
                                    return {
                                        name: intlStore.getMessage(collection.name),
                                        to: 'collection-slug',
                                        params: Object.assign({
                                            collectionId: collection.id,
                                            collectionSlug: slugify(intlStore.getMessage(collection.name))
                                        }, routeParams)
                                    };
                                })} />
                            </div>
                        </div>
                        :
                        null
                    }
                </nav>
            </div>
        );
    }
}

/**
 * Exports
 */
export default CollectionTreeMenu;