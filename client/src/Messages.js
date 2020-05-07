import React from 'react';
import './Messages.css';

class Messages extends React.Component {
 
  render() {
    return (
      <ul id="messages">
        {this.props.messages.map((msg, index) => <li key={index}>{msg[0]} :: {msg[1]}</li>)}
      </ul>
    ); 
  }
}

export default Messages;
