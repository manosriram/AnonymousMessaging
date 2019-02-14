import Spinner from "react-spinner-material";
import Chat from "./Chat";
import Profile from "./Profile";
import "./Basic.css";
import React, { Component } from "react";
import UserProfile from "./userProfile";
const Cookie = require("js-cookie");
const axios = require("axios");

class Home extends Component {
  constructor() {
    super();
    this.state = {
      alreadyLogged: 0,
      payload: {},
      profile: 0,
      home: 1,
      foundUser: {},
      search: 0,
      users: [],
      inbox: 0,
      sent: 0,
      messages: [],
      sentMessages: [],
      sentTo: [],
      loading: 0
    };
    this.getProfile = this.getProfile.bind(this);
    this.logOut = this.logOut.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.openSent = this.openSent.bind(this);
  }

  openSent() {
    this.setState({
      sent: 1,
      inbox: 0,
      search: 0,
      profile: 0,
      home: 0,
      loading: 1
    });
    axios
      .post("/profile/getSent", {
        data: this.state.payload,
        people: this.state.sentTo
      })
      .then(res =>
        this.setState({
          sentTo: res.data.people,
          sentMessages: res.data.sentMessages,
          loading: 0
        })
      )
      .catch(err => console.log(err));
  }

  getMessages() {
    this.setState({
      inbox: 1,
      search: 0,
      profile: 0,
      home: 0,
      loading: 1
    });
    axios
      .post("/profile/getMessages", { data: this.state.payload })
      .then(res => this.setState({ messages: res.data.messages, loading: 0 }))
      .catch(err => console.log(err));
  }

  searchUsers() {
    const username = this.refs.user.value;
    axios
      .post(`/profile/userProfile/${username}`)
      .then(res =>
        this.setState({
          foundUser: res.data.payload,
          search: 1,
          profile: 0,
          home: 0
        })
      )
      .catch(err => console.log(err));
  }

  getProfile() {
    this.setState({ profile: 1, home: 0 });
  }

  componentDidMount() {
    axios
      .post("/profile/getAllUsers")
      .then(res => this.setState({ users: res.data.users }))
      .catch(err => console.log(err));
    axios
      .post("/auth/userLogin")
      .then(res =>
        this.setState({
          alreadyLogged: res.data.alreadyLogged,
          payload: res.data.payload
        })
      )
      .catch();
  }

  logOut() {
    Cookie.remove("auth_t");
    window.location = "/";
  }

  render() {
    if (this.state.profile === 0 && this.state.home === 1) {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a id="homeIcon" href="/">
              <i className="home icon" id="homeIcan" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active" />
                <li className="nav-item">
                  <button
                    onClick={this.getProfile}
                    className="ui inverted blue button"
                  >
                    My Profile
                  </button>
                </li>
              </ul>
              <br />
              <button onClick={this.logOut} className="ui inverted red button">
                Logout
              </button>
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Users.."
                  aria-label="Search"
                  ref="user"
                />
              </form>
              <button
                onClick={this.searchUsers}
                className="btn btn-outline-success my-2 my-sm-0"
              >
                Search
              </button>
            </div>
          </nav>

          <div id="homeIn">
            <button
              onClick={this.getMessages}
              id="left"
              className="ui left attached button"
            >
              Open Inbox
            </button>
            <button
              onClick={this.openSent}
              id="right"
              className="right attached ui button"
            >
              Open Sent Messages
            </button>
          </div>
          <div className="jumbotron">
            <hr />
            <h1>Welcome {this.state.payload.name} !</h1>
            <br />
            <div
              id="box1"
              className="ui raised very padded text container segment"
            >
              <h2>Available Users : </h2>
              <hr />
              <br />
              <br />
              {this.state.users.map((person, ind) => {
                return (
                  <div key={ind}>
                    <h2 key={ind}>{person.name}</h2>
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    if (this.state.profile === 1 && this.state.home === 0) {
      return <Profile data={this.state.payload} />;
    }
    if (
      this.state.search === 1 &&
      this.state.profile === 0 &&
      this.state.home === 0
    ) {
      return <UserProfile data={this.state.foundUser} />;
    }
    if (this.state.inbox === 1) {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a id="homeIcon" href="/">
              <i className="home icon" id="homeIcan" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active" />
                <li className="nav-item">
                  <button
                    onClick={this.getProfile}
                    className="ui inverted blue button"
                  >
                    My Profile
                  </button>
                </li>
              </ul>
              <br />
              <button onClick={this.logOut} className="ui inverted red button">
                Logout
              </button>
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Users.."
                  aria-label="Search"
                  ref="user"
                />
              </form>
              <button
                onClick={this.searchUsers}
                className="btn btn-outline-success my-2 my-sm-0"
              >
                Search
              </button>
            </div>
          </nav>
          <br />
          <strong>
            <h2 id="Ymsg">Your Anonymous Messages. </h2>
          </strong>
          <hr />
          <br />
          <br />
          {this.state.loading === 1 && (
            <Spinner
              size={80}
              spinnerColor={"white"}
              spinnerWidth={1}
              visible={this.state.loading}
            />
          )}
          <div id="one">
            {this.state.messages.map((msg, ind) => {
              return (
                <div id="msgBox">
                  <h2>
                    {ind + 1} -<strong> {msg}</strong>
                  </h2>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    if (this.state.sent === 1) {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a id="homeIcon" href="/">
              <i className="home icon" id="homeIcan" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active" />
                <li className="nav-item">
                  <button
                    onClick={this.getProfile}
                    className="ui inverted blue button"
                  >
                    My Profile
                  </button>
                </li>
              </ul>
              <br />
              <button onClick={this.logOut} className="ui inverted red button">
                Logout
              </button>
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Users.."
                  aria-label="Search"
                  ref="user"
                />
              </form>
              <button
                onClick={this.searchUsers}
                className="btn btn-outline-success my-2 my-sm-0"
              >
                Search
              </button>
            </div>
          </nav>
          <br />
          <strong>
            <strong>
              <h2 id="Ymsg">Your Sent Messages. </h2>
            </strong>
          </strong>
          <hr />
          <br />
          <br />
          {this.state.loading === 1 && (
            <Spinner
              size={80}
              spinnerColor={"white"}
              spinnerWidth={1}
              visible={this.state.loading}
            />
          )}
          <div id="one">
            {this.state.sentMessages.map((msg, ind) => {
              return (
                <div id="msgBox">
                  <h2>Message : {msg}</h2>
                  <br />
                  <h2>To : {this.state.sentTo[ind]}</h2>
                  <hr id="divide" />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default Home;
