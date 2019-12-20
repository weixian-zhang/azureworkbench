import React, { Component } from "react";
import { connect } from "react-redux";
import ResourcePalette from "./ResourcePalette";
import DiagramEditor from "./DiagramEditor";
import PropertiesPanel from "./PropertiesPanel";
import "./workspace.css";
import { loadServices } from "../../../redux/actions";

class Workspace extends Component {

  componentWillMount() {
    this.props.loadAzureServices();
  }

  render() {
    return (
      <div className="workspace">
        <ResourcePalette />
        <DiagramEditor />
        <PropertiesPanel />
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadAzureServices: () => dispatch(loadServices())
  };
}

export default connect(null, mapDispatchToProps)(Workspace);