/**
 * Imports
 */
import React from 'react';
import moment from 'moment';

// Required components
import Text from '../typography/Text';

/**
 * Component
 */
class UserComment extends React.Component {

    //*** Initial State ***//

    state = {
        defaultAvatar: undefined
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./UserComment.scss');

        // Load static content
        this.setState({defaultAvatar: require('./default_avatar.jpg')});
    }

    //*** Template ***//

    render() {
        return (
            <div className="user-comment">
                <div className="user-comment__avatar">
                    <div className="user-comment__avatar-image">
                        {this.props.avatar ?
                            <img src={this.props.avatar} alt="Avatar" />
                            :
                            <img src={this.state.defaultAvatar} alt="Default avatar" />
                        }
                    </div>
                </div>
                <div className="user-comment__content">
                    <div className="user-comment__details">
                        <div className="user-comment__author" itemProp="name">
                            <Text size="small" weight="bold">{this.props.author}</Text>
                        </div>
                        <div className="user-comment__date" itemProp="commentTime">
                            <Text size="small">
                                <i className="fa fa-clock-o" aria-hidden="true" />
                                {moment(this.props.date).format('YYYY/MM/DD HH:mm:ss')}
                            </Text>
                        </div>
                    </div>
                    <div className="user-comment__message" itemProp="commentText">
                        <Text>{this.props.children}</Text>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default UserComment;
