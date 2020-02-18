
import React, { Component } from "react";
import Workspace from './Workspace';
import OverlaySaveToWorkspace from './OverlaySaveToWorkspace';
import {Spinner, InputGroup, Classes, Button, Intent, Overlay, Toaster, Position} from "@blueprintjs/core";
import StylePropPanel from './PropPanel/StylePropPanel';
import VMPropPanel from "./PropPanel/VMPropPanel";
import SubnetPropPanel from "./PropPanel/SubnetPropPanel";
import VNetPropPanel from "./PropPanel/VNetPropPanel";
import NLBPropPanel from "./PropPanel/NLBPropPanel";
import AppGwPropPanel from "./PropPanel/AppGwPropPanel";
import DNSPrivateZonePropPanel from "./PropPanel/DNSPrivateZone";
import CircularProgress from '@material-ui/core/CircularProgress';


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
import { mxXmlCanvas2D,mxXmlRequest, mxImageExport, mxCellPath, mxDefaultToolbar, mxDefaultPopupMenu, mxDefaultKeyHandler, mxStylesheet, mxGraphModel, mxClipboard, mxCodec, mxPoint, mxGeometry, mxCellOverlay, mxImage, mxKeyHandler, mxConstants, mxEvent, mxUtils,mxPopupMenuHandler, mxDragSource, mxUndoManager, mxCell, mxEditor, mxGraph, mxElbowEdgeHandler, mxLabel, mxEventObject } from "mxgraph-js";
import Subnet from "../../models/Subnet";
import LoadAnonyDiagramContext from "../../models/LoadAnonyDiagramContext";
import DiagramService from '../../services/DiagramService';
import queryString from 'query-string';
import AzureValidator from './Helpers/AzureValidator';
import LocalStorage from '../../services/LocalStorage';
import WorkspaceDiagramContext from "../../models/services/WorkspaceDiagramContext";
import mxClientOverrides from './Helpers/mxClientOverrides';

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
        isLoading: false,

        queryString: this.props.queryString
    }
  }

  componentDidMount() {   
    this.graphManager = new MxGraphManager(document.getElementById("diagramEditor"));
    this.graphManager.initGraph();
    this.graph = this.graphManager.graph;
    this.azureValidator = new AzureValidator(this.graph);
    this.props.mxgraphManagerReadyCallback(this.graphManager);
    this.mxClientOverrides = new mxClientOverrides(this.graph);

    //services
    this.diagramService = new DiagramService();

    //this.onCellAdded();
    this.addDblClickEventToOpenPropPanel();
    this.addDeleteKeyEventToDeleteVertex();
    this.addContextMenu();
    this.addCtrlZEventToUndo();
    this.addShiftSEventSaveLocalStorage();
    this.addCtrlCCtrlVCopyPasteVertices();
    this.addUpDownLeftRightArrowToMoveCells();
    this.loadSharedDiagram();
    this.initPasteImageFromBrowserClipboard();
    this.addCtrlSSave();
    //    this.addDragOverEventForVMOverSubnetHighlight();
    this.initRef();
  }

  render() {
    return (
      <div id="diagramEditor" className="diagramEditor">
        <StylePropPanel ref={this.stylePanel} DiagramEditor={this} />
        <OverlaySaveToWorkspace ref={this.overlaySaveToWorkspace} DiagramEditor={this} />
        <Workspace ref={this.workspace} DiagramEditor={this} />
        <VMPropPanel ref={this.vmPropPanel} />
        <VNetPropPanel ref={this.vnetPropPanel} />
        <SubnetPropPanel ref={this.subnetPropPanel} />
        <NLBPropPanel ref={this.nlbPropPanel} />
        <AppGwPropPanel ref={this.appgwPropPanel} />
        <DNSPrivateZonePropPanel ref={this.dnsPrivateZonePropPanel} />
        <Overlay isOpen={this.state.showShareDiagramPopup} onClose={this.closeShareDiagramPopup} >
          <div style={{width: '100%'}} className={[Classes.CARD, Classes.ELEVATION_4, "login-overlay"]}>
          <InputGroup
                    style={{float: 'left'}}
                    disabled={true}
                    value={this.state.shareLink}
                    inputRef={(input) => {
                      if(this.state.shareLinkInputbox == null)
                        this.setState({shareLinkInputbox: input})
                  }}
                />
            <Button style={{float: '15%'}} className="bp3-button bp3-intent-success" icon="tick" onClick={this.copySharedLink}>Copy</Button>
          </div>
        </Overlay>
        <Overlay isOpen={this.state.showSpinner} onClose={this.handleSpinnerClose}>
          <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} value={0.6} />
        </Overlay>
        {(this.state.isLoading) ? <CircularProgress className="loader" /> : ''}
      </div>
    );
  }

  initRef() {
    this.stylePanel = React.createRef();
    this.overlaySaveToWorkspace = React.createRef();
    this.workspace = React.createRef();
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

          if(Utils.IsNullOrUndefine(cell) || Utils.IsNullOrUndefine(cell.value))
            return;
          
          var result = Utils.TryParseUserObject(cell.value);

          if(!result.isUserObject)
              return;

          this.determineResourcePropertyPanelToShow(cell, result.userObject);
        });  
  }

  addDeleteKeyEventToDeleteVertex(){
      var thisComp = this;
      // delete key remove vertex
      var keyHandler = new mxKeyHandler(this.graph);
      keyHandler.bindKey(46, (evt) =>
        { 
          thisComp.graph.removeCells(null, false);
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

addShiftSEventSaveLocalStorage = () => {

  var keyHandler = new mxKeyHandler(this.graph);

  keyHandler.getFunction = function(evt) {
    if (evt != null && evt.shiftKey == true && evt.key == 's')
    {
       this.saveDiagramToBrowser();
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

addCtrlSSave() {
  var keyHandler = new mxKeyHandler(this.graph);
  var thisComp = this;
  keyHandler.getFunction = function(evt) {
    if (evt != null && evt.ctrlKey == true && evt.key == 's')
    {
      evt.preventDefault();
      thisComp.saveDiagramToBrowser();
    }
  }
}

addUpDownLeftRightArrowToMoveCells() {
    var keyHandler = new mxKeyHandler(this.graph);
    var thisComp = this;
    keyHandler.getFunction = function(evt) {

      var cells = thisComp.graph.getSelectionCells();

      if(!Utils.IsNullOrUndefine(cells))
      {
          cells.map(cell => {

              var geo = getSelectedCellGeo(cell);

              if (evt != null && evt.key == 'ArrowUp')
              {
                  if(Utils.IsNullOrUndefine(geo))
                    return;
                  var newY = geo.y - 2;
                  moveCell(cell, geo, geo.x, newY);
              }
          
              if (evt != null && evt.key == 'ArrowDown')
              {
                if(Utils.IsNullOrUndefine(geo))
                  return;
                var newY = geo.y + 2;
                moveCell(cell, geo, geo.x, newY);
              }
          
              if (evt != null && evt.key == 'ArrowLeft')
              {
                if(Utils.IsNullOrUndefine(geo))
                  return;
                var newX = geo.x - 2;
                moveCell(cell, geo, newX, geo.y);
              }
                
              if (evt != null && evt.key == 'ArrowRight')
              {
                if(Utils.IsNullOrUndefine(geo))
                  return;
                var newX = geo.x + 2;
                moveCell(cell, geo, newX, geo.y);
              }
          })
      }
    }
    
    var getSelectedCellGeo = function(cell) {
      return thisComp.graph.getCellGeometry(cell).clone();
    }
  
    var moveCell = function (cell, geo, x, y) {
  
       //var geo = thisComp.graph.getCellGeometry(selectedCell).clone();
       geo.x = x;
       geo.y = y;
       thisComp.graph.model.setGeometry(cell, geo);
       thisComp.graph.refresh();
  
      // var selectedCell = thisComp.graph.getSelectionCell();
      // if(selectedCell != null){
       
      // }
    }

  }

// addDragOverEventForVMOverSubnetHighlight() {
//   mxEvent.addListener(this.graphManager.container, 'dragover', function(evt)
// 				{
// 					if (this.graph.isEnabled())
// 					{
// 						evt.stopPropagation();
// 						evt.preventDefault();
// 					}
// 				});
//   }

  addContextMenu(){
    this.graph.popupMenuHandler.autoExpand = true;

    var thisComponent = this;

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

      menu.addSeparator();
      menu.addItem('Delete', '', function()
      {
        thisComponent.graph.removeCells(); 
      });
      
      menu.addSeparator();
      menu.addItem('Group', '', function()
      {
        thisComponent.groupCells(); 
      });
      menu.addItem('Ungroup', '', function()
      {
        thisComponent.unGroupCells(); 
      });

      //for vnet
      if(Utils.IsVNet(cell))
      {
        menu.addSeparator();
        
        menu.addItem('Add Subnet', '', function()
        {
          thisComponent.addSubnet(cell); // is vnetCell
        });
      }

      //style for shapes only
      if(cell.isEdge() || thisComponent.graphManager.isRect(cell) || 
      thisComponent.graphManager.isEllipse(cell) || thisComponent.graphManager.isTriangle(cell))
      {
        menu.addSeparator();
        menu.addItem('Style', '', function()
        {
          thisComponent.openStylePanel(cell);
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
      case 'curvearrow':
        this.addCurvedArrow(dropContext);
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

  openStylePanel = (cell) => {
      var thisComp = this;
      this.stylePanel.current.show(cell, function(style){

        var stroke = Object.getOwnPropertyDescriptor(style, 'stroke');
        var fill = Object.getOwnPropertyDescriptor(style, 'fill');

        var newStyles = new Map();
        newStyles.set(stroke.value.key, stroke.value.value);
        newStyles.set(fill.value.key, fill.value.value);

        thisComp.graphManager.changeShapeOnlyCellStyle(cell, newStyles);      
      })
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

        // var style =
        //   this.graphManager.getDefaultStraightEdgeStyleString();

        // var straightArrowCell =
        //   this.graph.insertEdge(parent, null, null, null, null, style);

        var cell = new mxCell(randomId,
          new mxGeometry(dropContext.x, dropContext.y, 50, 50),
          'straightedgestyle');
          cell.geometry.setTerminalPoint(new mxPoint(dropContext.x, dropContext.y), true);
          cell.geometry.setTerminalPoint(new mxPoint(dropContext.x + 50, dropContext.y - 50), false);
          cell.geometry.points =  [new mxPoint(dropContext.x, dropContext.y), new mxPoint(dropContext.x + 30, dropContext.y - 30)];
          cell.geometry.relative = true;
          cell.edge = true;
        var straigthArrow= this.graph.addCell(cell, parent);

        this.graph.scrollCellToVisible(straigthArrow);
        //this.graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [addedCell]));
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
      var cell = new mxCell(randomId,
        new mxGeometry(dropContext.x, dropContext.y, 50, 50),
        this.graphManager.getDefaultDashEdgeStyleString());
      cell.geometry.setTerminalPoint(new mxPoint(dropContext.x, dropContext.y), true);
      cell.geometry.setTerminalPoint(new mxPoint(dropContext.x + 50, dropContext.y - 50), false);
      cell.geometry.points = [new mxPoint(dropContext.x, dropContext.y), new mxPoint(dropContext.x + 30, dropContext.y - 30)];
      cell.geometry.relative = true;
      cell.edge = true;
      var dashArrow = this.graph.addCell(cell, parent);

      this.graph.scrollCellToVisible(dashArrow);
    }
    finally
    {
      // Updates the display
      this.graphManager.graph.getModel().endUpdate();
    }
  }

  // addCurvedArrow(dropContext) {
  //   this.graphManager.graph.getModel().beginUpdate();
  //   try
  //   {
  //     var parent = this.graph.getDefaultParent();
  //     var randomId = this.shortUID.randomUUID(6);
  //     var cell = new mxCell(randomId,
  //       new mxGeometry(dropContext.x, dropContext.y, 50, 50),
  //       this.graphManager.getDefaultCurvedEdgeStyleString());

  //     cell.geometry.setTerminalPoint(new mxPoint(dropContext.x, dropContext.y), true);
  //     cell.geometry.setTerminalPoint(new mxPoint(dropContext.x + 50, dropContext.y - 50), false);
  //     cell.geometry.points = [new mxPoint(dropContext.x, dropContext.y), new mxPoint(dropContext.x + 30, dropContext.y - 30)];
  //     cell.geometry.relative = true;
  //     cell.edge = true;
  //     this.graph.addCell(cell, parent);

  //     this.graph.scrollCellToVisible(elbowArrow);
  //   }
  //   finally
  //   {
  //     // Updates the display
  //     this.graphManager.graph.getModel().endUpdate();
  //   }
  // }

  addElbowArrow(dropContext){

      this.graphManager.graph.getModel().beginUpdate();
      try
      {
        var parent = this.graph.getDefaultParent();
        //var edgeStyle= this.graphManager.getDefaultElbowEdgeStyleString();

        var randomId = this.shortUID.randomUUID(6);
        var cell = new mxCell(randomId,
          new mxGeometry(dropContext.x, dropContext.y, 50, 50), 'elbowedgestyle');
        cell.geometry.setTerminalPoint(new mxPoint(dropContext.x + 30, dropContext.y + 30), true);
        cell.geometry.setTerminalPoint(new mxPoint(dropContext.x + 50, dropContext.y - 50), false);
        cell.geometry.points = [new mxPoint(dropContext.x, dropContext.y), new mxPoint(dropContext.x + 30, dropContext.y - 30)];
        cell.geometry.relative = true;
        cell.edge = true;
        var elbowArrow = this.graph.addCell(cell, parent);

        this.graph.scrollCellToVisible(elbowArrow);
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

      var label = this.graph.insertVertex
        (this.graph.getDefaultParent(), null, 'text',
          dropContext.x, dropContext.y, 80, 30,
          this.graphManager.getDefaultTextStyleString());

      this.graph.scrollCellToVisible(label);
    }
    finally
    {
      // Updates the display
      this.graphManager.graph.getModel().endUpdate();
    }
  }

  addRectangle = (dropContext) => {
    var rect = this.graph.insertVertex(
      this.graph.getDefaultParent(),
      null,
      'rectangle',
      dropContext.x,
      dropContext.y,
      150,
      100,
      this.graphManager.getDefaultRectStyleString()
    );
    this.graph.scrollCellToVisible(rect);
  }

  addTriangle = (dropContext) => {

    var style = this.graphManager.getDefaultTriangleStyleString();

    var triangle = this.graph.insertVertex(
      this.graph.getDefaultParent(),
      null,
      'triangle',
      dropContext.x,
      dropContext.y,
      100,
      100,
      style
    );
    this.graph.scrollCellToVisible(triangle);
  }

  addCircle = (dropContext) => {

    var circleStyle = this.graphManager.getDefaultEllipseStyleString();
    var cell = this.graph.insertVertex(
      this.graph.getDefaultParent(),
      null,
      'circle',
      dropContext.x,
      dropContext.y,
      100,
      100,
      circleStyle
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
    (this.graph.getDefaultParent(), null, 'internet', dropContext.x, dropContext.x, 60, 60,
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
              vnetModel.resourceType = ResourceType.VNet();
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
        "fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
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
        (result.subnetCell, appgw.GraphModel.IconId ,appgwJsonString, dropContext.x, dropContext.y, 35, 35,
        "fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
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
        (parent, dnsPrivateZone.GraphModel.IconId ,dnsPrivateZoneJsonString, dropContext.x, dropContext.y, 35, 35,
        "fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
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

  groupCells(){
    //http://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html#mxGraph.groupCells

    if (this.graph.getSelectionCount() == 1)
		{
			this.graph.setCellStyles('container', '1');
		}
		else
		{
			this.graph.setSelectionCell(this.mxClientOverrides.groupCells(null, 0));
		}
    //var dropContext =
    //this.graphManager.translateToParentGeometryPoint(dropContext, result.subnetCell);
  }

  
  unGroupCells(){
    var selectedCell = this.graph.getSelectionCell();
    
    if(selectedCell != null)
    {
      //presebt subnet being ungroup out of VNet
      var result = Utils.TryParseUserObject(selectedCell.value);
      if(result.isUserObject && result.userObject.GraphModel.ResourceType == ResourceType.Subnet())
      {
        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.WARNING, timeout: 2000, message: Messages.SubnetUngroupVNetNotAllowed()});
        return;
      }
      else{
       this.graph.ungroupCells();
      }
    }
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

  //create vertex from browser clipboard image
  initPasteImageFromBrowserClipboard = () => {
        
        var thisComp = this;
        window.addEventListener("paste", function(e){

            // Handle the event
            thisComp.retrieveImageFromClipboardAsBase64(e, function(imageDataBase64){
                // If there's an image, open it in the browser as a new window :)
                if(imageDataBase64){

                  thisComp.createVertexFromBrowserClipboard(imageDataBase64);
                    // data:image/png;base64,iVBORw0KGgoAAAAN......
                }
            });
        }, false);
    }

    retrieveImageFromClipboardAsBase64(pasteEvent, callback, imageFormat){
        if(pasteEvent.clipboardData == false){
            if(typeof(callback) == "function"){
                callback(undefined);
            }
        };
    
        var items = pasteEvent.clipboardData.items;
    
        if(items == undefined){
            if(typeof(callback) == "function"){
                callback(undefined);
            }
        };

        var clipboardResult = {
            imageBase64: '',
            imageFormat: ''
        }
        var thisComp = this;
    
        for (var i = 0; i < items.length; i++) {
            // Skip content if not image
            if (items[i].type.indexOf("image") == -1) continue;
            // Retrieve image on clipboard as blob
            var blob = items[i].getAsFile();
    
            // Create an abstract canvas and get context
            var mycanvas = document.createElement("canvas");
            var ctx = mycanvas.getContext('2d');
            
            // Create an image
            var img = new Image();
    
            // Once the image loads, render the img on the canvas
            img.onload = function(){
                // Update dimensions of the canvas with the dimensions of the image
                mycanvas.width = this.width;
                mycanvas.height = this.height;
    
                // Draw the image
                ctx.drawImage(img, 0, 0);
    
                // Execute callback with the base64 URI of the image
                if(typeof(callback) == "function"){
                  var dataUrl = mycanvas.toDataURL();
                  var imageFormat = thisComp.getImageFormatFromBrowserClipboard(dataUrl);
                  var base64Image = dataUrl.split(',')[1];

                  clipboardResult.imageBase64 = base64Image;
                  clipboardResult.imageFormat = imageFormat;

                  callback(clipboardResult);
                }
            };
    
            // Crossbrowser support for URL
            var URLObj = window.URL || window.webkitURL;
    
            // Creates a DOMString containing a URL representing the object given in the parameter
            // namely the original Blob
            img.src = URLObj.createObjectURL(blob);
        }
    }

  getImageFormatFromBrowserClipboard(imageUrl) {
      var getSlashIndex = imageUrl.indexOf('/') + 1
      var getSemiColonIndex = imageUrl.indexOf(';')
      var imageFormat = imageUrl.slice(getSlashIndex, getSemiColonIndex);
      return imageFormat;
      //data:image/png;base64,iVBORw0KGgoAA
    }

  createVertexFromBrowserClipboard(clipboardResult) {

    this.graphManager.graph.getModel().beginUpdate();
      var style = 'editable=1;verticalLabelPosition=bottom;shape=image;image=';
      
      if(clipboardResult.imageFormat == 'png')
        style += 'data:image/png,' + clipboardResult.imageBase64;

      this.graph.insertVertex
      (this.graph.getDefaultParent(), '', 'image',
      MouseEvent.clientX, MouseEvent.clientY, 60, 60, //native javascript MouseEvent 
      style);
      //data:image/svg+xml,
      this.graphManager.graph.getModel().endUpdate();
  }

  showSpinner(toShow) {
    if(toShow)
      this.setState({showSpinner: true});
    else
    this.setState({showSpinner: false});
  }

  saveDiagramToBrowser = () => {
    if(!this.graphManager.isCellExist())
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.WARNING, timeout: 2000, message: Messages.NoCellOnGraph()});
      return;
    }

    var anonyDiagramContext = new AnonymousDiagramContext();
    anonyDiagramContext.DiagramXml = this.getDiagramAsXml();
    anonyDiagramContext.DateTimeSaved = new Date();
    LocalStorage.set
      (LocalStorage.KeyNames.TempLocalDiagram, JSON.stringify(anonyDiagramContext));

      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.DiagramSavedInBrowser()});
      return;
  }

  loadDraftDiagramFromBrowser = () => {
      var jsonStr = LocalStorage.get(LocalStorage.KeyNames.TempLocalDiagram);
      var anonyDiagramContext = JSON.parse(jsonStr);
      this.clearGraph();
      this.importXmlAsDiagram(anonyDiagramContext);
  }

  getDiagramLocalBrowser = () => {

  }

  loadSharedDiagram = () => {
      var parsedQS =  queryString.parse(this.state.queryString)
      if(parsedQS == undefined || parsedQS.id == undefined)
          return;
      
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
      window['mxPoint'] = mxPoint;
      window['mxEditor'] = mxEditor;
      window['mxGeometry'] = mxGeometry;
      window['mxDefaultKeyHandler'] = mxDefaultKeyHandler;
      window['mxDefaultPopupMenu'] = mxDefaultPopupMenu;
      window['mxGraph'] = mxGraph;
      window['mxStylesheet'] = mxStylesheet;
      window['mxDefaultToolbar'] = mxDefaultToolbar;
      window['mxGraphModel'] = mxGraphModel;
    
      var doc = mxUtils.parseXml(anonymousDiagramContext.DiagramXml);
      var codec = new mxCodec(doc);
      
      codec.decode(doc.documentElement, this.graph.getModel());

      //re-add cell overlays
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
        var cells = this.graph.getChildCells(this.graph.getDefaultParent());
  }

  shareDiagram(){
    if(!this.graphManager.isCellExist())
      {
        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.WARNING, timeout: 3000, message: Messages.NoCellOnGraph()});
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

        this.showSpinner(false);
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

  saveDiagramToWorkspace(collectionName, diagramName) {
    if(!this.graphManager.isCellExist())
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.WARNING, timeout: 3000, message: Messages.NoCellOnGraph()});
      return;
    }

    var diagramContext = new WorkspaceDiagramContext();
    diagramContext.CollectionName = collectionName;
    diagramContext.UID = this.shortUID.randomUUID(6);;
    diagramContext.DiagramName = diagramName;
    diagramContext.DiagramXml = this.getDiagramAsXml();
    diagramContext.DateTimeSaved = Date.now();

    this.diagramService.saveDiagramToWorkspace(diagramContext,
      function onSuccess() {
        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.SavedSuccessfully()});
        return;
      },
      function  onError() {
        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.DANGER, timeout: 2000, message: Messages.Error()});
        return;
      });
  } 

  exportDiagramAsPDF(){

    if(!this.graphManager.isCellExist())
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.NoCellOnGraph()});
      return;
    }

    this.graph.getSelectionModel().clear();

    this.showLoading(true);
    
    var svg = this.getDiagramSvg();

    // get svg data
    var svgXmlString = new XMLSerializer().serializeToString(svg);
    var svgXmlBase64 = window.btoa(svgXmlString);

    var thisComp = this;
    this.diagramService.exportDiagramAsPNG(svgXmlBase64,
      function onSuccess(pdfByteArray)
      {
        thisComp.showLoading(true);

        const url = window.URL.createObjectURL(new Blob([pdfByteArray]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'diagram.pdf');
          document.body.appendChild(link);
          link.click();

        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.PDFDownloaded()});
        return;
      },
      function onError(error){
        thisComp.showLoading(true);
        console.log(error);
      });
  }

  getDiagramSvg(){
    return document.getElementById('diagramEditor').lastChild;
  }
  
  showLoading(toShow){
    this.setState({isLoading: toShow});
  }


  showWorkspace () {
    this.workspace.current.show();
  }

  showOverlaySavetoWorkspace = () => {
    this.overlaySaveToWorkspace.current.show();
  }

  clearGraph() {
    this.graph.removeCells(this.graph.getChildCells(this.graph.getDefaultParent(), true, true))
    this.graph.getModel().clear();
  }

  handleSpinnerClose = () => this.setState({ showSpinner: false });
  closeShareDiagramPopup = () => this.setState({ showShareDiagramPopup: false, useTallContent: false });
}