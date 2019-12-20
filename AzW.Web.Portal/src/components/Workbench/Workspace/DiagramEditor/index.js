import React, { Component } from "react";
import { mxGraph } from "mxgraph-js";
import "./diagrameditor.css";

export default class DiagramEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editor">
        <div className="grid" id="diagramEditor" />
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
    // graph.minimumGraphSize = 1000;
    var parent = graph.getDefaultParent();
    // Adds cells to the model in a single step
    graph.getModel().beginUpdate();
    try
    {
        var v1 = graph.insertVertex(parent, null,
                'Hello,', 20, 20, 80, 30);
        var v2 = graph.insertVertex(parent, null,
                'World!', 200, 150, 80, 30);
        var e1 = graph.insertEdge(parent, null, '', v1, v2);
    }
    finally
    {
        // Updates the display
        graph.getModel().endUpdate();
    }
    // Enables rubberband selection
    //new mxRubberband(graph);

   //graph.insertVertex()
  }

  addResourceToEditorFromPalette(resourceCategory, resourceType){

  }
  
}