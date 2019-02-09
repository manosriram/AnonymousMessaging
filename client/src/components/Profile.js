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
              <br />
              <button onClick={this.logOut} class="ui inverted red button">
                Logout
              </button>
            </div>
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
