import React from 'react';
import createReactClass from 'create-react-class';

export default React.createElement(createReactClass({
  getInitialState: function () {
    return {
      name: '',
      msg: '',
    };
  },
  handleButtonClick: function (e) {
    const nameLen = this.state.name.length;
    if (nameLen > 0) {
      this.setState({
        msg: `You name has ${nameLen} characters including space`,
      });
    }
  },
  handleTextChange: function (e) {
    this.setState({
      name: e.target.value,
    });
  },
  handleReset: function () {
    this.setState({
      name: '',
      msg: '',
    });
  },
  render: function () {
    let msg;
    if (this.state.msg !== '') {
      msg = <p>{this.state.msg}</p>;
    } else {
      msg = '';
    }
    return (
      // do something here where there is a button that will replace the text
      <div>
        <label>Your name</label>
        <input
          type="text"
          id="txtName"
          name="txtName"
          value={this.state.name}
          onChange={this.handleTextChange}
        />
        <button id="btnSubmit" onClick={this.handleButtonClick}>
          Calculate Name Length
        </button>
        <button id="btnReset" onClick={this.handleReset}>
          Reset All
        </button>
        <hr />
        {msg}
      </div>
    );
  },
}));
