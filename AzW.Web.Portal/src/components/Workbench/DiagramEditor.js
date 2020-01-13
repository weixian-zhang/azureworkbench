
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
import MxGraphManager from './Helpers/MxGraphManager';
import { mxClipboard, mxCodec, mxPoint, mxGeometry, mxCellOverlay, mxImage, mxKeyHandler, mxConstants, mxEvent, mxUtils,mxPopupMenuHandler, mxDragSource, mxUndoManager, mxCell, mxEditor } from "mxgraph-js";
import Subnet from "../../models/Subnet";
import DiagramService from '../../services/DiagramService';
let xmlParser = require('xml2json-light');

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
        showSpinner: false
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

    this.importXmlAsDiagram();

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
      if(cell == null || cell.value == null | cell.value.GraphModel == null)
        return;
    
      menu.addItem('Bring to Front', '', function()
        {
          thisComponent.graph.orderCells(false); 
        });

        menu.addItem('Send To Back', '', function()
        {
          thisComponent.graph.orderCells(true); 
        });

        //for vnet
        if(cell.value.resourceType == "vnet")
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

      var vnetModel = new VNet();
      vnetModel.resourceType = "vnet"
      vnetModel.GraphModel.Id = this.shortUID.randomUUID(6);
      vnetModel.ProvisionContext.Name = 'vnet_' + vnetModel.GraphModel.Id;
      vnetModel.GraphModel.DisplayName = vnetModel.ProvisionContext.Name;
      
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
            300,
            400,
            "vnetstyle" //"rounded=1;editable=0;verticalLabelPosition=top;verticalAlign=bottom;align=right;STYLE_STROKEWIDTH=2"
          );
        
          
        //this.graph.addCellOverlay(vnetCell, vnetIconOverlay);
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
      subnet.GraphModel.DisplayName = subnet.ProvisionContext.Name

      this.graphManager.graph.getModel().beginUpdate();
      try 
      {
        var nsgOverlay = new mxCellOverlay(
          new mxImage(require('../../assets/azure_icons/Networking Service Color/NSG.png'),20, 20),
          null,  mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP
        );

        var subnetLogoOverlay = new mxCellOverlay(
          new mxImage(require('../../assets/azure_icons/Networking Service Color/Subnet.png'),15, 15),
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
          'subnetstyle' //"editable=0;verticalLabelPosition=top;verticalAlign=bottom;align=right"
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

  addVM = (dropContext, vmType) => {
    
    var cell = this.graph.getCellAt(dropContext.x, dropContext.y);
    
    if(dropContext.resourceType == "vmWindows" ||
        dropContext.resourceType == "vmLinux")
    {
      if(cell == null || cell.value.GraphModel.ResourceType != "subnet")
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
          (cell, vmModel.GraphModel.IconId ,vmModel , cell.getGeometry().x, cell.getGeometry().x, 40, 40,
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

     this.graphManager.graph.getModel().beginUpdate();
     try
     {
        var vm = this.graph.insertVertex
          (cell, vmssModel.GraphModel.IconId ,vmssModel , cell.getGeometry().x, cell.getGeometry().x, 40, 40,
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

  loadSharedDiagram = (diagramId) => {
      var thisComp = this;
      this.diagramService.loadAnonymousDiagram(diagramId,
        function(anonyDiagramContext) {
          thisComp.importXmlAsDiagram(anonyDiagramContext.DiagramXml);
        },
        function (error){
          Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.DANGER, timeout: 3000, message: Messages.SharedDiagramLoadError()});
          return;
        });
  }

  shareDiagram(){
    // this.setState({showShareDiagramPopup: true});
    // return;
    //check if there are nodes in graph, if not return
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

    var bodyTagInNode = node.getElementsByTagName('body')[0];
    node.getElementsByTagName('root')[0].removeChild(bodyTagInNode);

    var diagramInXml = mxUtils.getXml(node, true);
    return diagramInXml;
  }

  importXmlAsDiagram = (xml) => {
      var doc = mxUtils.parseXml(xml);
      var decoder = new mxCodec(doc);
      decoder.decode(doc.documentElement, this.graph.model);
      this.graph.refresh();

      // var doc = mxUtils.parseXml(xml);
      // var codec = new mxCodec(doc);
      // var elt = doc.documentElement.firstChild;
      // var cells = [];
      // while (elt != null){                
      //   cells.push(codec.decodeCell(elt));
      //     this.graph.refresh();
      //   elt = elt.nextSibling;
      // }

      // this.graph.addCells(cells);

        // let doc = mxUtils.parseXml(xml);
        // let codec = new mxCodec(doc);
        // codec.decode(doc.documentElement, this.graph.getModel());
        // let elt = doc.documentElement.firstChild;
        // let cells = [];
        // while (elt != null)
        // {
        //     let cell = codec.decode(elt)
        //     if(cell != undefined){
        //         if(cell.id != undefined && cell.parent != undefined && (cell.id == cell.parent)){
        //             elt = elt.nextSibling;
        //             continue;
        //         }   
        //         cells.push(cell);
        //     }
        //     elt = elt.nextSibling;
        // }
        // this.graph.addCells(cells);


    // myEditor.editor.setGraphXml(doc.documentElement);


    // var doc = mxUtils.parseXml(xml);
    // var codec = new mxCodec(doc);
    // var elt = doc.documentElement.firstChild;
    // var cells = [];
    // while (elt != null){                
    //   cells.push(codec.decodeCell(elt));
    //   this.graph.refresh();
    //   elt = elt.nextSibling;
    // }

    // this.graph.addCells(cells);

  }

  closeShareDiagramPopup = () => this.setState({ showShareDiagramPopup: false, useTallContent: false });

}