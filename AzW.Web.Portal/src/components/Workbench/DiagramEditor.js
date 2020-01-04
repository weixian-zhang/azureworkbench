
import React, { Component } from "react";
import {Toaster, Position, Intent} from "@blueprintjs/core";
import VMPropPanel from "./PropPanel/VMPropPanel";
import VNetPropPanel from "./PropPanel/VNetPropPanel";
import VM from "../../models/VM";
import VNet from "../../models/VNet";
import ShortUniqueId from 'short-unique-id';
import AzureIcons from "./Helpers/AzureIcons";
import Messages from "./Helpers/Messages";
import MxGraphManager from './Helpers/MxGraphManager';
import { mxCellOverlay, mxImage, mxKeyHandler, mxConstants, overlay, mxEvent, mxUtils,mxPopupMenuHandler, mxDragSource, mxUndoManager, mxCell } from "mxgraph-js";
import Subnet from "../../models/Subnet";


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
    this.addDragOverEventForVMOverSubnetHighlight();

    //create refs
    this.vmPropPanel = React.createRef();
    this.vnetPropPanel = React.createRef();
  } 

  render() {
    return (
      <div id="diagramEditor" className="workbenchgrid-container">
        <VMPropPanel ref={this.vmPropPanel} saveVMModelToDiagramEditor={this.fromVMPropPanelSaveModel} />
        <VNetPropPanel ref={this.vnetPropPanel} />
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

addDragOverEventForVMOverSubnetHighlight() {
  mxEvent.addListener(this.graphManager.container, 'dragover', function(evt)
				{
					if (this.graph.isEnabled())
					{
						evt.stopPropagation();
						evt.preventDefault();
					}
				});
}

  addContextMenu(){
    var thisComponent = this;

    this.graph.popupMenuHandler.autoExpand = true;
    //Installs a popupmenu handler using local function (see below).
    this.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
    {
      thisComponent.createContextMenu(this.graph, menu, cell, evt);
    };
  }

  addResourceToEditorFromPalette = (dropContext) => {


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
        this.vmPropPanel.current.setResourceModelFromDiagramEditor(resourceModel);
        this.vmPropPanel.current.show(true);
        break;
      case "vnet":
        this.vnetPropPanel.current.show(true);
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
      vnetModel.ProvisionContext.Name = 'vnet_' + vnetModel.GraphModel.Id;
      
      this.graphManager.graph.getModel().beginUpdate();
      try
      {
          //overlay event listener
          https://stackoverflow.com/questions/45708656/drag-event-on-mxgraph-overlay
          // Creates a new overlay with an image and a tooltip
        var vnetIconOverlay = new mxCellOverlay(
          new mxImage(require('../../assets/azure_icons/Networking Service Color/Virtual Network (Classic).svg'),25, 25),
          null,  mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP
        );

          var vnetCell = this.graph.insertVertex(
            this.graph.getDefaultParent(),
            null,
            vnetModel,
            dropContext.x,
            dropContext.y,
            500,
            550,
            "verticalLabelPosition=top;verticalAlign=bottom;align=right;STYLE_STROKEWIDTH=2"
          );
        
        this.graph.addCellOverlay(vnetCell, vnetIconOverlay);
    }
    finally
    {
      // Updates the display
      this.graphManager.graph.getModel().endUpdate();
    }
  }

  addSubnet = (vnetCell) => {
      //var vnetCell = this.graph.getCell(vnetVertexId);

      var subnet = new Subnet();
      subnet.GraphModel.Id = this.shortUID.randomUUID(6);
      subnet.ProvisionContext.Name = "subnet_" + subnet.GraphModel.Id;

      this.graphManager.graph.getModel().beginUpdate();
      try 
      {
        var nsgOverlay = new mxCellOverlay(
          new mxImage(require('../../assets/azure_icons/Networking Service Color/NSG.png'),25, 25),
          null,  mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP
        );

        var subnetLogoOverlay = new mxCellOverlay(
          new mxImage(require('../../assets/azure_icons/Networking Service Color/Subnet.png'),25, 25),
          null,  mxConstants.ALIGN_Right, mxConstants.ALIGN_TOP
        );

        var subnetVertex = this.graph.insertVertex(
          vnetCell,
          subnet.GraphModel.Id,
          subnet,
          ((vnetCell.getGeometry().x /2) / 2) - 15,
          vnetCell.getGeometry().y + Math.floor((Math.random() * 15) + 1),
          vnetCell.getGeometry().width - 90,
          100,
          "verticalLabelPosition=top;verticalAlign=bottom;align=right"
        );
 
        this.graph.addCellOverlay(subnetVertex, subnetLogoOverlay);
        this.graph.addCellOverlay(subnetVertex, nsgOverlay);
      }
      finally
      {
        // Updates the display
        this.graphManager.graph.getModel().endUpdate();
      }
  }

  addVM = (dropContext) => {
    var cell = this.graph.getCellAt(dropContext.x, dropContext.y);
    if(dropContext.resourceType == "vm" && (cell == null || cell.value.ResourceType != "subnet"))
    {
        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.DANGER, timeout: 3000, message: Messages.VMInSubnet()});
        return;
    }

     var vmModel = new VM();
     vmModel.GraphModel.IconId = this.shortUID.randomUUID(6);
     vmModel.ProvisionContext.Name = "vm_" + vmModel.GraphModel.IconId;
     vmModel.GraphModel.ResourceType = "vm";
     vmModel.ProvisionContext.Name = "vm-" + vmModel.GraphModel.IconId;

     this.graphManager.graph.getModel().beginUpdate();
     try
     {
        var vm = this.graph.insertVertex
          (cell, vmModel.GraphModel.IconId ,vmModel , cell.getGeometry().x, cell.getGeometry().x, 45, 45,
          "verticalLabelPosition=bottom;verticalAlign=bottom;shape=image;image=data:image/svg+xml," + this.azureIcons.VirtualMachine());
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

  //callbacks from Ref components
  fromVMPropPanelSaveModel(vmModel) {
      var vmCell = this.graph.getModel().getCell(vmModel.GraphModel.Id);
      vmCell.value.ProvisionContext = vmModel.ProvisionContext; 
  }

}