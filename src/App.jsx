import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [{
        username: 'Bob',
        content: 'Hi Michelle'
      }]
    }
    // this.sendMessage = this.sendMessage.bind(this);
    // this.sendNotification = this.sendNotification.bind(this);
  }


  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')
    
    this.socket.onopen = function() {
      console.log('Client connected to server!')
    }

    // this.socket.onmessage = (data) => {
    //   // const newMessage = JSON.parse(data.data)
    //   // if (newMessage.type === 'message') {
    //   //   this.saveMessage(newMessage);
    //   // } else if (newMessage.type === 'notification') {
    //   //   this.saveName(newMessage);
    //   // }
    // }
    
    
    setTimeout(() => {
      const newMessage = {username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      this.setState({ messages: messages })
    }, 1000);
  }
  

  sendMessage(newMessage) {
    console.log(newMessage)
    // this.socket.send(JSON.stringify(newMessage));
  }
  
  
  // saveMessage(newMessage) {
    //   const oldMessages = this.state.messages;
    //   const newMessages = [...oldMessages, newMessage];
    //   this.setState({ messages: newMessages });
    // }
    
    
  sendNotification(newNotification) {
    console.log(newNotification)
    // this.socket.send(JSON.stringify(newNotification);
  }
  
  // saveName(newNotification) {
  //   const oldMessages = this.state.messages;
  //   const newNotifications = [...oldMessages, newNotification];
  //   console.log(newNotification.username);

  //   this.setState({ 
  //     currentUser: newNotification.username,
  //     messages: newNotifications
  //   });
  // }


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
