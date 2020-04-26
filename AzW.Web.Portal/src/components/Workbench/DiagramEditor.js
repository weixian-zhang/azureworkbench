
import React, { Component } from "reactn";
import MySpace from './MySpace';
import OverlaySaveToWorkspace from './OverlaySaveToWorkspace';
import {InputGroup, Classes, Button, Intent, Overlay, Toaster, Position} from "@blueprintjs/core";

//3rd-party libraries
import ShortUniqueId from 'short-unique-id';
import AzureIcons from "./Helpers/AzureIcons";
import Messages from "./Helpers/Messages";
import Utils from "./Helpers/Utils";
import MxGraphManager from './Helpers/MxGraphManager';
import {mxChildChangeCodec,mxCellCodec, mxChildChange, mxGraphSelectionModel, mxCellPath, mxDefaultToolbar, mxDefaultPopupMenu, mxDefaultKeyHandler, mxStylesheet, mxGraphModel, mxClipboard, mxCodec, mxPoint, mxGeometry, mxCellOverlay, mxImage, mxKeyHandler, mxConstants, mxEvent, mxUtils,mxPopupMenuHandler, mxDragSource, mxUndoManager, mxCell, mxEditor, mxGraph} from "mxgraph-js";
import Subnet from "../../models/Subnet";
import LoadAnonyDiagramContext from "../../models/LoadAnonyDiagramContext";
import DiagramService from '../../services/DiagramService';
import ProvisionService from '../../services/ProvisionService';
import queryString from 'query-string';
import AzureValidator from './Helpers/AzureValidator';
import LocalStorage from '../../services/LocalStorage';
import WorkspaceDiagramContext from "../../models/services/WorkspaceDiagramContext";
import mxClientOverrides from './Helpers/mxClientOverrides';

//models
import PrivateEndpoint from "../../models/PrivateEndpoint";
import IoTCentral from "../../models/IoTCentral";
import LogAnalytics from "../../models/LogAnalytics";
import AppConfig from "../../models/AppConfig";
import AADB2C from "../../models/AADB2C";
import IoTHub from "../../models/IoTHub";
import Maps from "../../models/Maps";
import TimeSeriesInsights from "../../models/TimeSeriesInsights";
import RecoveryServiceVault from "../../models/RecoveryServiceVault";
import AppInsights from "../../models/AppInsights";
import Automation from "../../models/Automation";
import APIM from "../../models/APIM";
import ServiceBus from "../../models/ServiceBus";
import LogicApp from "../../models/LogicApp";
import IntegratedServiceEnvironment from "../../models/IntegratedServiceEnvironment";
import EventGridTopic from "../../models/EventGridTopic";
import EventGridSubscription from "../../models/EventGridSubscription";
import StreamAnalytics from "../../models/StreamAnalytics";
import AzureFirewall from "../../models/AzureFirewall";
import Sentinel from "../../models/Sentinel";
import KeyVault from "../../models/KeyVault";
import DDoSStandard from "../../models/DDoSStandard";
import Bastion from "../../models/Bastion";
import Relay from "../../models/Relay";
import ContainerRegistry from "../../models/ContainerRegistry";
import ContainerInstance from "../../models/ContainerInstance";
import Kubernetes from "../../models/Kubernetes";
import DataExplorer from "../../models/DataExplorer";
import Databricks from "../../models/Databricks";
import DataFactory from "../../models/DataFactory";
import DataLakeAnalytics from "../../models/DataLakeAnalytics";
import HdInsight from "../../models/HdInsight";
import DataLakeStorage from "../../models/DataLakeStorage";
import SynapseAnalytics from "../../models/SynapseAnalytics";
import SQLMI from "../../models/SQLMI";
import Redis from "../../models/Redis";
import MySQL from "../../models/MySQL";
import SQLElasticPool from "../../models/SQLElasticPool";
import Cosmos from "../../models/Cosmos";
import SQLDB from "../../models/SQLDB";
import MariaDB from "../../models/MariaDB";
import PostgreSQL from "../../models/PostgreSQL";
import FileSync from "../../models/FileSync";
import NetAppFile from "../../models/NetAppFile";
import BlobStorage from "../../models/BlobStorage";
import TableStorage from "../../models/TableStorage";
import QueueStorage from "../../models/QueueStorage";
import AzFile from "../../models/AzFile";
import AzureCDN from "../../models/AzureCDN";
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
import NSG from "../../models/NSG";
import RouteTable from "../../models/RouteTable";
import AnonymousDiagramContext from "../../models/services/AnonymousDiagramContext";

//property panels
import AzStoragePropPanel from './PropPanel/AzStoragePropPanel';
import StylePropPanel from './StylePropPanel';
import SubnetPropPanel from "./PropPanel/SubnetPropPanel";
import VNetPropPanel from "./PropPanel/VNetPropPanel";
import NLBPropPanel from "./PropPanel/NLBPropPanel";
import AppGwPropPanel from "./PropPanel/AppGwPropPanel";
import DNSPrivateZonePropPanel from "./PropPanel/DNSPrivateZone";
import AppServicePropPanel from "./PropPanel/AppSvcPropPanel";
import ASEPropPanel from "./PropPanel/ASEPropPanel";
import FuncPropPanel from "./PropPanel/FuncPropPanel";
import AzureSearchPropPanel from "./PropPanel/AzureSearchPropPanel";
import SignalRPropPanel from "./PropPanel/SignalRPropPanel";
import AppServiceCertPropPanel from "./PropPanel/AppServiceCertPropPanel";
import AppServiceDomainPropPanel from "./PropPanel/AppServiceDomainPropPanel";
import VMPropPanel from "./PropPanel/VMPropPanel";
import VMSSPropPanel from "./PropPanel/VMSSPropPanel";
import DevTestLabPropPanel from "./PropPanel/DevTestLabPropPanel";
import SharedImageGalleryPropPanel from "./PropPanel/SharedImageGalleryPropPanel";
import FrontDoorPropPanel from "./PropPanel/FrontDoorPropPanel";
import PublicIPPropPanel from "./PropPanel/PublicIPPropPanel";
import ExpressRoutePropPanel from "./PropPanel/ExpressRoutePropPanel";
import TrafficManagerPropPanel from "./PropPanel/TrafficManagerPropPanel";
import VNetGatewayPropPanel from "./PropPanel/VNetGatewayPropPanel";
import CDNPropPanel from "./PropPanel/CDNPropPanel";
import AzureFileSyncPropPanel from "./PropPanel/AzureFileSyncPropPanel";
import NetAppFilePropPanel from "./PropPanel/NetAppFilePropPanel";
import SynapsePropPanel from "./PropPanel/SynapsePropPanel";
import PostgreSQLPropPanel from "./PropPanel/PostgreSQLPropPanel";
import MariaDBPropPanel from "./PropPanel/MariaDBPropPanel";
import AzureSQLPropPanel from "./PropPanel/AzureSQLPropPanel";
import CosmosPropPanel from "./PropPanel/CosmosPropPanel";
import MySQLPropPanel from "./PropPanel/MySQLPropPanel";
import SQLElasticPoolPropPanel from "./PropPanel/SQLElasticPoolPropPanel";
import SQLMIPropPanel from "./PropPanel/SQLMIPropPanel";
import RedisPropPanel from "./PropPanel/RedisPropPanel";
import DataLakeStoragePropPanel from "./PropPanel/DataLakeStoragePropPanel";
import DataLakeAnalyticsPropPanel from "./PropPanel/DataLakeAnalyticsPropPanel";
import DatabricksPropPanel from "./PropPanel/DatabricksPropPanel";
import DataFactoryPropPanel from "./PropPanel/DataFactoryPropPanel";
import HdInsightPropPanel from "./PropPanel/HdInsightPropPanel";
import DataExplorerPropPanel from "./PropPanel/DataExplorerPropPanel";
import ContainerInstancePropPanel from "./PropPanel/ContainerInstancePropPanel";
import ContainerRegistryPropPanel from "./PropPanel/ContainerRegistryPropPanel";
import KubernetesPropPanel from "./PropPanel/KubernetesPropPanel";
import APIMPropPanel from "./PropPanel/APIMPropPanel";
import ServiceBusPropPanel from "./PropPanel/ServiceBusPropPanel";
import RelayPropPanel from "./PropPanel/RelayPropPanel";
import LogicAppPropPanel from "./PropPanel/LogicAppPropPanel";
import ISEPropPanel from "./PropPanel/ISEPropPanel";
import EventGridTopicPropPanel from "./PropPanel/EventGridTopicPropPanel";
import EventGridSubscriptionPropPanel from "./PropPanel/EventGridTopicPropPanel";
import StreamAnalyticsPropPanel from "./PropPanel/StreamAnalyticsPropPanel";
import AppConfigurationPropPanel from "./PropPanel/AppConfigurationPropPanel";
import FirewallPropPanel from "./PropPanel/FirewallPropPanel";
import SentinelPropPanel from "./PropPanel/SentinelPropPanel";
import KeyVaultPropPanel from "./PropPanel/KeyVaultPropPanel";
import DDoSStandardPropPanel from "./PropPanel/DDoSStandardPropPanel";
import BastionPropPanel from "./PropPanel/BastionPropPanel";
import RecoveryServiceVaultPropPanel from "./PropPanel/RecoveryServiceVaultPropPanel";
import AppInsightsPropPanel from "./PropPanel/AppInsightsPropPanel";
import LogAnalyticsPropPanel from "./PropPanel/LogAnalyticsPropPanel";
import AutomationPropPanel from "./PropPanel/AutomationPropPanel";
import AADB2CPropPanel from "./PropPanel/AADB2CPropPanel";
import IoTHubPropPanel from "./PropPanel/IoTHubPropPanel";
import MapsPropPanel from "./PropPanel/MapsPropPanel";
import TimeSeriesPropPanel from "./PropPanel/TimeSeriesPropPanel";
import IoTCentralPropPanel from "./PropPanel/IoTCentralPropPanel";
import NSGPropPanel from "./PropPanel/NSGPropPanel";

