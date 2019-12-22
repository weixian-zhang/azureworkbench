import React, { Component } from "react";
import VM from "../../models/VM";
import AzureIcons from "../../services/AzureIcons";
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

    this.graph = null;
    this.azureIcons = AzureIcons;
  }

  render() {
    return (
      <div id="diagramEditor" className="workbenchgrid-container">
        <object data="../../assets/azure_icons/ComputeServiceColor/VM/VM.svg" type="image/svg+html">
          <img src="../../assets/azure_icons/ComputeServiceColor/VM/VM.svg" />
        </object>
      </div>
    );
  }

  componentDidMount() {
    //mxgraph example
    //https://www.simplyarchimate.com/app/javascript/index.html

    // Disables the built-in context menu
    //mxEvent.disableContextMenu(this.mxGraphContainer);

    
    // Creates the graph inside the given container
    this.graph = new mxGraph(document.getElementById("diagramEditor"));
   

    new mxRubberband(this.graph);
				
				// Gets the default parent for inserting new cells. This
				// is normally the first child of the root (ie. layer 0).
				var parent = this.graph.getDefaultParent();
								
				// Adds cells to the model in a single step
				this.graph.getModel().beginUpdate();
				try
				{
					var v1 = this.graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
					var v2 = this.graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
					var e1 = this.graph.insertEdge(parent, null, '', v1, v2);
				}
				finally
				{
					// Updates the display
					this.graph.getModel().endUpdate();
				}
  }

  addResourceToEditorFromPalette(resourceCategory, resourceType){
    switch(resourceType) {
      case 'vm':
        this.addVMVertex();
        break;
      default:
        return null;
    }
  }

  addVMVertex(){

     var vmResource = new VM();
     
     this.graph.getModel().beginUpdate();
     try
     {
      this.graph.insertVertex(this.graph.getDefaultParent(), vmResource, '', 60, 60, 50, 50,
      "shape=image;image=data:image/svg+xml," + this.azureIcons.VirtualMachine());
     }
     finally
     {
       // Updates the display
       this.graph.getModel().endUpdate();
     }

     
  }
  
}