import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name ? this.props.currentUser.name : 'Your name (optional)'} onKeyPress={this.props.changeName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.sendMessage}/>
      </footer>
    )
  }
}

export default ChatBar;