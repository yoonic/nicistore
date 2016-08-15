/**
 * Imports
 */
import React from 'react';

// Flux
import ApplicationStore from '../../../stores/Application/ApplicationStore';

// Required components
import FormLabel from './FormLabel';
import Textarea from './Textarea';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class MarkdownEditor extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        text: 'Fusce dapibus, tellus ac cursus commodo'
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./MarkdownEditor.scss');
    }

    //*** View Controllers ***//

    handleChange = (text, medium)  => {
        this.setState({text: text});
    };

    //*** Template ***//

    render() {

        let id = `markdown-editor-${this.context.getStore(ApplicationStore).uniqueId()}`;

        return (
            <div className="markdown-editor">
                {this.props.label ?
                    <div className="markdown-editor__label">
                        <FormLabel for={id}>{this.props.label}</FormLabel>
                    </div>
                    :
                    null
                }
                <Textarea rows="20"
                          value={this.props.value}
                          onChange={this.props.onChange} />
            </div>
        );
    }
}

/**
 * Default Props
 */
MarkdownEditor.defaultProps = {
    onChange: function (value) { debug(`onChange not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default MarkdownEditor;
