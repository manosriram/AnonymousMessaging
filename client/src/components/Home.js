import Spinner from "react-spinner-material";
import Profile from "./Profile";
import "./Basic.css";
import React, { Component } from "react";
import UserProfile from "./userProfile";
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
      messages: [],
      loading: 0
    };
    this.getProfile = this.getProfile.bind(this);
    this.logOut = this.logOut.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.getMessages = this.getMessages.bind(this);
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
      .then(res =>
        this.setState({ messages: res.data.messages, loading: 0 }, () => {
          console.log(this.state);
        })
      )
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
        this.setState(
          {
            alreadyLogged: res.data.alreadyLogged,
            payload: res.data.payload
          },
          () => console.log(this.state)
        )
      )
      .catch();
  }

  logOut() {
    axios.get("/auth/userLogout");
    window.location = "/";
  }

  render() {
    if (this.state.profile === 0 && this.state.home === 1) {
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

          <div id="homeIn">
            <button
              class="ui inverted grey button"
              id="msgB"
              onClick={this.getMessages}
            >
              Open <strong> Inbox</strong>
            </button>
            <div className="jumbotron">
              <hr />
              <h1>Welcome {this.state.payload.name} !</h1>
              <br />
              <div
                id="box1"
                class="ui raised very padded text container segment"
              >
                <h2>Available Users : </h2>
                <hr />
                <br />
                <br />
                {this.state.users.map((person, ind) => {
                  return (
                    <div key={ind}>
                      <a>
                        <h2 key={ind}>{person.name}</h2>
                      </a>
                      <br />
                    </div>
                  );
                })}
              </div>
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
  }
}

export default Home;
