
import React, { Component } from "react";
import Workspace from './Workspace';
import OverlaySaveToWorkspace from './OverlaySaveToWorkspace';
import {Spinner, InputGroup, Classes, Button, Intent, Overlay, Toaster, Position} from "@blueprintjs/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import StylePropPanel from './PropPanel/StylePropPanel';
import VMPropPanel from "./PropPanel/VMPropPanel";
import SubnetPropPanel from "./PropPanel/SubnetPropPanel";
import VNetPropPanel from "./PropPanel/VNetPropPanel";
import NLBPropPanel from "./PropPanel/NLBPropPanel";
import AppGwPropPanel from "./PropPanel/AppGwPropPanel";
import DNSPrivateZonePropPanel from "./PropPanel/DNSPrivateZone";
import AppServicePropPanel from "./PropPanel/AppSvcPropPanel";
import ASEPropPanel from "./PropPanel/ASEPropPanel";

import VirtualNetworkGateway from "../../models/VirtualNetworkGateway";
import DevTestLab from "../../models/DevTestLab";
import TrafficManager from "../../models/TrafficManager";
import ExpressRouteCircuit from "../../models/ExpressRouteCircuit";
import PublicIp from "../../models/PublicIp";
import FrontDoor from "../../models/FrontDoor";
import SharedImageGallery from "../../models/SharedImageGallery";
import AppServiceDomain from "../../models/AppServiceDomain";
import AppServiceCert from "../../models/AppServiceCert";
import SignalR from "../../models/SignalR";
import Func from "../../models/Function";
import AzureSearch from "../../models/AzureSearch";
import VM from "../../models/VM";
import VMSS from "../../models/VMSS";
import VNet from "../../models/VNet";
import NLB from "../../models/NLB";
import DNSPrivateZone from "../../models/DNSPrivateZone";
import AppService from "../../models/AppService";
import AppGateway from "../../models/AppGateway";
import ResourceType from '../../models/ResourceType';
import ASE from "../../models/ASE";
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

    this.initRef();
  }

  render() {
    return (
      <div id="diagramEditor" className="diagramEditor">
        <StylePropPanel ref={this.stylePanel} MxGraphManager={this.graphManager} />
        <OverlaySaveToWorkspace ref={this.overlaySaveToWorkspace} DiagramEditor={this} />
        <Workspace ref={this.workspace} DiagramEditor={this} />
        <AppServicePropPanel ref={this.asePropPanel} />
        <ASEPropPanel ref={this.asePropPanel} />
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
    this.appsvcPropPanel = React.createRef();
    this.asePropPanel = React.createRef();
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
    }

  }

  addContextMenu(){
    this.graph.popupMenuHandler.autoExpand = true;

    var thisComponent = this;

    this.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
    {
            //for vnet
      if(Utils.IsVNet(cell))
      {
        menu.addItem('Add Subnet', '', function()
        {
          thisComponent.addSubnet(cell); // is vnetCell
        });
        menu.addItem('Add GatewaySubnet', '', function()
        {
          thisComponent.addGatewaySubnet(cell); // is vnetCell
        });
        menu.addSeparator();
      }

      if(cell == null || cell.value == null){
        if(!mxClipboard.isEmpty())
        {
          menu.addItem('Paste', '', function()
          {
            thisComponent.pasteFromClipboard(); 
          });
          return;
        }
        else
            return;
      }
        
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

      if(!Utils.IsNullOrUndefine(this.graph.getSelectionCells()))
      {
        menu.addSeparator();
        menu.addItem('Copy', '', function()
        {
          thisComponent.copyToClipboard(); 
        });
      }

      if(!mxClipboard.isEmpty())
      {
        menu.addItem('Paste', '', function()
        {
          thisComponent.pasteFromClipboard(); 
        });
      }

      //style for shapes only
      if(thisComponent.graphManager.isNonAzureShape(cell))
      {
        menu.addSeparator();
        menu.addItem('Style', '', function()
        {
          thisComponent.openStylePanel(cell);
        });
      }

      //preview diagram in new window
      if(thisComponent.graphManager.isCellExist())
      {
        menu.addItem('Preview Diagram', '', function()
        {
          thisComponent.previewGraph();
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
      case 'cylinder':
        this.addCylinder(dropContext);
        break;
      case 'hexagon':
        this.addHexagon(dropContext);
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
      case 'clientdevice':
        this.addClientDevice(dropContext);
        break;
      case 'adfs':
        this.addADFSDevice(dropContext);
        break;
      case 'andriod':
        this.addAndriodDevice(dropContext);
        break;
      case 'iphone':
        this.addiPhoneDevice(dropContext);
        break;
      case 'onpremdbserver':
        this.addOnPremDBServerDevice(dropContext);
        break;
        
      case ResourceType.AppService():
        this.addAppService(dropContext);
        break;
      case ResourceType.ASE():
        this.addASE(dropContext);
        break;
      case ResourceType.Function():
        this.addFunc(dropContext);
        break;
      case ResourceType.AzureSearch():
        this.addAzSearch(dropContext);
        break;
      case ResourceType.SignalR():
        this.addSignalR(dropContext);
        break;
      case ResourceType.AppServiceCert():
        this.addAppSvcCert(dropContext);
        break;
      case ResourceType.AppServiceDomain():
        this.addAppSvcDomain(dropContext);
        break;
      case ResourceType.SharedImageGallery():
        this.addSharedImageGallery(dropContext);
        break;
      case ResourceType.PublicIp():
        this.addPublicIp(dropContext);
        break;
      case ResourceType.TrafficManager():
        this.addTrafficManager(dropContext);
        break;
      case ResourceType.DevTestLab():
        this.addDevTestLab(dropContext);
        break;
      case ResourceType.VirtualNetworkGateway():
        this.addVNetGateway(dropContext);
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
      case ResourceType.AppGw():
        this.addAppGw(dropContext);
        break;
      case ResourceType.DNSPrivateZone():
        this.addDNSPrivateZone(dropContext);
        break;
      case ResourceType.FrontDoor():
        this.addFrontDoor(dropContext);
        break;
      case ResourceType.ExpressRouteCircuit():
        this.addExpressRouteCircuit(dropContext);
        break;

      default:
        break;
    }
    this.graph.clearSelection();
  }

  openStylePanel = (cell) => {

      var thisComp = this;
      this.stylePanel.current.show(cell, function(style){

      let  properties = Object.getOwnPropertyNames(style)

      var newStyles = new Map();

      properties.map(propName => {
        let propDesc = Object.getOwnPropertyDescriptor(style, propName)
        newStyles.set(propName, propDesc.value);
      })

      thisComp.graphManager.setNewStyleFromStylePropPanel(cell, newStyles);  
      })
  }

  determineResourcePropertyPanelToShow = (cell, userObject) => {

    let thisComp = this;

    switch (userObject.GraphModel.ResourceType) {
      case ResourceType.AppService():
        this.appsvcPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.ASE():
        this.asePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
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
          if(this.azureValidator.isGatewaySubnet(cell))
            return;
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

        var styleString = this.graphManager.getDefaultStraightEdgeStyleString();

        var cell = new mxCell(randomId,
          new mxGeometry(dropContext.x, dropContext.y, 50, 50), styleString);
          cell.geometry.setTerminalPoint(new mxPoint(dropContext.x, dropContext.y), false);
          cell.geometry.setTerminalPoint(new mxPoint(dropContext.x + 50, dropContext.y - 50), true);
          cell.geometry.points =  [new mxPoint(dropContext.x, dropContext.y), new mxPoint(dropContext.x + 30, dropContext.y - 30)];
          cell.edge = true;
        var straigthArrow= this.graph.addCell(cell, parent);

        this.graph.scrollCellToVisible(straigthArrow);
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

        var styleString = this.graphManager.getDefaultElbowEdgeStyleString();

        var randomId = this.shortUID.randomUUID(6);
        var cell = new mxCell(randomId,
          new mxGeometry(dropContext.x, dropContext.y, 50, 50), styleString);
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

  addCylinder(dropContext){
    var style = this.graphManager.getDefaultCylinderStyleString();

    var triangle = this.graph.insertVertex(
      this.graph.getDefaultParent(),
      null,
      'cylinder',
      dropContext.x,
      dropContext.y,
      100,
      100,
      style
    );
    this.graph.scrollCellToVisible(triangle);
  }

  addHexagon(dropContext){
    var style = this.graphManager.getDefaultHexagonStyleString();

    var triangle = this.graph.insertVertex(
      this.graph.getDefaultParent(),
      null,
      'hexagon',
      dropContext.x,
      dropContext.y,
      100,
      100,
      style
    );
    this.graph.scrollCellToVisible(triangle);
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
          (this.graph.getDefaultParent(), null, 'user', dropContext.x, dropContext.y, 50, 50,
          "editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
          this.azureIcons.User());
  }

  addOnpremDC = (dropContext) => {
    this.graph.insertVertex
          (this.graph.getDefaultParent(), null, '<p style="margin: 0px auto">datacenter</p>', dropContext.x, dropContext.y, 50, 50,
          "fontSize=13;editable=1;verticalLabelPosition=bottom;shape=image;image=" +
          require('../../assets/azure_icons/shape-dc.png'));
  }

  addInternet = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'internet', dropContext.x, dropContext.y, 60, 60,
    "editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
      this.azureIcons.Internet());
  }

  addClientDevice = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'laptop', dropContext.x, dropContext.y, 60, 60,
    "editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
      this.azureIcons.ClientDevice());
  }

  addADFSDevice = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'ADFS', dropContext.x, dropContext.y, 60, 60,
    "editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
      this.azureIcons.ADFS());
  }

  addAndriodDevice = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'Andriod', dropContext.x, dropContext.y, 60, 60,
    "editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
      this.azureIcons.Andriod());
  }

  addiPhoneDevice = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'iPhone', dropContext.x, dropContext.y, 60, 60,
    "editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
      this.azureIcons.iPhone());
  }

  addOnPremDBServerDevice = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'On-Prem DB Server', dropContext.x, dropContext.y, 60, 60,
    "editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
      this.azureIcons.OnPremDBServer());
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
            new mxImage(require('../../assets/azure_icons/Networking Service Color/Virtual Networks.svg'),20, 20),
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
          new mxImage(require('../../assets/azure_icons/Networking Service Color/Network Security Groups (Classic).svg'),20, 20),
          null,  mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP
        );

        var subnetLogoOverlay = new mxCellOverlay(
          new mxImage(require('../../assets/azure_icons/Networking Service Color/Subnet.svg'),20, 20),
          'Subnet',  mxConstants.ALIGN_Right, mxConstants.ALIGN_TOP
        );

        var subnetVertex;

        if(loadContext == undefined) {

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

  addGatewaySubnet(vnetCell){

      var subnetLogoOverlay = new mxCellOverlay(
        new mxImage(require('../../assets/azure_icons/Networking Service Color/Subnet.svg'),20, 20),
        'Subnet',  mxConstants.ALIGN_Right, mxConstants.ALIGN_TOP
      );

      var subnet = new Subnet();
      subnet.GraphModel.Id = this.shortUID.randomUUID(6);
      subnet.ProvisionContext.Name = "GatewaySubnet";
      subnet.GraphModel.DisplayName = subnet.ProvisionContext.Name
      subnet.GraphModel.IsGatewaySubnet = true;

      var jsonstrSubnet = JSON.stringify(subnet);

      this.graphManager.translateToParentGeometryPoint(vnetCell)

      var subnetVertex = this.graph.insertVertex(
      vnetCell,
      subnet.GraphModel.Id,
      jsonstrSubnet,
      ((vnetCell.getGeometry().x /2) / 2) - 15,
      vnetCell.getGeometry().y + Math.floor((Math.random() * 15) + 1),
      vnetCell.getGeometry().width - 90,
      100,
      'subnetstyle'
    );

    this.graph.addCellOverlay(subnetVertex, subnetLogoOverlay);
  }

  addNLB = (dropContext) => {
      
      var parent = this.graph.getDefaultParent();
      var parentCell = this.graph.getCellAt(dropContext.x, dropContext.y);

      if(parentCell != null){
        var cellType = JSON.parse(parentCell.value).GraphModel.ResourceType;
        if(cellType == 'subnet')
            parent = parentCell;
      }
      
      var dropContext = this.graphManager.translateToParentGeometryPoint(dropContext, parent);

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

      var result = this.azureValidator.isResourceDropinSubnet();
      
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

      var dropContext = Utils.getCellCenterPoint(result.subnetCell);

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
      var dropContext = this.graphManager.translateToParentGeometryPoint(dropContext, parent);

      var dnsPrivateZone = new DNSPrivateZone();
      dnsPrivateZone.GraphModel.Id = this.shortUID.randomUUID(6);
      dnsPrivateZone.GraphModel.ResourceType = ResourceType.DNSPrivateZone();
      dnsPrivateZone.GraphModel.DisplayName = 'DNS Private Zone';

      var dnsPrivateZoneJsonString = JSON.stringify(dnsPrivateZone);

      this.graph.insertVertex
        (parent, dnsPrivateZone.GraphModel.IconId ,dnsPrivateZoneJsonString, dropContext.x, dropContext.y, 35, 35,
        "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
          this.azureIcons.DNSPrivateZone());
  }

  addVM = (dropContext, vmType) => {
    
    if(dropContext.resourceType == ResourceType.WindowsVM() ||
        dropContext.resourceType == ResourceType.LinuxVM())
    {
      var result = this.azureValidator.isResourceDropinSubnet();

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
        var subnetCenterPt = Utils.getCellCenterPoint(result.subnetCell);

        var vm = this.graph.insertVertex
          (result.subnetCell, vmModel.GraphModel.IconId, JSON.stringify(vmModel), subnetCenterPt.x, subnetCenterPt.y, 30, 30,
          "verticalLabelPosition=bottom;verticalAlign=top;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," + iconByOS);
    }
     finally
     {
       // Updates the display
       this.graphManager.graph.getModel().endUpdate();
     }
  }

  addVMSS = (dropContext) => {

    var result = this.azureValidator.isResourceDropinSubnet();

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
        var subnetCenterPt = Utils.getCellCenterPoint(result.subnetCell);

        var vmss = this.graph.insertVertex
          (result.subnetCell, vmssModel.GraphModel.IconId ,userObj,
           subnetCenterPt.x, subnetCenterPt.y, 40, 40,
          "verticalLabelPosition=bottom;verticalAlign=top;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," + this.azureIcons.VMSS());
    }
     finally
     {
       this.graphManager.graph.getModel().endUpdate();
     }
  }

  addAppService = (dropContext) => {
    var parent = this.graph.getDefaultParent();
    var dropContext = this.graphManager.translateToParentGeometryPoint(dropContext, parent);

    var appsvc = new AppService();
    appsvc.GraphModel.Id = this.shortUID.randomUUID(6);
    appsvc.GraphModel.ResourceType = ResourceType.AppService();
    appsvc.GraphModel.DisplayName = 'App Service'
      
    var appsvcJsonString = JSON.stringify(appsvc);

    this.graph.insertVertex
      (parent, appsvc.GraphModel.IconId ,appsvcJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.AppService());
  }

  addASE = (dropContext) => {

    var result = this.azureValidator.isResourceDropinSubnet();

    if(dropContext.resourceType == ResourceType.ASE() && !result.isInSubnet)
       {
          Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.DANGER, timeout: 3500, message: Messages.ASEInSubnet()});
          return;
       }

    var subnetCenterPt = Utils.getCellCenterPoint(result.subnetCell);

    var ase = new ASE();
    ase.GraphModel.Id = this.shortUID.randomUUID(6);
    ase.GraphModel.DisplayName = 'App Service Environment'

    var aseJsonString = JSON.stringify(ase);

    this.graph.insertVertex
      (result.subnetCell, ase.GraphModel.IconId ,aseJsonString, subnetCenterPt.x, subnetCenterPt.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.ASE());
  }

  addFunc = (dropContext) => {
    var func = new Func();
    func.GraphModel.Id = this.shortUID.randomUUID(6);
    func.GraphModel.DisplayName = 'Function'

    var funcJsonString = JSON.stringify(func);

    this.graph.insertVertex
      (this.graph.parent, func.GraphModel.IconId ,funcJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.FunctionApp());
  }

  addAzSearch = (dropContext) => {
    var azsearch = new AzureSearch();
    azsearch.GraphModel.Id = this.shortUID.randomUUID(6);
    azsearch.GraphModel.DisplayName = 'Azure Search'

    var azsearchJsonString = JSON.stringify(azsearch);

    this.graph.insertVertex
      (this.graph.parent, azsearch.GraphModel.IconId ,azsearchJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.AzureSearch());
  }
  
  addSignalR = (dropContext) => {
    var signalr = new SignalR();
    signalr.GraphModel.Id = this.shortUID.randomUUID(6);
    signalr.GraphModel.DisplayName = 'SignalR'

    var signalrJsonString = JSON.stringify(signalr);

    this.graph.insertVertex
      (this.graph.parent, signalr.GraphModel.IconId ,signalrJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.SignalR());
  }

  addAppSvcCert = (dropContext) => {
    var appsvccert = new AppServiceCert();
    appsvccert.GraphModel.Id = this.shortUID.randomUUID(6);
    appsvccert.GraphModel.DisplayName = 'App Service Cert'

    var appsvccertJsonString = JSON.stringify(appsvccert);

    this.graph.insertVertex
      (this.graph.parent, appsvccert.GraphModel.IconId ,appsvccertJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.AppServiceCert());
  }

  addAppSvcDomain = (dropContext) => {
    var appsvcdomain = new AppServiceDomain();
    appsvcdomain.GraphModel.Id = this.shortUID.randomUUID(6);
    appsvcdomain.GraphModel.DisplayName = 'App Service Domain'

    var appsvcdomainJsonString = JSON.stringify(appsvcdomain);

    this.graph.insertVertex
      (this.graph.parent, appsvcdomain.GraphModel.IconId ,appsvcdomainJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.AppServiceDomain());
  }

  addSharedImageGallery = (dropContext) => {
    var model = new SharedImageGallery();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Shared Image Gallery'

    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId ,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.SharedImageGallery());
  }

  addPublicIp = (dropContext) => {
    var model = new PublicIp();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Public IP'

    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId ,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.PublicIp());
  }
  

  addFrontDoor = (dropContext) => {
    var model = new FrontDoor();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Front Door'

    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId ,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.FrontDoor());
  }
  
  addExpressRouteCircuit = (dropContext) => {
    var model = new ExpressRouteCircuit();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'ExpressRoute Circuit'

    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId ,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.ExpressRouteCircuit());
  }

  addTrafficManager = (dropContext) => {
    var model = new TrafficManager();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Traffic Manager'

    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId ,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.TrafficManager());
  }
  
  addDevTestLab = (dropContext) => {
    var model = new DevTestLab();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'DevTest Lab'

    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId ,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.DevTestLab());
  }

  addVNetGateway = (dropContext) => {

    var result = this.azureValidator.isResourceDropinSubnet();

    var isVNetGatewayInGatewaySubnet =
      this.azureValidator.isGatewaySubnet(result.subnetCell);

    if(!result.isInSubnet || !isVNetGatewayInGatewaySubnet)
    {
        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.DANGER, timeout: 8000, message: Messages.VNetGatewayNotInGatewaySubnet()});
        return;
    }

    var model = new VirtualNetworkGateway();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Virtual Network Gateway';
    var modelJsonString = JSON.stringify(model);

    var dropContext = Utils.getCellCenterPoint(result.subnetCell);

    this.graph.insertVertex
      (result.subnetCell, model.GraphModel.IconId ,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.VNetGateway());
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
            if(this.azureValidator.isVM(cells[i]))
            {
                var selectedCell = this.graph.getSelectionCell();

                if(!this.azureValidator.isSubnet(selectedCell))
                {
                    Toaster.create({
                      position: Position.TOP,
                      autoFocus: false,
                      canEscapeKeyClear: true
                    }).show({intent: Intent.WARNING, timeout: 2000, message: Messages.VMInSubnet()});
                    return;
                }
                else{
                  mxClipboard.parents[i] = selectedCell;
                }
            }
            
            if(this.azureValidator.isAppGateway(cells[i]) &&
               !this.azureValidator.isResourceinDedicatedSubnet(mxClipboard.parents[i]))
            {
                Toaster.create({
                  position: Position.TOP,
                  autoFocus: false,
                  canEscapeKeyClear: true
                }).show({intent: Intent.DANGER, timeout: 2000, message: Messages.AppGatewayNotInSubnetError()});
                return;
            }

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
                      new mxImage(require('../../assets/azure_icons/Networking Service Color/Network Security Groups (Classic).svg'),20, 20),
                      null,  mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP
                    );
            
                    var subnetLogoOverlay = new mxCellOverlay(
                      new mxImage(require('../../assets/azure_icons/Networking Service Color/Subnet.svg'),15, 15),
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

  previewGraph = () => {
    var bounds =  this.graph.getView().getGraphBounds()
    mxUtils.show(this.graph, null, bounds.x, bounds.y , bounds.width, bounds.height);
  }

  clearGraph() {
    this.graph.removeCells(this.graph.getChildCells(this.graph.getDefaultParent(), true, true))
    this.graph.getModel().clear();
  }

  handleSpinnerClose = () => this.setState({ showSpinner: false });
  closeShareDiagramPopup = () => this.setState({ showShareDiagramPopup: false, useTallContent: false });
}