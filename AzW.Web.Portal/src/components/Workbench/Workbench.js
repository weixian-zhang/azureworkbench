import React, { Component } from "react";


import ResourcePalette from "./ResourcePalette";
import DiagramEditor from "./DiagramEditor";
import AuthService from '../../services/AuthService';

import "../../assets/css/Panel.css";
import "../../assets/css/Workbench.css";
import "../../assets/css/WorkbenchGrid.css";


export default class Workbench extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderResourcePalette: false,
      queryString: this.props.queryString
    }
    
    this.DiagramEditor = React.createRef();
    this.graphContainer = null;
    this.dropContext = null;
  }

  componentDidMount() {
    
  }

  render = () => {
    const { renderResourcePalette } = this.state
    return (
      <div className="workbench-container">
        { renderResourcePalette ? <ResourcePalette mxgraphManager={this.graphManager}  addResourceToDiagramEditor={this.addResourceToDiagramEditor} /> : '' }
        <DiagramEditor queryString={this.state.queryString} ref={this.DiagramEditor} mxgraphManagerReadyCallback={this.mxgraphManagerReadyCallback} />
      </div>
    );
  }

addResourceToDiagramEditor = (dropContext) => {
    this.DiagramEditor.current.addResourceToEditorFromPalette(dropContext);
}

getDiagramEditor = () => {
  return this.DiagramEditor.current;
}

mxgraphManagerReadyCallback = (mxgraphManager) => {
    this.graphManager = mxgraphManager;

    this.setState({
      renderResourcePalette: true
    })
}

//called at ActionBar Share button
shareDiagram() {
  this.DiagramEditor.current.shareDiagram();
}
}