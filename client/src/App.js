import React from 'react';
import './App.css';
import io from 'socket.io-client';
import Messages from './Messages.js'; 
import MessageInput from './MessageInput.js'; 
import Draggable from 'react-draggable';

class App extends React.Component {
 
  constructor(props) {
    super(props);
    console.log('App component constructor called');
    this.state = {messages:[['bob', 'hello'], ['leela', 'hi']]}; //first item is the nick, second item is the message from that nick.
  }

  componentDidMount() {
    const socket = io('http://localhost:4000');
    const ourNick = prompt("Please enter your nick", "Harry Potter");

    this.setState({socket, ourNick}); // same as {socket: socket, ourNick: ourNick}

    socket.emit('whose online add', ourNick);

    socket.on('chat message', (msg, nick) => {
      this.setState({ messages: this.state.messages.concat([[nick, msg]]) });
   });

    fetch("http://localhost:4000/testroute")
      .then(res => res.text())
      .then(res => {console.log(res)});
  }

  emitMessage = (message) => {
    this.state.socket.emit('chat message', message, this.state.ourNick);
  }

  render() {
    return (
      <React.Fragment>
      <Draggable>
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
      <div className="App">
          <Messages messages={this.state.messages} />
          <MessageInput emitMsgFunc={this.emitMessage} />
      </div>
      </React.Fragment>
    );
  }
}

export default App;
