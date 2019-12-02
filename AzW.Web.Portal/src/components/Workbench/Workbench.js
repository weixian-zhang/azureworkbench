import React, { Component } from "react";
import AzurePanel from "./AzurePanel";
import WorkbenchGrid from "./WorkbenchGrid";
import PropertiesPanel from "./PropertiesPanel";
import "../../assets/css/Panel.css";
import "../../assets/css/Workbench.css";
import "../../assets/css/WorkbenchGrid.css";

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