import React, { Component } from 'react';

class ChatBar extends Component {
  constructor() {
    super()
    this.onEnterNewMessage = this.onEnterNewMessage.bind(this);
    this.onEnterNewName = this.onEnterNewName.bind(this);
  }

  onEnterNewMessage(event) {
    if (event.key === 'Enter' && event.target.value) {
      const content = event.target.value;
      const newMessage = {
        type: 'postMessage',
        content: content,
        username: this.props.currentUser.name,
      }
      this.props.sendMessage(newMessage); 
      event.target.value = '';
    }
  }

  onEnterNewName(event) {
    if (event.key === 'Enter' && event.target.value) {
      const oldName = this.props.currentUser.name ? this.props.currentUser.name : 'Anonymous';
      const newName = event.target.value;
      const newNotification = {
        type: 'postNotification',
        content: `${oldName} has changed their name to ${newName}`,
        oldName: oldName,
        newName: {name: newName}
      }
      this.props.sendNotification(newNotification);
      event.target.value = '';
    }
  }

  render() {
    const username = this.props.currentUser.name ? this.props.currentUser.name : 'Your name (optional)';

    return(
      <footer className="chatbar">
        <input 
          className="chatbar-username" 
          placeholder={username} 
          onKeyPress={this.onEnterNewName}/>
        <input 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          onKeyPress={this.onEnterNewMessage}/>
      </footer>
    )
  }
}

export default ChatBar;