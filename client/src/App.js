import React from 'react';
import './App.css';
import io from 'socket.io-client';
import Messages from './Messages.js'; 
import MessageInput from './MessageInput.js'; 
import Draggable from 'react-draggable';
import OnlineNow from './OnlineNow.js';
import DMWindow from './DMWindow.js';

const ChildComponent = props => <div>{"I am child "}</div>;

class App extends React.Component {
 
  constructor(props) {
    super(props);
    console.log('App component constructor called');
    this.state = {
      messages: [['bob', 'hello'], ['leela', 'hi']], //first item is the nick, second item is the message from that nick.
      onlineNow: {dummySocketID: 'dummyNick'}, // reflects the same object held by server at any given moment. contains all active socket conncections to server. property: socket.id, value: nickname, for each connection
      DMWindows: [ ]
    };  
  }

  componentDidMount() {
    const socket = io('http://localhost:4000');
    const ourNick = prompt("Please enter your nick", "Harry Potter");

    this.setState({socket, ourNick}); // same as {socket: socket, ourNick: ourNick}

    socket.emit('whose online add', ourNick);

    socket.on('chat message', (msg, nick) => {
      this.setState({ messages: this.state.messages.concat([[nick, msg]]) });
    });

    socket.on('update whose online now', (userList) => {
      this.setState({ onlineNow: userList });
    });

    fetch("http://localhost:4000/testroute")
      .then(res => res.text())
      .then(res => {console.log(res)});
  }

  emitMessage = (message) => {
    this.state.socket.emit('chat message', message, this.state.ourNick);
  }

  emitDMmessage = (toID, message) => {
    this.state.socket.emit('DM', toID, message);
  }

  createNewDMWindow = (IDnickPair) => {
    // console.log("createNewDMWindow fired, IDnickPair=", IDnickPair);
    this.setState({ DMWindows: [...this.state.DMWindows, <DMWindow key={IDnickPair[0]}  IDnickPair={IDnickPair} emitDMmessageFunc={this.emitDMmessage} /> ] }) ;
  }


  render() {


    return (
      <React.Fragment>
      <OnlineNow userList={this.state.onlineNow} createNewDMWindowFunc={this.createNewDMWindow} />
      { this.state.DMWindows }
      <Messages messages={this.state.messages} />
      <MessageInput emitMsgFunc={this.emitMessage} />
      </React.Fragment>
    );
  }
}

export default App;
