import React, { Component } from "react";

class Profile extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <h1>Profile Page!</h1>
      </div>
    );
  }
}

export default Profile;
