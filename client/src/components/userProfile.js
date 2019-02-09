import Navbar from "./Navbar";
import React, { Component } from "react";
import Message from "./Message";
const axios = require("axios");

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      payload: {},
      messageActive: 0,
      profile: 1
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    this.setState({ payload: this.props.data });
  }

  sendMessage() {
    this.setState({ messageActive: 1, profile: 0 });
  }

  logOut() {
    axios.get("/auth/userLogout");
    window.location = "/";
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a href="/">
            <button class="ui inverted teal button"> Home </button>
          </a>
          <button onClick={this.getProfile} class="ui inverted teal button">
            Profile
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <button
            onClick={this.logOut}
            id="logout"
            class="ui inverted red button"
          >
            Logout
          </button>
        </nav>
        {this.state.profile === 1 && (
          <div id="box" class="ui raised very padded text container segment">
            <h1>Name : {this.props.data.name}</h1>
            <br />
            <h2 id="email">Email : {this.props.data.email}</h2>
            <br />
            <h2>Location : {this.props.data.location}</h2>
            <br />
            <button onClick={this.sendMessage} class="ui teal button">
              Message {this.props.data.name}
            </button>
          </div>
        )}
        {this.state.messageActive === 1 && (
          <Message data={this.state.payload} />
        )}
      </div>
    );
  }
}

export default UserProfile;
