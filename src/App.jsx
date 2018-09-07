import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      messages: []
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  }


  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')

    this.socket.onopen = function() {
      console.log('Client connected to server!')
    }

    this.socket.onmessage = (data) => {
      const incomingData = JSON.parse(data.data)
      
      if (incomingData.type === 'incomingMessage') {
        this.saveMessage(incomingData);
      } else if (incomingData.type === 'incomingNotification') {
        this.saveName(incomingData);
      }
    }
    
    setTimeout(() => {
      const newMessage = {id: '0', username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      this.setState({ messages: messages })
    }, 1000);
  }
  

  sendMessage(newMessage) {
    this.socket.send(JSON.stringify(newMessage));
  }
  
  
  saveMessage(newMessage) {
    const newMessages = this.state.messages.concat(newMessage);
    this.setState({ messages: newMessages });
  }
    
    
  sendNotification(newNotification) {
    this.socket.send(JSON.stringify(newNotification));
  }
  

  saveName(newNotification) {
    const newMessages = this.state.messages.concat(newNotification);
    this.setState({
      currentUser: {name: newNotification.newName},
      messages: newMessages
    });
  }

  
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

        <main className='messages'>
          <MessageList messages={this.state.messages} />
        </main>
        
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} sendNotification={this.sendNotification} />
      </div>
    );
  }
}

export default App;
