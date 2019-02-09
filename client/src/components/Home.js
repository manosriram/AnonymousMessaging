import Navbar from "./Navbar";
import Profile from "./Profile";
import { Redirect } from "react-router-dom";
import "./Basic.css";
import React, { Component } from "react";
import UserProfile from "./userProfile";
const axios = require("axios");
var curUs = "";

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
      users: []
    };
    this.getProfile = this.getProfile.bind(this);
    this.logOut = this.logOut.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.getUser = this.getUser.bind(this);
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

  getUser() {
    console.log(curUs);
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
        <div id="homeIn">
          {/* <Navbar data={this.state.payload} /> */}
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
              <form class="form-inline my-2 my-lg-0" id="search">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Message Users.."
                  aria-label="Search"
                  ref="user"
                />
              </form>
              <button
                class="ui inverted primary button"
                onClick={this.searchUsers}
              >
                Search
              </button>
              <button
                onClick={this.logOut}
                id="logout"
                class="ui inverted red button"
              >
                Logout
              </button>
            </nav>
          </div>
          <div className="jumbotron jumbotron-fluid">
            {this.state.loggedIn}
            <h1>Welcome {this.state.payload.name} !</h1>
            <br />
            <div id="box1" class="ui raised very padded text container segment">
              <h2>Available Users : </h2>
              <hr />
              <br />
              <br />
              {this.state.users.map((person, ind) => {
                curUs = this.state.users[ind];
                return (
                  <div key={ind}>
                    <a onClick={this.getUser}>
                      <h2 key={ind}>{person.name}</h2>
                    </a>
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
  }
}

export default Home;
