import React, { Component } from 'react';

class Message extends Component {
  render() {
    const notification = <div className="notification">
      <span className="notification-content">this.props.messages.content</span>
    </div>

    return (
      <div>
        <div className="message">
          <span className="message-username">{this.props.message.username ? this.props.message.username : 'Anonymous'}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      </div>
    )
  }
}

export default Message;