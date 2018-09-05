import React, { Component } from 'react';

import Message from './Message.jsx';

const uuid = require('uuid/v4');


class MessageList extends Component {
  render() {
    console.log('Rendering <MessageList />')
    const messageList = this.props.messages.map((message) => <Message message={message} key={uuid()}/>);

    return(
      <main className='messages'>
        {messageList}
      </main>
    )
  }
}

export default MessageList;