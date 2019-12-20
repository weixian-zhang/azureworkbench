import React, { Component } from "react";
import Menu from "./Menu";
import ActionBar from "./ActionBar";
import Workspace from "./Workspace";

export default class MainWorkbench extends Component {
  render() {
    return (
      <div>
        <Menu />
        <ActionBar />
        <Workspace />
      </div>
    );
  }
}