import React, { Component } from "react";


import ResourcePalette from "./ResourcePalette";
import DiagramEditor from "./DiagramEditor";
import AuthService from "../../services/AuthService";
import Toast from "./Helpers/Toast";

import "../../assets/css/WorkbenchGrid.css";


export default class Workbench extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderResourcePalette: false,
      queryString: this.props.queryString
    }
    
    // this.Index = this.props.Index;

    // this.graphContainer = null;
    // this.dropContext = null;

    this.diagramEditor = React.createRef();

    this.authService = new AuthService();
  }

  componentDidMount() {
    
  }

  render = () => {
    const { renderResourcePalette } = this.state
    return (
        <div className="workbenchgrid-container">
          <ResourcePalette DiagramEditor={this.diagramEditor} addResourceToDiagramEditor={this.addResourceToDiagramEditor}/>
          <DiagramEditor ref={this.diagramEditor} />
          {/* { renderResourcePalette ? <ResourcePalette mxgraphManager={this.graphManager}  addResourceToDiagramEditor={this.addResourceToDiagramEditor} /> : '' } */}
          {/* <DiagramEditor ref={this.diagramEditor} Index={this.Index} queryString={this.state.queryString}  mxgraphManagerReadyCallback={this.mxgraphManagerReadyCallback} Workbench={this} /> */}
        </div>
    );
  }

  addResourceToDiagramEditor = (dropContext) => {
      this.diagramEditor.current.addResourceToEditorFromPalette(dropContext);
  }

  deployDiagramToAzure = (subscription) => {
    this.diagramEditor.current.deployDiagramToAzure(subscription);
  }

  getDiagramEditor = () => {
    return this.diagramEditor.current;
  }

  mxgraphManagerReadyCallback = (mxgraphManager) => {
      this.graphManager = mxgraphManager;

      this.setState({
        renderResourcePalette: true
      })
  }

  //called at ActionBar Share button
  shareDiagram() {
    this.diagramEditor.current.shareDiagram();
  }
}