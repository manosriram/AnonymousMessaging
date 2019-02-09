import React, { Component } from "react";
import "./App.css";
import HomeNoLogin from "./components/HomeNoLogin";
import { Router, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import UserProfile from "./components/userProfile";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={HomeNoLogin} />
          <Route exact path="/home" component={Home} />
          {/* <Route exact path="/userProfile" component={UserProfile} /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
