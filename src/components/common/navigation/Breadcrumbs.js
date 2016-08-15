/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {Link} from 'react-router';

// Flux
import ResponsiveStore from '../../../stores/Application/ResponsiveStore';

// Required components
import Text from '../typography/Text';

/**
 * Component
 */
class Breadcrumbs extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        breakpoint: this.context.getStore(ResponsiveStore).getBreakPoint()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Breadcrumbs.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({breakpoint: nextProps._breakpoint});
    }

    //*** Template ***//

    render() {

        // In mobile, only last crumb with link is shown. Figure out what it is.
        let backLink;
        let links = this.props.links.filter(l => l.to && l.params);
        if (links.length > 0) {
            backLink = links[links.length-1];
        }

        // Current crumb weight
        let currentWeight = 'normal';
        if (this.props.weight === 'bold') {
            currentWeight = 'bold';
        }

        return (
            <div className="breadcrumbs">
                {this.state.breakpoint !== 'handhelds' || this.props.disableResponsive ?
                    <nav>
                        <ul className="breadcrumbs__list">
                            {this.props.links && this.props.links.map(function (link, idx) {
                                if (link.to && link.params) {
                                    return (
                                        <li key={idx} className="breadcrumbs__list-item">
                                            <Link className="breadcrumbs__link" to={link.to} params={link.params}>
                                                <Text size="small">{link.name}</Text>
                                            </Link>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={idx} className="breadcrumbs__list-item">
                                            <Text size="small" weight="bold">{link.name}</Text>
                                        </li>
                                    );
                                }
                            })}
                            {this.props.children ?
                                <li className="breadcrumbs__list-item">
                                    <Text size="small" weight={currentWeight}>
                                        {this.props.children}
                                    </Text>
                                </li>
                                :
                                null
                            }
                        </ul>
                    </nav>
                    :
                    <div className="breadcrumbs__back">
                        {backLink ?
                            <Link className="breadcrumbs__back-link" to={backLink.to} params={backLink.params}>
                                <Text>
                                    &#10094; {backLink.name}
                                </Text>
                            </Link>
                            :
                            null
                        }
                    </div>
                }

            </div>
        );
    }
}

/**
 * Flux
 */
Breadcrumbs = connectToStores(Breadcrumbs, [ResponsiveStore], (context) => {
    return {
        _breakpoint: context.getStore(ResponsiveStore).getBreakPoint()
    };
});

/**
 * Exports
 */
export default Breadcrumbs;
