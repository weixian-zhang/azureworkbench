
import React, { Component } from "react";
import VMPropertiesPanel from "./VMPropertiesPanel";
import VM from "../../models/VM";
import VNet from "../../models/VNet";
import ShortUniqueId from 'short-unique-id';
import AzureIcons from "../../services/AzureIcons";
import NSGIcon from "../../assets/azure_icons/Networking Service Color/Network Security Groups (Classic).svg";
import MxGraphManager from '../../services/MxGraphManager';
import { mxCellOverlay, mxImage, mxKeyHandler, overlay, mxEvent, mxUtils, mxDragSource, mxUndoManager } from "mxgraph-js";


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

    this.addDblClickEventToOpenPropPanel();
    this.addDeleteKeyEventToDeleteVertex();
    this.addContextMenu();
    this.addCtrlZEventToUndo();

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
  
  addDblClickEventToOpenPropPanel(){
    this.graph.addListener(mxEvent.DOUBLE_CLICK, (sender, evt) =>
        {
          var cell = evt.getProperty('cell');

          if(cell.value == null)
            return;

          let iconId = cell.value.GraphModel.IconId;
          let resourceType = cell.value.GraphModel.ResourceType;

          this.determineResourcePropertyPanelToShow(resourceType, cell.value);
        });  
  }

  addDeleteKeyEventToDeleteVertex(){
      // delete key remove vertex
      var keyHandler = new mxKeyHandler(this.graph);
      keyHandler.bindKey(46, (evt) =>
        {
            this.graph.removeCells();
        });
  }

  addCtrlZEventToUndo(){
    
    var undoManager = new mxUndoManager();
    var listener = function(sender, evt) {
      undoManager.undoableEditHappened(evt.getProperty("edit"));
    };
    this.graph.getModel().addListener(mxEvent.UNDO, listener);
    this.graph.getView().addListener(mxEvent.UNDO, listener);

    var keyHandler = new mxKeyHandler(this.graph);

    keyHandler.getFunction = function(evt) {
      if (evt != null && evt.ctrlKey == true && evt.key == 'z')
      {
          undoManager.undo();
      }
    }
}

  addContextMenu(){
    var thisComponent = this;
    //Installs a popupmenu handler using local function (see below).
    this.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
    {
      thisComponent.createContextMenu(this.graph, menu, cell, evt);
    };
  }

  addResourceToEditorFromPalette = (dropContext) => {

    var cell = this.graph.getCellAt(dropContext.x, dropContext.y);

    if(cell != null)
    {
      this.addVMIntoSubnet(cell, dropContext);
      return;
    }

    switch(dropContext.resourceType) {
      case 'vm':
        this.addVM(dropContext);
        break;
      case 'vnet':
        this.addVNet(dropContext);
        break;
      default:
        return null;
    }
  }

  determineResourcePropertyPanelToShow = (resourceType, resourceModel) => {
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

      var vnetModel = new VNet();
      vnetModel.resourceType = "vnet"
      vnetModel.GraphModel.Id = this.shortUID.randomUUID(6);
      
      this.graphManager.graph.getModel().beginUpdate();
      try
      {
          var vnetCell = this.graph.insertVertex(
            this.graph.getDefaultParent(),
            null,
            vnetModel,
            dropContext.x,
            dropContext.y,
            400,
            200,
            "verticalLabelPosition=top;verticalAlign=bottom;"
          );
          
          // Creates a new overlay with an image and a tooltip
        var nsgOverlay = new mxCellOverlay(
          new mxImage(require('../../assets/azure_icons/Networking Service Color/Network Security Groups (Classic).svg'),
          20, 20),
          "NSG"
        );
        
        // Sets the overlay for the cell in the graph
        this.graph.addCellOverlay(vnetCell, nsgOverlay);
    }
    finally
    {
      // Updates the display
      this.graphManager.graph.getModel().endUpdate();
    }
  }

  addSubnet = (vnetCell) => {
      //var vnetCell = this.graph.getCell(vnetVertexId);

      this.graphManager.graph.getModel().beginUpdate();
      try 
      {
        var subnetCell = this.graph.insertVertex(
          vnetCell,
          null,
          'subnet',
          vnetCell.getGeometry().x,
          vnetCell.getGeometry().y,
          vnetCell.getGeometry().width - 30,
          vnetCell.getGeometry().height - 100,
          "verticalLabelPosition=top;verticalAlign=bottom;"
        );
      }
      finally
      {
        // Updates the display
        this.graphManager.graph.getModel().endUpdate();
      }
  }

  addVM = (dropContext) => {

     var vmModel = new VM();
     vmModel.GraphModel.IconId = this.shortUID.randomUUID(6);
     vmModel.ProvisionContext.Name = "vm_" + vmModel.GraphModel.IconId;
     vmModel.GraphModel.ResourceType = "vm";

     this.graphManager.graph.getModel().beginUpdate();
     try
     {
        var vm = this.graph.insertVertex
          (this.graphManager.graph.getDefaultParent(), vmModel.GraphModel.IconId ,vmModel , dropContext.x, dropContext.y, 45, 45,
          "verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," + this.azureIcons.VirtualMachine());

          vm.setConnectable(false);
        }
     finally
     {
       // Updates the display
       this.graphManager.graph.getModel().endUpdate();
     }
  }

  addVMIntoSubnet(subnetCell, dropContext) {
    var vmModel = new VM();
     vmModel.GraphModel.IconId = this.shortUID.randomUUID(6);
     vmModel.ProvisionContext.Name = "vm_" + vmModel.GraphModel.IconId;
     vmModel.GraphModel.ResourceType = "vm";

     this.graphManager.graph.getModel().beginUpdate();
     try
     {
        var vm = this.graph.insertVertex
          (subnetCell, vmModel.GraphModel.IconId ,vmModel , dropContext.x, dropContext.y, 45, 45,
          "verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," + this.azureIcons.VirtualMachine());

          vm.setConnectable(false);
        }
     finally
     {
       // Updates the display
       this.graphManager.graph.getModel().endUpdate();
     }
  }
  
  createContextMenu = (graph, menu, cell, evt) => {

    if(cell == null || cell.value == null | cell.value.GraphModel == null)
        return;
    
        var thisComponent = this;

    menu.addItem('Bring to Front', '', function()
      {
        mxUtils.alert('bring to front');
      });

      menu.addItem('Send To Back', '', function()
      {
        mxUtils.alert('send to back');
      });

      menu.addSeparator();

      if(cell.value.resourceType == "vnet")
      {
        menu.addItem('Add Subnet', '', function()
        {
          thisComponent.addSubnet(cell); // is vnetCell
        });
  
        menu.addItem('Add Peering', '', function()
        {
          mxUtils.alert('MenuItem1');
        });
      }
  }

  saveDraft(){
    this.graph.clearSelection();
    this.graph.selectAll();
    var cells = this.graph.getSelectionCells(); 
    this.graph.clearSelection();
  }

}