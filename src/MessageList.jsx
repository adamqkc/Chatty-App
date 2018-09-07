import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messageList = this.props.messages.map((message) => {
      if (message.notification) {
        return (
          <div className="notification">
            <span className="notification-content">{message.content}</span>
          </div>)
      } else {
        return <Message key={message.id} message={message} />
      }
    })

    return (
      <div className='system'>
        {messageList}
      </div>
    )
  }
}

export default MessageList;