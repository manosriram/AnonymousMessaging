import Navbar from "./Navbar";
import React, { Component } from "react";
const axios = require("axios");

class Home extends Component {
  constructor() {
    super();
    this.state = {
      alreadyLogged: 0,
      payload: {}
    };
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
    return (
      <div id="homeIn">
        <Navbar />
        <div className="jumbotron jumbotron-fluid">
          <h1>Welcome {this.state.payload.name}</h1>
        </div>
      </div>
    );
  }
}

export default Home;
