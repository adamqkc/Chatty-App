import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import Chatbar from './ChatBar.jsx';

const uuid = require('uuid/v4');


class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [{
        id: uuid(),
        username: 'Alice the destroyer of worlds',
        content: 'testinggg'
      }],
      currentUser: {name: 'Alice'},
    }
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
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

  render() {
    console.log('Rendering <App />')
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;
