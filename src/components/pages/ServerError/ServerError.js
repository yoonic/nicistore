/**
 * Imports
 */
import React from 'react';

/**
 * Component
 */
class ServerError extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context) {
        return {
            title: 'Server Error'
        }
    };

    //*** Template ***//

    render() {
        return <h1>Server Error</h1>;
    }
}

/**
 * Exports
 */
export default ServerError;
