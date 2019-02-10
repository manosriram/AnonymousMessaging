import React, { Component } from "react";
import "./App.css";
import HomeNoLogin from "./components/HomeNoLogin";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={HomeNoLogin} />
          <Route exact path="/home" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
