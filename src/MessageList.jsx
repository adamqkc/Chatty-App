import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messageList = this.props.messages.map((message) => {
      if (message.type === 'incomingNotification') {
        return (
          <div className="notification" key={message.id}>
            <span className="notification-content"><i>{message.content}</i></span>
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