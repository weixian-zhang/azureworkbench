import React, { Component } from "react";


import ResourcePalette from "./ResourcePalette";
import DiagramEditor from "./DiagramEditor";

import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';

import "../../assets/css/WorkbenchGrid.css";


export default class Workbench extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderResourcePalette: false,
      queryString: this.props.queryString
    }

    this.diagramEditor = React.createRef();
  }

  componentDidMount() {
    this.initDropPNGSVGAZWBFileOnCanvas();
  }

  render = () => {
    const { renderResourcePalette } = this.state
    return (
        <div className="workbenchgrid-container">
          <ResourcePalette DiagramEditor={this.diagramEditor} addResourceToDiagramEditor={this.addResourceToDiagramEditor}/>
          <DiagramEditor ref={this.diagramEditor} queryString={this.state.queryString} />
        </div>
    );
  }

  initDropPNGSVGAZWBFileOnCanvas() {
    var thisComp = this;

    $("#diagramEditor").on("dragover", function(event) {
      event.preventDefault();  
      event.stopPropagation();
      $(this).addClass('dragging');
    });
    
    $("#diagramEditor").on("dragleave", function(event) {
        event.preventDefault();  
        event.stopPropagation();
        $(this).removeClass('dragging');
    });
    
    $("#diagramEditor").on("drop", function(event) {
      if(event.target.className == '') {
          event.preventDefault();  
          event.stopPropagation();
          thisComp.diagramEditor.current.onDropPNGAZWBFileHandler(event);
      }
    });
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

  shareDiagram() {
    this.diagramEditor.current.shareDiagram();
  }
}