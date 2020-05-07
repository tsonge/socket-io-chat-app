import React from 'react';
import './MessageInput.css';

class MessageInput extends React.Component {
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
    this.props.emitMsgFunc(this.state.value);
    event.preventDefault();
    this.setState({value: ''});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input autoComplete="off" value={this.state.value} onChange={this.handleChange} />
        <button>Send</button>
      </form>
    );
  }
}

 

export default MessageInput;



