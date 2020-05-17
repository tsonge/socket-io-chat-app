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
    this.props.emitDMmessageFunc(this.props.IDnickPair[0], this.state.value);
    event.preventDefault();
    this.setState({value: ''});
  }

 
  render() {
    return (
      <Draggable>
        <div className="DMWindowDiv">
          <p> { "----DMs with: " + this.props.IDnickPair[1] + " ----" } </p>
          <ul>
            {this.props.messages.map((msg, index) => <li key={index}>{msg[0]} :: {msg[1]}</li>)}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input className="DMInputElement" type="text" value={this.state.value} onChange={this.handleChange} />
          </form>
        </div>
      </Draggable>
    ); 
  }
}

export default DMWindow;
