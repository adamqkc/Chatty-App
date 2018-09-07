import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  render() {
    // Assign new users 'Anonymous' as default username
    const username = this.props.message.username ? this.props.message.username : 'Anonymous';

    return (
      <div>
        <div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      </div>
    )
  }
}

Message.propTypes = {
  message: PropTypes.object
}


export default Message;