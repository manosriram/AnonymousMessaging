import Profile from "./Profile";
import React, { Component } from "react";
const axios = require("axios");

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      alreadyLogged: 0,
      payload: {}
    };

    // this.getProfile = this.getProfile.bind(this);
  }

  componentDidMount() {
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
      </div>
    );
  }
}

export default Navbar;
