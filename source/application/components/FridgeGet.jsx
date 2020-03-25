import React from 'react';
import createReactClass from 'create-react-class';

export default React.createElement(createReactClass({
  getInitialState: function() {
    return {
      msg: 'ready',
    };
  },
  handleButtonClick: function(e) {
    let url = location.protocol + '//' + apiUrl + '/v1/fridges';
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('error ' + res.status);
        }
        return res.text();
      })
      .then((data) => {
        this.setState({
          msg: data
        });
      })
      .catch((err) => this.setState({
        msg: err
      }));
  },
  render: function() {
    let msg;
    if (this.state.msg !== '') {
      msg = <p>{this.state.msg}</p>;
    } else {
      msg = '';
    }
    return (
      <div>
        <p><label>FridgeGet</label></p>
        <button id="btnSubmit" onClick={this.handleButtonClick}>Request</button>
        <code>{msg}</code>
      </div>
    );
  },
}));
