import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [],
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')
    
    this.socket.onopen = function() {
      console.log('Client connected to server!')
    }
    
    this.socket.onmessage = (data) => {
      this.saveMessage(data);
    }

    setTimeout(() => {
      const newMessage = {username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)

      this.setState({ messages: messages })
    }, 1000);
  }

  sendMessage(event) {
    if (event.key === 'Enter') {
      const contentField = event.target;
      const newMessage = {
        type: 'message', 
        username: this.state.currentUser.name,
        content: contentField.value,
      }
      contentField.value = '';
      this.socket.send(JSON.stringify(newMessage));
    }
  }

  saveMessage(message) {
    const newMessage = JSON.parse(message.data)
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage];
    this.setState({ messages: newMessages });
  }

  changeName(event) {
    if (event.key === 'Enter') {
      let nameField = event.target;
      const newName = { name: nameField.value }
      nameField.value = '';
      this.socket.send(JSON.stringify(newName));
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        
        <main className='messages'>
          <MessageList messages={this.state.messages}/>
        </main>
        
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} changeName={this.changeName}/>
      </div>
    );
  }
}

export default App;
