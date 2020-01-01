
import React, { Component } from "react";
import VMPropertiesPanel from "./VMPropertiesPanel";
import VM from "../../models/VM";
import ShortUniqueId from 'short-unique-id';
import AzureIcons from "../../services/AzureIcons";
import MxGraphManager from '../../services/MxGraphManager';
import { mxCellOverlay, mxImage, mxImageBundle, overlay, mxEvent, mxUtils } from "mxgraph-js";


 export default class DiagramEditor extends Component {
  constructor(props) {
    super(props);
    this.shortUID = new ShortUniqueId();
    this.graph = null;
    this.azureIcons = AzureIcons;
    
    //property panel visibility
    this.showVMPropertyPanel = false;
  }

  componentDidMount() {   
    this.graphManager = new MxGraphManager(document.getElementById("diagramEditor"));
    this.graphManager.initGraph();
    this.graph = this.graphManager.graph;
    this.props.mxgraphManagerReadyCallback(this.graphManager);

    this.addDblClickEventToDeleteVertex();
    
    //create refs
    this.vmPropPanel = React.createRef();
  } 

  render() {
    return (
      <div id="diagramEditor" className="workbenchgrid-container">
        
        <VMPropertiesPanel ref={this.vmPropPanel} />
      </div>
    );
  }
  
  addDblClickEventToDeleteVertex(){

    this.graph.addListener(mxEvent.DOUBLE_CLICK, (sender, evt) =>
        {
          var cell = evt.getProperty('cell');

          let iconId = cell.value.GraphModel.IconId;
          let resourceType = cell.value.GraphModel.ResourceType;

          this.determineResourcePropertyPanelToShow(resourceType);
        });  
  }
  addResourceToEditorFromPalette = (dropContext) => {

    switch(dropContext.resourceType) {
      case 'vm':
        this.addVMVertex(dropContext);
        break;
      case 'vnet':
        this.addVNet(dropContext);
        break;
      default:
        return null;
    }
  }

  determineResourcePropertyPanelToShow = (resourceType) => {
    switch (resourceType) {
      case "vm":
        this.vmPropPanel.current.show(true);
        break;
      case "vnet":
        this.vmPropPanel.current.show(true);
        break;
      default:
        break;
    }
  }

  addVNet = (dropContext) => {
    //mxgraph examples
    https://jgraph.github.io/mxgraph/javascript/index.html

    var bundle = new mxImageBundle();
    bundle.putImage('nsg', 'data:image/svg+xml,'+ AzureIcons.NSG(), null);

      var vnetCell = this.graph.insertVertex(
        this.graph.getDefaultParent(),
        null,
        "vnet",
        dropContext.x,
        dropContext.y,
        400,
        200,
        "verticalLabelPosition=top;verticalAlign=bottom;"
      );

      // Creates a new overlay with an image and a tooltip
    var nsgOverlay = new mxCellOverlay(
      new mxImage(bundle.getImage("nsg"), 20, 20),
      "NSG"
    );
    
    // Sets the overlay for the cell in the graph
    this.graph.addCellOverlay(vnetCell, nsgOverlay);
  }

  addVMVertex = (dropContext) => {

     var vmModel = new VM();
     vmModel.GraphModel.IconId = this.shortUID.randomUUID(6);
     vmModel.ProvisionContext.Name = "vm_" + vmModel.GraphModel.IconId;
     vmModel.GraphModel.ResourceType = "vm";
     vmModel.GraphModel.ResourceCategory = "compute";

     this.graphManager.graph.getModel().beginUpdate();
     try
     {
        var vm = this.graph.insertVertex
          (this.graphManager.graph.getDefaultParent(), vmModel.GraphModel.IconId ,vmModel , dropContext.x, dropContext.y, 45, 45,
          "verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," + this.azureIcons.VirtualMachine());
      }
     finally
     {
       // Updates the display
       this.graphManager.graph.getModel().endUpdate();
     }
  }
  
}


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