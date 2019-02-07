import React, { Component } from "react";
import "./App.css";
import HomeNoLogin from "./components/HomeNoLogin";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeNoLogin />
      </div>
    );
  }
}

export default App;
