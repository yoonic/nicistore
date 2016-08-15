/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../common/typography/Heading';

/**
 * Component
 */
class CheckoutSection extends React.Component {

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CheckoutSection.scss');
    }

    //*** Template ***//

    render() {

        let sectionClass = 'checkout-section';
        if (this.props.className) {
            sectionClass += ` ${this.props.className}`;
        }

        let numberClass = 'checkout-section__number';
        let titleClass = 'checkout-section__title';
        let headingSize = 'medium';
        if (['small', 'medium'].indexOf(this.props.size) !== -1) {
            numberClass += ` checkout-section__number--${this.props.size}`;
            titleClass += ` checkout-section__title--${this.props.size}`;
            headingSize = this.props.size;
        }

        return (
            <div className={sectionClass}>
                <div className="checkout-section__header">
                    <div className={numberClass}>
                        <div>
                            {this.props.number}
                        </div>
                    </div>
                    <div className={titleClass}>
                        <Heading size={headingSize}>
                            {this.props.title}
                        </Heading>
                    </div>
                </div>
                <div className="checkout-section__body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default CheckoutSection;
