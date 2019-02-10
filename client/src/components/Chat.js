import "./Basic.css";
import React, { Component } from "react";
import io from "socket.io-client";
let socket = io(`http://localhost:5000`);

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      handle: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    socket.emit("chat", {
      message: this.refs.msg.value,
      handle: this.props.name
    });
  }

  componentDidMount() {
    let output = document.getElementById("output");
    let message = document.getElementById("message");
    socket.on("chat", data => {
      this.setState({ data });
      output.innerHTML += `<h3><strong><u>${
        this.state.data.handle
      }</u> </strong> : ${this.state.data.message}</h3>`;
    });
  }

  render() {
    return (
      <div id="chat">
        <div className="output" id="output" />
        <br />
        <br />
        <div className="jumbotron" id="chatWindow">
          <input
            type="text"
            name="msg"
            id="message"
            placeholder="Enter Message.."
            ref="msg"
            autoFocus
          />
          <br />
          <br />
        </div>
        <button onClick={this.handleClick} className="ui grey button">
          Send
        </button>
      </div>
    );
  }
}

export default Chat;
