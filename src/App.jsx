import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      messages: [],
      activeUsers: 0
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  }

  // Connect to websocket server
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')

    this.socket.onopen = function() {
      console.log('Client connected to server!')
    }

    // Update and save state data depending on incoming data type
    this.socket.onmessage = (data) => {
      const incomingData = JSON.parse(data.data)

      switch (incomingData.type) {
        case 'incomingMessage':
          this.saveMessage(incomingData);
          break;
        case 'incomingNotification':
          this.saveNotification(incomingData);
          break;
        case 'activeUsers':
          this.updateUsers(incomingData.activeUsers);
          break;
      }
    }
    
    // Default message to show newly connected users
    setTimeout(() => {
      const newMessage = {id: '0', username: 'Chatty-bot', content: 'Hello there! Fill in a name and start messaging!'};
      const messages = this.state.messages.concat(newMessage)
      this.setState({ messages: messages })
    }, 1000);
  }
  
  // Invoked in ChatBar.jsx
  sendMessage(newMessage) {
    this.socket.send(JSON.stringify(newMessage));
  }
  
  
  saveMessage(newMessage) {
    const newMessages = this.state.messages.concat(newMessage);
    this.setState({ messages: newMessages });
  }
    
  // Invoked in ChatBar.jsx
  sendNotification(newNotification) {
    this.socket.send(JSON.stringify(newNotification));
  }
  

  saveNotification(newNotification) {
    const newMessages = this.state.messages.concat(newNotification);
    this.setState({
      currentUser: newNotification.newName,
      messages: newMessages
    });
  }

  // 
  updateUsers(activeUsers) {
    this.setState({activeUsers: activeUsers})
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className='active-users'>Users online: {this.state.activeUsers}</p>
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
