import React, { Component } from 'react';

class Message extends Component {
  render() {
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

export default Message;