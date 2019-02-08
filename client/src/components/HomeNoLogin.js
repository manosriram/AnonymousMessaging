import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import "./Basic.css";
import Navbar from "./Navbar";
const axios = require("axios");

class HomeNoLogin extends Component {
  constructor() {
    super();
    this.state = {
      notVerfied: 0,
      registered: 0,
      alreadyRegistered: 0,
      loggedIn: 0,
      alreadyLogged: 0,
      passwordIncorrect: 0,
      notFound: 0,
      name: "",
      loading: 0,
      error: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.setState({ error: 0 });
    axios
      .post("/auth/userLogin", {})
      .then(res =>
        this.setState({
          alreadyLogged: res.data.alreadyLogged,
          name: res.data.payload.name
        })
      )
      .catch();
  }

  handleLogin() {
    // this.setState({ notVerfied: 0, registered: 0, alreadyRegistered: 0 });
    const email = this.refs.loginEmail.value;
    const password = this.refs.loginPass.value;

    const payload = {
      email: email,
      password: password
    };
    axios
      .post("/auth/userLogin", { payload })
      .then(resp => {
        // console.log(resp.data);
        this.setState({
          loggedIn: resp.data.loggedIn,
          aleradyLogged: resp.data.aleradyLogged,
          passwordIncorrect: resp.data.passwordIncorrect,
          notFound: resp.data.notFound
        });
      })
      .catch(err => console.log(err));
  }

  handleClick() {
    // if (this.refs.name.value === "")
    // if (this.refs.name.value === ' ')
    if (
      this.refs.name.value.length === 0 ||
      this.refs.email.value.length === 0 ||
      this.refs.pass1.value.length === 0 ||
      this.refs.pass2.value.length === 0 ||
      this.refs.loc.value.length === 0
    ) {
      this.setState({ error: 1 });
      return;
    }
    this.setState({ notVerfied: 0, registered: 0, alreadyRegistered: 0 });
    if (this.refs.pass1.value !== this.refs.pass2.value) {
      this.setState({ notVerfied: 1 });
      this.refs.pass1.value = "";
      this.refs.pass2.value = "";
    } else {
      this.setState({ notVerfied: 0 });
      const payload = {
        name: this.refs.name.value,
        email: this.refs.email.value,
        password: this.refs.pass1.value,
        cpassword: this.refs.pass2.value,
        location: this.refs.loc.value,
        loading: 1
      };
      axios
        .post("/auth/userRegister", { payload })
        .then(resp =>
          this.setState(
            {
              registered: resp.data.registered,
              alreadyRegistered: resp.data.alreadyRegistered,
              loading: resp.data.loading
            },
            () => {
              if (this.state.alreadyRegistered === 1) {
                this.refs.pass1.value = "";
                this.refs.pass2.value = "";
              }
            }
          )
        )
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div id="registerForm">
          {this.state.registered === 1 && (
            <h2 id="match">Successfully Registered..</h2>
          )}

          {this.state.notVerfied === 1 && (
            <h2 id="noMatch">Passwords Don't Match...</h2>
          )}
          {this.state.alreadyRegistered === 1 && (
            <h2 id="noMatch">Email Already Registered!!</h2>
          )}
          {this.state.error === 1 && (
            <h2 id="noMatch">Please Fill All the Details...</h2>
          )}
          <br />
          <form className="ui form">
            <div className="field">
              <input
                type="text"
                name="name"
                placeholder="Name"
                id="fN"
                ref="name"
              />
            </div>
            <div className="field">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                id="lN"
                ref="email"
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="lN"
                ref="pass1"
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="repeat-password"
                placeholder="Confirm Password"
                id="lN"
                ref="pass2"
              />
            </div>
            <div className="field">
              <input
                type="text"
                name="location"
                placeholder="Location"
                id="lN"
                ref="loc"
              />
            </div>
          </form>
          <br />
          {this.state.loading === 0 && (
            <button
              className="ui inverted green button"
              onClick={this.handleClick}
            >
              Register
            </button>
          )}
          {this.state.loading === 1 && (
            <button class="btn btn-primary" type="button" disabled>
              <span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </button>
          )}

          <br />
          <br />
        </div>
        <div id="loginForm">
          {this.state.passwordIncorrect === 1 && (
            <h2 id="noMatch">Password Incorrect..</h2>
          )}
          {this.state.alreadyLogged === 1 && (
            <div>
              <Redirect to="/home" />
              <h2 id="noMatch">Already Logged In..</h2>
            </div>
          )}
          {this.state.notFound === 1 && <h2 id="noMatch">User not Found..</h2>}

          {this.state.loggedIn === 1 && (
            <div>
              <Redirect to="/home" />
              <h2 id="match">Logged In Suceesfully..</h2>
            </div>
          )}

          <br />
          <form className="ui form">
            <div className="field">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                id="lN"
                ref="loginEmail"
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="lN"
                ref="loginPass"
              />
            </div>
          </form>
          <br />
          <button
            className="ui inverted blue button"
            onClick={this.handleLogin}
          >
            Login
          </button>
          <div className="ui vertical divider">Or</div>
        </div>
      </div>
    );
  }
}

export default HomeNoLogin;