import OverlayPreviewDiagram from "./OverlayPreviewDiagram";
import ARMService from "../../services/ARMService";
import ComputeService from "../../services/ComputeService";
import QuickstartDiagramContext from '../../models/services/QuickstartDiagramContext';
import ProvisionHelper from './Helpers/ProvisionHelper';
import Toast from './Helpers/Toast';

import BlackTickPNG from '../../assets/azure_icons/shape-black-tick.png';

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

        unsavedChanges: false,

        queryString: this.props.queryString
    }

    //global state
    this.setGlobal({autoSnapEdgeToPort:false});

    this.Index = this.props.Index; //Index component contains progress Comp

    this.armsvc = new ARMService();
    this.comsvc = new ComputeService();
    this.diagService = new DiagramService();
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
    this.provisionService = new ProvisionService();
    this.provisionHelper = new ProvisionHelper();

    this.addDblClickEventToOpenPropPanel();
    this.addDeleteKeyEventToDeleteVertex();
    this.addContextMenu();
    this.addCtrlZEventToUndo();
    this.addCtrlAEventSelectAll();
    this.addCtrlCCtrlVCopyPasteVertices();
    this.addUpDownLeftRightArrowToMoveCells();
    
    this.initPasteImageFromBrowserClipboard();
    this.addCtrlSSave();
    this.PromptSaveBeforeCloseBrowser();
    this.canvasChangeEvent();

    this.initRef();

    this.loadSharedDiagram();
  }

  returnDiagramEditor(){

  }

  render() {
    return (
      <div id="diagramEditor" className="diagramEditor">
        <AzStoragePropPanel ref={this.azstoragePropPanel} />
        <OverlayPreviewDiagram ref={this.previewOverlay} />
        <StylePropPanel ref={this.stylePanel} MxGraphManager={this.graphManager} />
        <OverlaySaveToWorkspace ref={this.overlaySaveToWorkspace} DiagramEditor={this} />
        <MySpace ref={this.workspace} DiagramEditor={this} Index={this.Index} />
        <NSGPropPanel ref={this.nsgPropPanel} DiagramEditor={this} />
        <AppServicePropPanel ref={this.appsvcPropPanel} />
        <ASEPropPanel ref={this.asePropPanel} />
        <FuncPropPanel ref={this.funcPropPanel} />
        <AzureSearchPropPanel ref={this.azsearchPropPanel} />
        <SignalRPropPanel ref={this.signalrPropPanel} />
        <AppServiceCertPropPanel ref={this.appsvccertPropPanel} />
        <AppServiceDomainPropPanel ref={this.appsvcdomainPropPanel} />
        <VMPropPanel ref={this.vmPropPanel} />
        <VMSSPropPanel ref={this .vmssPropPanel} />
        <DevTestLabPropPanel ref={this.devteslabPropPanel} />
        <SharedImageGalleryPropPanel ref={this.sigPropPanel} />
        <FrontDoorPropPanel ref={this.frontdoorPropPanel} />
        <PublicIPPropPanel ref={this.pipPropPanel} />
        <ExpressRoutePropPanel ref={this.expressroutePropPanel} />
        <TrafficManagerPropPanel ref={this.trafficmanagerPropPanel} />
        <VNetGatewayPropPanel ref={this.vnetgatewayPropPanel} />
        <CDNPropPanel ref={this.cdnPropPanel} />
        <AzureFileSyncPropPanel ref={this.filesyncPanel} />
        <NetAppFilePropPanel ref={this.netappfilePropPanel} />
        <SynapsePropPanel ref={this.synapsePropPanel} />
        <PostgreSQLPropPanel ref={this.postgresqlPropPanel} />
        <MariaDBPropPanel ref={this.mariadbPropPanel} />
        <AzureSQLPropPanel ref={this.azuresqlPropPanel} />
        <CosmosPropPanel ref={this.cosmosPropPanel} />
        <MySQLPropPanel ref={this.mysqlPropPanel} />
        <SQLElasticPoolPropPanel ref={this.sqlelasticpoolPropPanel} />
        <SQLMIPropPanel ref={this.sqlmiPropPanel} />
        <RedisPropPanel ref={this.redisPropPanel} />
        <DataLakeStoragePropPanel ref={this.datalakestoragePropPanel} />
        <DataLakeAnalyticsPropPanel ref={this.datalakeanalyticsPropPanel} />
        <DatabricksPropPanel ref={this.databricksPropPanel} />
        <DataFactoryPropPanel ref={this.datafactoryPropPanel} />
        <HdInsightPropPanel  ref={this.hdinsightPropPanel} />
        <DataExplorerPropPanel ref={this.dataexplorerPropPanel} />
        <ContainerInstancePropPanel  ref={this.containerintancePropPanel} />
        <ContainerRegistryPropPanel  ref={this.containerregistryPropPanel} />
        <KubernetesPropPanel ref={this.kubePropPanel} />
        <APIMPropPanel ref={this.apimPropPanel} />
        <ServiceBusPropPanel ref={this.servicebusPropPanel} />
        <RelayPropPanel ref={this.relayPropPanel} />
        <LogicAppPropPanel ref={this.logicappPropPanel} />
        <ISEPropPanel ref={this.isePropPanel} />
        <EventGridTopicPropPanel ref={this.egtopicPropPanel} />
        <EventGridSubscriptionPropPanel ref={this.egsubscriptionPropPanel} />
        <StreamAnalyticsPropPanel ref={this.streamanalyticsPropPanel} />
        <AppConfigurationPropPanel ref={this.appconfigPropPanel} />
        <FirewallPropPanel ref={this.firewallPropPanel} />
        <SentinelPropPanel ref={this.sentinelPropPanel} />
        <KeyVaultPropPanel ref={this.akvPropPanel} />
        <DDoSStandardPropPanel ref={this.ddosstandardPropPanel} />
        <BastionPropPanel ref={this.bastionPropPanel} />
        <RecoveryServiceVaultPropPanel ref={this.recoveryservicevaultPropPanel} />
        <AppInsightsPropPanel ref={this.appinsightsPropPanel} />
        <LogAnalyticsPropPanel ref={this.loganalyticsPropPanel} />
        <AutomationPropPanel ref={this.automationPropPanel} />
        <AADB2CPropPanel  ref={this.aadb2cPropPanel} />
        <IoTHubPropPanel ref={this.iothubPropPanel} />
        <MapsPropPanel ref={this.mapsPropPanel} />
        <TimeSeriesPropPanel ref={this.timeseriesPropPanel} />
        <IoTCentralPropPanel ref={this.iotcentralPropPanel} />
        <VNetPropPanel ref={this.vnetPropPanel} />
        <SubnetPropPanel ref={this.subnetPropPanel} />
        <NLBPropPanel ref={this.nlbPropPanel} />
        <AppGwPropPanel ref={this.appgwPropPanel} />
        <DNSPrivateZonePropPanel ref={this.dnsPrivateZonePropPanel} />
        <Overlay isOpen={this.state.showShareDiagramPopup} onClose={this.closeShareDiagramPopup} >
          <div style={{width: '400px',height:'100px'}} className={[Classes.CARD, Classes.ELEVATION_4, "login-overlay"]}>
          <InputGroup

                    disabled={true}
                    value={this.state.shareLink}
                    inputRef={(input) => {
                      if(this.state.shareLinkInputbox == null)
                        this.setState({shareLinkInputbox: input})
                  }}
                />
            <Button style={{marginTop: '10px', float: 'right'}} className="bp3-button bp3-intent-success" icon="tick" onClick={this.copySharedLink}>Copy</Button>
          </div>
        </Overlay>
      </div>
    );
  }

  initRef() {
    this.azstoragePropPanel = React.createRef();
    this.nsgPropPanel = React.createRef();
    this.stylePanel = React.createRef();
    this.overlaySaveToWorkspace = React.createRef();
    this.previewOverlay = React.createRef();
    this.workspace = React.createRef();
    this.vmPropPanel = React.createRef();
    this.vnetPropPanel = React.createRef();
    this.subnetPropPanel = React.createRef();
    this.nlbPropPanel = React.createRef();
    this.appgwPropPanel = React.createRef();
    this.dnsPrivateZonePropPanel = React.createRef();
    this.appsvcPropPanel = React.createRef();
    this.asePropPanel = React.createRef();
    this.funcPropPanel = React.createRef();
    this.azsearchPropPanel = React.createRef();
    this.signalrPropPanel = React.createRef();
    this.appsvccertPropPanel = React.createRef();
    this.appsvcdomainPropPanel = React.createRef();
    this.vmssPropPanel = React.createRef();
    this.devteslabPropPanel = React.createRef();
    this.sigPropPanel = React.createRef();
    this.frontdoorPropPanel = React.createRef();
    this.pipPropPanel = React.createRef();
    this.expressroutePropPanel = React.createRef();
    this.trafficmanagerPropPanel = React.createRef();
    this.vnetgatewayPropPanel = React.createRef();
    this.cdnPropPanel = React.createRef();
    this.storagePropPanel = React.createRef();
    this.filesyncPanel = React.createRef();
    this.netappfilePropPanel = React.createRef();
    this.synapsePropPanel  = React.createRef();
    this.postgresqlPropPanel = React.createRef();
    this.mariadbPropPanel = React.createRef();
    this.azuresqlPropPanel = React.createRef();
    this.cosmosPropPanel = React.createRef();
    this.mysqlPropPanel = React.createRef();
    this.sqlelasticpoolPropPanel = React.createRef();
    this.sqlmiPropPanel = React.createRef();
    this.redisPropPanel = React.createRef();
    this.datalakestoragePropPanel = React.createRef(); 
    this.datalakeanalyticsPropPanel = React.createRef();
    this.databricksPropPanel = React.createRef();
    this.datafactoryPropPanel = React.createRef();
    this.hdinsightPropPanel = React.createRef();
    this.dataexplorerPropPanel = React.createRef();
    this.containerintancePropPanel =  React.createRef();
    this.containerregistryPropPanel =  React.createRef();
    this.kubePropPanel =  React.createRef();
    this.apimPropPanel =  React.createRef();
    this.servicebusPropPanel =  React.createRef();
    this.relayPropPanel =  React.createRef();
    this.logicappPropPanel =  React.createRef();
    this.isePropPanel = React.createRef();
    this.egtopicPropPanel = React.createRef();
    this.egsubscriptionPropPanel = React.createRef();
    this.streamanalyticsPropPanel = React.createRef();
    this.appconfigPropPanel = React.createRef();
    this.firewallPropPanel = React.createRef();
    this.sentinelPropPanel = React.createRef();
    this.akvPropPanel = React.createRef();
    this.ddosstandardPropPanel = React.createRef();
    this.bastionPropPanel = React.createRef();
    this.recoveryservicevaultPropPanel = React.createRef();
    this.appinsightsPropPanel = React.createRef();
    this.loganalyticsPropPanel = React.createRef();
    this.automationPropPanel = React.createRef();
    this.aadb2cPropPanel  = React.createRef();
    this.iothubPropPanel = React.createRef();
    this.mapsPropPanel = React.createRef();
    this.timeseriesPropPanel = React.createRef();
    this.iotcentralPropPanel = React.createRef();
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

  canvasChangeEvent() {
    var thisComp = this;
    this.graph.addListener(mxEvent.CELLS_ADDED, function (sender, evt) {
      if(thisComp.state.unsavedChanges) { evt.consume(); return;}
      thisComp.setState({unsavedChanges: true});
      evt.consume();
    });
    this.graph.addListener(mxEvent.CELLS_MOVED, function (sender, evt) {
      if(thisComp.state.unsavedChanges) { evt.consume(); return;}
      thisComp.setState({unsavedChanges: true});
      evt.consume();
    });
    this.graph.addListener(mxEvent.CELLS_RESIZED, function (sender, evt) {
      if(thisComp.state.unsavedChanges) { evt.consume(); return;}
      thisComp.setState({unsavedChanges: true});
      evt.consume();
    });
    this.graph.addListener(mxEvent.CELL_CONNECTED, function (sender, evt) {
      if(thisComp.state.unsavedChanges) { evt.consume(); return;}
      thisComp.setState({unsavedChanges: true});
      evt.consume();
    });
    this.graph.addListener(mxEvent.CELLS_REMOVED, function (sender, evt) {
      if(thisComp.state.unsavedChanges) { evt.consume(); return;}
        thisComp.setState({unsavedChanges: true});
      evt.consume();
    });
    this.graph.addListener(mxEvent.GROUP_CELLS, function (sender, evt) {
      if(thisComp.state.unsavedChanges) { evt.consume(); return;}
      thisComp.setState({unsavedChanges: true});
      evt.consume();
    });
  }

  addDeleteKeyEventToDeleteVertex(){
      var thisComp = this;
      // delete key remove vertex
      var keyHandler = new mxKeyHandler(this.graph);
      keyHandler.bindKey(46, (evt) =>
        { 
          thisComp.graph.removeCells();
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

  addCtrlAEventSelectAll() {

    var keyHandler = new mxKeyHandler(this.graph);
    var thisComp = this;
    keyHandler.getFunction = function(evt) {
      if (evt != null && evt.ctrlKey == true && evt.key == 'a')
      {
        evt.preventDefault();
        thisComp.graph.selectAll();
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

PromptSaveBeforeCloseBrowser() {
  var thisComp = this;
  window.addEventListener('beforeunload', (event) => {
    if(!thisComp.graphManager.isCellExist()) return;
    if(thisComp.state.unsavedChanges){
      event.returnValue = 'You have unsaved changes';
    }
  });
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
  
       var newGeo = thisComp.graph.getCellGeometry(cell).clone();
       newGeo.x = x;
       newGeo.y = y;
       thisComp.graph.model.setGeometry(cell, newGeo);
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

        //if true, hide option
        if(!thisComponent.azureValidator.isGatewaySubnetExist(cell)){
          menu.addItem('Add GatewaySubnet', '', function()
          {
            thisComponent.addGatewaySubnet(cell); // is vnetCell
          });
        }
        menu.addSeparator();
      }

      if(Utils.IsSubnet(cell))
      {
        menu.addItem('Add Network Security Group', '', function()
        {
            thisComponent.addNSG(cell);
        });

        menu.addItem('Add Route Table', '', function()
        {
            thisComponent.addUDR(cell);
        });
        menu.addSeparator();
      }
      
      //if any cell is selected
      if(thisComponent.graph.getSelectionCells().length > 0) {
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
          var cell = thisComponent.graph.getSelectionCell();
          cell.setVertex(true);
          cell.connectable = true;

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
      }
      
      //if clipboard exist
      if(!mxClipboard.isEmpty())
      {
        menu.addItem('Paste', '', function()
        {
          thisComponent.pasteFromClipboard(); 
        });
      }

      //is cell exist on canvas
      if(thisComponent.graphManager.isCellExist()){
          
        //style for shapes only
          if(thisComponent.graphManager.isNonAzureShape(cell) ||
          thisComponent.azureValidator.isSubnet(cell) ||
          thisComponent.azureValidator.isVNet(cell))
          {
            menu.addSeparator();
            menu.addItem('Style', '', function()
            {
              thisComponent.openStylePanel(cell);
            });
          }

        //preview diagram in new window
        menu.addItem('Preview Diagram', '', function()
        {
          thisComponent.showPreviewDiagramOverlay();
        });
      }

      var showTickForAutoSnap = '';
      if(thisComponent.global.autoSnapEdgeToPort)
        showTickForAutoSnap = BlackTickPNG;
      else
        showTickForAutoSnap = '';

      //auto snap edge to port
      menu.addItem('Auto snap line to connection points',
      showTickForAutoSnap, //tick image
      function() {
        if(!thisComponent.global.autoSnapEdgeToPort)
          thisComponent.setGlobal({autoSnapEdgeToPort:true});
        else
          thisComponent.setGlobal({autoSnapEdgeToPort:false});

          thisComponent.graphManager.autoSnapEdgeToPorts
            (thisComponent.global.autoSnapEdgeToPort);
      });
    };
  }

  addResourceToEditorFromPalette = (dropContext) => {
    this.graphManager.graph.getModel().beginUpdate();
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
      case 'roundedrectangle':
        this.addRoundedRectangle(dropContext);
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
      case ResourceType.AppConfig():
        this.addAppConfig(dropContext);
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
      case ResourceType.CDN():
        this.addCDN(dropContext);
        break;
        case ResourceType.ASG():
      this.addASG(dropContext);
        break;
      case ResourceType.NIC():
        this.addNIC(dropContext);
        break;

      case ResourceType.BlobStorage():
        this.addBlobStorage(dropContext);
        break;
      case ResourceType.AzFile():
        this.addAzFile(dropContext);
        break;
      case ResourceType.QueueStorage():
        this.addQueueStorage(dropContext);
        break;
      case ResourceType.TableStorage():
        this.addTableStorage(dropContext);
        break;
      case ResourceType.Databox():
        this.addDatabox(dropContext);
        break;

      case ResourceType.PostgreSQL():
        this.addPostgreSQL(dropContext);
        break;
      case ResourceType.MariaDB():
        this.addMariaDB(dropContext);
        break;
      case ResourceType.SQLDB():
        this.addSQLDB(dropContext);
        break;
      case ResourceType.CosmosDB():
        this.addCosmos(dropContext);
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

      case ResourceType.PrivateEndpoint():
        this.addPrivateEndpoint(dropContext);
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
      case ResourceType.AzFileSync():
        this.addFileSync(dropContext);
        break;
      case ResourceType.NetAppFile():
        this.addNetAppFile(dropContext);
        break;
      case ResourceType.MySQL():
        this.addMySQL(dropContext);
        break;
      case ResourceType.SQLElasticPool():
        this.addSQLElasticPool(dropContext);
        break;
      case ResourceType.SQLMI():
        this.addSQLMI(dropContext);
        break;
      case ResourceType.SQLStretchDB():
        this.addSQLStretchDB(dropContext);
        break;
      case ResourceType.Redis():
        this.addRedis(dropContext);
        break;
      case ResourceType.DataLakeStorage():
        this.addDataLakeStorage(dropContext);
        break;
      case ResourceType.Synapse():
        this.addSynapse(dropContext);
        break;

      case ResourceType.DataExplorer():
        this.addDataExplorer(dropContext);
        break;

      case ResourceType.Databricks():
        this.addDatabricks(dropContext);
        break;

      case ResourceType.DataFactory():
        this.addDataFactory(dropContext);
        break;

      case ResourceType.DataLakeAnalytics():
        this.addDataLakeAnalytics(dropContext);
        break;

      case ResourceType.HdInsight():
        this.addHdInsight(dropContext);
        break;
      case ResourceType.ContainerInstance():
        this.addContainerInstance(dropContext);
        break;
      case ResourceType.ContainerRegistry():
        this.addContainerRegistry(dropContext);
        break;
      case ResourceType.Kubernetes():
        this.addKubernetes(dropContext);
        break;
      
      case ResourceType.APIM():
        this.addAPIM(dropContext);
        break;
      case ResourceType.ASB():
        this.addASB(dropContext);
        break;
      case ResourceType.LogicApp():
        this.addLogicApp(dropContext);
        break;
      case ResourceType.ISE():
        this.addISE(dropContext);
        break;
      case ResourceType.EventGridTopic():
        this.addEventGridTopic(dropContext);
        break;
      case ResourceType.EventGridSubscription():
        this.addEventGridSubscription(dropContext);
        break;
      case ResourceType.StreamAnalytics():
        this.addStreamAnalytics(dropContext);
        break;
      case ResourceType.SendGrid():
        this.addSendGrid(dropContext);
        break;
      case ResourceType.Relay():
        this.addRelay(dropContext);
        break;
  
      case ResourceType.Firewall():
        this.addFirewall(dropContext);
        break;
      case ResourceType.Sentinel():
        this.addSentinel(dropContext);
        break;
      case ResourceType.KeyVault():
        this.addKeyVault(dropContext);
        break;
      case ResourceType.SecurityCenter():
        this.addSecurityCenter(dropContext);
        break;
      case ResourceType.DDoSStandard():
        this.addDDoSStandard(dropContext);
        break;
      case ResourceType.Bastion():
        this.addBastion(dropContext);
        break;
      case ResourceType.RecoveryServiceVault():
        this.addRecoveryServiceVault(dropContext);
        break;
      case ResourceType.AppInsights():
        this.addAppInsights(dropContext);
        break;
      case ResourceType.LogAnalytics():
        this.addLogAnalytics(dropContext);
        break;
      case ResourceType.Automation():
        this.addAutomation(dropContext);
        break;

      case ResourceType.AAD():
        this.addAAD(dropContext);
        break;
      case ResourceType.AADB2C():
        this.addAADB2C(dropContext);
        break;
      case ResourceType.IoTHub():
        this.addIoTHub(dropContext);
        break;
      case ResourceType.IoTCentral():
        this.addIoTCentral(dropContext);
      break;
      case ResourceType.AzureMaps():
        this.addAzureMaps(dropContext);
        break;
      case ResourceType.TimeSeriesInsights():
        this.addTimeSeriesInsights(dropContext);
        break;

      default:
        break;
    }
    this.graphManager.graph.getModel().endUpdate();
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
      case ResourceType.AzFile():
        this.azstoragePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.QueueStorage():
        this.azstoragePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.TableStorage():
        this.azstoragePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.BlobStorage():
        this.azstoragePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.NSG():
        this.nsgPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.IoTCentral():
        this.iotcentralPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.TimeSeriesInsights():
        this.timeseriesPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.AzureMaps():
        this.mapsPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.IoTHub():
        this.iothubPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.AADB2C():
        this.aadb2cPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.Automation():
        this.automationPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.LogAnalytics():
        this.loganalyticsPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.AppInsights():
        this.appinsightsPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.RecoveryServiceVault():
        this.recoveryservicevaultPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.Bastion():
        this.bastionPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.DDoSStandard():
        this.ddosstandardPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.KeyVault():
        this.akvPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.Sentinel():
        this.sentinelPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.Firewall():
        this.firewallPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.AppConfig():
        this.appconfigPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.StreamAnalytics():
        this.streamanalyticsPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.EventGridSubscription():
        this.egsubscriptionPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.EventGridTopic():
        this.egtopicPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.ISE():
        this.isePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.LogicApp():
        this.logicappPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.Relay():
        this.relayPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.ASB():
        this.servicebusPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.APIM():
        this.apimPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.Kubernetes():
        this.kubePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.ContainerRegistry():
        this.containerregistryPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.ContainerInstance():
        this.containerintancePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.DataExplorer():
        this.dataexplorerPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.HdInsight():
        this.hdinsightPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.DataFactory():
        this.datafactoryPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.Databricks():
        this.databricksPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.DataLakeAnalytics():
        this.datalakeanalyticsPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.DataLakeStorage():
        this.datalakestoragePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.Redis():
        this.redisPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.SQLMI():
        this.sqlmiPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.SQLElasticPool():
        this.sqlelasticpoolPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.MySQL():
        this.mysqlPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.CosmosDB():
        this.cosmosPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.SQLDB():
        this.azuresqlPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.MariaDB():
        this.mariadbPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.PostgreSQL():
        this.postgresqlPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.Synapse():
        this.synapsePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.NetAppFile():
        this.netappfilePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.AzFileSync():
        this.filesyncPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.BlobStorage():
        this.storagePropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.CDN():
        this.cdnPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.VirtualNetworkGateway():
        this.vnetgatewayPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.TrafficManager():
        this.trafficmanagerPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
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
      case ResourceType.Function():
        this.funcPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.AzureSearch():
        this.azsearchPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.SignalR():
        this.signalrPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break; 
      case ResourceType.AppServiceCert():
        this.appsvccertPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.AppServiceDomain():
        this.appsvcdomainPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.VMSS():
        this.vmssPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break; 
      case ResourceType.DevTestLab():
        this.devteslabPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.SharedImageGallery():
        this.sigPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.FrontDoor():
        this.frontdoorPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.PublicIp():
        this.pipPropPanel.current.show(userObject, function(savedUserObject){
          thisComp.graph.model.setValue(cell, JSON.stringify(savedUserObject));
        });
        break;
      case ResourceType.ExpressRouteCircuit():
        this.expressroutePropPanel.current.show(userObject, function(savedUserObject){
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

  addRoundedRectangle = (dropContext) => {
    var rect = this.graph.insertVertex(
      this.graph.getDefaultParent(),
      null,
      'rectangle',
      dropContext.x,
      dropContext.y,
      150,
      100,
      this.graphManager.getDefaultRoundedRectStyleString()
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
          "verticalLabelPosition=bottom;verticalAlign=top;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
          this.azureIcons.User());
  }

  addOnpremDC = (dropContext) => {
    this.graph.insertVertex
          (this.graph.getDefaultParent(), null, '<p style="margin: 0px auto">datacenter</p>', dropContext.x, dropContext.y, 50, 50,
          "verticalLabelPosition=bottom;verticalAlign=top;fontSize=13;editable=1;verticalLabelPosition=bottom;shape=image;image=" +
          require('../../assets/azure_icons/shape-dc.png'));
  }

  addInternet = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'internet', dropContext.x, dropContext.y, 60, 60,
    "verticalLabelPosition=bottom;verticalAlign=top;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
      this.azureIcons.Internet());
  }

  addClientDevice = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'laptop', dropContext.x, dropContext.y, 60, 60,
    "verticalLabelPosition=bottom;verticalAlign=top;editable=1;shape=image;image=data:image/svg+xml," +
      this.azureIcons.ClientDevice());
  }

  addADFSDevice = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'ADFS', dropContext.x, dropContext.y, 60, 60,
    "verticalLabelPosition=bottom;verticalAlign=top;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
      this.azureIcons.ADFS());
  }

  addAndriodDevice = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'Andriod', dropContext.x, dropContext.y, 60, 60,
    "verticalLabelPosition=bottom;verticalAlign=top;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
      this.azureIcons.Andriod());
  }

  addiPhoneDevice = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'iPhone', dropContext.x, dropContext.y, 60, 60,
    "verticalLabelPosition=bottom;verticalAlign=top;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
      this.azureIcons.iPhone());
  }

  addOnPremDBServerDevice = (dropContext) => {
    this.graph.insertVertex
    (this.graph.getDefaultParent(), null, 'On-Prem DB Server', dropContext.x, dropContext.y, 60, 60,
    "verticalLabelPosition=bottom;verticalAlign=top;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
      this.azureIcons.OnPremDBServer());
  }
  
  addPrivateEndpoint = (dropContext) => {

      this.graphManager.graph.getModel().beginUpdate();
      try
      {
          //overlay event listener
          https://stackoverflow.com/questions/45708656/drag-event-on-mxgraph-overlay
          // Creates a new overlay with an image and a tooltip

          var model = new PrivateEndpoint();
          model.resourceType = ResourceType.PrivateEndpoint();
          model.GraphModel.Id = this.shortUID.randomUUID(6);
          model.ProvisionContext.Name = 'privateendpoint_' + model.GraphModel.Id;
          model.GraphModel.DisplayName = 'Private Endpoint';
              var jsonModel = JSON.stringify(model);
          
          var parent = this.graph.getDefaultParent();

          this.graph.insertVertex
          (parent, model.GraphModel.IconId ,jsonModel, dropContext.x, dropContext.y, 30, 30,
          "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;shape=image;image=data:image/png," +
            this.azureIcons.PrivateEndpoint());
    }
    finally
    {
      // Updates the display
      this.graphManager.graph.getModel().endUpdate();
    }
  }

  addVNet = (dropContext) => {

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
          
          var vnetStyle = this.graphManager.getVNetStyle();

          var vnetVertex = this.graph.insertVertex(
                this.graph.getDefaultParent(),
                vnetModel.GraphModel.Id,
                jsonstrVnet,
                dropContext.x,
                dropContext.y,
                400,
                300,
                vnetStyle
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

        // var nsgOverlay = new mxCellOverlay(
        //   new mxImage(require('../../assets/azure_icons/Networking Service Color/Network Security Groups (Classic).svg'),20, 20),
        //   null,  mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP
        // );

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

          var subnetStyle = this.graphManager.getSubnetStyle();

          subnetVertex = this.graph.insertVertex(
            vnetCell,
            subnet.GraphModel.Id,
            jsonstrSubnet,
            ((vnetCell.getGeometry().x /2) / 2) - 15,
            vnetCell.getGeometry().y + Math.floor((Math.random() * 15) + 1),
            vnetCell.getGeometry().width - 90,
            100,
            subnetStyle
          );
        }
        else {
            this.graph.getModel().getCell(loadContext.parent.id);
        }
 
        this.graph.addCellOverlay(subnetVertex, subnetLogoOverlay);
       // this.graph.addCellOverlay(subnetVertex, nsgOverlay);
  }

  addNSG(subnetCell) {

    if(this.azureValidator.subnetHasNSG(subnetCell))
    {
      Toast.show('warning', 2000, 'NSG exist for subnet')
      return;
    }

    var nsg = new NSG();
    nsg.GraphModel.Id = this.shortUID.randomUUID(6);
    nsg.GraphModel.DisplayName = '';
    nsg.ProvisionContext.Name = "nsg-" + nsg.GraphModel.Id;

    var jsonstrNsg = JSON.stringify(nsg);

    var nsgVertex = this.graph.insertVertex(
      subnetCell,
      nsg.GraphModel.Id,
      jsonstrNsg,
      0,
      0, //subnetCell.getGeometry().y + Math.floor((Math.random() * 15) + 1),
      22, //width
      22, //height
      "resizable=0;editable=0;shape=image;image=data:image/svg+xml," + this.azureIcons.NSG()
    );

    nsgVertex.geometry.offset = new mxPoint(-12, -15);
    nsgVertex.geometry.relative = true;
    this.graph.refresh();
  }

  addUDR(subnetCell) {

    if(this.azureValidator.subnetHasUDR(subnetCell))
    {
      Toast.show('warning', 2000, 'Route Table exist for subnet')
      return;
    }

    var udr = new RouteTable();
    udr.GraphModel.Id = this.shortUID.randomUUID(6);
    udr.GraphModel.DisplayName = '';
    udr.ProvisionContext.Name = "udr-" + udr.GraphModel.Id;
    var jsonstrUdr = JSON.stringify(udr);

    var udrVertex = this.graph.insertVertex(
      subnetCell,
      udr.GraphModel.Id,
      jsonstrUdr,
      0,
      0, //subnetCell.getGeometry().y + Math.floor((Math.random() * 15) + 1),
      24, //width
      24, //height
      "resizable=0;editable=0;shape=image;image=data:image/svg+xml," + this.azureIcons.RouteTable()
    );

    udrVertex.geometry.offset = new mxPoint(-12, -17);
    udrVertex.geometry.relative = true;
    this.graph.refresh();
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
      
      // var parent = this.graph.getDefaultParent();
      // var parentCell = this.graph.getCellAt(dropContext.x, dropContext.y);

      // if(parentCell != null){
      //   var cellType = JSON.parse(parentCell.value).GraphModel.ResourceType;
      //   if(cellType == 'subnet')
      //       parent = parentCell;
      // }

      var nlb = new NLB();
        nlb.GraphModel.ResourceType = 'nlb';
        nlb.GraphModel.Id = this.shortUID.randomUUID(6);
        nlb.GraphModel.DisplayName = 'azure load balancer';
        nlb.ProvisionContext.Name = "azlb_" + nlb.GraphModel.Id;
        
      var result = this.azureValidator.isResourceDropinSubnet();

      var parent = this.graph.getDefaultParent(); //set default parent, external NLB

      if(result.isInSubnet)
      {
          nlb.ProvisionContext.IsInternalNLB = true;
          parent = result.subnetCell;
          var subnetCenterPt = Utils.getCellCenterPoint(result.subnetCell);
          dropContext.x = subnetCenterPt.x;
          dropContext.y = subnetCenterPt.y;
      }
      
      var nlbJsonString = JSON.stringify(nlb);

      this.graph.insertVertex
        (parent, nlb.GraphModel.IconId ,nlbJsonString, dropContext.x, dropContext.y, 30, 30,
        "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;shape=image;image=data:image/svg+xml," +
          this.azureIcons.NLB());
  }

  addAppGw = (dropContext) => {

      var subnetCell = this.graph.getSelectionCell();
      if(!this.azureValidator.isResourceinDedicatedSubnet(subnetCell))
      {
        Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.DANGER, timeout: 3000, message: Messages.AppGatewayNotInSubnetError()});
          return;
      }

      var dropContext = Utils.getCellCenterPoint(subnetCell);

      var appgw = new AppGateway();
        appgw.GraphModel.Id = this.shortUID.randomUUID(6);
        appgw.ProvisionContext.Name = ResourceType.AppGw() + "_" + appgw.GraphModel.Id;
        appgw.GraphModel.DisplayName = 'app gateway'
        var appgwJsonString = JSON.stringify(appgw);

      this.graph.insertVertex
        (subnetCell, appgw.GraphModel.IconId ,appgwJsonString, dropContext.x, dropContext.y, 35, 35,
        "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/svg+xml," +
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
        "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;shape=image;image=data:image/svg+xml," +
          this.azureIcons.DNSPrivateZone());
  }

  addVM = (dropContext, vmType) => {
    
    var result = this.azureValidator.isResourceDropinSubnet();

    if(dropContext.resourceType == ResourceType.WindowsVM() ||
        dropContext.resourceType == ResourceType.LinuxVM())
    {
      if(!result.isInSubnet)
      {
          Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.DANGER, timeout: 4000, message: Messages.VMInSubnet()});
          return;
      }
    }

    if(this.azureValidator.isGatewaySubnet(result.subnetCell)) {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.DANGER, timeout: 5000, message: Messages.NonVNetGwInGatewaySubnetError()});
      return;
    }

    if(this.azureValidator.isVMinSubnetTakenByDedicatedSubnetResource(result.subnetCell))
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.DANGER, timeout: 8000, message: Messages.ResourceInSubnetTakenByDedicatedSubnetResource()});
      return;
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
          "verticalLabelPosition=bottom;verticalAlign=top;editable=0;shape=image;image=data:image/svg+xml," + iconByOS);
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

    if(this.azureValidator.isGatewaySubnet(result.subnetCell)) {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.DANGER, timeout: 5000, message: Messages.NonVNetGwInGatewaySubnetError()});
      return;
    }

    if(this.azureValidator.isVMinSubnetTakenByDedicatedSubnetResource(result.subnetCell))
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.DANGER, timeout: 8000, message: Messages.ResourceInSubnetTakenByDedicatedSubnetResource()});
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

    var subnetCell = this.graph.getSelectionCell();
    if(!this.azureValidator.isResourceinDedicatedSubnet(subnetCell))
    {
      Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.DANGER, timeout: 5000, message: Messages.ASEInSubnet()});
        return;
    }

    if(this.azureValidator.isGatewaySubnet(subnetCell)) {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.DANGER, timeout: 5000, message: Messages.NonVNetGwInGatewaySubnetError()});
      return;
    }


    var subnetCenterPt = Utils.getCellCenterPoint(subnetCell);

    var ase = new ASE();
    ase.GraphModel.Id = this.shortUID.randomUUID(6);
    ase.GraphModel.DisplayName = 'App Service Environment'

    var aseJsonString = JSON.stringify(ase);

    this.graph.insertVertex
      (subnetCell, ase.GraphModel.IconId ,aseJsonString, subnetCenterPt.x, subnetCenterPt.y, 35, 35,
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
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;shape=image;image=data:image/png," +
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

  addAppConfig = (dropContext) => {
    var model = new AppConfig();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'App Configuration'

    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId ,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.AppConfig());
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

  addCDN = (dropContext) => {
    var model = new AzureCDN();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Azure CDN'

    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId ,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.CDN());
  }

  addASG = (dropContext) => {
    this.graph.insertVertex
      (this.graph.parent, '','Application Security Group', dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.ASG());
  }

  addNIC = (dropContext) => {
    this.graph.insertVertex
      (this.graph.parent, '','Network Interface', dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.NIC());
  }

  addBlobStorage = (dropContext) => {

    var model = new BlobStorage();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Blob Storage'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId, modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.BlobStorage());
  }

  addAzFile = (dropContext) => {

    var model = new AzFile();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Azure File'
    var modelJson = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.Id,modelJson, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.AzureFile());
  }
  
  addFileSync = (dropContext) => {

    var model = new FileSync();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Azure File Sync'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.FileSync());
  }
  
  addNetAppFile = (dropContext) => {

    var model = new NetAppFile();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'NetApp File'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.NetAppFile());
  }

  addQueueStorage = (dropContext) => {

    var model = new QueueStorage();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Queue Storage'
    var modelJson = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.Id, modelJson, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.QueueStorage());
  }
  
  addTableStorage = (dropContext) => {

    var model = new TableStorage();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Table Storage'
    var modelJson = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.Id, modelJson, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.TableStorage());
  }

  addDatabox = (dropContext) => {
    this.graph.insertVertex
      (this.graph.parent, '','Data box', dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.Databox());
  }

  addPostgreSQL = (dropContext) => {

    var model = new PostgreSQL();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Azure Database for PostgreSQL'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.PostgreSQL());
  }

  addMariaDB = (dropContext) => {

    var model = new MariaDB();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Azure Database for MariaDB'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.MariaDB());
  }

  addSQLDB = (dropContext) => {

    var model = new SQLDB();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'SQLDB'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.SQLDB());
  }
  
  addCosmos = (dropContext) => {

    var model = new Cosmos();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Cosmos'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.Cosmos());
  }

  addMySQL = (dropContext) => {

    var model = new MySQL();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Azure Database for MySQL'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.MySQL());
  }

  addSQLElasticPool = (dropContext) => {

    var model = new SQLElasticPool();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Azure SQL Elastic Pool'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.SQLElasticPool());
  }

  addSQLMI = (dropContext) => {

    var subnetCell = this.graph.getSelectionCell();
    if(!this.azureValidator.isResourceinDedicatedSubnet(subnetCell))
    {
      Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.DANGER, timeout: 3000, message: Messages.SQLMINotInDedicatedSubnetError()});
        return;
    }

    var model = new SQLMI();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'SQL Managed Instance'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.SQLMI());
  }

  addSQLStretchDB = (dropContext) => {

    this.graph.insertVertex
      (this.graph.parent, '', 'SQL Stretch DB', dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.SQLStretchDB());
  }

  addRedis = (dropContext) => {

    var model = new Redis();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Azure Cache for Redis'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.Redis());
  }

  addDataLakeStorage = (dropContext) => {

    var model = new DataLakeStorage();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Data Lake Storage'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.DataLakeStorage());
  }

  addSynapse = (dropContext) => {

    var model = new SynapseAnalytics();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Synapse Analytics'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.Synapse());
  }

  addDataExplorer = (dropContext) => {

    var model = new DataExplorer();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Data Factory'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.DataExplorer());
  }

  addDatabricks = (dropContext) => {

    var model = new Databricks();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Databricks'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.Databricks());
  }

  addDataFactory = (dropContext) => {

    var model = new DataFactory();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Data Factory'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.DataFactory());
  }

  addDataLakeAnalytics = (dropContext) => {

    var model = new DataLakeAnalytics();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Data Lake Analytics'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.DataLakeAnalytics());
  }

  addHdInsight = (dropContext) => {

    var model = new HdInsight();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'HdInsight'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.HdInsight());
  }

  addContainerInstance = (dropContext) => {

    var model = new ContainerInstance();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Container Instance'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.ContainerInstance());
  }

  addContainerRegistry = (dropContext) => {

    var model = new ContainerRegistry();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Container Registry'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.ContainerRegistry());
  }

  addKubernetes = (dropContext) => {

    var subnetCell = this.graph.getSelectionCell();
    if(!this.azureValidator.isResourceinDedicatedSubnet(subnetCell))
    {
      Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.DANGER, timeout: 3000, message: Messages.KubeNotInSubnetError()});
        return;
    }

    var dropContext = Utils.getCellCenterPoint(subnetCell);

    var model = new Kubernetes();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Kubernetes'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (subnetCell, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.Kubernetes());
  }


  addAPIM = (dropContext) => {

    var model = new APIM();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'API Management'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.APIM());
  }

  addASB = (dropContext) => {

    var model = new ServiceBus();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Service Bus'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.ASB());
  }

  addLogicApp = (dropContext) => {

    var model = new LogicApp();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Logic App'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.LogicApp());
  }

  addISE = (dropContext) => {

    var subnetCell = this.graph.getSelectionCell();
    if(!this.azureValidator.isResourceinDedicatedSubnet(subnetCell))
    {
      Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.DANGER, timeout: 3000, message: Messages.ISENotInSubnetError()});
        return;
    }

    var dropContext = Utils.getCellCenterPoint(subnetCell);

    var model = new IntegratedServiceEnvironment();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Integrated Service Environment'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (subnetCell, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.ISE());
    
    Toaster.create({
      position: Position.TOP,
      autoFocus: false,
      canEscapeKeyClear: true
    }).show({intent: Intent.SUCCESS, timeout: 8000, message: Messages.ISESubnetInfo()});
  }

  addEventGridTopic = (dropContext) => {

    var model = new EventGridTopic();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Event Grid Topic'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.EventGridTopic());
  }

  addEventGridSubscription = (dropContext) => {

    var model = new EventGridSubscription();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Event Grid Subscription'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.EventGridSubscription());
  }

  addStreamAnalytics = (dropContext) => {

    var model = new StreamAnalytics();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Stream Analytics'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.StreamAnalytics());
  }

  addSendGrid = (dropContext) => {

    this.graph.insertVertex
      (this.graph.parent, '','SendGrid', dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.SendGrid());
  }
   
  addRelay = (dropContext) => {

    var model = new Relay();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Azure Relay'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.Relay());

 }

 addFirewall = (dropContext) => {

    var subnetCell = this.graph.getSelectionCell();

    if(!this.azureValidator.isResourceinDedicatedSubnet(subnetCell))
    {
      Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.DANGER, timeout: 3000, message: Messages.FirewallNotInSubnetError()});
        return;
    }

    if(this.azureValidator.isGatewaySubnet(subnetCell)) {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.DANGER, timeout: 5000, message: Messages.NonVNetGwInGatewaySubnetError()});
      return;
    }

    var dropContext = Utils.getCellCenterPoint(subnetCell);

    var model = new AzureFirewall();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Firewall'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (subnetCell, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.Firewall());
  }

  addSentinel = (dropContext) => {

    var model = new Sentinel();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Sentinel'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.Sentinel());
  }

  addKeyVault = (dropContext) => {

    var model = new KeyVault();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Key Vault'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.KeyVault());
  }

  addSecurityCenter = (dropContext) => {
    this.graph.insertVertex
      (this.graph.parent, '','Security Center', dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.SecurityCenter());
  }

  addDDoSStandard = (dropContext) => {

    var model = new DDoSStandard();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Azure DDoS Protection Standard'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.DDoSStandard());
  }

  addBastion = (dropContext) => {

    var subnetCell = this.graph.getSelectionCell();
    if(!this.azureValidator.isResourceinDedicatedSubnet(subnetCell))
    {
      Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.DANGER, timeout: 5000, message: Messages.BastionNotInSubnetError()});
        return;
    }

    if(this.azureValidator.isGatewaySubnet(subnetCell)) {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.DANGER, timeout: 5000, message: Messages.NonVNetGwInGatewaySubnetError()});
      return;
    }

    if(this.azureValidator.isVMinSubnetTakenByDedicatedSubnetResource(subnetCell))
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.DANGER, timeout: 8000, message: Messages.ResourceInSubnetTakenByDedicatedSubnetResource()});
      return;
    }

    var dropContext = Utils.getCellCenterPoint(subnetCell);

    var model = new Bastion();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Bastion'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (subnetCell, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.Bastion());
  }

  addRecoveryServiceVault = (dropContext) => {

    var model = new RecoveryServiceVault();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Recovery Service Vault'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.RecoveryServiceVault());
  }

  addAppInsights = (dropContext) => {

    var model = new AppInsights();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Application Insights'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.AppInsights());
  }

  addLogAnalytics = (dropContext) => {

    var model = new LogAnalytics();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Log Analytics Workspace'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.LogAnalytics());
  }

  addAutomation = (dropContext) => {

    var model = new Automation();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Automation'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.Automation());
  }

  addAAD = (dropContext) => {

    this.graph.insertVertex
      (this.graph.parent, '', 'Azure AD', dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.AAD());
  }

  addAADB2C = (dropContext) => {

    var model = new AADB2C();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Azure B2C'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.AADB2C());
  }

  addIoTHub = (dropContext) => {

    var model = new IoTHub();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'IoT Hub'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.IoTHub());
  }

  addIoTCentral = (dropContext) => {

    var model = new IoTCentral();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'IoT Central Application'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.IoTCentral());
  }


  addAzureMaps = (dropContext) => {

    var model = new Maps();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Azure Maps'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.AzureMaps());
  }

  addTimeSeriesInsights = (dropContext) => {

    var model = new TimeSeriesInsights();
    model.GraphModel.Id = this.shortUID.randomUUID(6);
    model.GraphModel.DisplayName = 'Time Series Insights'
    var modelJsonString = JSON.stringify(model);

    this.graph.insertVertex
      (this.graph.parent, model.GraphModel.IconId,modelJsonString, dropContext.x, dropContext.y, 35, 35,
      "verticalLabelPosition=bottom;verticalAlign=top;fontColor=black;editable=0;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
        this.azureIcons.TimeSeriesInsights());
  }  


  //callbacks from Ref components
  fromVMPropPanelSaveModel(vmModel) {
      var vmCell = this.graph.getModel().getCell(vmModel.GraphModel.Id);
      vmCell.value.ProvisionContext = vmModel.ProvisionContext; 
  }

  loadQuickstartDiagram(category, name) {
      var thisComp = this;
      this.diagService.loadQuickstartDiagram
        (category, name,
          function onSuccess(qsDiagContext) {
            thisComp.importXmlAsDiagram(qsDiagContext);
          },
          function onFailure(error) {
              Toast.show('danger', 3000, error);
          }
        )
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

    this.setState({unsavedChanges: false});

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

  loadSharedDiagram = () => {
      if(Utils.IsNullOrUndefine(this.state.queryString)) //querystring is object contains path and querystring
        return;

      var parsedQS =  queryString.parse(this.state.queryString.search)
      var anonyDiagramId = parsedQS.id

      if(Utils.IsNullOrUndefine(anonyDiagramId))
      return;
      
      this.graph.removeCells(this.graph.getChildVertices(this.graph.getDefaultParent()));

      var thisComp = this;

      this.diagramService.loadAnonymousDiagram(parsedQS.id)
        .then(function (response) {
            var adc = new AnonymousDiagramContext();
            adc.UID = response.data.UID;
            adc.DiagramName = response.data.DiagramName;
            adc.DiagramXml = response.data.DiagramXml;
            adc.SharedLink = response.data.SharedLink;
            thisComp.importXmlAsDiagram(adc);

            Toaster.create({
              position: Position.TOP,
              autoFocus: false,
              canEscapeKeyClear: true
            }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.ShareLinkLoadedSuccess()});
            return;
        })
        .catch(function (error) {
          console.log(error);
          Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.ShareLinkLoadedError()});
          return;
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
      window['mxGraphSelectionModel'] = mxGraphSelectionModel;
      window['mxGraphModel'] = mxGraphModel;
      window['mxChildChange'] = mxChildChange;
      window['mxChildChangeCodec'] = mxChildChangeCodec;
      window['mxCellCodec'] = mxCellCodec;
      window['mxUtils'] = mxUtils;

      var doc = mxUtils.parseXml(anonymousDiagramContext.DiagramXml);
      
      var codec = new mxCodec(doc);
      
      codec.decode(doc.documentElement, this.graph.getModel());

      //re-add cell overlays
      var cells =
        this.graph.getChildVertices(this.graph.getDefaultParent());
      
        if(cells != undefined)
        {
            cells.map(cell => {
              
              var result = Utils.TryParseUserObject(cell.value);

              if(result.isUserObject &&
                 JSON.parse(cell.value).GraphModel.ResourceType == 'vnet')
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

                    // var nsgOverlay = new mxCellOverlay(
                    //   new mxImage(require('../../assets/azure_icons/Networking Service Color/Network Security Groups (Classic).svg'),20, 20),
                    //   null,  mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP
                    // );
            
                    var subnetLogoOverlay = new mxCellOverlay(
                      new mxImage(require('../../assets/azure_icons/Networking Service Color/Subnet.svg'),15, 15),
                      'Subnet',  mxConstants.ALIGN_Right, mxConstants.ALIGN_TOP
                    );
    
                    //this.graph.addCellOverlay(subnet, nsgOverlay);
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
        }).show({intent: Intent.WARNING, timeout: 3000, message: Messages.NoCellOnGraph()});
        return;
      }

    this.Index.showProgress(true, 'Generating Share link...');

    var thisComp = this;
    var anonyDiagramContext = new AnonymousDiagramContext();
    anonyDiagramContext.DiagramName = this.shortUID.randomUUID(6);
    anonyDiagramContext.DiagramXml = this.getDiagramAsXml();
    anonyDiagramContext.DateTimeSaved = new Date();

    var shareLink = this.diagramService
      .saveAnonymousDiagram(anonyDiagramContext,
        function (shareLink){

          thisComp.Index.showProgress(false);
          thisComp.setState({shareLink: shareLink, showShareDiagramPopup: true});
        },
        function(error){
          thisComp.Index.showProgress(false);
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

    var thisComp = this;

    this.diagramService.saveDiagramToWorkspace(diagramContext,
      function onSuccess() {

        thisComp.Index.showProgress(false);
        thisComp.setState({unsavedChanges: false});

        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.SavedSuccessfully()});
        return;
      },
      function onError(error) {
        thisComp.Index.showProgress(false);
        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.DANGER, timeout: 2000, message: error});
        return;
      });
  }

  exportAsSvg(){
    if(!this.graphManager.isCellExist())
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.NoCellOnGraph()});
      return;
    }

    this.Index.showProgress(true, 'Generating SVG...');

    var svg = this.getDiagramSvg();
   
    // get svg data
    var svgXmlString = new XMLSerializer().serializeToString(svg);

    const blob = new Blob([svgXmlString], {type: 'image/svg+xml'});

    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'diagram.svg');
    document.body.appendChild(link);
    link.click();

    this.Index.showProgress(false);
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

    this.Index.showProgress(true, 'Generating PDF...');

    this.graph.getSelectionModel().clear();

    var svg = this.getDiagramSvg();
   
    // get svg data
    var svgXmlString = new XMLSerializer().serializeToString(svg);
    var svgXmlBase64 = window.btoa(svgXmlString);

    var thisComp = this;
    this.diagramService.exportDiagramAsPNG(svgXmlBase64,
      function onSuccess(pdfByteArray)
      {
        thisComp.Index.showProgress(false);

        const url = window.URL.createObjectURL(new Blob([pdfByteArray]));
          const link = document.createElement('a');
          link.href = url;
          link.target = "iframePdfViewer"; //name of iframe
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
        thisComp.Index.showProgress(false);
        console.log(error);
      });
  }

  getDiagramSvg(){
    return document.getElementById('diagramEditor').lastChild;
  }

  deployDiagramToAzure = (subscription) => {

      var cells = this.graph.getChildVertices(this.graph.getDefaultParent());

      if(Utils.IsNullOrUndefine(cells))
      {
        Toast.show(Intent.WARNING, 2000, Messages.NoCellOnGraph());
        return;
      }

      var contexts = this.provisionHelper.ExtractProvisionContexts(this.graph);

      if(Utils.IsNullOrUndefine(contexts))
      {
        Toast.show(Intent.WARNING, 2000, Messages.NoResourceToProvision());
        return;
      }

      this.provisionService.provisionDiagram(subscription.SubscriptionId, contexts,
        function onSuccess() {
          //Toast.show("success", 2000, 'Diagram successfully deployed');
        },
        function onFailure(error) {
          //Toast.show("danger", 6000, error);
        }
      );

     

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

  showPreviewDiagramOverlay = () => {
    mxUtils.show(this.graph, null);
  }

  clearGraph() {
    this.graph.removeCells(this.graph.getChildCells(this.graph.getDefaultParent(), true, true))
    this.graph.getModel().clear();
  }

  closeShareDiagramPopup = () => this.setState({ showShareDiagramPopup: false, useTallContent: false });
}