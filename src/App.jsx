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
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
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
          this.updateUserCount(incomingData.activeUsers);
          break;
      }
    }
    
    // Default message to show newly connected users
    setTimeout(() => {
      const newMessage = {id: '0', username: 'Chatty-bot', content: 'Hello there! Create your username and start messaging!'};
      const messages = this.state.messages.concat(newMessage)
      this.setState({ messages: messages })
    }, 1000);
  }
  
  // Passed into and invoked in ChatBar.jsx
  sendMessage(newMessage) {
    this.socket.send(JSON.stringify(newMessage));
  }
  
  // Updates and saves a new message object in messages data of state
  saveMessage(newMessage) {
    const newMessages = this.state.messages.concat(newMessage);
    this.setState({ messages: newMessages });
  }
    
  // Passed into and invoked in ChatBar.jsx
  sendNotification(newNotification) {
    this.socket.send(JSON.stringify(newNotification));
  }
  
  // Updates and saves a new notification object in messages data of state
  saveNotification(newNotification) {
    const newMessages = this.state.messages.concat(newNotification);
    this.setState({
      messages: newMessages
    });
  }

  // Update current user name
  updateCurrentUser(newName) {
    this.setState({currentUser: newName})
  }

  // Update and display all active users connected to the server
  updateUserCount(activeUsers) {
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
        
        <ChatBar 
          currentUser={this.state.currentUser} 
          sendMessage={this.sendMessage} 
          sendNotification={this.sendNotification}
          updateCurrentUser={this.updateCurrentUser} />
      </div>
    );
  }
}

export default App;
