import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import Chatbar from './ChatBar.jsx';

const uuid = require('uuid/v4');


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          type: '',
          username: 'Bob',
          content: 'Has anyone seen my marbles?'
        },
        {
          type: '',
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ],
    }
    this.addMessage = this.addMessage.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = { id: uuid(), username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      console.log(messages);
      this.setState({ messages: messages })
    }, 1000);
  }

  addMessage(newMessage) {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage];

    this.setState({messages: newMessages})
  }

  changeName(newName) {
    const oldName = this.state.currentUser;

    this.setState({currentUser: newName})

    console.log(`${oldName.name} has changed name to ${newName.name}`)
  }

  render() {
    console.log('Rendering <App />')
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser} addMessage={this.addMessage} changeName={this.changeName}/>
      </div>
    );
  }
}

export default App;
