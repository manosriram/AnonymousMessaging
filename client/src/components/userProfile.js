import Chat from "./Chat";
import React, { Component } from "react";
import Message from "./Message";
const axios = require("axios");
const Cookie = require("js-cookie");

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      payload: {},
      messageActive: 0,
      profile: 1,
      error: 0,
      chat: 0,
      name: ""
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.logOut = this.logOut.bind(this);
    this.startChat = this.startChat.bind(this);
  }

  startChat() {
    this.setState({ chat: 1, profile: 0 });
  }

  componentDidMount() {
    axios
      .post("/profile/getStatus")
      .then(res =>
        this.setState({ name: res.data.name, payload: this.props.data })
      )
      .catch(err => console.log(err));
  }

  sendMessage() {
    this.setState({ messageActive: 1, profile: 0 });
  }

  logOut() {
    Cookie.remove("auth_t");
    window.location = "/";
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a id="homeIcon" href="/">
            <i class="home icon" id="homeIcan" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active" />
              <li class="nav-item">
                <button
                  onClick={this.getProfile}
                  class="ui inverted blue button"
                >
                  Profile
                </button>
              </li>
            </ul>
            <br />
            <button onClick={this.logOut} class="ui inverted red button">
              Logout
            </button>
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search Users.."
                aria-label="Search"
                ref="user"
              />
            </form>
            <button
              onClick={this.searchUsers}
              class="btn btn-outline-success my-2 my-sm-0"
            >
              Search
            </button>
          </div>
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
            <button onClick={this.startChat} class="ui teal button">
              Chat
            </button>
          </div>
        )}
        {this.state.messageActive === 1 && (
          <Message data={this.state.payload} />
        )}

        {this.state.chat === 1 && <Chat name={this.state.name} />}
      </div>
    );
  }
}

export default UserProfile;
