/**
 * Imports
 */
import React from 'react';
import marked from 'marked';

/**
 * Component
 */
class MarkdownHTML extends React.Component {
    
    //*** Component Lifecycle ***//
    
    componentDidMount() {
        
        // Component styles
        require('./MarkdownHTML.scss');
    }
    
    //*** Template ***//
    
    render() {
        return (
            <div className="markdown-html"
                dangerouslySetInnerHTML={{__html: marked(this.props.children || '')}}>
            </div>
        );
    }
}

/**
 * Exports
 */
export default MarkdownHTML;
