const react = require('react');
const createReactClass = require('create-react-class');

module.exports = react.createElement(createReactClass({
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
      msg = react.createElement("p", null, this.state.msg);
    } else {
      msg = '';
    }
    return react.createElement("div", null, react.createElement("label", null, "Your name"), react.createElement("input", {
      type: "text",
      id: "txtName",
      name: "txtName",
      value: this.state.name,
      onChange: e => this.handleTextChange(e)
    }), react.createElement("button", {
      id: "btnSubmit",
      onClick: e => this.handleButtonClick(e)
    }, "Calculate Name Length"), react.createElement("button", {
      id: "btnReset",
      onClick: () => this.handleReset()
    }, "Reset All"), react.createElement("hr", null), msg);
  },
}));
