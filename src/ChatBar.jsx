import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    console.log('Rendering <ChatBar />')
    const onEnter = event => {
      if (event.key === 'Enter') {  
        let inputField = event.target;
        const newMessage = {
          content: inputField.value,
          username: this.props.currentUser.name,
        }

        this.props.addMessage(newMessage);
        inputField.value = '';
      }
    }

    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name ? this.props.currentUser.name : 'Your name (optional)'} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onEnter}/>
      </footer>
    )
  }
}

export default ChatBar;