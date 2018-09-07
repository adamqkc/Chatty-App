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


  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')

    this.socket.onopen = function() {
      console.log('Client connected to server!')
    }

    this.socket.onmessage = (data) => {
      const incomingData = JSON.parse(data.data)

      switch (incomingData.type) {
        case 'incomingMessage':
          this.saveMessage(incomingData);
          break;
        case 'incomingNotification':
          this.saveName(incomingData);
          break;
        case 'activeUsers':
          this.updateUsers(incomingData.activeUsers);
          break;
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
      currentUser: newNotification.newName,
      messages: newMessages
    });
  }

  
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
