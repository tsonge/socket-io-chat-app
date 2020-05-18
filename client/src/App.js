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
      // DMWindows: { aaabbbccc: { component: <DMWindow IDnickPair={['fakeid','fakenick']} messages={this.state.DMWindows['aaabbbccc'].messages} />, messages: [['bb', 'gg'], ['aa', 'gg2']] }, gaabbbccc: { component: <DMWindow IDnickPair={['fakei2','fakenic2']} messages={this.state.DMWindows['aaabbbccc'].messages} />, messages: [['b3', 'g3'], ['a3', 'g32']] }  } 
      DMWindowComponents: {},
      DMWindowMessages: {},
      DMWindowIDnickPairs: {},
      DMWindowData: {}
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

    socket.on('DM received', (fromNick, fromID, msg) => {
      console.log('we recieved a DM, fromNick=', fromNick, ' id=', fromID, ' msg=', msg);
      /* this.setState({DMWindowMessages: {...this.state.DMWindowMessages, 
        [fromID]: [ ...this.state.DMWindowMessages[fromID] , [fromNick, msg]]   
      }}, () => {this.setState({DMWindowComponents:{...this.state.DMWindowComponents, 
        [IDnickPair[0]]: 
            <DMWindow 
                 key={IDnickPair[0]}
                 IDnickPair={IDnickPair} 
                 messages={this.state.DMWindowMessages[IDnickPair[0]]} 
                 closeButtonFunc={this.closeDMWindow}
                 emitDMMessageFunc={this.emitDMMessage}
            /> 
      }});}); */
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


    fetch("http://localhost:4000/testroute")
      .then(res => res.text())
      .then(res => {console.log(res)});
  }

  emitMessage = (message) => {
    this.state.socket.emit('chat message', message, this.state.ourNick);
  }

  emitDMMessage = (toID, message) => {
    console.log('EMIT DM MESSAGE CALLED!!');
    // debugger;
    this.state.socket.emit('DM', toID, message);
  }

  createNewDMWindow = (IDnickPair) => {
    console.log("createNewDMWindow fired, IDnickPair=", IDnickPair);

    // debugger;
    // this.setState({DMWindows: { ...this.state.DMWindows, [IDnickPair[0]]: { component: <DMWindow IDnickPair={IDnickPair} />, messages: [['b4', 'g4'], ['a4', 'g4']] } } }); 

    /* this.setState({ DMWindowMessages: { ...this.state.DMWindowMessages, 
        [IDnickPair[0]]: [['b4', 'g4'], ['a4', 'g4']]
    }}, () => { this.setState({ DMWindowComponents: { ...this.state.DMWindowComponents, 
        [IDnickPair[0]]: 
            <DMWindow 
                 key={IDnickPair[0]}
                 IDnickPair={IDnickPair} 
                 messages={this.state.DMWindowMessages[IDnickPair[0]]} 
                 closeButtonFunc={this.closeDMWindow}
                 emitDMMessageFunc={this.emitDMMessage}
            /> 
        }});  
    }); */
    
    this.setState({DMWindowData: { ...this.state.DMWindowData, 
        [IDnickPair[0]]: {IDnickPair: IDnickPair, messages: [['b4', 'g4'], ['a4', 'g4']]} 
    }});
    
  }

  closeDMWindow = (id) => {
    /*const newDMComponents = {...this.state.DMWindowComponents};
    delete newDMComponents[id];
    const newDMComponents = {...this.state.DMWindowComponents};
    delete newDMComponents[id];
    this.setState({DMWindowComponents: newDMComponents}, () => {
    this.setState({DMWindowMessages: newDMMessages}); 
    });*/
    
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

    return (
      <React.Fragment>
      <OnlineNow userList={this.state.onlineNow} createNewDMWindowFunc={this.createNewDMWindow} />
      { DMWindowArray }
      <Messages messages={this.state.messages} />
      <MessageInput emitMsgFunc={this.emitMessage} />
      </React.Fragment>
    );
  }
}

export default App;
