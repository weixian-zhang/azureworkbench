import React, { Component } from "react";
//import { Droppable} from 'react-beautiful-dnd';
import {
  mxGraph,
  mxRectangle,
  mxParallelEdgeLayout,
  mxConstants,
  mxEdgeStyle,
  mxLayoutManager,
  mxCell,
  mxGeometry,
  mxRubberband,
  mxDragSource,
  mxKeyHandler,
  mxCodec,
  mxClient,
  mxConnectionHandler,
  mxUtils,
  mxToolbar,
  mxEvent,
  mxImage,
  mxFastOrganicLayout
} from "mxgraph-js";

export default class DiagramEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="diagramEditor" className="workbenchgrid-container">
      </div>
    );
  }

  componentDidMount() {
    //mxgraph example
    //https://www.simplyarchimate.com/app/javascript/index.html

    // Disables the built-in context menu
    //mxEvent.disableContextMenu(this.mxGraphContainer);

    
    // Creates the graph inside the given container
    var graph = new mxGraph(document.getElementById("diagramEditor"));

    // Enables rubberband selection
    //new mxRubberband(graph);

   //graph.insertVertex()
  }

  addResourceToEditorFromPalette(resourceCategory, resourceType){

  }
  
}