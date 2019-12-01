import React, { Component } from "react";
import Header from "./components/Header";
import Workbench from "./components/Workbench";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // load workbench
  }

  render() {
    return (
      <div className="container">
        <Header/>
        <Workbench/>
      </div>
    );
  }
}