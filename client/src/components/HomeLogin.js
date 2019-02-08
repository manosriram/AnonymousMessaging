import React, { Component } from "react";
import "./Basic.css";
import Navbar from "./Navbar";

class HomeLogin extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="jumbotron">
          <h1>Home Login!</h1>
        </div>
      </div>
    );
  }
}

export default HomeLogin;
