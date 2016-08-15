/**
 * Imports
 */
import React from 'react';

/**
 * Component
 */
class Carousel extends React.Component {

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Carousel.scss');
    }

    //*** Template ***//

    render() {
        return (
            <div className="carousel">
                <div className={'gallery autoplay items-' + this.props.images.length}>
                    {this.props.images.map(function (img, idx) {
                        let itemId = `item-${idx+1}`;
                        return (
                            <div key={idx} id={itemId} className="control-operator"></div>
                        );
                    })}

                    {this.props.images.map(function (img, idx) {
                        return (
                            <figure key={idx} className="item">
                                {img.link ?
                                    <a href={img.link}><img src={img.src} /></a>
                                    :
                                    <img src={img.src} />
                                }

                            </figure>
                        );
                    })}

                    <div className="controls">
                        {this.props.images.map(function (img, idx) {
                            let itemHref = `#item-${idx+1}`;
                            return (
                                <a key={idx} href={itemHref} className="control-button">•</a>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default Carousel;
