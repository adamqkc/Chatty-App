import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    const submitNewName = event => {
      if (event.key === 'Enter') {  
        let nameField = event.target;
        const newName = {name: nameField.value}

        this.props.changeName(newName); 
        nameField.value = '';
      }
    }

    const submitNewMessage = event => {
      if (event.key === 'Enter') {  
        let contentField = event.target;
        const newMessage = {
          content: contentField.value,
          username: this.props.currentUser.name,
        }

        this.props.addMessage(newMessage);
        contentField.value = '';
      }
    }

    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name ? this.props.currentUser.name : 'Your name (optional)'} onKeyPress={submitNewName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={submitNewMessage}/>
      </footer>
    )
  }
}

export default ChatBar;