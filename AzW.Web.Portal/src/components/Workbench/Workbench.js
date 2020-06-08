import React, { Component } from "react";


import ResourcePalette from "./ResourcePalette";
import DiagramEditor from "./DiagramEditor";
import AuthService from "../../services/AuthService";

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
    
    // this.Index = this.props.Index;

    // this.graphContainer = null;
    // this.dropContext = null;

    this.diagramEditor = React.createRef();

    this.authService = new AuthService();

    
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
          {/* { renderResourcePalette ? <ResourcePalette mxgraphManager={this.graphManager}  addResourceToDiagramEditor={this.addResourceToDiagramEditor} /> : '' } */}
          {/* <DiagramEditor ref={this.diagramEditor} Index={this.Index} queryString={this.state.queryString}  mxgraphManagerReadyCallback={this.mxgraphManagerReadyCallback} Workbench={this} /> */}
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
      if(event.target.className == '') { //icons in resourcepalette classname is 'diagrameditor ui-draggable'
          event.preventDefault();  
          event.stopPropagation();
          thisComp.diagramEditor.current.onDropPNGAZWBFileHandler(event);
      }
    });
    // var editor = document.getElementById("diagramEditor");
    // editor.addEventListener("dragenter", function(evt) {
    //   // Here you could also set effects on the Diagram,
    //   // such as changing the background color to indicate an acceptable drop zone

    //   // Requirement in some browsers, such as Internet Explorer
    //   evt.preventDefault();
    // }, false);
    // editor.addEventListener('drop', function(evt){
    //   // prevent default action
    //   // (open as link for some elements in some browsers)
    //   evt.preventDefault();

    //   this.diagramEditor.current.onDropPNGAZWBFileHandler(evt);
    // },false);
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