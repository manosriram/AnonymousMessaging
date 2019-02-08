import React, { Component } from "react";
const axios = require("axios");

class userProfile extends Component {
  constructor() {
    super();
    this.state = {
      payload: {}
    };
  }

  componentDidMount() {
    axios
      .post("/auth/userLogin")
      .then(res =>
        this.setState(
          {
            payload: res.data.payload
          },
          () => console.log(this.state)
        )
      )
      .catch();
  }

  render() {
    return (
      <div>
        <h1>User Profile..</h1>
      </div>
    );
  }
}

export default userProfile;
