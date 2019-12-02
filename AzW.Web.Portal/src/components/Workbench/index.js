import React, { Component } from "react";
import Header from "./Header";
import Workbench from "./Workbench";

export default class MainWorkbench extends Component {
  render() {
    return (
      <div className="container">
        <Header/>
        <Workbench/>
      </div>
    );
  }
}