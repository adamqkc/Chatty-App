import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // Conditional render parses for messages and notifications and renders accordingly
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

MessageList.propTypes = {
  messages: PropTypes.array
};

export default MessageList;