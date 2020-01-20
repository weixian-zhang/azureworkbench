
import React, { Component } from "react";
import {Spinner, InputGroup, Classes, Button, Intent, Overlay, Toaster, Position} from "@blueprintjs/core";
import VMPropPanel from "./PropPanel/VMPropPanel";
import VNetPropPanel from "./PropPanel/VNetPropPanel";
import VM from "../../models/VM";
import VMSS from "../../models/VMSS";
import VNet from "../../models/VNet";
import AnonymousDiagramContext from "../../models/services/AnonymousDiagramContext"; 
import ShortUniqueId from 'short-unique-id';
import AzureIcons from "./Helpers/AzureIcons";
import Messages from "./Helpers/Messages";
import Utils from "./Helpers/Utils";
import MxGraphManager from './Helpers/MxGraphManager';
import { mxCellPath, mxDefaultToolbar, mxDefaultPopupMenu, mxDefaultKeyHandler, mxStylesheet, mxGraphModel, mxClipboard, mxCodec, mxPoint, mxGeometry, mxCellOverlay, mxImage, mxKeyHandler, mxConstants, mxEvent, mxUtils,mxPopupMenuHandler, mxDragSource, mxUndoManager, mxCell, mxEditor, mxGraph } from "mxgraph-js";
import Subnet from "../../models/Subnet";
import LoadAnonyDiagramContext from "../../models/LoadAnonyDiagramContext";
import DiagramService from '../../services/DiagramService';
import queryString from 'query-string';
import vnetIcon from '../../assets/azure_icons/Networking Service Color/Virtual Network (Classic).svg';

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
    this.props.mxgraphManagerReadyCallback(this.graphManager);

    //services
    this.diagramService = new DiagramService();

    this.addDblClickEventToOpenPropPanel();
    this.addDeleteKeyEventToDeleteVertex();
    this.addContextMenu();
    this.addCtrlZEventToUndo();
    this.addCtrlCCtrlVCopyPasteVertices();
    this.addDragOverEventForVMOverSubnetHighlight();

    this.loadSharedDiagram();

    //create refs
    this.vmPropPanel = React.createRef();
    this.vnetPropPanel = React.createRef();
  } 

  render() {
    return (
      <div id="diagramEditor" className="workbenchgrid-container">
        <VMPropPanel ref={this.vmPropPanel} saveVMModelToDiagramEditor={this.fromVMPropPanelSaveModel} />
        <VNetPropPanel ref={this.vnetPropPanel} />
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
  
  addDblClickEventToOpenPropPanel(){
    this.graph.addListener(mxEvent.DOUBLE_CLICK, (sender, evt) =>
        {
          var cell = evt.getProperty('cell');

          if(cell.value == null || cell.value.GraphModel == null)
            return;

          let iconId = cell.value.GraphModel.IconId;
          let resourceType = cell.value.ResourceType;

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
    
          menu.addItem('Add Peering', '', function()
          {
            mxUtils.alert('MenuItem1');
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
     
      case 'vmWindows':
        this.addVM(dropContext, 'vmWindows');
        break;
      case 'vmLinux':
        this.addVM(dropContext, 'vmWindows');
        break;
      case 'vmss':
        this.addVMSS(dropContext, 'vmss');
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
      case "vmWindows":
        this.vmPropPanel.current.setResourceModelFromDiagramEditor(resourceModel);
        this.vmPropPanel.current.show(true);
        break;
      case "vmLinux":
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
        //cell.getGeometry().setTerminalPoint(new mxPoint(dropContext.x + 30, dropContext.y + 30), true);
        //cell.geometry.setTerminalPoint(new mxPoint(dropContext.x + 50, dropContext.y - 50), false);
        //cell.geometry.points = [new mxPoint(dropContext.x, dropContext.y), new mxPoint(dropContext.x + 30, dropContext.y - 30)];
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
        (this.graph.getDefaultParent(),randomId, 'Text', dropContext.x, dropContext.y, 0, 0, 'strokeColor=none;fillColor=none;resizable=0;autosize=1;');
    }
    finally
    {
      // Updates the display
      this.graphManager.graph.getModel().endUpdate();
    }
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
                300,
                400,
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

          subnetVertex = this.graph.insertVertex(
            vnetCell,
            subnet.GraphModel.Id,
            jsonstrSubnet,
            ((vnetCell.getGeometry().x /2) / 2) - 15,
            vnetCell.getGeometry().y + Math.floor((Math.random() * 15) + 1),
            vnetCell.getGeometry().width - 90,
            100,
            'subnetstyle' //"editable=0;verticalLabelPosition=top;verticalAlign=bottom;align=right"
          );
        }
        else {

            var vnet = this.graph.getModel().getCell(loadContext.parent.id);
            // var geo = this.graph.getModel().getGeometry(vnet);
            
            
            // subnetVertex = this.graph.insertVertex(
            //   vnet,
            //   '',//subnet.GraphModel.Id,'',
            //   loadContext.UserObject,
            //   vnet.getGeometry().x,
            //   vnet.getGeometry().y,
            //   vnet.getGeometry(),
            //   100,
            //   'subnetstyle', //"editable=0;verticalLabelPosition=top;verticalAlign=bottom;align=right"
            //   true
            //   );

            // // subnetVertex = this.graph.insertVertex(
            // //   vnetCell,
            // //     loadContext.id,
            // //     loadContext.UserObject,
            // //     loadContext.x,
            // //     loadContext.y,
            // //     loadContext.width,
            // //     loadContext.height,
            // //     loadContext.style, //"editable=0;verticalLabelPosition=top;verticalAlign=bottom;align=right"
            // //     true
            // //   );
        }
 
        this.graph.addCellOverlay(subnetVertex, subnetLogoOverlay);
        this.graph.addCellOverlay(subnetVertex, nsgOverlay);
      
  }

  addVM = (dropContext, vmType) => {
    
    if(dropContext.resourceType == "vmWindows" ||
        dropContext.resourceType == "vmLinux")
    {
      var cell = this.graph.getCellAt(dropContext.x, dropContext.y);

      if(cell == null || JSON.parse(cell.value).GraphModel.ResourceType != "subnet")
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
     vmModel.ResourceType = vmType;
     vmModel.GraphModel.IconId = this.shortUID.randomUUID(6);
     vmModel.ProvisionContext.Name = "vm_" + vmModel.GraphModel.IconId;
     vmModel.GraphModel.DisplayName = vmModel.ProvisionContext.Name;
     var userObj = JSON.stringify(vmModel);

    var iconByOS;
    if(vmType == 'vmWindows')
      iconByOS = this.azureIcons.VirtualMachineWindows();
    else if(vmType == 'vmLinux')
      iconByOS = this.azureIcons.VirtualMachineWindows();
    else
      iconByOS = this.azureIcons.VMSS();

     this.graphManager.graph.getModel().beginUpdate();
     try
     {
        var vm = this.graph.insertVertex
          (cell, vmModel.GraphModel.IconId ,userObj, cell.getGeometry().x, cell.getGeometry().x, 40, 40,
          "editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," + iconByOS);
    }
     finally
     {
       // Updates the display
       this.graphManager.graph.getModel().endUpdate();
     }
  }

  addVMSS = (dropContext) => {
    var cell = this.graph.getCellAt(dropContext.x, dropContext.y); //subnet cell
    
    if(dropContext.resourceType == "vmss" &&
       cell == null || cell.value.GraphModel.ResourceType != "subnet")
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
        var vm = this.graph.insertVertex
          (cell, vmssModel.GraphModel.IconId ,userObj, cell.getGeometry().x, cell.getGeometry().x, 40, 40,
          "editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," + this.azureIcons.VMSS());
    }
     finally
     {
       // Updates the display
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