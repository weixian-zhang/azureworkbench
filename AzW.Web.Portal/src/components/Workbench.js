import React, { Component } from "react";
import AzurePanel from "./AzurePanel";
import WorkbenchGrid from "./WorkbenchGrid";
import PropertiesPanel from "./PropertiesPanel";
import "../css/Panel.css";
import "../css/Workbench.css";
import "../css/WorkbenchGrid.css";

export default class Workbench extends Component {
  render() {
    return (
      <div className="workbench-container">
        <AzurePanel/>
        <WorkbenchGrid/>
        <PropertiesPanel/>
      </div>
    );
  }
}