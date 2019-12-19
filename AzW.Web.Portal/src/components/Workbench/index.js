import React, { Component } from "react";
import Header from "./Header";
import Workbench from "./Workbench";
import ActionBar from "./ActionBar";

export default class MainWorkbench extends Component {
  render() {
    return (
      <div className="container">
        <Header/>
        <ActionBar />
        <Workbench/>
      </div>
    );
  }
}