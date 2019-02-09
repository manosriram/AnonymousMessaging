import React, { Component } from "react";
import "./Basic.css";
const axios = require("axios");

class Message extends Component {
  constructor() {
    super();

    this.state = {
      messageSent: 0,
      error: 0
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    if (this.refs.message.value.length < 5) {
      this.setState({ error: 1 });
    } else {
      axios
        .post("/profile/sendMessage", {
          data: this.props.data.email,
          message: this.refs.message.value
        })
        .then(
          this.setState({ messageSent: 1, error: 0 }, () => {
            this.refs.message.value = "";
          })
        )
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <textarea
          rows="10"
          cols="50"
          id="msg"
          ref="message"
          placeholder="Enter Message.."
        />
        <br />
        <br />
        <button onClick={this.sendMessage} class="ui green button">
          Send
        </button>
        <br />
        <br />
        {this.state.messageSent === 1 && <h2 id="match">Message Sent!!</h2>}
        {this.state.error === 1 && (
          <h2 id="noMatch">Please Enter minimum of 4 Letters..</h2>
        )}
      </div>
    );
  }
}
export default Message;
