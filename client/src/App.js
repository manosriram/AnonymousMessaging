import React, { Component } from "react";
import "./App.css";
import HomeNoLogin from "./components/HomeNoLogin";
import { Router, Route, BrowserRouter } from "react-router-dom";
import HomeLogin from "./components/HomeLogin";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={HomeNoLogin} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
