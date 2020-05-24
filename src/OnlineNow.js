import React from 'react';
import './OnlineNow.css';
import Draggable from 'react-draggable';

class OnlineNow extends React.Component {
 
  render() {

    return (
      <Draggable>
        <div className="onlineNowBox">
          <h1>Online Users</h1>
          <ul>
            { Object.entries(this.props.userList).map((IDnickPair, index) => 
                <li key={index}>
                    <a href="/#" onClick={ () => 
                        this.props.createNewDMWindowFunc(IDnickPair) 
                    }>
                        {IDnickPair[1]}
                    </a>
                </li> 
            )}
          </ul>
        </div>
      </Draggable>
    ); 
  }
}

export default OnlineNow;
