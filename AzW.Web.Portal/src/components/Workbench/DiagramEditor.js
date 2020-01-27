
import React, { Component } from "react";
import {Spinner, InputGroup, Classes, Button, Intent, Overlay, Toaster, Position} from "@blueprintjs/core";
import VMPropPanel from "./PropPanel/VMPropPanel";
import SubnetPropPanel from "./PropPanel/SubnetPropPanel";
import VNetPropPanel from "./PropPanel/VNetPropPanel";
import NLBPropPanel from "./PropPanel/NLBPropPanel";
import AppGwPropPanel from "./PropPanel/AppGwPropPanel";
import DNSPrivateZonePropPanel from "./PropPanel/DNSPrivateZone";

import VM from "../../models/VM";
import VMSS from "../../models/VMSS";
import VNet from "../../models/VNet";
import NLB from "../../models/NLB";
import DNSPrivateZone from "../../models/DNSPrivateZone";
import AppGateway from "../../models/AppGateway";
import ResourceType from '../../models/ResourceType';
import AnonymousDiagramContext from "../../models/services/AnonymousDiagramContext"; 
import ShortUniqueId from 'short-unique-id';
import AzureIcons from "./Helpers/AzureIcons";
import Messages from "./Helpers/Messages";
import Utils from "./Helpers/Utils";
import MxGraphManager from './Helpers/MxGraphManager';
import { mxCellPath, mxDefaultToolbar, mxDefaultPopupMenu, mxDefaultKeyHandler, mxStylesheet, mxGraphModel, mxClipboard, mxCodec, mxPoint, mxGeometry, mxCellOverlay, mxImage, mxKeyHandler, mxConstants, mxEvent, mxUtils,mxPopupMenuHandler, mxDragSource, mxUndoManager, mxCell, mxEditor, mxGraph, mxElbowEdgeHandler, mxLabel } from "mxgraph-js";
import Subnet from "../../models/Subnet";
import LoadAnonyDiagramContext from "../../models/LoadAnonyDiagramContext";
import DiagramService from '../../services/DiagramService';
import queryString from 'query-string';
import AzureValidator from './Helpers/AzureValidator';

 export default class DiagramEditor extends Component {
  constructor(props) {
    super(props);
    this.shortUID = new ShortUniqueId();
    this.graph = null;
    this.azureIcons = AzureIcons;

    //state
    this.state = {
        showShareDiagramPopup: false,
        shareLink: '',
        shareLinkInputbox: null,
        showSpinner: false,

        queryString: this.props.queryString
    }
  }

  componentDidMount() {   
    this.graphManager = new MxGraphManager(document.getElementById("diagramEditor"));
    this.graphManager.initGraph();
    this.graph = this.graphManager.graph;
    this.azureValidator = new AzureValidator(this.graph);
    this.props.mxgraphManagerReadyCallback(this.graphManager);

    //services
    this.diagramService = new DiagramService();

    //this.onCellAdded();
    this.addDblClickEventToOpenPropPanel();
    this.addDeleteKeyEventToDeleteVertex();
    this.addContextMenu();
    this.addCtrlZEventToUndo();
    this.addCtrlCCtrlVCopyPasteVertices();
    this.addDragOverEventForVMOverSubnetHighlight();

    this.loadSharedDiagram();

    this.initPropPanelRef();
  }

  render() {
    return (
      <div id="diagramEditor" className="workbenchgrid-container">
        <VMPropPanel ref={this.vmPropPanel} />
        <VNetPropPanel ref={this.vnetPropPanel} />
        <SubnetPropPanel ref={this.subnetPropPanel} />
        <NLBPropPanel ref={this.nlbPropPanel} />
        <AppGwPropPanel ref={this.appgwPropPanel} />
        <DNSPrivateZonePropPanel ref={this.dnsPrivateZonePropPanel} />
        <Overlay isOpen={this.state.showShareDiagramPopup} onClose={this.closeShareDiagramPopup} >
          <div className={[Classes.CARD, Classes.ELEVATION_4, "login-overlay"]}>
          <InputGroup
                    disabled={true}
                    value={this.state.shareLink}
                    inputRef={(input) => {
                      if(this.state.shareLinkInputbox == null)
                        this.setState({shareLinkInputbox: input})
                  }}
                />
            <Button className="bp3-button bp3-intent-success" icon="tick" onClick={this.copySharedLink}>Copy</Button>
          </div>
        </Overlay>
        {this.state.showSpinner ? <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} value={0.6} /> : '' }
      </div>
    );
  }

  initPropPanelRef() {
    this.vmPropPanel = React.createRef();
    this.vnetPropPanel = React.createRef();
    this.subnetPropPanel = React.createRef();
    this.nlbPropPanel = React.createRef();
    this.appgwPropPanel = React.createRef();
    this.dnsPrivateZonePropPanel = React.createRef();
  }
  
  addDblClickEventToOpenPropPanel(){
    this.graph.addListener(mxEvent.DOUBLE_CLICK, (sender, evt) =>
        {
          var cell = evt.getProperty('cell');

          if(cell.value == null)
            return;
          
          var result = Utils.TryParseUserObject(cell.value);

          if(!result.isUserObject)
              return;

          this.determineResourcePropertyPanelToShow(cell, result.userObject);
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

addCtrlCCtrlVCopyPasteVertices() {
  var keyHandler = new mxKeyHandler(this.graph);
  var thisComp = this;
  keyHandler.getFunction = function(evt) {
    if (evt != null && evt.ctrlKey == true && evt.key == 'c')
      thisComp.copyToClipboard();
    if(evt != null && evt.ctrlKey == true && evt.key == 'v')
      thisComp.pasteFromClipboard();
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
    this.graph.popupMenuHandler.autoExpand = true;

    var thisComponent = this;

    //Installs a popupmenu handler using local function (see below).
    this.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
    {
      if(cell == null || cell.value == null) // | cell.value.GraphModel == null)
        return;
    
      menu.addItem('Bring to Front', '', function()
        {
          thisComponent.graph.orderCells(false); 
        });

        menu.addItem('Send To Back', '', function()
        {
          thisComponent.graph.orderCells(true); 
        });

        var userObj = JSON.parse(cell.value);

        //for vnet
        if(userObj.resourceType == "vnet")
        {
          menu.addSeparator();
          
          menu.addItem('Add Subnet', '', function()
          {
            thisComponent.addSubnet(cell); // is vnetCell
          });
        }
    };
  }

  addResourceToEditorFromPalette = (dropContext) => {

    switch(dropContext.resourceType) {
      case 'elbowarrow':
        this.addElbowArrow(dropContext);
        break;
      case 'straightarrow':
        this.addStraightArrow(dropContext);
        break;
      case 'dashedarrow':
        this.addDashedArrow(dropContext);
        break;
      case 'label':
        this.addLabel(dropContext);
        break;
      case 'rectangle':
        this.addRectangle(dropContext);
        break;
      case 'triangle':
        this.addTriangle(dropContext);
        break;
      case 'circle':
        this.addCircle(dropContext);
        break;
      case 'user':
        this.addUser(dropContext);
        break;
      case 'datacenter':
        this.addOnpremDC(dropContext);
        break;
      case 'internet':
        this.addInternet(dropContext);
        break;
        
      case 'vmWindows':
        this.addVM(dropContext, 'vmWindows');
        break;
      case 'vmLinux':
        this.addVM(dropContext, 'vmLinux');
        break;
      case 'vmss':
        this.addVMSS(dropContext, 'vmss');
        break;
      case 'vnet':
        this.addVNet(dropContext);
        break;
      case 'nlb':
        this.addNLB(dropContext);
        break;
      case 'appgw':
        this.addAppGw(dropContext);
        break;
      case 'dnsprivatezone':
        this.addDNSPrivateZone(dropContext);
        break;
        

      default:
        break;
    }
    this.graph.clearSelection();
  }

  determineResourcePropertyPanelToShow = (cell, userObject) => {

    let thisComp = this;

    switch (userObject.GraphModel.ResourceType) {
      case ResourceType.WindowsVM():
        this.vmPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.LinuxVM():
        this.vmPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.VNet():
        this.vnetPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.Subnet():
          this.subnetPropPanel.current.show(userObject, function(savedUserObject){
            thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
          });
          break;
      case ResourceType.NLB():
        this.nlbPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.AppGw():
        this.appgwPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.DNSPrivateZone():
        this.dnsPrivateZonePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      default:
        break;
    }
  }

  addStraightArrow(dropContext){

    this.graphManager.graph.getModel().beginUpdate();
      try
      {
        var parent = this.graph.getDefaultParent();
        var randomId = this.shortUID.randomUUID(6);
        var cell = new mxCell(randomId, new mxGeometry(dropContext.x, dropContext.y, 50, 50), 'straightedgestyle'); //curved=0;endArrow=classic;html=1;
        cell.geometry.setTerminalPoint(new mxPoint(dropContext.x, dropContext.y), true);
        cell.geometry.setTerminalPoint(new mxPoint(dropContext.x + 50, dropContext.y - 50), false);
        cell.geometry.points = [new mxPoint(dropContext.x, dropContext.y), new mxPoint(dropContext.x + 30, dropContext.y - 30)];
        cell.geometry.relative = true;
        cell.edge = true;
        this.graph.addCell(cell, parent);
      }
      finally
      {
        // Updates the display
        this.graphManager.graph.getModel().endUpdate();
      }
  }

  addDashedArrow(dropContext){
    this.graphManager.graph.getModel().beginUpdate();
    try
    {
      var parent = this.graph.getDefaultParent();
      var randomId = this.shortUID.randomUUID(6);
      var cell = new mxCell(randomId, new mxGeometry(dropContext.x, dropContext.y, 50, 50), 'dashededgestyle'); //curved=0;endArrow=classic;html=1;
      cell.geometry.setTerminalPoint(new mxPoint(dropContext.x, dropContext.y), true);
      cell.geometry.setTerminalPoint(new mxPoint(dropContext.x + 50, dropContext.y - 50), false);
      cell.geometry.points = [new mxPoint(dropContext.x, dropContext.y), new mxPoint(dropContext.x + 30, dropContext.y - 30)];
      cell.geometry.relative = true;
      cell.edge = true;
      this.graph.addCell(cell, parent);
    }
    finally
    {
      // Updates the display
      this.graphManager.graph.getModel().endUpdate();
    }
  }

  addElbowArrow(dropContext){

      this.graphManager.graph.getModel().beginUpdate();
      try
      {
        var parent = this.graph.getDefaultParent();

        var randomId = this.shortUID.randomUUID(6);
        var cell = new mxCell(randomId, new mxGeometry(dropContext.x, dropContext.y, 50, 50), 'elbowedgestyle');
        cell.getGeometry().setTerminalPoint(new mxPoint(dropContext.x + 30, dropContext.y + 30), true);
        cell.geometry.setTerminalPoint(new mxPoint(dropContext.x + 50, dropContext.y - 50), false);
        cell.geometry.points = [new mxPoint(dropContext.x, dropContext.y), new mxPoint(dropContext.x + 30, dropContext.y - 30)];
        cell.geometry.relative = true;
        cell.edge = true;
        this.graph.addCell(cell, parent);
      }
      finally
      {
        // Updates the display
        this.graphManager.graph.getModel().endUpdate();
      }
  }

  addLabel = (dropContext) => {
    this.graphManager.graph.getModel().beginUpdate();
    try
    {
      var randomId = this.shortUID.randomUUID(6);

      this.graph.insertVertex
        (this.graph.getDefaultParent(), null, 'text', dropContext.x, dropContext.y, 80, 30,
        'strokeColor=none;fillColor=none;resizable=0;autosize=0;fontSize=15;fontFamily=Segoe UI;');

      // this.graph.insertVertex
      //   (this.graph.getDefaultParent(),randomId, 'Text', dropContext.x, dropContext.y, 50, 30, 'labelstyle'); //'strokeColor=none;fillColor=none;resizable=0;autosize=1;fontsize=14');
    }
    finally
    {
      // Updates the display
      this.graphManager.graph.getModel().endUpdate();
    }
  }

  addRectangle = (dropContext) => {
    var vnetVertex = this.graph.insertVertex(
      this.graph.getDefaultParent(),
      null,
      'rectangle',
      dropContext.x,
      dropContext.y,
      150,
      100,
      "verticalLabelPosition=bottom;verticalAlign=top;strokeColor=darkblue;fillColor=none;resizable=1;fontSize=15;fontFamily=Segoe UI;editable=1"
    );
  }

  addTriangle = (dropContext) => {
    var vnetVertex = this.graph.insertVertex(
      this.graph.getDefaultParent(),
      null,
      'triangle',
      dropContext.x,
      dropContext.y,
      100,
      100,
      "shape=triangle;rotatable=1;perimeter=trianglePerimeter;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=darkblue;fillColor=none;resizable=1;fontSize=15;fontFamily=Segoe UI;editable=1"
    );
  }

  addCircle = (dropContext) => {
    this.graph.insertVertex(
      this.graph.getDefaultParent(),
      null,
      'circle',
      dropContext.x,
      dropContext.y,
      100,
      100,
      "shape=ellipse;rotatable=1;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=darkblue;fillColor=none;resizable=1;fontSize=15;fontFamily=Segoe UI;editable=1"
    );
  }

  addUser = (dropContext) => {
    this.graph.insertVertex
          (this.graph.getDefaultParent(), null, 'user', dropContext.x, dropContext.x, 50, 50,
          "editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
          this.azureIcons.User());
  }

  addOnpremDC = (dropContext) => {
    this.graph.insertVertex
          (this.graph.getDefaultParent(), null, 'datacenter', dropContext.x, dropContext.x, 50, 50,
          "fontSize=13;editable=1;verticalLabelPosition=bottom;shape=image;image=" +
          require('../../assets/azure_icons/shape-dc.png'));
  }

  addInternet = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'internet', dropContext.x, dropContext.x, 55, 55,
    "editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
      this.azureIcons.Internet());
  }

  addVNet = (dropContext) => {

    //mxgraph examples
    https://jgraph.github.io/mxgraph/javascript/index.html

      this.graphManager.graph.getModel().beginUpdate();
      try
      {
          //overlay event listener
          https://stackoverflow.com/questions/45708656/drag-event-on-mxgraph-overlay
          // Creates a new overlay with an image and a tooltip
          var vnetIconOverlay = new mxCellOverlay(
            new mxImage(window.location.origin + require('../../assets/azure_icons/Networking Service Color/Virtual Network (Classic).svg'),25, 25),
            null,  mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP
          );

          var vnetModel = new VNet();
              vnetModel.resourceType = "vnet"
              vnetModel.GraphModel.Id = this.shortUID.randomUUID(6);
              vnetModel.ProvisionContext.Name = 'vnet_' + vnetModel.GraphModel.Id;
              vnetModel.GraphModel.DisplayName = vnetModel.ProvisionContext.Name;
              var jsonstrVnet = JSON.stringify(vnetModel);

          var vnetVertex = this.graph.insertVertex(
                this.graph.getDefaultParent(),
                vnetModel.GraphModel.Id,
                jsonstrVnet,
                dropContext.x,
                dropContext.y,
                400,
                300,
                "vnetstyle"
              );

          this.graph.addCellOverlay(vnetVertex, vnetIconOverlay);
    }
    finally
    {
      // Updates the display
      this.graphManager.graph.getModel().endUpdate();
    }

    return vnetVertex;;
}

  addSubnet = (vnetCell, loadContext) => {

        var nsgOverlay = new mxCellOverlay(
          new mxImage(require('../../assets/azure_icons/Networking Service Color/NSG.png'),20, 20),
          null,  mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP
        );

        var subnetLogoOverlay = new mxCellOverlay(
          new mxImage(require('../../assets/azure_icons/Networking Service Color/Subnet.png'),15, 15),
          'Subnet',  mxConstants.ALIGN_Right, mxConstants.ALIGN_TOP
        );

        var subnetVertex;

        if(loadContext == undefined){

          var subnet = new Subnet();
          subnet.GraphModel.Id = this.shortUID.randomUUID(6);
          subnet.ProvisionContext.Name = "subnet_" + subnet.GraphModel.Id;
          subnet.GraphModel.DisplayName = subnet.ProvisionContext.Name
          var jsonstrSubnet = JSON.stringify(subnet);

          this.graphManager.translateToParentGeometryPoint(vnetCell)

          subnetVertex = this.graph.insertVertex(
            vnetCell,
            subnet.GraphModel.Id,
            jsonstrSubnet,
            ((vnetCell.getGeometry().x /2) / 2) - 15,
            vnetCell.getGeometry().y + Math.floor((Math.random() * 15) + 1),
            vnetCell.getGeometry().width - 90,
            100,
            'subnetstyle'
          );
        }
        else {
            this.graph.getModel().getCell(loadContext.parent.id);
        }
 
        this.graph.addCellOverlay(subnetVertex, subnetLogoOverlay);
        this.graph.addCellOverlay(subnetVertex, nsgOverlay);
  }

  addNLB = (dropContext) => {
      
      var parent = this.graph.getDefaultParent();
      var parentCell = this.graph.getCellAt(dropContext.x, dropContext.y);

      if(parentCell != null){
        var cellType = JSON.parse(parentCell.value).GraphModel.ResourceType;
        if(cellType == 'subnet')
            parent = parentCell;
      }
      
      var dropContext =
          this.graphManager.translateToParentGeometryPoint(dropContext, parent);

      var nlb = new NLB();
        nlb.GraphModel.ResourceType = 'nlb';
        nlb.GraphModel.Id = this.shortUID.randomUUID(6);
        nlb.ProvisionContext.Name = "azlb_" + nlb.GraphModel.Id;
        nlb.GraphModel.DisplayName = 'azure load balancer'
        var nlbJsonString = JSON.stringify(nlb);

      this.graph.insertVertex
        (parent, nlb.GraphModel.IconId ,nlbJsonString, dropContext.x, dropContext.y, 30, 30,
        "editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
          this.azureIcons.NLB());
  }

  addAppGw = (dropContext) => {

      var result =
        this.azureValidator.isResourceDropinSubnet(dropContext.x, dropContext.y);
      
      if(!result.isInSubnet)
      {
          Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.DANGER, timeout: 3000, message: Messages.AppGatewayNotInSubnetError()});
          return;
      }

      if(!this.azureValidator.isResourceinDedicatedSubnet(result.subnetCell))
      {
        Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.DANGER, timeout: 3000, message: Messages.AppGatewayNotInSubnetError()});
          return;
      }

      var dropContext =
          this.graphManager.translateToParentGeometryPoint(dropContext, result.subnetCell);

      var appgw = new AppGateway();
        appgw.GraphModel.Id = this.shortUID.randomUUID(6);
        appgw.ProvisionContext.Name = ResourceType.AppGw() + "_" + appgw.GraphModel.Id;
        appgw.GraphModel.DisplayName = 'app gateway'
        var appgwJsonString = JSON.stringify(appgw);

      this.graph.insertVertex
        (result.subnetCell, appgw.GraphModel.IconId ,appgwJsonString, dropContext.x, dropContext.y, 30, 30,
        "editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
          this.azureIcons.AppGateway());
  }

  addDNSPrivateZone = (dropContext) => {
      var parent = this.graph.getDefaultParent();
      var dropContext =
          this.graphManager.translateToParentGeometryPoint(dropContext, parent);

      var dnsPrivateZone = new DNSPrivateZone();
        dnsPrivateZone.GraphModel.ResourceType = 'dnsprivatezone';
        dnsPrivateZone.GraphModel.Id = this.shortUID.randomUUID(6);
        dnsPrivateZone.ProvisionContext.Name = "azlb_" + dnsPrivateZone.GraphModel.Id;
        dnsPrivateZone.GraphModel.DisplayName = 'azure DNS Private Zone'
        var dnsPrivateZoneJsonString = JSON.stringify(dnsPrivateZone);

      this.graph.insertVertex
        (parent, dnsPrivateZone.GraphModel.IconId ,dnsPrivateZoneJsonString, dropContext.x, dropContext.y, 30, 30,
        "editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
          this.azureIcons.DNSPrivateZone());
  }

  addVM = (dropContext, vmType) => {
    
    if(dropContext.resourceType == ResourceType.WindowsVM() ||
        dropContext.resourceType == ResourceType.LinuxVM())
    {
      var result =
        this.azureValidator.isResourceDropinSubnet(dropContext.x, dropContext.y);

      if(!result.isInSubnet)
      {
          Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.DANGER, timeout: 3000, message: Messages.VMInSubnet()});
          return;
      }
    }

     var vmModel = new VM();
     vmModel.GraphModel.IconId = this.shortUID.randomUUID(6);
     vmModel.ProvisionContext.Name = "vm_" + vmModel.GraphModel.IconId;
     vmModel.GraphModel.DisplayName = vmModel.ProvisionContext.Name;

    var iconByOS;
    if(vmType == ResourceType.WindowsVM())
    {
      iconByOS = this.azureIcons.VirtualMachineWindows();
      vmModel.GraphModel.ResourceType = ResourceType.WindowsVM();
    }
    else if(vmType == ResourceType.LinuxVM())
    {
      iconByOS = this.azureIcons.VirtualMachineLinux();
      vmModel.GraphModel.ResourceType = ResourceType.LinuxVM();
    }
    else
      iconByOS = this.azureIcons.VMSS();

     this.graphManager.graph.getModel().beginUpdate();
     try
     {
        var dropContext =
          this.graphManager.translateToParentGeometryPoint(dropContext, result.subnetCell);

        var vm = this.graph.insertVertex
          (result.subnetCell, vmModel.GraphModel.IconId, JSON.stringify(vmModel), dropContext.x, dropContext.y, 30, 30,
          "editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," + iconByOS);
    }
     finally
     {
       // Updates the display
       this.graphManager.graph.getModel().endUpdate();
     }
  }

  addVMSS = (dropContext) => {

    var result =
      this.azureValidator.isResourceDropinSubnet(dropContext.x, dropContext.y);

    if(dropContext.resourceType == ResourceType.VMSS() && !result.isInSubnet)
       {
          Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.DANGER, timeout: 3000, message: Messages.VMInSubnet()});
          return;
       }

     var vmssModel = new VMSS();
     vmssModel.GraphModel.IconId = this.shortUID.randomUUID(6);
     vmssModel.ProvisionContext.Name = "vmss_" + vmssModel.GraphModel.IconId;
     vmssModel.GraphModel.DisplayName = vmssModel.ProvisionContext.Name;
     var userObj = JSON.stringify(vmssModel);

     this.graphManager.graph.getModel().beginUpdate();
     try
     {
       var dropContext =
          this.graphManager.translateToParentGeometryPoint(dropContext, result.subnetCell);

        var vmss = this.graph.insertVertex
          (result.subnetCell, vmssModel.GraphModel.IconId ,userObj,
           dropContext.x, dropContext.y, 40, 40,
          "editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," + this.azureIcons.VMSS());
    }
     finally
     {
       this.graphManager.graph.getModel().endUpdate();
     }
  }

  //callbacks from Ref components
  fromVMPropPanelSaveModel(vmModel) {
      var vmCell = this.graph.getModel().getCell(vmModel.GraphModel.Id);
      vmCell.value.ProvisionContext = vmModel.ProvisionContext; 
  }

  copyToClipboard =() => {
    var cells = this.graph.getSelectionCells();
      if(cells == null)
      return;

      var result = this.graph.getExportableCells(cells);
    
      mxClipboard.parents = new Object();
    
      for (var i = 0; i < result.length; i++)
      {
        mxClipboard.parents[i] = this.graph.model.getParent(cells[i]);
      }
    
      mxClipboard.insertCount = 1;
      mxClipboard.setCells(this.graph.cloneCells(result));
    
      return result;
  }

  pasteFromClipboard = () => {
    if (!mxClipboard.isEmpty())
      {
        var cells = this.graph.getImportableCells(mxClipboard.getCells());
        var delta = mxClipboard.insertCount * mxClipboard.STEPSIZE;
        var parent = this.graph.getDefaultParent();
    
        this.graph.model.beginUpdate();
        try
        {
          for (var i = 0; i < cells.length; i++)
          {
            var tmp = (mxClipboard.parents != null && this.graph.model.contains(mxClipboard.parents[i])) ?
                 mxClipboard.parents[i] : parent;
            cells[i] = this.graph.importCells([cells[i]], delta, delta, tmp)[0];
          }
        }
        finally
        {
          this.graph.model.endUpdate();
        }
    
        // Increments the counter and selects the inserted cells
        mxClipboard.insertCount++;
        this.graph.setSelectionCells(cells);
      }
  }
  showSpinner(toShow) {
    if(toShow)
      this.setState({showSpinner: true});
    else
    this.setState({showSpinner: false});
  }

  saveDiagramLocalBrowser = () => {
      var anonyDiagramContext = new AnonymousDiagramContext();

  }

  getDiagramLocalBrowser = () => {

  }

  loadSharedDiagram = () => {
      var parsedQS =  queryString.parse(this.state.queryString)
      if(parsedQS == undefined || parsedQS.id == undefined)
          return;
      
      //f(thisgetDiagramLocalBrowser() != null)
      
      var thisComp = this;

      this.diagramService.loadAnonymousDiagram(parsedQS.id)
      .then(function (response) {
          var adc = new AnonymousDiagramContext();
          adc.UID = response.data.UID;
          adc.DiagramName = response.data.DiagramName;
          adc.DiagramXml = response.data.DiagramXml;
          adc.SharedLink = response.data.SharedLink;
          thisComp.importXmlAsDiagram(adc);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });
  }

  importXmlAsDiagram = (anonymousDiagramContext ) => {

    if(anonymousDiagramContext == undefined ||
       anonymousDiagramContext.DiagramXml == undefined)
      return;

      window['mxImage'] = mxImage;   
      window['mxCellOverlay'] = mxCellOverlay;  
      window['mxCell'] = mxCell;
      window['mxCellPath'] = mxCellPath;
      window['mxGeometry'] = mxGeometry;
      window['mxCodec'] = mxCodec;
      window['mxEditor'] = mxEditor;
      window['mxGeometry'] = mxGeometry;
      window['mxDefaultKeyHandler'] = mxDefaultKeyHandler;
      window['mxDefaultPopupMenu'] = mxDefaultPopupMenu;
      window['mxGraph'] = mxGraph;
      window['mxStylesheet'] = mxStylesheet;
      window['mxDefaultToolbar'] = mxDefaultToolbar;
      window['mxGraphModel'] = mxGraphModel;
      window['mxGraphModel'] = mxGraphModel;
      window['mxGraphModel'] = mxGraphModel;
    
      var doc = mxUtils.parseXml(anonymousDiagramContext.DiagramXml);
      var codec = new mxCodec(doc);
      codec.decode(doc.documentElement, this.graph.getModel());

      var cells =
        this.graph.getChildVertices(this.graph.getDefaultParent());
      
        if(cells != undefined)
        {
            cells.map(cell => {

              if(JSON.parse(cell.value).GraphModel.ResourceType == 'vnet')
              {
                this.graph.removeCellOverlays(cell);

                var vnetIconOverlay = new mxCellOverlay(
                  new mxImage(window.location.origin + require('../../assets/azure_icons/Networking Service Color/Virtual Network (Classic).svg'),25, 25),
                  null,  mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP
                );

                this.graph.addCellOverlay(cell, vnetIconOverlay);

                var childSubnets =
                   this.graph.getChildVertices(cell);
                
                if(childSubnets != null)
                {
                  childSubnets.map(subnet => {
                    this.graph.removeCellOverlays(subnet);

                    var nsgOverlay = new mxCellOverlay(
                      new mxImage(require('../../assets/azure_icons/Networking Service Color/NSG.png'),20, 20),
                      null,  mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP
                    );
            
                    var subnetLogoOverlay = new mxCellOverlay(
                      new mxImage(require('../../assets/azure_icons/Networking Service Color/Subnet.png'),15, 15),
                      'Subnet',  mxConstants.ALIGN_Right, mxConstants.ALIGN_TOP
                    );
    
                    this.graph.addCellOverlay(subnet, nsgOverlay);
                    this.graph.addCellOverlay(subnet, subnetLogoOverlay);

                  })
                }
              }
            });
        }
  }

  shareDiagram(){
    if(!this.graphManager.isCellExist())
      {
        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.WARNING, timeout: 3000, message: Messages.SharedDiagramNoCellOnGraph()});
        return;
      }
    
    this.showSpinner(true);

    var thisComp = this;
    var anonyDiagramContext = new AnonymousDiagramContext();
    anonyDiagramContext.DiagramName = this.shortUID.randomUUID(6);
    anonyDiagramContext.DiagramXml = this.getDiagramAsXml();
    anonyDiagramContext.DateTimeSaved = new Date();

    var shareLink = this.diagramService
      .saveAnonymousDiagram(anonyDiagramContext,
        function (shareLink){
          thisComp.showSpinner(false);
          thisComp.setState({shareLink: shareLink, showShareDiagramPopup: true});
        },
        function(error){
          thisComp.showSpinner(false);
          Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.DANGER, timeout: 3000, message: error.message});
        });
  }

  copySharedLink = () => {
    var el = document.createElement('textarea');
    el.value = this.state.shareLinkInputbox.value;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    Toaster.create({
      position: Position.TOP,
      autoFocus: false,
      canEscapeKeyClear: true
    }).show({intent: Intent.SUCCESS, timeout: 3000, message: Messages.SharedDiagramLinkCopied()});
    
    return;
  }

  getDiagramAsXml(){
    var encoder = new mxCodec();

    var node = encoder.encode(this.graph.getModel());

    var diagramInXml = mxUtils.getXml(node, true);
    return diagramInXml;
  }

  closeShareDiagramPopup = () => this.setState({ showShareDiagramPopup: false, useTallContent: false });
}