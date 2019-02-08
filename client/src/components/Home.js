import Navbar from "./Navbar";
import Profile from "./Profile";
import { Redirect } from "react-router-dom";
import "./Basic.css";
import React, { Component } from "react";
const axios = require("axios");

class Home extends Component {
  constructor() {
    super();
    this.state = {
      alreadyLogged: 0,
      payload: {},
      profile: 0,
      home: 1
    };
    this.getProfile = this.getProfile.bind(this);
  }

  getProfile() {
    this.setState({ profile: 1, home: 0 });
  }

  componentDidMount() {
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
            <h1>Welcome {this.state.payload.name}</h1>
          </div>
        </div>
      );
    }
    if (this.state.profile === 1 && this.state.home === 0) {
      return <Profile data={this.state.payload} />;
    }
  }
}

export default Home;
