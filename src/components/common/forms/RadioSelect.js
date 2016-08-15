/**
 * Imports
 */
import React from 'react';

// Flux
import ApplicationStore from '../../../stores/Application/ApplicationStore';

// Required components
import Text from '../typography/Text';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class RadioSelect extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./RadioSelect.scss');
    }

    //*** Template ***//

    render() {
        let groupId = `radio-select-${this.context.getStore(ApplicationStore).uniqueId()}`;
        return (
            <div className="radio-select">
                {this.props.options.map((option, idx) => {
                    let radioId = `radio-${this.context.getStore(ApplicationStore).uniqueId()}`;
                    return (
                        <div key={idx} className="radio-select__input-option">
                            <div className="radio-select__item">
                                <div className="radio-select__input">
                                    <input id={radioId} name={groupId} type="radio"
                                           onChange={this.props.onChange.bind(null, option.value)}
                                           checked={this.props.value === option.value} />
                                </div>
                                <div className="radio-select__label">
                                    <label htmlFor={radioId}>
                                        <Text size="small">
                                            {option.name}
                                        </Text>
                                        {option.detail ?
                                            <Text className="radio-select__option-detail" size="small" weight="bold">
                                                {option.detail}
                                            </Text>
                                            :
                                            null
                                        }
                                    </label>
                                </div>
                            </div>
                            {this.props.value === option.value && option.children ?
                                <div className="radio-select__children">
                                    {option.children}
                                </div>
                                :
                                null
                            }
                        </div>
                    );
                })}
            </div>
        );
    }
}

/**
 * Default Props
 */
RadioSelect.defaultProps = {
    onChange: function (value) { debug(`onChange not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default RadioSelect;
