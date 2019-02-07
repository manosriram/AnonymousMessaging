import React, { Component } from "react";
import "./Basic.css";
import Navbar from "./Navbar";

class HomeNoLogin extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {}
  render() {
    return (
      <div>
        <Navbar />
        <div id="registerForm">
          <form className="ui form">
            <div className="field">
              <input type="text" name="name" placeholder="Name" id="fN" />
            </div>
            <div className="field">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                id="lN"
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="lN"
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="repeat-password"
                placeholder="Confirm Password"
                id="lN"
              />
            </div>
            <div className="field">
              <input
                type="text"
                name="location"
                placeholder="Location"
                id="lN"
              />
            </div>
          </form>
          <br />

          <button className="ui inverted green button">Register</button>
          <br />
          <br />
        </div>
        <div id="loginForm">
          <form className="ui form">
            <div className="field">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                id="lN"
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="lN"
              />
            </div>
          </form>
          <br />
          <div className="ui primary animated button" tabindex="0">
            <div className="visible content">Login</div>
            <div className="hidden content">
              <i className="right arrow icon" />
            </div>
          </div>
          {/* <button className="ui inverted green button">Login</button> */}
          <div className="ui vertical divider">Or</div>
        </div>
      </div>
    );
  }
}

export default HomeNoLogin;
