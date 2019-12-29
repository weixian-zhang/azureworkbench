
import React, { Component } from "react";
import VMPropertiesPanel from "./VMPropertiesPanel";
import VM from "../../models/VM";
import ShortUniqueId from 'short-unique-id';
import AzureIcons from "../../services/AzureIcons";
import { connect } from "react-redux";
import {
  mxGraph,
  Drawer,
  Switch,
  FormGroup, InputGroup,
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
  mxCellTracker,
  mxImage,
  mxFastOrganicLayout
} from "mxgraph-js";


 class DiagramEditor extends Component {
  constructor(props) {
    super(props);
    this.shortUID = new ShortUniqueId();
    this.graph = null;
    this.azureIcons = AzureIcons;
    
    //property panel
    this.showVMPropertyPanel = false;

    this.initGraph = this.initGraph.bind(this);
  }

  componentDidMount() {    
    this.initGraph();
    this.vmPropPanel = this.refs.vmPropPanel;
  }

  render() {
    return (
      <div id="diagramEditor" className="workbenchgrid-container">
        <VMPropertiesPanel ref="vmPropPanel" />
      </div>
    );
  }

  initGraph() {
        // Creates the graph inside the given container
        this.graph = new mxGraph(document.getElementById("diagramEditor"));
  
				// Creates the default style for vertices
				var style = this.graph.getStylesheet().getDefaultVertexStyle();
				style[mxConstants.STYLE_STROKECOLOR] = 'gray';
				style[mxConstants.STYLE_ROUNDED] = true;
				style[mxConstants.STYLE_SHADOW] = true;
				style[mxConstants.STYLE_FILLCOLOR] = '#DFDFDF';
				style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
				style[mxConstants.STYLE_FONTCOLOR] = 'black';
				style[mxConstants.STYLE_FONTSIZE] = '12';
        style[mxConstants.STYLE_SPACING] = 4;
        style[mxConstants.STYLE_EDITABLE] = '0';
		
				// Creates the default style for edges
				style = this.graph.getStylesheet().getDefaultEdgeStyle();
				style[mxConstants.STYLE_STROKECOLOR] = '#0C0C0C';
				style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
				style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
				style[mxConstants.STYLE_ROUNDED] = true;
				style[mxConstants.STYLE_FONTCOLOR] = 'black';
        style[mxConstants.STYLE_FONTSIZE] = '10';
        
        this.graph.cellLabelChanged = function(cell, newValue, autoSize)
        {
        // Cloned for correct undo/redo
        var elt = cell.value.cloneNode(true);
        elt.setAttribute('label', newValue);

        newValue = elt;
        //graphCellLabelChanged.apply(this, arguments);
        };

    //double click load properties
    this.graph.addListener(mxEvent.DOUBLE_CLICK, (sender, evt) =>
    {
      var cell = evt.getProperty('cell');

      let iconId = cell.value.DiagramContext.IconId;
      let resourceType = cell.value.DiagramContext.ResourceType;

      this.determineResourcePropertyPanelToShow(resourceType);
    });
  
    //delete key remove vertex
    var keyHandler = new mxKeyHandler(this.graph);
    keyHandler.bindKey(46, (evt) =>
    {
      this.graph.removeCells();
    });
  }

  addResourceToEditorFromPalette = (resourceType) => {
    switch(resourceType) {
      case 'vm':
        this.addVMVertex();
        break;
      default:
        return null;
    }
  }

  determineResourcePropertyPanelToShow = (resourceType) => {
    switch (resourceType) {
      case "vm":
        this.vmPropPanel.show(true);
        break;
      default:
        break;
    }
  }

  addVMVertex = () => {

     var vmModel = new VM();
     vmModel.DiagramContext.IconId = this.shortUID.randomUUID(6);
     vmModel.DiagramContext.ResourceType = "vm";
     vmModel.DiagramContext.ResourceCategory = "compute";

     this.graph.getModel().beginUpdate();
     try
     {
        var vm = this.graph.insertVertex
          (this.graph.getDefaultParent(), vmModel.DiagramContext.IconId ,vmModel , 60, 60, 50, 50,
          "verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," + this.azureIcons.VirtualMachine());
      }
     finally
     {
       // Updates the display
       this.graph.getModel().endUpdate();
     }
  }
  
}

function mapStateToProps(state) {
  return { graphContext: state.graph }
};

export default connect(mapStateToProps)(DiagramEditor);


// function mapStateToProps(state) {
//   return { graphContext: state.graph }
// };

// const connectedDiagramEditor = connect(mapStateToProps)(DiagramEditor);

// export default class DiagramEditorConnected extends Component
// {
//   constructor(props){
//     super(props);
//   }

//   render(){
//     return (
//       <connectedDiagramEditor />
//     )
//   }
// }