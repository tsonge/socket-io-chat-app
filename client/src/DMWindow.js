import React from 'react';
import './DMWindow.css';
import Draggable from 'react-draggable';

class DMWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('called');
    this.props.emitDMMessageFunc(this.props.IDnickPair[0], this.state.value);
    event.preventDefault();
    this.setState({value: ''});
  }

 
  render() {
    return (
      <Draggable>
        <div className="DMWindowDiv">
          <div className="DMWindowHeader"> { "Direct Messages with: " + this.props.IDnickPair[1] } </div>
          <ul className="DMul" >
            {this.props.messages.map((msg, index) => <li key={index}>{msg[0]} :: {msg[1]}</li>)}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input className="DMInputElement" type="text" value={this.state.value} onChange={this.handleChange} />
          </form>
          <button onClick={ () => this.props.closeButtonFunc(this.props.IDnickPair[0]) }>Close DM</button> 
        </div>
      </Draggable>
    ); 
  }
}

export default DMWindow;
