import React from 'react';
import './App.css';
import io from 'socket.io-client';
import Messages from './Messages.js'; 
import MessageInput from './MessageInput.js'; 
import OnlineNow from './OnlineNow.js';
import DMWindow from './DMWindow.js';

class App extends React.Component {
 
  constructor(props) {
    super(props);
    // console.log('App component constructor called');
    this.state = {
      messages: [], //first item is the nick, second item is the message from that nick.
      onlineNow: {dummySocketID: 'dummyNick'}, // reflects the same object held by server at any given moment. contains all active socket conncections to server. property: socket.id, value: nickname, for each connection
      DMWindowData: {},
      whoIsTyping: []
    };  
 } 

  componentDidMount() {
    const socket = io();
    const ourNick = prompt("Please enter your nick", "Harry Potter");

    this.setState({socket, ourNick}); // same as {socket: socket, ourNick: ourNick}

    socket.emit('whose online add', ourNick);

    socket.on('chat message', (msg, nick) => {
      this.setState({ messages: this.state.messages.concat([[nick, msg]]) });
    });

    socket.on('update whose online now', (userList) => {
      this.setState({ onlineNow: userList });
    });

    socket.on('DM received', (fromNick, fromID, msg) => {
      // console.log('we recieved a DM, fromNick=', fromNick, ' id=', fromID, ' msg=', msg);
      if (fromID in this.state.DMWindowData) {
        this.setState({DMWindowData: {...this.state.DMWindowData, 
          [fromID]: { IDnickPair: [fromID, fromNick], 
                     messages: [ ...this.state.DMWindowData[fromID].messages, [fromNick, msg] ]  
          }
        }});
      } else {
        this.setState({DMWindowData: {...this.state.DMWindowData, 
          [fromID]: { IDnickPair: [fromID, fromNick], 
                     messages: [ [fromNick, msg] ]  
          }
        }});
      }
    });

    socket.on('somebody is typing', who => {

      if ( this.state.whoIsTyping.includes(who) ) {
        return;
      } 
    
      this.setState({whoIsTyping: [...this.state.whoIsTyping, who]});

      setTimeout(() => { 
        const newWhoIsTyping = [...this.state.whoIsTyping];
        const index = newWhoIsTyping.indexOf(who);
        if (index !== -1) newWhoIsTyping.splice(index, 1);
        this.setState({whoIsTyping: newWhoIsTyping}) 
      }, 2500);

    });

  }

  isTypingEmit = () => {
    this.state.socket.emit('is typing', this.state.ourNick);
  }


  emitMessage = (message) => {
    this.state.socket.emit('chat message', message, this.state.ourNick);
  }

  emitDMMessage = (toID, message) => {
    this.state.socket.emit('DM', toID, message);
  }

  createNewDMWindow = (IDnickPair) => {
    console.log("createNewDMWindow fired, IDnickPair=", IDnickPair);

    this.setState({DMWindowData: { ...this.state.DMWindowData, 
        [IDnickPair[0]]: {IDnickPair: IDnickPair, messages: []} 
    }});
    
  }

  closeDMWindow = (id) => {
    const newDMWindowData = {...this.state.DMWindowData};
    delete newDMWindowData[id];
    this.setState({DMWindowData: newDMWindowData});
  }

  render() {

    const DMWindowArray = [];
    for (const data of Object.values(this.state.DMWindowData)) {
      DMWindowArray.push(
        <DMWindow 
          key={data.IDnickPair[0]}
          IDnickPair={data.IDnickPair} 
          messages={data.messages} 
          closeButtonFunc={this.closeDMWindow}
          emitDMMessageFunc={this.emitDMMessage}
        />
      );
    }


    let isTypingDiv;

    if (this.state.whoIsTyping.length > 0) {
      isTypingDiv = <div className="isTypingDiv">{this.state.whoIsTyping.map(nick => nick + ', ')} is typing...</div>; 
    } else {
      isTypingDiv = <div className="isTypingDiv"></div>; 
    }



    return (
      <React.Fragment>
      <OnlineNow userList={this.state.onlineNow} createNewDMWindowFunc={this.createNewDMWindow} />
      { DMWindowArray }
      { isTypingDiv }
      <Messages messages={this.state.messages} />
      <MessageInput emitMsgFunc={this.emitMessage} isTypingEmitFunc={this.isTypingEmit} />
      </React.Fragment>
    );
  }
}

export default App;
