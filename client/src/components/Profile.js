import React, { Component } from "react";
import "./Basic.css";

class Profile extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
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
        <div id="box" class="ui raised very padded text container segment">
          <h2 class="ui header">Name : {this.props.data.name}</h2>
          <h2 class="ui header">Email : {this.props.data.email}</h2>

          <p />
          <p />
        </div>
      </div>
    );
  }
}

export default Profile;
