/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../buttons/Button';
import Heading from '../typography/Heading';
import Text from '../typography/Text';
import Textarea from '../forms/Textarea';

import UserComment from './UserComment';

// Translation data for this component
import intlData from './CommentBox.intl';

// Instantiate debugger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class CommentBox extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        message: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CommentBox.scss');
    }

    //*** View Controllers ***//

    handleTextareaChange = (value) => {
        this.setState({message: value});
    };

    handleButtonClick = () => {

        let intlStore = this.context.getStore(IntlStore);

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.message) {
            fieldErrors.message = intlStore.getMessage(intlData, 'fieldRequired');
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick(this.state.message);
        }
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: intlStore.getCurrentLocale()}; // Base route params

        // Return the list UI block, according to whether there are comments or not
        let comments = () => {
            if (this.props.comments && this.props.comments.length > 0) {
                return (
                    <div className="comment-box__list">
                        {this.props.comments.map(function (comment) {
                            return (
                                <div className="comment-box__comment-item">
                                    <UserComment author={comment.user.name} date={comment.createdAt}>
                                        {comment.message}
                                    </UserComment>
                                </div>
                            );
                        })}
                    </div>
                );
            } else {
                return (
                    <div className="comment-box__no-comments">
                        <Text>
                            <FormattedMessage message={intlStore.getMessage(intlData, 'noComments')}
                                              locales={intlStore.getCurrentLocale()} />!
                        </Text>
                    </div>
                );
            }
        };

        let loginTranslation = (
            <Link className="comment-box__link" to="login" params={routeParams}>
                <Text>
                    <FormattedMessage message={intlStore.getMessage(intlData, 'login')}
                                      locales={intlStore.getCurrentLocale()} />
                </Text>
            </Link>
        );

        let registerTranslation = (
            <Link className="comment-box__link" to="register" params={routeParams}>
                <Text>
                    <FormattedMessage message={intlStore.getMessage(intlData, 'register')}
                                      locales={intlStore.getCurrentLocale()} />
                </Text>
            </Link>
        );

        //
        // Return
        //
        return (
            <div className="comment-box">
                <div className="comment-box__comments" itemScope itemType="http://schema.org/UserComments">
                    <Heading size="medium">
                        <FormattedMessage message={intlStore.getMessage(intlData, 'comments')}
                                          locales={intlStore.getCurrentLocale()}
                                          total={(this.props.comments) ? this.props.comments.length : 0} />
                    </Heading>
                    {comments()}
                </div>
                {this.props.user ?
                    <div className="comment-box__submit">
                    <Textarea label={intlStore.getMessage(intlData, 'leaveComment')}
                              onChange={this.handleTextareaChange}
                              error={this.state.fieldErrors.message}
                              disabled={this.props.disabled || this.props.loading} />
                        <div className="comment-box__submit-actions">
                            <div className="comment-box__button">
                                <Button type="primary" onClick={this.handleButtonClick}
                                        disabled={this.props.disabled} loading={this.props.loading}>
                                    <i className="fa fa-comment-o" aria-hidden="true" />
                                    &nbsp;
                                    <FormattedMessage message={intlStore.getMessage(intlData, 'submit')}
                                                      locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="comment-box__no-user">
                        <Text>
                            <FormattedMessage message={intlStore.getMessage(intlData, 'noUser')}
                                              locales={intlStore.getCurrentLocale()}
                                              login={loginTranslation}
                                              register={registerTranslation} />
                        </Text>
                    </div>
                }
            </div>
        );
    }
}

/**
 * Default Props
 */
CommentBox.defaultProps = {
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default CommentBox;
