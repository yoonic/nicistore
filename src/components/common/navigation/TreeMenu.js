/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';
import ResponsiveStore from '../../../stores/Application/ResponsiveStore';

// Required Components
import Heading from '../typography/Heading';
import Text from '../typography/Text';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class TreeMenu extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        breakpoint: this.context.getStore(ResponsiveStore).getBreakPoint(),
        opened: this.context.getStore(ResponsiveStore).getBreakPoint() === 'wide-screens' || this.context.getStore(ResponsiveStore).getBreakPoint() === 'medium-screens'
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./TreeMenu.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            breakpoint: nextProps._breakpoint,
            opened: nextProps._breakpoint === 'wide-screens' || nextProps._breakpoint === 'medium-screens'
        });
    }

    //*** View Controllers ***//

    handleTitleClick = () => {
        if (this.state.breakpoint === 'handhelds') {
            this.setState({opened: !this.state.opened});
        }
    };

    handleItemClick = (id, evt) => {
        evt.stopPropagation();
        if (id === this.props.selected) {
            this.props.onClick(null);
        } else if (id !== this.props.self) {
            this.props.onClick(id);
        }
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);

        // Process title class
        let titleClass = 'tree-menu__title';
        if (this.state.breakpoint === 'handhelds') {
            titleClass += ' tree-menu__title--clickable';
        }

        // Process body class
        let bodyClass = 'tree-menu__body';
        if (!this.state.opened) {
            bodyClass += ' tree-menu__body--closed';
        }

        // If applicable, return title actions UI block
        let titleActions = () => {
            if (this.state.breakpoint === 'handhelds') {
                if (this.state.opened === true) {
                    return <span className="tree-menu__collapse-btn">-</span>;
                } else {
                    return <span className="tree-menu__expand-btn">+</span>;
                }
            }
        };

        // Returns the class name for given item
        let getItemClass = (item) => {
            let itemClass = 'tree-menu__item';
            if (item.id === this.props.selected) {
                itemClass += ' tree-menu__item--selected';
            }
            if (item.id === this.props.self) {
                itemClass += ' tree-menu__item--self';
            }
            return itemClass;
        };

        // Returns the children block
        let children = (item) => {
            if (item.children && item.children.length > 0) {
                return item.children.map((child, idx) => {
                    return (
                        <ul key={idx} className="tree-menu__child">
                            <li onClick={this.handleItemClick.bind(null, child.id)}>
                                <div className={getItemClass(child)}>
                                    <Text size="small">
                                        <span className="tree-menu__link">
                                            <FormattedMessage
                                                message={intlStore.getMessage(child.name)}
                                                locales={intlStore.getCurrentLocale()} />
                                        </span>
                                    </Text>
                                </div>
                                {children(child)}
                            </li>
                        </ul>
                    );
                });
            }
        };

        // Returns the items block according to what was provided (i.e. links, items, etc)
        let items = () => {
            if (this.props.links) {
                return this.props.links.map(function (link, idx) {
                    let itemClass = 'tree-menu__item';
                    if (link.selected === true) {
                        itemClass += ' tree-menu__item--selected';
                    }
                    return (
                        <li key={idx} className={itemClass}>
                            <Link className="tree-menu__link"
                                  to={link.to} params={link.params} query={link.query}>
                                <Text size="small">{link.name}</Text>
                            </Link>
                        </li>
                    );
                });
            } else if (this.props.items) {
                return this.props.items.map((item, idx) => {
                    return (
                        <li key={idx} onClick={this.handleItemClick.bind(null, item.id)}>
                            <div className={getItemClass(item)}>
                                <Text size="small">
                                    <span className="tree-menu__link">
                                        <FormattedMessage
                                            message={intlStore.getMessage(item.name)}
                                            locales={intlStore.getCurrentLocale()} />
                                    </span>
                                </Text>
                            </div>
                            {children(item)}
                        </li>
                    );
                });
            }
        };

        //
        // Return
        //
        return (
            <div className="tree-menu">
                {this.props.children ?
                    <div className={titleClass} onClick={this.handleTitleClick}>
                        <div className="tree-menu__title-label">
                            <Heading size="small">{this.props.children}</Heading>
                        </div>
                        <div className="tree-menu__title-actions">
                            {titleActions()}
                        </div>
                    </div>
                    :
                    null
                }
                <div className={bodyClass}>
                    <ul>
                        {items()}
                    </ul>
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
TreeMenu = connectToStores(TreeMenu, [ResponsiveStore], (context) => {
    return {
        _breakpoint: context.getStore(ResponsiveStore).getBreakPoint()
    };
});

/**
 * Default Props
 */
TreeMenu.defaultProps = {
    onClick: function (value) { debug(`onClick not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default TreeMenu;
