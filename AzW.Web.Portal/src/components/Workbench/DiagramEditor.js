
import React, { Component } from "reactn";
import MySpace from './MySpace';
import OverlaySaveToWorkspace from './OverlaySaveToWorkspace';
import {InputGroup, Classes, Button, Intent, Overlay, Toaster, Position} from "@blueprintjs/core";

//gojs
import * as go from 'gojs';
import { PanningTool } from 'gojs';
import './GojsExtensions/Figures';
import * as LocalStorageCommandHandler from './GojsExtensions/LocalStorageCommandHandler';

import GoNodeType from './Helpers/GoNodeType';

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
import Cognitive from "../../models/Cognitive";
import BotsService from "../../models/BotsService";
import Genomics from "../../models/Genomics";
import MLServiceWorkspace from "../../models/MLServiceWorkspace";
import SubnetsCidrs from "../../models/services/SubnetsCidrs";
import PrivateEndpoint from "../../models/PrivateEndpoint";
import NatGateway from "../../models/NatGateway";
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
import EventHub from "../../models/EventHub";
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
import RouteTablePropPanel from './PropPanel/RouteTablePropPanel';
import CognitivePropPanel from './PropPanel/CognitivePropPanel';
import BotsServicePropPanel from './PropPanel/BotsServicePropPanel';
import GenomicsPropPanel from './PropPanel/GenomicsPropPanel';
import MLServiceWorkspacePropPanel from './PropPanel/MLServiceWorkspacePropPanel';
import NatGatewayPropPanel from './PropPanel/NatGatewayPropPanel';
import PrivateEndpointPropPanel from './PropPanel/PrivateEndpointPropPanel';
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

import GojsManager from "./Helpers/GojsManager";
import Function from "../../models/Function";
import IPCIDR  from 'ip-cidr';
import GuidedDraggingTool from  "./GojsExtensions/GuidedDraggingTool.ts";

 export default class DiagramEditor extends Component {
 
  constructor(props) {
    super(props);

    this.$ = go.GraphObject.make;

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

        queryString: this.props.queryString,
        incrementalChanges: ''
    };

    this.Index = this.props.Index; //Index component contains progress Comp

    this.armsvc = new ARMService();
    this.comsvc = new ComputeService();
    this.diagService = new DiagramService();

    this.diagram = null;
    this.generalContextmenu = null;
  }

  componentDidMount() {

    this.pasteImageFromBrowserClipboard();
    this.initDiagramCanvas();

    this.gojsManager = new GojsManager(this.diagram, this);

    this.gojsManager.overrideResizeToNotMoveChildInGroup();
    this.gojsManager.overridePasteSelectionHandleVNetSubnetPasteInGroup();

    //services
    this.diagramService = new DiagramService();
    this.provisionService = new ProvisionService();
    this.provisionHelper = new ProvisionHelper();

    // this.addDblClickEventToOpenPropPanel();
    // this.addDeleteKeyEventToDeleteVertex();
    // this.addContextMenu();
    // this.addCtrlZEventToUndo();
    // this.addCtrlAEventSelectAll();
    // this.addCtrlCCtrlVCopyPasteVertices();
    // this.addUpDownLeftRightArrowToMoveCells();
    // this.addDropPNGAZWBFileHandler();
    
    this.addKeyPressShortcuts();
    this.PromptSaveBeforeCloseBrowser();

    this.initRef();

    this.loadSharedDiagram();
  }

  render() {
    return (
      <div id="diagramEditor" className="diagramEditor">
        <CognitivePropPanel ref={this.cognitivePropPanel} />
        <BotsServicePropPanel ref={this.botsPropPanel} />
        <GenomicsPropPanel ref={this.genomicsPropPanel} />
        <MLServiceWorkspacePropPanel ref={this.mlsvcworkspacePropPanel} /> 

        <NatGatewayPropPanel ref={this.natgwPropPanel} />
        <RouteTablePropPanel ref={this.rtPropPanel} />
        <PrivateEndpointPropPanel ref={this.privateendpointPropPanel} />
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
            <Button style={{marginTop: '10px', float: 'right'}} className="bp3-button bp3-intent-primary" onClick={this.copySharedLink}>Copy</Button>
          </div>
        </Overlay>
      </div>
    );
  }

  getDiagram() {
    return this.diagram;
  }

  initRef() {
    this.cognitivePropPanel = React.createRef();
    this.botsPropPanel = React.createRef();
    this.genomicsPropPanel = React.createRef();
    this.mlsvcworkspacePropPanel = React.createRef();
    this.natgwPropPanel = React.createRef();
    this.rtPropPanel = React.createRef();
    this.privateendpointPropPanel = React.createRef();
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
  
  initDiagramCanvas = (model) => {
    var thisComp = this;
    var GroupMargin = new go.Margin(3);

    this.diagram =
      this.$(go.Diagram, 'diagramEditor', 
      {
          initialContentAlignment: go.Spot.Center,
          initialAutoScale: go.Diagram.Uniform,
          "undoManager.isEnabled": true,
          'animationManager.isEnabled': false,  // turn off automatic animations

          //commandHandler: new LocalStorageCommandHandler(),

          // "resizingTool.computeMinSize": function() {
          //   var group = this.adornedObject.part;
          //   var membnds = group.diagram.computePartsBounds(group.memberParts);
          //   membnds.addMargin(GroupMargin);
          //   membnds.unionPoint(group.location);
          //   return membnds.size;
          // },
          autoScrollRegion: new go.Margin(2, 2, 2, 2),
          allowHorizontalScroll: true,
          allowVerticalScroll : true,

          draggingTool: new GuidedDraggingTool(), 
          "draggingTool.horizontalGuidelineColor": "blue",
          "draggingTool.verticalGuidelineColor": "blue",
          "draggingTool.centerGuidelineColor": "green",
          "draggingTool.guidelineWidth": 1,

          // allow Ctrl-G to call groupSelection
          "commandHandler.archetypeGroupData": { text: "Group", isGroup: true, color: "blue" },
          
          isReadOnly: false,
          allowZoom: true,
          allowSelect: true,
          allowCopy: true,
          allowDelete: true,
          allowInsert: true,
          allowGroup: true,
          allowUngroup: true,
          allowClipboard: true,
          
          "draggingTool.dragsLink": true,
          "linkingTool.isUnconnectedLinkValid": true,
          "relinkingTool.isUnconnectedLinkValid": true,
          
          // "draggingTool.isGridSnapEnabled": false,

          // "InitialLayoutCompleted": function(e) {
          //   // if not all Nodes have real locations, force a layout to happen
          //   if (!e.diagram.nodes.all(function(n) { return n.location.isReal(); })) {
          //     e.diagram.layoutDiagram(true);
          //   }
          // }//,
          // "ModelChanged": function(e) {
          //   if (e.isTransactionFinished) {
          //     //thisComp.setState({incrementalChanges: thisComp.diagram.model.toIncrementalJson(e)});
          //     // this records each Transaction as a JSON-format string
          //     //thisComp.saveDiagramToBrowser(thisComp.diagram.model.toIncrementalJson(e));
          //   }
          // },
      });
    this.diagram.layout.isInitial = false;

    //drag scroll
//https://forum.nwoods.com/t/highlight-the-autoscrollregion-to-aware-user-to-scroll-diagram-while-dragging/11162/2

    this.diagram.scrollMode = go.Diagram.InfiniteScroll;
    
    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
    this.diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
    this.diagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

    this.initDiagramBehaviors();

    var model =
      new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray);

    //!important, without these 2 properties, when load saved diagram, links won't be connected to parts
    model.linkFromPortIdProperty = "fromPort";
    model.linkToPortIdProperty = "toPort";

    this.diagram.model = model;
}

initDiagramBehaviors() {

  this.initTemplates();

  this.initPanningwithRightMouseClick();

  this.initDiagramModifiedEvent();

  this.generalContextmenu = this.initContextMenu();
  this.diagram.contextMenu = this.generalContextmenu;
}

initPanningwithRightMouseClick() {
  PanningTool.prototype.canStart = function() {
    if (!this.isEnabled) return false;
    var diagram = this.diagram;
    if (diagram === null) return false;
    if (!diagram.allowHorizontalScroll && !diagram.allowVerticalScroll) return false;
    // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
    if (!diagram.lastInput.right) return false;
    // don't include the following check when this tool is running modally
    if (diagram.currentTool !== this) {
      // mouse needs to have moved from the mouse-down point
      if (!this.isBeyondDragSize()) return false;
    }
    return true;
  };
}

initTemplates() {
  var nodeTemplateMap = new go.Map();
  var linkTemplateMap = new go.Map();
  var groupTemplateMap = new go.Map();

  nodeTemplateMap.add('shape', this.createShapeTemplate());
  nodeTemplateMap.add('text', this.createTextTemplate());
  nodeTemplateMap.add('picshape', this.createPictureShapeTemplate());
  nodeTemplateMap.add('outofvnetazureresource', this.createNonVIRAzureResourceTemplate());
  nodeTemplateMap.add('virresource', this.createVIRAzureResourceTemplate());

  groupTemplateMap.add('', this.createGroupTemplate());
  groupTemplateMap.add('vnet', this.createVNetTemplate());
  groupTemplateMap.add('subnet', this.createSubnetTemplate());
  
  this.initLinkTemplate(linkTemplateMap);

  this.diagram.nodeTemplateMap = nodeTemplateMap;
  this.diagram.linkTemplateMap = linkTemplateMap;
  this.diagram.groupTemplateMap = groupTemplateMap;
}

createTextTemplate() {
    //textblock
    var textTemplate =
      this.$(go.Node, "Auto",
        {
          selectionObjectName: "TEXT",
          movable: true,
          selectable: true,
          resizable: false,
          rotatable: true,
          selectionChanged: function(p) {
            p.layerName = (p.isSelected ? "Foreground" : '');
          },
          contextMenu: this.initContextMenu()
        },
        new go.Binding("nodetype"),
        new go.Binding("location", "loc", go.Point.parse),
        this.$(go.TextBlock,
          { 
            name: "TEXT",
            editable: true,
            isMultiline: true,
            font: 'Segoe UI',
            stroke: 'black',
            textAlign: 'center'
            //desiredSize: new go.Size(50,50)
          },
          new go.Binding('stroke', 'stroke').makeTwoWay(),
          new go.Binding('font', 'font').makeTwoWay(),
          new go.Binding("text").makeTwoWay()
        )
    );

    return textTemplate;
}

createPictureShapeTemplate() {

  var template =   

  this.$(go.Node, "Spot",
    { 
      locationSpot: go.Spot.Center
    },
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding("zOrder").makeTwoWay(),
    { 
      selectable: true,
      resizable: true, 
      resizeObjectName: "PANEL",
      selectionObjectName: "PANEL",
      selectionChanged: function(p) {
        p.layerName = (p.isSelected ? "Foreground" : '');
      },
      contextMenu: this.initContextMenu()
    },
    // the main object is a Panel that contains a Picture
    this.$(go.Panel, "Vertical",
        //new go.Binding("desiredSize", "size", go.Size.parse), //follows panel resize below
        this.$(go.Panel, "Table",
          { 
            name: "PANEL", 
          },
          //bind 2 ways to update model so that shape above can resize according
          //to panel size
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
          this.$(go.Picture,
            {
              stretch: go.GraphObject.Fill
            },
            {row:0,column:0},
            new go.Binding("source","source")
          )
        ),//panel
        this.$(go.TextBlock,
          {
            editable:true,
            isMultiline: true
          },
          {row:1,column:0},
          new go.Binding("text").makeTwoWay(),
          new go.Binding("font").makeTwoWay(),
          new go.Binding("stroke").makeTwoWay())
        ),
        this.makePort("T", go.Spot.Top, go.Spot.TopSide, true, true),
        this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
        this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
        this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true)
    );

  return template;
}

createNonVIRAzureResourceTemplate() {
  var thisComp = this;
    var template =   
    this.$(go.Node, "Spot",
      { 
        locationSpot: go.Spot.Center,
        selectable: true,
        resizable: true, 
        resizeObjectName: "PANEL",
        selectionObjectName: "PANEL",
        selectionChanged: function(p) {
          p.layerName = (p.isSelected ? "Foreground" : '');
        },
        contextMenu: this.initContextMenu(),
        doubleClick: function(e, node) {
          var azcontext = node.data.azcontext;
          thisComp.determineResourcePropertyPanelToShow
            (azcontext, function onContextSaveCallback(savedContext){
                node.data.azcontext = savedContext;
            });
        }
      },
      new go.Binding("azcontext", "azcontext").makeTwoWay(),
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding("zOrder").makeTwoWay(),
      this.$(go.Panel, "Vertical",
          //new go.Binding("desiredSize", "size", go.Size.parse), //follows panel resize below
          this.$(go.Panel, "Table",
            { 
              name: "PANEL", 
            },
            //bind 2 ways to update model so that shape above can resize according
            //to panel size
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            this.$(go.Picture,
              {
                stretch: go.GraphObject.Fill
              },
              {row:0,column:0},
              new go.Binding("source","source")
            )
          ),//panel
          this.$(go.TextBlock,
            {
              editable:true,
              isMultiline: true
            },
            {row:1,column:0},
            new go.Binding("text").makeTwoWay(),
            new go.Binding("font").makeTwoWay(),
            new go.Binding("stroke").makeTwoWay()
            ),
          ),
          this.makePort("T", go.Spot.Top, go.Spot.TopSide, true, true),
          this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
          this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
          this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true)
      );

  return template;
}

createShapeTemplate() {

  var thisComp = this;

  var shapeTemplate = this.$(go.Node, "Auto",
      {
        movable: true,
        selectable: true,
        resizable: true,
        resizeObjectName: "SHAPE",
        selectionObjectName: "SHAPE",
        rotatable: true,
        selectionChanged: function(p) {
          p.layerName = (p.isSelected ? "Foreground" : '');
        },
        contextMenu: this.initContextMenu()
      },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding("zOrder").makeTwoWay(),
      this.$(go.Shape,
        {
          name: 'SHAPE',
          strokeWidth: 2,
          desiredSize: new go.Size(100, 100)
        },
        new go.Binding("figure", "figure"),
        new go.Binding("strokeDashArray", "strokeDashArray").makeTwoWay(),
        new go.Binding("fill").makeTwoWay(),
        new go.Binding("stroke").makeTwoWay()
      ),
      this.$(go.TextBlock,
        { 
          editable: true,
          isMultiline: true 
        },
        new go.Binding("text").makeTwoWay(),
        new go.Binding("stroke", "textStroke").makeTwoWay(),
        new go.Binding("font").makeTwoWay()),

        this.makePort("T", go.Spot.Top, go.Spot.TopSide, true, true),
        this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
        this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
        this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true)
      );
    
    return shapeTemplate;
}

makePort(name, align, spot, output, input, figure) {
  var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
  // the port is basically just a transparent rectangle that stretches along the side of the node,
  // and becomes colored when the mouse passes over it
  return this.$(go.Shape,
    {
      fill: "transparent",  // changed to a color in the mouseEnter event handler
      strokeWidth: 0,  // no stroke
      width: horizontal ? NaN : 8,  // if not stretching horizontally, just 8 wide
      height: !horizontal ? NaN : 8,  // if not stretching vertically, just 8 tall
      alignment: align,  // align the port on the main Shape
      stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
      portId: name,  // declare this object to be a "port"
      fromSpot: spot,  // declare where links may connect at this port
      fromLinkable: output,  // declare whether the user may draw links from here
      fromLinkableDuplicates: true,
      toLinkableDuplicates: true,
      toSpot: spot,  // declare where links may connect at this port
      toLinkable: input,  // declare whether the user may draw links to here
      cursor: "pointer",  // show a different cursor to indicate potential link point
      mouseEnter: function(e, port) {  // the PORT argument will be this Shape
        if (!e.diagram.isReadOnly) port.fill = "#d3d3d3"; //"rgba(255,0,255,0.5)";
      },
      mouseLeave: function(e, port) {
        port.fill = "transparent";
      }
    });
}

initLinkTemplate(linkTemplateMap) {
  
  //link overview
  //https://gojs.net/latest/intro/links.html
  
    var straightLink =
        this.$(go.Link,  // the whole link panel
            { 
              routing: go.Link.AvoidsNodes,
              curve: go.Link.JumpOver,
              corner: 5, toShortLength: 4,
              relinkableFrom: true,
              relinkableTo: true,
              reshapable: true,
              resegmentable: false,
              selectionChanged: function(p) {
                p.layerName = (p.isSelected ? "Foreground" : '');
              },
              selectionAdorned: false,
              contextMenu: this.initContextMenu()
            },
            {
              routing: go.Link.Normal
            },
            new go.Binding("points").makeTwoWay(),
            new go.Binding("zOrder").makeTwoWay(),
            this.$(go.Shape,  // the highlight shape, normally transparent
              { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" },
              new go.Binding("stroke").makeTwoWay(),
              new go.Binding("strokeDashArray", "strokeDashArray").makeTwoWay(),
              new go.Binding("strokeWidth").makeTwoWay(),
              new go.Binding("stroke").makeTwoWay(),
            ),
            // this.$(go.Shape,  // the link path shape
            //   { isPanelMain: true, stroke: "gray", strokeWidth: 2 },
            //   new go.Binding("stroke", "isSelected", function(sel) { return sel ? "dodgerblue" : "gray"; }).ofObject()),
            // this.$(go.Shape,  // the arrowhead
            //   { toArrow: "standard", strokeWidth: 0, fill: "gray" }),
            // this.$(go.Panel, "Auto",  // the link label, normally not visible
            //   { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
            // this.$(go.Shape, "RoundedRectangle",  // the label shape
            //     { fill: "#F8F8F8", strokeWidth: 0 }),
            // this.$(go.TextBlock, "Yes",  // the label
            //     {
            //       textAlign: "center",
            //       font: "10pt helvetica, arial, sans-serif",
            //       stroke: "#333333",
            //       editable: true
            //     },
            //     new go.Binding("text").makeTwoWay()),
          //)
          this.$(go.Shape,
            new go.Binding("fromArrow", "fromArrow")),
          this.$(go.Shape,
                  new go.Binding("toArrow", "toArrow"))
      );

   var bezierLink =
      this.$(go.Link,
          { 
            
            corner: 9,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            selectionChanged: function(p) {
              p.layerName = (p.isSelected ? "Foreground" : '');
            },
            selectionAdorned: false,
            contextMenu: this.initContextMenu()
          },
          {
            adjusting: go.Link.Stretch,
            curve: go.Link.Bezier,
          },
          new go.Binding("points").makeTwoWay(),
          this.$(go.Shape,  // the highlight shape, normally transparent
            { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" },
            new go.Binding("stroke").makeTwoWay(),
            new go.Binding("strokeDashArray", "strokeDashArray").makeTwoWay(),
            new go.Binding("strokeWidth").makeTwoWay(),
            new go.Binding("stroke").makeTwoWay(),
          ),
          // this.$(go.Shape,  // the link path shape
          //   { isPanelMain: true, stroke: "gray", strokeWidth: 2 },
          //   new go.Binding("stroke", "isSelected", function(sel) { return sel ? "dodgerblue" : "gray"; }).ofObject()),
          // this.$(go.Shape,  // the arrowhead
          //   { toArrow: "standard", strokeWidth: 0, fill: "gray" }),
          // this.$(go.Panel, "Auto",  // the link label, normally not visible
          //   { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 }
          // ),

        new go.Binding("strokeWidth").makeTwoWay(),
        new go.Binding("stroke").makeTwoWay(),
        this.$(go.Shape,
              new go.Binding("fromArrow", "fromArrow")),
        this.$(go.Shape,
                new go.Binding("toArrow", "toArrow"))
    );

    var orthogonalLink =
        this.$(go.Link,  // the whole link panel
          {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5, toShortLength: 4,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            selectionChanged: function(p) {
              p.layerName = (p.isSelected ? "Foreground" : '');
            },
            selectionAdorned: false,
            contextMenu: this.initContextMenu()
          },
          new go.Binding("points").makeTwoWay(),
          this.$(go.Shape,  // the highlight shape, normally transparent
            { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" },
            new go.Binding("stroke").makeTwoWay(),
            new go.Binding("strokeDashArray", "strokeDashArray").makeTwoWay(),
            new go.Binding("strokeWidth").makeTwoWay(),
            new go.Binding("stroke").makeTwoWay(),
          ),
          // this.$(go.Shape,  // the link path shape
          //   { isPanelMain: true, stroke: "gray", strokeWidth: 2 },
          //   new go.Binding("stroke", "isSelected", function(sel) { return sel ? "dodgerblue" : "gray"; }).ofObject()),
          // this.$(go.Shape,  // the arrowhead
          //   { toArrow: "standard", strokeWidth: 0, fill: "gray" }),
          // this.$(go.Panel, "Auto",  // the link label, normally not visible
          //   { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
          //   new go.Binding("strokeWidth").makeTwoWay(),
          //   new go.Binding("stroke").makeTwoWay(),
          //   this.$(go.Shape,
          //         new go.Binding("fromArrow", "fromArrow")),
          //   this.$(go.Shape,
          //           new go.Binding("toArrow", "toArrow"))
          // )
          this.$(go.Shape,
                new go.Binding("fromArrow", "fromArrow")),
          this.$(go.Shape,
                  new go.Binding("toArrow", "toArrow"))
        );

    linkTemplateMap.add('straight', straightLink);
    linkTemplateMap.add('bezier', bezierLink);
    linkTemplateMap.add('ortho', orthogonalLink);
}

createGroupTemplate() {
  
    var groupTemplate =
      this.$(go.Group, "Auto",
      {
        selectionObjectName: "PANEL",  // selection handle goes around shape, not label
        ungroupable: true,  // enable Ctrl-Shift-G to ungroup a selected Group
        contextMenu: this.initContextMenu()
      },
        this.$(go.Panel, "Auto",
        { name: "PANEL" },
        this.$(go.Shape, "Rectangle",  // the rectangular shape around the members
          {
            fill: "transparent", stroke: "transparent", strokeWidth: 0,
            portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
            // allow all kinds of links from and to this port
            fromLinkable: false, fromLinkableSelfNode: false, fromLinkableDuplicates: false,
            toLinkable: false, toLinkableSelfNode: false, toLinkableDuplicates: false
          }),
        this.$(go.Placeholder, { margin: 10, background: "transparent" })  // represents where the members are
      )
    );

    return groupTemplate;
}

initDiagramModifiedEvent() {
  var thisComp = this;
  this.diagram.addDiagramListener("Modified",
    function(e) {

      if(e.diagram.nodes.count == 0) {
        thisComp.setState({unsavedChanges: false}, () => {
          thisComp.setBadgeVisibilityOnUnsaveChanges()});
        return
      }
      
      if(thisComp.diagram.isModified) {
        if(thisComp.state.unsavedChanges)
          return;

        thisComp.setState({unsavedChanges: true}, () => {
          thisComp.setBadgeVisibilityOnUnsaveChanges()});
      }
    });

    this.diagram.addModelChangedListener(
    function(e) {

        // modelChanges include a few cases that we don't actually care about, such as
        // "nodeCategory" or "linkToPortId", but we'll go ahead and recreate the network anyway.
        // Also clear the network when replacing the model.
        if (e.modelChange !== "" ||
            (e.change === go.ChangedEvent.Transaction && e.propertyName === "StartingFirstTransaction")) {
              thisComp.diagram.layout.network = null;
        }

      if(e.isTransactionFinished) {
          if(thisComp.diagram.nodes.count == 0) {
            thisComp.setState({unsavedChanges: false}, () => {
              thisComp.setBadgeVisibilityOnUnsaveChanges()});
          }
          else {
            if(thisComp.state.unsavedChanges)
              return;

            thisComp.setState({unsavedChanges: true}, () => {
              thisComp.setBadgeVisibilityOnUnsaveChanges()});
          }
            
      }
    });
}

initContextMenu() {

  var thisComp = this;

  return this.$("ContextMenu",
      this.$("ContextMenuButton",
        this.$(go.TextBlock, "Add Subnet"),
            { 
              click: function(e, obj) {
                thisComp.createSubnet(obj.part.data.key);
              } 
            },
            new go.Binding("visible", "", function(o) {
                return Utils.isVNet(o.diagram.selection.first());
            }).ofObject()),

        this.$("ContextMenuButton",
          this.$(go.TextBlock, "Add/Remove NSG"),
              { 
                click: function(e, obj) {
                  if(Utils.isNSG(obj.part)) {
                      if(obj.part.data.nsgVisible == false)
                        thisComp.diagram.model.setDataProperty(obj.part.data, 'nsgVisible', true);
                      else
                        thisComp.diagram.model.setDataProperty(obj.part.data, 'nsgVisible', false);
                  }
                } 
              },
              new go.Binding("visible", "", function(o) {
                  return Utils.isSubnet(o.diagram.selection.first());
              }).ofObject()
        ),

        this.$("ContextMenuButton",
          this.$(go.TextBlock, "Add/Remove UDR"),
              { 
                click: function(e, obj) {
                  if(Utils.isUDR(obj.part)) {
                      if(obj.part.data.udrVisible == false)
                        thisComp.diagram.model.setDataProperty(obj.part.data, 'udrVisible', true);
                      else
                        thisComp.diagram.model.setDataProperty(obj.part.data, 'udrVisible', false);
                  }
                } 
              },
              new go.Binding("visible", "", function(o) {
                  return Utils.isSubnet(o.diagram.selection.first());
              }).ofObject()
          ),
        
        this.$("ContextMenuButton",
          this.$(go.TextBlock, "Add/Remove NAT Gateway"),
              { 
                click: function(e, obj) {
                  if(Utils.isNATGW(obj.part)) {
                      if(obj.part.data.natgwVisible == false)
                        thisComp.diagram.model.setDataProperty(obj.part.data, 'natgwVisible', true);
                      else
                        thisComp.diagram.model.setDataProperty(obj.part.data, 'natgwVisible', false);
                  }
                } 
              },
              new go.Binding("visible", "", function(o) {
                  return Utils.isVNet(o.diagram.selection.first());
              }).ofObject()
          ),

        this.$("ContextMenuButton",
          this.$(go.TextBlock, "Undo"),
              { click: function(e, obj) { e.diagram.commandHandler.undo(); } },
              new go.Binding("visible", "", function(o) {
                  return o.diagram.commandHandler.canUndo();
              }).ofObject()),

        this.$("ContextMenuButton",
          this.$(go.TextBlock, "Redo"),
              { click: function(e, obj) { e.diagram.commandHandler.redo(); } },
              new go.Binding("visible", "", function(o) {
                return o.diagram.commandHandler.canRedo();
              }).ofObject()),

        this.$("ContextMenuButton",
          this.$(go.TextBlock, "Group"),
                { 
                  click: function(e, obj) 
                  { 
                    e.diagram.commandHandler.groupSelection(); 
                } },
                new go.Binding("visible", "", 
                  function(o) {
                    return o.diagram.commandHandler.canGroupSelection();
                  }).ofObject()),

        this.$("ContextMenuButton",
          this.$(go.TextBlock, "Ungroup"),
                  { 
                    click: function(e, obj) 
                    { 
                      e.diagram.commandHandler.ungroupSelection(); 
                  } },
                  new go.Binding("visible", "", 
                    function(o) {
                      return o.diagram.commandHandler.canUngroupSelection();
                    }).ofObject()),

        this.$("ContextMenuButton",
          this.$(go.TextBlock, "Bring to Front"),
              { 
                click: function(e, obj) 
                { 
                  var nodes = e.diagram.selection;
                  var it = nodes.iterator;
                  while (it.next()) {
                      if(isNaN(it.value.zOrder))
                          it.value.zOrder = 10;
                      else 
                          it.value.zOrder += 10;
                  }
                }
              }),

          this.$("ContextMenuButton",
              this.$(go.TextBlock, "Style"),
                  { 
                    click: function(e, obj) 
                    { 
                      var node = e.diagram.selection.first();
                      thisComp.openStylePanel(node);
                    }
                  },
                  new go.Binding("visible", "", 
                    function(o) {
                      return o.diagram.selection.first() != null;
                    }).ofObject()
                )
    );
}

createVNetTemplate() {
  var thisComp = this;
  var groupTemplate =
  this.$(go.Group, "Spot",
  {
    resizable: true,
    resizeObjectName: "VNET",
    selectionObjectName: "VNET",
    locationObjectName: "VNET",
    ungroupable: false,
    contextMenu: this. initContextMenu(),
    doubleClick: function(e, vnet) {
    
        var result =  thisComp.getSubnetsCidrsAzContextOfVNet(vnet);
        
        var azcontext = vnet.data.azcontext;
        
        azcontext.GraphModel.SubnetsAndCidrs = result.SubnetsCidrs;

      thisComp.determineResourcePropertyPanelToShow
        (azcontext, function onContextSaveCallback(savedContext){
          vnet.azcontext = savedContext;
        });
    }
  },
  new go.Binding("azcontext"),
  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  this.$(go.Shape, "RoundedRectangle",  // the rectangular shape around the members
      {
        name: "VNET",
        fill: "transparent", 
        stroke: "deepskyblue", 
        strokeWidth: 1.5,
        cursor: "pointer",
        desiredSize: new go.Size(600,500),
        // allow all kinds of links from and to this port
        fromLinkable: false, fromLinkableSelfNode: false, fromLinkableDuplicates: true,
        toLinkable: false, toLinkableSelfNode: false, toLinkableDuplicates: true
      },
      new go.Binding("desiredSize").makeTwoWay(),
      new go.Binding("figure",'figure').makeTwoWay(),
      new go.Binding("strokeDashArray", "strokeDashArray").makeTwoWay(),
      new go.Binding("fill").makeTwoWay(),
      new go.Binding("stroke").makeTwoWay()
      ),
  
    this.$(go.TextBlock,
        { 
          editable: true,
          isMultiline: false,
          alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.BottomLeft
        },
        new go.Binding("text").makeTwoWay(),
        new go.Binding("stroke", "textStroke").makeTwoWay(),
        new go.Binding("font").makeTwoWay()),
    this.$(go.Picture, {
          stretch: go.GraphObject.Fill,
          desiredSize: new go.Size(25,25),
          alignment: go.Spot.TopRight, alignmentFocus: go.Spot.BottomRight,
          source: require('../../assets/azure_icons/Networking Service Color/Virtual Networks.png')
        }),
        this.$(go.Picture, {
          stretch: go.GraphObject.Fill,
          desiredSize: new go.Size(30,30),
          alignment: new go.Spot(1, 0, -40, -12),
          source: require('../../assets/azure_icons/Networking Service Color/nat-gateway.png'),
          doubleClick: function(e, shape) {
            var azcontext = shape.natgwazcontext;
            thisComp.determineResourcePropertyPanelToShow
              (azcontext, function onContextSaveCallback(savedContext){
                shape.azcontext = savedContext;
              });
          }
        },
          new go.Binding('visible', 'natgwVisible').makeTwoWay(),
          new go.Binding('natgwazcontext').makeTwoWay()
        ),
    this.makePort("T", go.Spot.Top, go.Spot.TopSide, true, true),
    this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
    this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
    this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true)
  );

  return groupTemplate;
}

//https://gojs.net/latest/samples/regroupingTreeView.html
createSubnetTemplate() {
  var thisComp = this;
  var subnetTemplate =
    this.$(go.Group, "Spot",
    {
      resizable: true,
      resizeObjectName: "SUBNET",
      selectionObjectName: "SUBNET",
      locationObjectName: "SUBNET",
      contextMenu: this.initContextMenu(),
      dragComputation: this.makeSubnetVIRStayInGroup,
      doubleClick: function(e, subnet) {

        var vnet = subnet.containingGroup;

        var result =  thisComp.getSubnetsCidrsAzContextOfVNet(vnet);
        
        var azcontext = subnet.data.azcontext;
        
        azcontext.GraphModel.VNetAddressSpace = result.VNetAddressSpace;
        azcontext.GraphModel.SubnetsAndCidrs = result.SubnetsCidrs;

        thisComp.determineResourcePropertyPanelToShow
          (azcontext, function onContextSaveCallback(savedContext){
            subnet.azcontext = savedContext;
          });
      }
    },
    new go.Binding("azcontext", "azcontext"),
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    this.$(go.Shape,
      {
        name: 'SUBNET',
        strokeWidth: 1.5
      },
      new go.Binding("desiredSize").makeTwoWay(),
      new go.Binding("figure",'figure').makeTwoWay(),
      new go.Binding("strokeDashArray", "strokeDashArray").makeTwoWay(),
      new go.Binding("fill").makeTwoWay(),
      new go.Binding("stroke").makeTwoWay()
      ),
    this.$(go.TextBlock,
      { 
        editable: true,
        isMultiline: false,
        alignment: go.Spot.TopRight, alignmentFocus:go.Spot.BottomRight
      },
      new go.Binding("text").makeTwoWay(),
      new go.Binding("stroke", "textStroke").makeTwoWay(),
      new go.Binding("font").makeTwoWay()),
      this.$(go.Picture, {
        stretch: go.GraphObject.Fill,
        desiredSize: new go.Size(24,24),
        alignment: new go.Spot(0, 0, 6, 0),
        source: require('../../assets/azure_icons/Networking Service Color/Network Security Groups (Classic).png'),
        doubleClick: function(e, picture) {
          var azcontext = picture.nsgazcontext;
          thisComp.determineResourcePropertyPanelToShow
            (azcontext, function onContextSaveCallback(savedContext){
                picture.azcontext = savedContext;
            });
        }
      },
        new go.Binding('visible', 'nsgVisible').makeTwoWay(),
        new go.Binding('nsgazcontext').makeTwoWay()
      ),
      this.$(go.Picture, {
        stretch: go.GraphObject.Fill,
        desiredSize: new go.Size(25,25),
        alignment: new go.Spot(0, 0, 31, 0),
        source: require('../../assets/azure_icons/Networking Service Color/Route Tables.png'),
        doubleClick: function(e, picture) {
          var azcontext = picture.udrazcontext;
          thisComp.determineResourcePropertyPanelToShow
            (azcontext, function onContextSaveCallback(savedContext){
              picture.azcontext = savedContext;
            });
        }
      },
        new go.Binding('visible', 'udrVisible').makeTwoWay(),
        new go.Binding('udrazcontext').makeTwoWay()
      ),
      this.makePort("T", go.Spot.Top, go.Spot.TopSide, true, true),
      this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
      this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
      this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true)
    );

return subnetTemplate;
}

getSubnetsCidrsAzContextOfVNet(vnetGroup) {
  if(!Utils.isAzContextExist(vnetGroup))
      throw 'getSubnetsCidrsAzContextOfVNet - vnetGroup azcontext missing';

    var result = {
        VNetAddressSpace: vnetGroup.data.azcontext.ProvisionContext.AddressSpace,
        SubnetsCidrs: []
    };

    vnetGroup.memberParts.each((p) => {
      if(!Utils.isAzContextExist(p))
        throw 'getSubnetsCidrsAzContextOfVNet - subnet azcontext missing';

        var subnetAzContext = p.data.azcontext;

        result.SubnetsCidrs.push({
          subnetName: subnetAzContext.ProvisionContext.Name,
          cidr: subnetAzContext.ProvisionContext.AddressSpace,
          addressCount: Utils.getIPCountFromCidr(subnetAzContext.ProvisionContext.AddressSpace),
          usableAddress: Utils.getIPCountFromCidr(subnetAzContext.ProvisionContext.AddressSpace) - 5,
          lastIP: subnetAzContext.ProvisionContext.AddressSpace != ''
            ? new IPCIDR(subnetAzContext.ProvisionContext.AddressSpace).end()
            : ''
        });
    });

    return result;
}

makeSubnetVIRStayInGroup(part, pt, gridpt) {
  // don't constrain top-level nodes
  var grp = part.containingGroup;
  if (grp === null) return pt;
  // try to stay within the background Shape of the Group
  var back = grp.resizeObject;
  if (back === null) return pt;
  // allow dragging a Node out of a Group if the Shift key is down
  //if (part.diagram.lastInput.shift) return pt;
  var p1 = back.getDocumentPoint(go.Spot.TopLeft);
  var p2 = back.getDocumentPoint(go.Spot.BottomRight);
  var b = part.actualBounds;
  var loc = part.location ;
  // no placeholder -- just assume some Margin
  var m = new go.Margin(1);
  // now limit the location appropriately
  var x = Math.max(p1.x + m.left, Math.min(pt.x, p2.x - m.right - b.width - 1)) + (loc.x - b.x);
  var y = Math.max(p1.y + m.top, Math.min(pt.y, p2.y - m.bottom - b.height - 1)) + (loc.y - b.y);
  return new go.Point(x, y);
}

createVIRAzureResourceTemplate() {
  var thisComp = this;
    var template =   
    this.$(go.Node, "Spot",
      { 
        locationSpot: go.Spot.Center,
        selectable: true,
        resizable: true, 
        resizeObjectName: "PANEL",
        selectionObjectName: "PANEL",
        selectionChanged: function(p) {
          p.layerName = (p.isSelected ? "Foreground" : '');
        },
        contextMenu: this.initContextMenu(),
        doubleClick: function(e, node) {
          var azcontext = node.data.azcontext;
          thisComp.determineResourcePropertyPanelToShow
            (azcontext, function onContextSaveCallback(savedContext){
                node.data.azcontext = savedContext;
            });
        },
        dragComputation: this.makeSubnetVIRStayInGroup
      },
      new go.Binding("azcontext", "azcontext"),
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      this.$(go.Panel, "Vertical",
          //new go.Binding("desiredSize", "size", go.Size.parse), //follows panel resize below
          this.$(go.Panel, "Table",
            { 
              name: "PANEL", 
            },
            //bind 2 ways to update model so that shape above can resize according
            //to panel size
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            this.$(go.Picture,
              {
                stretch: go.GraphObject.Fill
              },
              {row:0,column:0},
              new go.Binding("source","source")
            )
          ),//panel
          this.$(go.TextBlock,
            {
              editable:true,
              isMultiline: true
            },
            {row:1,column:0},
            new go.Binding("text").makeTwoWay(),
            new go.Binding("font").makeTwoWay(),
            new go.Binding("stroke").makeTwoWay()
            ),
          ),
          this.makePort("T", go.Spot.Top, go.Spot.TopSide, true, true),
          this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
          this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
          this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true)
      );

  return template;
}


createShape(dropContext) {
  var figure = dropContext.figure;
  var label = dropContext.label;
  var canvasPoint = this.diagram.transformViewToDoc(new go.Point(dropContext.x, dropContext.y));
  var shapeKey = this.shortUID.randomUUID(6);

  this.diagram.model.addNodeData
    ({key: shapeKey,
      text: label,
      fill: 'white',
      stroke: 'black',
      textStroke: 'black',
      font: '14px Segoe UI',
      strokeDashArray: null,
      nodetype: GoNodeType.Shape(),
      figure: figure, 
      loc: go.Point.stringify(canvasPoint),
      category: 'shape'});
}

createVNet(dropContext) {
  var figure = dropContext.figure;
  var label = dropContext.label;
  var canvasPoint = this.diagram.transformViewToDoc(new go.Point(dropContext.x, dropContext.y));
  
  var vnetKey = 'vnet-' + this.shortUID.randomUUID(6);
  
  this.diagram.model.addNodeData
    ({key: vnetKey, text: 'vnet', 
      azcontext: new VNet(),
      natgwazcontext: new NatGateway(),
      natgwVisible: false,
      fill: 'transparent',
      stroke: 'deepskyblue',
      textStroke: 'black',
      font: '16px Segoe UI',
      strokeDashArray: null,
      nodetype: GoNodeType.Shape(),
      loc: go.Point.stringify(canvasPoint),
      isGroup: true,
      category: 'vnet'});
}

createSubnet(vnetKey, subnetNodekey = '') {

  var vnet = null;

  if(vnetKey != null) {
    vnet = this.diagram.findNodeForKey(vnetKey);
  }
  else {
    vnet = this.diagram.selection.first();
  }

  var subnetKey = subnetNodekey != '' ? subnetNodekey :  Utils.uniqueId('subnet');
  var subnetLoc = new go.Point(vnet.location.x + 10, vnet.location.y +20);
  var subnetSize = new go.Size((vnet.actualBounds.width - 40), 80);
  
  this.diagram.model.addNodeData
    ({key: subnetKey,
      azcontext: new Subnet(),
      nsgazcontext: new NSG(),
      udrazcontext: new RouteTable(),

      nsgVisible: false,
      udrVisible: false,

      text: subnetKey, 

      group: vnet.key,
      isGroup:true,

      figure:'RoundedRectangle',
      desiredSize: subnetSize,
      fill: 'transparent',
      stroke: 'darkblue',
      textStroke: 'black',
      font: '15px Segoe UI',
      strokeDashArray: null,

      nodetype: GoNodeType.Shape(),

      loc: go.Point.stringify(subnetLoc), category: 'subnet'});
}

createVIROntoSubnet(dropContext) {

    //selected node can be from copy/paste command in GojsManager, or from just selected node where VIR are dragged onto canvas
    var selectedNode = dropContext.subnetNode != null ? dropContext.subnetNode : this.diagram.selection.first();

    if(selectedNode == undefined || !selectedNode instanceof go.Node) {
      Toast.show('warning', 2500, 'A Subnet must be selected');
         return;
    }

    var azcontext = selectedNode.data.azcontext;

    if(!Utils.isAzContextExist(selectedNode) ||
      !Utils.isSubnet(selectedNode)) {
      Toast.show('warning', 2500, 'A Subnet must be selected');
      return;
    }

    var subnet = selectedNode;
    var azcontext = dropContext.azcontext;
    var image = '';
    var nodeKey =  '';
    var subnet = selectedNode;
    var text = '';
    var virLoc = new go.Point(subnet.location.x + 60, subnet.location.y +40);

    switch(dropContext.resourceType) {
        case ResourceType.WindowsVM():
          if(Utils.isVMinSubnetTakenByVIRRequiredDedicatedSubnet(subnet)) {
            Toast.show('warining', 7000, Messages.ResourceInSubnetTakenByDedicatedSubnetResource());
            return;
          }

          text = 'vm';
          nodeKey = 'vmwin-' + this.shortUID.randomUUID(6);
          image = require('../../assets/azure_icons/ComputeServiceColor/VM/VM-windows.png');
          
          if(azcontext != null)
            azcontext = azcontext;
          else {
            var vm = new VM();
            vm.ProvisionContext.ResourceType = ResourceType.WindowsVM();
            vm.GraphModel.ResourceType = ResourceType.WindowsVM();
            azcontext = vm;
          }

        break;
        case ResourceType.LinuxVM():
          if(Utils.isVMinSubnetTakenByVIRRequiredDedicatedSubnet(subnet)) {
            Toast.show('warining', 7000, Messages.ResourceInSubnetTakenByDedicatedSubnetResource());
            return;
          }

          text = 'vm';
          nodeKey = 'vmlinux-' + this.shortUID.randomUUID(6);
          image = require('../../assets/azure_icons/ComputeServiceColor/VM/VM-Linux.png');
          
          if(azcontext != null)
            azcontext = azcontext;
          else {
            var vm = new VM();
            vm.ProvisionContext.ResourceType = ResourceType.LinuxVM();
            vm.GraphModel.ResourceType = ResourceType.LinuxVM();
            azcontext = vm;
          }
        break;
        case ResourceType.VMSS():
          if(Utils.isVMinSubnetTakenByVIRRequiredDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.ResourceInSubnetTakenByDedicatedSubnetResource());
            return;
          }
          
          text = 'vm scale sets';
          nodeKey = 'vmss-' + this.shortUID.randomUUID(6);
          image = require('../../assets/azure_icons/ComputeServiceColor/VM/VM Scale Sets.png');
          azcontext = new VMSS();
        break;
        case ResourceType.Firewall():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }
          text = 'firewall';
          nodeKey = 'azfw-' + this.shortUID.randomUUID(6);
          image = require('../../assets/azure_icons/Security Service Color/Azure Firewall.png');
          azcontext = new AzureFirewall();
        break;
        case ResourceType.Bastion():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }
          text = 'bastion';
          nodeKey = 'bastion-' + this.shortUID.randomUUID(6);
          image = require('../../assets/azure_icons/Security Service Color/azure-bastion-icon.png');
          azcontext = new Bastion();
        break;
    }

    this.diagram.model.addNodeData
      ({key: nodeKey,
         text: text, 
         azcontext: azcontext, 
         group: subnet.key,
        source: image, 
        loc: go.Point.stringify(virLoc),
        size: go.Size.stringify(new go.Size(40,40)),
        font: '14px Segoe UI',
        stroke: 'black',
        nodetype: GoNodeType.ImageShape(),
        category: 'virresource'});
}

createPictureShape(dropContext) {
  var image = dropContext.source;
  var label = dropContext.label;
  var canvasPoint = this.diagram.transformViewToDoc(new go.Point(dropContext.x, dropContext.y));
  var shapeKey = this.shortUID.randomUUID(6);

  this.diagram.model.addNodeData
    ({key: shapeKey, 
      text: label, 
      source: image, 
      font: '14px Segoe UI',
      stroke: 'black',
      nodetype: GoNodeType.ImageShape(),
      size: go.Size.stringify(new go.Size(80,80)),
      zOrder: NaN,
      loc: go.Point.stringify(canvasPoint), category: 'picshape'});
}

createNonVIRAzureResource(dropContext) {
  var image = dropContext.source;
  var label = dropContext.label;
  var canvasPoint = this.diagram.transformViewToDoc(new go.Point(dropContext.x, dropContext.y));

  this.diagram.model.addNodeData
    ({key: label, 
      text: label, 
      azcontext: dropContext.azcontext,
      source: image, 
      size: go.Size.stringify(new go.Size(40,40)),
      font: '14px Segoe UI',
      stroke: 'black',
      nodetype: GoNodeType.ImageShape(),
      loc: go.Point.stringify(canvasPoint), category: 'outofvnetazureresource'});
}

createText(dropContext) {
  var label = dropContext.label;
  var canvasPoint = this.diagram.transformViewToDoc(new go.Point(dropContext.x, dropContext.y));
  var shapeKey = Utils.uniqueId('text');

  this.diagram.model.addNodeData
    ({
      key: shapeKey, 
      font:'14px Segoe UI', 
      text: 'text',
      stroke: 'black', 
      loc: go.Point.stringify(canvasPoint),
       nodetype:GoNodeType.Text(), category: 'text'});
}

createLink(dropContext) {
  var dropPt = this.diagram.transformViewToDoc(new go.Point(dropContext.x, dropContext.y));
  var routing = dropContext.routing;

  var nonStraightlinkPoints =
  new go.List(go.Point).addAll([dropPt, new go.Point(dropPt.x + 30, dropPt.y), new go.Point(dropPt.x+30, dropPt.y + 40), new go.Point(dropPt.x + 60, dropPt.y + 40)]);
  
  var straightlinkPoints =
  new go.List(go.Point).addAll([dropPt, new go.Point(dropPt.x + 70, dropPt.y)]);

  if(routing == go.Link.Normal) {
    this.diagram.model.addLinkData(
      { 
        points: straightlinkPoints,
        fromArrow: '',
        toArrow: 'Standard',
        stroke: 'black',
        strokeWidth: 1.5,
        strokeDashArray: null,
        nodetype: GoNodeType.Link(),
        category: 'straight'
      }
    );
  }
  else if(routing == go.Link.Bezier) { //straight arrow with curve
    this.diagram.model.addLinkData(
      { points: straightlinkPoints,
        fromArrow: '',
        toArrow: 'Standard',
        stroke: 'black',
        strokeWidth: 1.5,
        strokeDashArray: null,
        nodetype: GoNodeType.Link(),
        category: 'bezier'
      }
    );
  }
  else //orthogonol
  {
    this.diagram.model.addLinkData(
      { points: nonStraightlinkPoints,
        fromArrow: '',
        toArrow: 'Standard',
        stroke: 'black',
        strokeWidth: 1.5,
        strokeDashArray: null,
        nodetype: GoNodeType.Link(),
        category: 'ortho'
      }
    );
  }
}

addKeyPressShortcuts() {
  document.addEventListener("keydown", function(e) {
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
    }
  }, false);

  var thisComp = this;
  this.diagram.commandHandler.doKeyDown = function() {
    var e = thisComp.diagram.lastInput;
    var cmd = thisComp.diagram.commandHandler;

    if (e.control && e.key === "S") {  // could also check for e.control or e.shift
      thisComp.saveDiagramToBrowser();
    }

    if (e.control && e.key === "V") {  
        e.bubbles = true; //!important, continue with browser paste event
    }

    var parts = thisComp.diagram.selection;
    var partIterator = parts.iterator;

    if (e.key === "Up") {
        this.diagram.startTransaction('commandHandler.part.move');
        while (partIterator.next()) {
            var node = partIterator.value;
            node.move(new go.Point(node.actualBounds.x, node.actualBounds.y - 2 ));
        }
        this.diagram.commitTransaction('commandHandler.part.move');
        return;
    }

    if (e.key === "Down") {
        this.diagram.startTransaction('commandHandler.part.move');
        while (partIterator.next()) {
            var node = partIterator.value;
            node.move(new go.Point(node.actualBounds.x, node.actualBounds.y + 2 ));
        }
        this.diagram.commitTransaction('commandHandler.part.move');
        return;
    }

    if (e.key === "Left") {
        this.diagram.startTransaction('commandHandler.part.move');
        while (partIterator.next()) {
            var node = partIterator.value;
            node.move(new go.Point(node.actualBounds.x - 2, node.actualBounds.y ));
        }
        this.diagram.commitTransaction('commandHandler.part.move');
        return;
    }

    if (e.key === "Right") {
        this.diagram.startTransaction('commandHandler.part.move');
        while (partIterator.next()) {
            var node = partIterator.value;
            node.move(new go.Point(node.actualBounds.x + 2, node.actualBounds.y ));
        }
        this.diagram.commitTransaction('commandHandler.part.move');
        return;
    }

    // call base method with no arguments (default functionality)
    go.CommandHandler.prototype.doKeyDown.call(this);
  };
}

openStylePanel = (node) => {

  this.stylePanel.current.show(node, this.diagram) //, function(style) {

  // let  properties = Object.getOwnPropertyNames(style)

  // var newStyles = new Map();

  // properties.map(propName => {
  //   let propDesc = Object.getOwnPropertyDescriptor(style, propName)
  //   newStyles.set(propName, propDesc.value);
  // })

  // thisComp.graphManager.setNewStyleFromStylePropPanel(cell, newStyles);  
  // })
//})
}

saveDiagramToBrowser = () => {
  if(Utils.isCanvasEmpty(this.diagram))
  {
    Toaster.create({
      position: Position.TOP,
      autoFocus: false,
      canEscapeKeyClear: true
    }).show({intent: Intent.WARNING, timeout: 2000, message: Messages.NoCellOnGraph()});
    return;
  }

  var diagramJson = this.diagram.model.toJson();
  LocalStorage.set
    (LocalStorage.KeyNames.TempLocalDiagram, diagramJson);
  
  this.diagram.isModified = false;

  this.setState({unsavedChanges: false}, () => {
    this.setBadgeVisibilityOnUnsaveChanges()});

  Toaster.create({
    position: Position.TOP,
    autoFocus: false,
    canEscapeKeyClear: true
  }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.DiagramSavedInBrowser()});
  return;
}

loadDraftDiagramFromBrowser = () => {
 var jsonStr = LocalStorage.get(LocalStorage.KeyNames.TempLocalDiagram);
 var loadedModel = go.Model.fromJson(jsonStr);

 this.diagram.clear();
 this.diagram.model = loadedModel;
}

PromptSaveBeforeCloseBrowser() {
  var thisComp = this;
  window.addEventListener('beforeunload', (event) => {
    if(Utils.isCanvasEmpty()) return;
    if(thisComp.state.unsavedChanges){
      event.returnValue = 'You have unsaved changes';
    }
  });
}

//create vertex from browser clipboard image
async pasteImageFromBrowserClipboard() {

  var thisComp = this;

  window.addEventListener("paste", function(e){

      // Handle the event
      thisComp.retrieveImageFromClipboardAsBase64(e, function(imageDataBase64){

        // If there's an image, open it in the browser as a new window :)
          if(imageDataBase64){

            var cursorPt = thisComp.diagram.lastInput.viewPoint;

            thisComp.createPictureShape
            ({source: imageDataBase64,
              label: 'picture', x: cursorPt.x, y: cursorPt.y});
          }
      });
      
      //if there is item in clipboard, and clipboard item is copy image from websites
      //and item is not Vertx
      if(e.clipboardData.items.length != 0) {
        var tempElement = document.createElement("input");
        tempElement.style.cssText = "width:0!important;padding:0!important;border:0!important;margin:0!important;outline:none!important;boxShadow:none!important;";
        document.body.appendChild(tempElement);
        tempElement.value = ' ' // Empty string won't work!
        tempElement.select();
        document.execCommand("copy");
        document.body.removeChild(tempElement);
      }

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

  var thisComp = this;

  for (var i = 0; i < items.length; i++) {
      // Skip content if not image
      if (items[i].type.indexOf("image") == -1) continue;
      // Retrieve image on clipboard as blob
      var blob = items[i].getAsFile();

      if(blob == null)
          continue;
      
      if(thisComp.checkFileLargerThanLimit(blob.size, 400)) {
          Toast.show('warning',  3500, 'PNG file size cannot be over 400Kb, try compressing it.')
          return;
      }

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
            callback(dataUrl);
          }
      };

      // Crossbrowser support for URL
      var URLObj = window.URL || window.webkitURL;

      // Creates a DOMString containing a URL representing the object given in the parameter
      // namely the original Blob
      img.src = URLObj.createObjectURL(blob);
  }
}

// getImageFormatFromBrowserClipboard(imageUrl) {
//   var getSlashIndex = imageUrl.indexOf('/') + 1
//   var getSemiColonIndex = imageUrl.indexOf(';')
//   var imageFormat = imageUrl.slice(getSlashIndex, getSemiColonIndex);
//   return imageFormat;
// }


setBadgeVisibilityOnUnsaveChanges = () => {
      if(this.state.unsavedChanges)
          this.setGlobal({saveBadgeInvisible: false});
      else
          this.setGlobal({saveBadgeInvisible: true});
  }

  dropPNGAZWBFileHandler = () => {

    var thisComp = this;

    mxEvent.addListener(this.graphManager.container, 'dragover', function(evt)
    {      
      if (thisComp.graph.isEnabled())
      {
        evt.stopPropagation();
        evt.preventDefault();
      }
    });

    mxEvent.addListener(this.graphManager.container, 'drop', function(evt)
    {
      if (thisComp.graph.isEnabled())
      {
        evt.stopPropagation();
        evt.preventDefault();

        // Gets drop location point for vertex
        var pt = mxUtils.convertPoint
          (thisComp.graphManager.container, mxEvent.getClientX(evt), mxEvent.getClientY(evt));
        var tr = thisComp.graph.view.translate;
        var scale = thisComp.graph.view.scale;
        var x = pt.x / scale - tr.x;
        var y = pt.y / scale - tr.y;
        
        // Converts local images to data urls
        var filesArray = evt.dataTransfer.files;
        Array.from(filesArray).forEach( file => {
          if(file.name.endsWith('.azwb')) {
            thisComp.importWorkbenchFormat(file);
          }
          else if(file.name.endsWith('.png')) { //insert image as Vertex

            if(thisComp.checkFileLargerThanLimit(file.size, 400)) {
                Toast.show('warning',  3500, 'PNG file size cannot be over 400Kb, try compressing it.')
                return;
            }

            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function() {

              var dataUrl = fileReader.result;

              if(!Utils.IsNullOrUndefine(dataUrl)) {
                var commaSplittedDataUrl = dataUrl.split(','); 

                if(commaSplittedDataUrl.length != 2)
                  return;

                var base64only = commaSplittedDataUrl[1];

                var cell = thisComp.graph.insertVertex
                (thisComp.graph.getDefaultParent(), null, '', x, y, 80, 80,
                "fontColor=black;fontSize=12;verticalLabelPosition=bottom;verticalAlign=top;editable=1;verticalLabelPosition=bottom;shape=image;image=data:image/png," +
                base64only);
                cell.collapsed = false;
              }
            };
            fileReader.onerror = function(error) {
              Toast.show('warning', 3000, error);
            };
          }
          else
            Toast.show('warning', '3500', 'Workbench currently supports importing PNG and .azwb file types')
        });
      }
    });
  }

  checkFileLargerThanLimit(fileSize, limitInKb) {
    var marker = 1024; // Change to 1000 if required
    var decimal = 0; // Change as required
    var kiloBytes = marker; // One Kilobyte is 1024 bytes
    var fileInKb = (fileSize / kiloBytes).toFixed(decimal);

    if(fileInKb > limitInKb)
      return true;
    else
      return false;
  }

  addResourceToEditorFromPalette = (dropContext) => {

    switch(dropContext.resourceType) {
      // case softwareResourceType:
      //   this.addSoftwareShape(dropContext);
      //   break;
      case 'Orthognal Arrow':
        this.createLink({routing: go.Link.Orthogonal, x: dropContext.x, y: dropContext.y});
        break;
      case 'Straight Arrow': //'straightarrow':
        this.createLink({routing: go.Link.Normal, x: dropContext.x, y: dropContext.y});
        break;
      case 'Bezier Curve Arrow': //'straightarrow':
        this.createLink({routing: go.Link.Bezier , x: dropContext.x, y: dropContext.y});
      break;
      case 'Double Ended Arrow': //'straightarrow':
        this.createShape({figure: 'DoubleEndArrow', label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Cylinder':
        this.createShape({figure: 'Cylinder1', label: '', x: dropContext.x, y: dropContext.y});
        break;
      case 'Hexagon':
        this.createShape({figure: 'Hexagon', label: '', x: dropContext.x, y: dropContext.y});
        break;
      case 'Nonagon':
        this.createShape({figure: 'Nonagon', label: '', x: dropContext.x, y: dropContext.y});
        break;
      case 'Text':
        this.createText({label: 'text', x: dropContext.x, y: dropContext.y});
        break;
      case 'Rectangle':
        this.createShape({figure: 'Rectangle', label: '', x: dropContext.x, y: dropContext.y});
        break;
      case 'Rectangle Rounded':
        this.createShape({figure: 'RoundedRectangle', label: '', x: dropContext.x, y: dropContext.y});
        break;
      case 'Triangle':
        this.createShape({figure: 'TriangleUp', label: '', x: dropContext.x, y: dropContext.y});
        break;
      case 'Circle':
        this.createShape({figure: 'Circle', label: '', x: dropContext.x, y: dropContext.y});
        break;
      case 'User':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-user.png'),
          label: 'user', x: dropContext.x, y: dropContext.y});
        break;
      case 'User Blue':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-userblue.png'),
          label: 'user', x: dropContext.x, y: dropContext.y});
        break;
      case '3D Cube':
        this.createShape({figure: 'Cube2', label: '', x: dropContext.x, y: dropContext.y});
        break;
      case 'User Group':
        this.createPictureShape
        ({source:require('../../assets/azure_icons/shape-usergroup.png'),
          label: 'admin group', x: dropContext.x, y: dropContext.y});
        break;
      case 'User Ian':
        this.createPictureShape
        ({source:require('../../assets/azure_icons/shape-user-ian.png'),
          label: 'user', x: dropContext.x, y: dropContext.y});
        break;
      case 'Datacenter':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-dc.png'),
          label: 'datacenter', x: dropContext.x, y: dropContext.y});
        break;
      case 'Internet':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-internet.png'),
          label: 'Internet', x: dropContext.x, y: dropContext.y});
        break;
      case 'Client Machine':
        this.createPictureShape
          ({source: require('../../assets/azure_icons/_Flat Symbols/CnE_Enterprise/Laptop computer.png'),
            label: 'client', x: dropContext.x, y: dropContext.y});
        break;
      case 'ADFS':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/_Flat Symbols/CnE_Enterprise/AD FS.png'),
          label: 'adfs', x: dropContext.x, y: dropContext.y});
        break;
      case 'Andriod':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-andriod.png'),
          label: 'andriod', x: dropContext.x, y: dropContext.y});
        break;
      case 'iPhone':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-iphone.png'),
          label: 'iphone', x: dropContext.x, y: dropContext.y});
        break;
      case 'Azure VM':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-vm.png'),
          label: 'VM', x: dropContext.x, y: dropContext.y});
        break;
      case 'VM':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-vm2.png'),
          label: 'VM', x: dropContext.x, y: dropContext.y});
        break;
      case 'Physical Server':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-server1.png'),
          label: 'physical server', x: dropContext.x, y: dropContext.y});
        break;
      case 'Blade Server':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-server2.png'),
          label: 'blade server', x: dropContext.x, y: dropContext.y});
        break;
      case 'Database Black':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-dbblack.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Database HA Black':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-dbhablack.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Database Blue':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-dbblue.png'),
          label: 'database', x: dropContext.x, y: dropContext.y});
      break;
      case 'Firewall':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/shape-firewall.png'),
          label: 'firewall', x: dropContext.x, y: dropContext.y});
      break;
      //misc
      case 'Helm':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/helm.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Azure DevOps':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-azuredevops.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'C#':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-c#.png'),
          label: 'c#', x: dropContext.x, y: dropContext.y});
      break;
      case 'Dapr':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-dapr.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Docker':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-docker.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'ElasticSearch':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-elasticsearch.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Enterprise Service Bus':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-esbmiddleware.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'GitHub':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-github.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'GitHub Actions':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-githubactions.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Go':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-golang.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Grafana':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-grafana.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Hashicorp Consul':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-hashicorpconsul.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Terraform':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-hashicorpterraform.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Hashicorp Vault':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-hashicorpvault.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'InfluxDB':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-influxdb.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Java':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-java.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Javascript':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-javascript.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Kafka':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-kafka.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Kubernetes (shape)':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-kubernetes.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Message Queue':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-messagequeue.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'MongoDB':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-mongodb.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case '.Net Core':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-netcore.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Nginx':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-nginxplus.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Nginx Plus':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-nginxplus.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'NodeJS':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-node.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Powershell':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-powershell.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Power BI':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-powerbi.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Python':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-python.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'RabbitMQ':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-rabbitmq.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Ruby On Rails':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-rubyonrails.png'), 
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Traefik':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-traefik.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Zipkin':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-Zipkin.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Jaeger':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-jaeger.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Calico':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-calico.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Azure Resource Group (shape)':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-resourcegroup.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
  
      case ResourceType.AppService():
        this.createNonVIRAzureResource({
          source: require('../../assets/azure_icons/Web Service Color/App Services.png'),
          label: 'app service', x: dropContext.x, y: dropContext.y,
          azcontext: new AppService()
        });
        break;
      case ResourceType.ASE():
        //vnet injection
        break;
      case ResourceType.Function():
        this.createNonVIRAzureResource({
          source: require('../../assets/azure_icons/Web Service Color/Function Apps.png'),
          label: 'func', x: dropContext.x, y: dropContext.y,
          azcontext: new Function()
        });
        break;
      case ResourceType.AzureSearch():
        this.createNonVIRAzureResource({
          source: require('../../assets/azure_icons/Web Service Color/Azure Search.png'),
          label: 'azure search', x: dropContext.x, y: dropContext.y,
          azcontext: new AzureSearch()
        });
        break;
      case ResourceType.SignalR():
        this.createNonVIRAzureResource({
          source: require('../../assets/azure_icons/Web Service Color/SignalR.png'),
          label: 'signalr', x: dropContext.x, y: dropContext.y,
          azcontext: new SignalR()
        });
        break;
      case ResourceType.AppServiceCert():
        this.createNonVIRAzureResource({
          source: require('../../assets/azure_icons/Web Service Color/App Service Certificates.png'),
          label: 'app service certificate', x: dropContext.x, y: dropContext.y,
          azcontext: new AppServiceCert()
        });
        break;
      case ResourceType.AppServiceDomain():
        this.createNonVIRAzureResource({
          source: require('../../assets/azure_icons/Web Service Color/App Service Domains.png'),
          label: 'app service domain', x: dropContext.x, y: dropContext.y,
          azcontext: new AppServiceDomain()
        });
        break;
      case ResourceType.AppConfig():
        this.createNonVIRAzureResource({
          source: require('../../assets/azure_icons/Web Service Color/App Configuration.png'),
          label: 'app configuration', x: dropContext.x, y: dropContext.y,
          azcontext: new AppConfig()
        });
        break;
      case ResourceType.SharedImageGallery():
        this.createNonVIRAzureResource({
          source: require('../../assets/azure_icons/ComputeServiceColor/Shared Image Galleries.png'),
          label: 'shared image gallery', x: dropContext.x, y: dropContext.y,
          azcontext: new SharedImageGallery()
        });
        break;
      case ResourceType.DevTestLab():
        this.createNonVIRAzureResource({
          source: require('../../assets/azure_icons/ComputeServiceColor/Azure DevTest Labs.png'),
          label: 'devtest lab', x: dropContext.x, y: dropContext.y,
          azcontext: new DevTestLab()
        });
        break;
      case ResourceType.PublicIp():
        this.addPublicIp(dropContext);
        break;
      case ResourceType.TrafficManager():
        this.addTrafficManager(dropContext);
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
      case ResourceType.PrivateEndpoint():
        this.addPrivateEndpoint(dropContext);
        break;
      case ResourceType.VNet():
        this.createVNet({
          x: dropContext.x, y: dropContext.y,
          azcontext: new VNet()
        });
        break;
      case ResourceType.NLB():
        this.addNLB(dropContext);
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

      case ResourceType.Cognitive():
        this.addCognitive(dropContext);
        break;
      case ResourceType.BotsService():
        this.addBotsService(dropContext);
        break;
      case ResourceType.Genomics():
        this.addGenomics(dropContext);
        break;
      case ResourceType.MLServiceWorkspace():
        this.addMLServiceWorkspace(dropContext);
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
      case ResourceType.EventHub():
        this.addEventHub(dropContext);
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
  }

  determineResourcePropertyPanelToShow = (userObject, onContextSaveCallback) => {

    let thisComp = this;

    switch (userObject.GraphModel.ResourceType) {

      
      case ResourceType.RouteTable():
        this.rtPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Cognitive():
        this.cognitivePropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.BotsService():
        this.botsPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Genomics():
        this.genomicsPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.MLServiceWorkspace():
        this.mlsvcworkspacePropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.NatGateway():
        this.natgwPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.NatGateway():
        this.natgwPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.PrivateEndpoint():
        this.privateendpointPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.AzFile():
        this.azstoragePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.QueueStorage():
        this.azstoragePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.TableStorage():
        this.azstoragePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.BlobStorage():
        this.azstoragePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.NSG():
        this.nsgPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.IoTCentral():
        this.iotcentralPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.TimeSeriesInsights():
        this.timeseriesPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.AzureMaps():
        this.mapsPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.IoTHub():
        this.iothubPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.AADB2C():
        this.aadb2cPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Automation():
        this.automationPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.LogAnalytics():
        this.loganalyticsPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.AppInsights():
        this.appinsightsPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.RecoveryServiceVault():
        this.recoveryservicevaultPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Bastion():
        this.bastionPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.DDoSStandard():
        this.ddosstandardPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.KeyVault():
        this.akvPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Sentinel():
        this.sentinelPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Firewall():
        this.firewallPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.AppConfig():
        this.appconfigPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.StreamAnalytics():
        this.streamanalyticsPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.EventGridSubscription():
        this.egsubscriptionPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.EventGridTopic():
        this.egtopicPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.ISE():
        this.isePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.LogicApp():
        this.logicappPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Relay():
        this.relayPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.ASB():
        this.servicebusPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.APIM():
        this.apimPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Kubernetes():
        this.kubePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.ContainerRegistry():
        this.containerregistryPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.ContainerInstance():
        this.containerintancePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.DataExplorer():
        this.dataexplorerPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.HdInsight():
        this.hdinsightPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.DataFactory():
        this.datafactoryPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Databricks():
        this.databricksPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.DataLakeAnalytics():
        this.datalakeanalyticsPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.DataLakeStorage():
        this.datalakestoragePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Redis():
        this.redisPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.SQLElasticPool():
        this.sqlelasticpoolPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.MySQL():
        this.mysqlPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.CosmosDB():
        this.cosmosPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.SQLDB():
        this.azuresqlPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.MariaDB():
        this.mariadbPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.PostgreSQL():
        this.postgresqlPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Synapse():
        this.synapsePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.NetAppFile():
        this.netappfilePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.AzFileSync():
        this.filesyncPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.BlobStorage():
        this.storagePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.CDN():
        this.cdnPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.VirtualNetworkGateway():
        this.vnetgatewayPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.TrafficManager():
        this.trafficmanagerPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.AppService():
        this.appsvcPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.ASE():
        this.asePropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Function():
        this.funcPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.AzureSearch():
        this.azsearchPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.SignalR():
        this.signalrPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break; 
      case ResourceType.AppServiceCert():
        this.appsvccertPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.AppServiceDomain():
        this.appsvcdomainPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.VMSS():
        this.vmssPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break; 
      case ResourceType.DevTestLab():
        this.devteslabPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.SharedImageGallery():
        this.sigPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.FrontDoor():
        this.frontdoorPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.PublicIp():
        this.pipPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.ExpressRouteCircuit():
        this.expressroutePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
        
        
      case ResourceType.WindowsVM():
        this.vmPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.LinuxVM():
        this.vmPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.VNet():
        //get all subnet names and cidrs
        // userObject.GraphModel.SubnetsAndCidrs =
        //   Utils.vnetGetSubnetsAndCidrs(thisComp.graph, cell);

        this.vnetPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));

        });
        break;
      case ResourceType.Subnet():
          
        // if(this.azureValidator.isGatewaySubnet(cell))
        //     return;

        //   //pass into Subnet Prop Panel
        //   //vnet address and subnet cidrs.
        //   //This is purely for UI cidr validation, does not affect provisioning
        //   var vnetCell = cell.parent;
        //   var vnetProContext=  Utils.TryParseUserObject(vnetCell);

        //   userObject.GraphModel.VNetAddressSpace =
        //     vnetProContext.userObject.ProvisionContext.AddressSpace;

        //   userObject.GraphModel.SubnetsAndCidrs =
        //     Utils.vnetGetSubnetsAndCidrs(thisComp.graph, vnetCell, userObject.ProvisionContext.Name);
          
        //TODO: 
          this.subnetPropPanel.current.show(userObject, function(savedUserObject){
            //save values to subnet pro-context
              onContextSaveCallback(Utils.deepClone(savedUserObject));

            //save subnet names and cidrs to VNet pro-context
            // vnetProContext.userObject.GraphModel.SubnetsAndCidrs = 
            // Utils.vnetGetSubnetsAndCidrs(thisComp.graph, cell.parent);
            // thisComp.graph.model.setValue(vnetCell, JSON.stringify(vnetProContext.userObject));
          });
          break;
      case ResourceType.NLB():
        this.nlbPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.AppGw():
        this.appgwPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.DNSPrivateZone():
        this.dnsPrivateZonePropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      default:
        break;
    }
  }

  


  // //callbacks from Ref components
  // fromVMPropPanelSaveModel(vmModel) {
  //     var vmCell = this.graph.getModel().getCell(vmModel.GraphModel.Id);
  //     vmCell.value.ProvisionContext = vmModel.ProvisionContext; 
  // }

  // groupCells(){
  //   //http://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html#mxGraph.groupCells

  //   if (this.graph.getSelectionCount() == 1)
	// 	{
	// 		this.graph.setCellStyles('container', '1');
	// 	}
	// 	else
	// 	{
	// 		this.graph.setSelectionCell(this.mxClientOverrides.groupCells(null, 0));
	// 	}
  // }

  // unGroupCells(){
  //   var selectedCell = this.graph.getSelectionCell();
    
  //   if(selectedCell != null)
  //   {
  //     //presebt subnet being ungroup out of VNet
  //     var result = Utils.TryParseUserObject(selectedCell.value);
  //     if(result.isUserObject && result.userObject.GraphModel.ResourceType == ResourceType.Subnet())
  //     {
  //       Toaster.create({
  //         position: Position.TOP,
  //         autoFocus: false,
  //         canEscapeKeyClear: true
  //       }).show({intent: Intent.WARNING, timeout: 2000, message: Messages.SubnetUngroupVNetNotAllowed()});
  //       return;
  //     }
  //     else{
  //      this.graph.ungroupCells();
  //     }
  //   }
  // }

  // rerenderAllAnimatedTrafficFlow() {
  //   var allVerticies = this.graph.getChildVertices(this.graph.getDefaultParent());

    
  //   cell.edges.map(edge => {
  //     var result = Utils.TryParseUserObject(edge.value);
  //     if(result.isUserObject) {
  //       //re-render animated traffic flow
  //       this.animateTrafficFlow(edge, result.userObject);
  //     }
  //   });

  // }

  // animateTrafficFlow = (edge, flag) => {

  //   var result = Utils.TryParseUserObject(edge.value);
  //   if(!result.isUserObject)
  //     return;
      
  //   var edgeModel = result.userObject;

  //   //turn off animation
  //   if(flag!= null && flag == 'off')
  //   {
  //     edgeModel.GraphModel.IsAnimatedTrafficFlowOn = false;
  //     edgeModel.GraphModel.IsLeftToRight = false;
  //     this.animateTrafficFlowInternalOff(edge);
  //   }
  //   //user turn on animation manually
  //   else if(flag!= null && flag == 'l2r'){
  //     edgeModel.GraphModel.IsAnimatedTrafficFlowOn = true;
  //     edgeModel.GraphModel.IsLeftToRight = true;
  //     this.animateTrafficFlowInternalRender(edge, edgeModel);
  //   }
  //   //user turn on animation manually
  //   else if(flag!= null && flag == 'r2l'){
  //     edgeModel.GraphModel.IsAnimatedTrafficFlowOn = true;
  //     edgeModel.GraphModel.IsLeftToRight = false;
  //     this.animateTrafficFlowInternalRender(edge, edgeModel);
  //   }
  //   //executed from importJsonDiagram() logic for loadFromDraft, Import .azwb or Load from Shared Link
  //   else {
  //     this.animateTrafficFlowInternalRender(edge, edgeModel);
  //   }

  //   edge.setValue(JSON.stringify(edgeModel));
  //   this.graph.clearSelection();
  // }


  // animateTrafficFlowInternalRender(edge, edgeModel) {

  //   if(!edgeModel.GraphModel.IsAnimatedTrafficFlowOn)
  //     return;
  //   if(edge.source == null && edge.target == null) //must be connected both ends
  //     return;

  //   var state = this.graph.view.getState(edge, true);
  //   var edgeStyle = this.graphManager.convertStyleStringToObject(edge.style);
  //   var strokeWidth = edgeStyle['strokeWidth'];

  //   state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
  //   state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', strokeWidth);
  //   state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', 'white');
  //   if(edgeModel.GraphModel.IsLeftToRight) {
  //     state.shape.node.getElementsByTagName('path')[1]
  //       .setAttribute('class', 'animateTrafficFlowLeft2Right');
  //   }
  //   else
  //     state.shape.node.getElementsByTagName('path')[1]
  //       .setAttribute('class', 'animateTrafficFlowRight2Left');
  // }

  // animateTrafficFlowInternalOff(edge) {
  //     var state = this.graph.view.getState(edge, true);

  //     //state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
  //     //state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', strokeWidth);
  //     //state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', edgeColor);
  //     state.shape.node.getElementsByTagName('path')[1].removeAttribute('class');
  // }


  // copyToClipboard =() => {
  //   var cells = this.graph.getSelectionCells();
  //     if(cells == null)
  //     return;

  //     var result = this.graph.getExportableCells(cells);
    
  //     mxClipboard.parents = new Object();
    
  //     for (var i = 0; i < result.length; i++)
  //     {
  //       mxClipboard.parents[i] = this.graph.model.getParent(cells[i]);
  //     }
    
  //     mxClipboard.insertCount = 1;
  //     mxClipboard.setCells(this.graph.cloneCells(result));
    
  //     return result;
  // }

  // pasteFromClipboard = () => {
  //   if (!mxClipboard.isEmpty())
  //     {
  //       var cells = this.graph.getImportableCells(mxClipboard.getCells());
  //       var delta = mxClipboard.insertCount * mxClipboard.STEPSIZE;
  //       var parent = this.graph.getDefaultParent();
    
  //       this.graph.model.beginUpdate();
  //       try
  //       {
  //         for (var i = 0; i < cells.length; i++)
  //         {
  //           if(this.azureValidator.isVM(cells[i]))
  //           {
  //               var selectedCell = this.graph.getSelectionCell();

  //               if(!this.azureValidator.isSubnet(selectedCell))
  //               {
  //                   Toaster.create({
  //                     position: Position.TOP,
  //                     autoFocus: false,
  //                     canEscapeKeyClear: true
  //                   }).show({intent: Intent.WARNING, timeout: 2000, message: Messages.VMInSubnet()});
  //                   return;
  //               }
  //               else{
  //                 mxClipboard.parents[i] = selectedCell;
  //               }
  //           }
            
  //           if(this.azureValidator.isAppGateway(cells[i]) &&
  //              !this.azureValidator.isResourceinDedicatedSubnet(mxClipboard.parents[i]))
  //           {
  //               Toaster.create({
  //                 position: Position.TOP,
  //                 autoFocus: false,
  //                 canEscapeKeyClear: true
  //               }).show({intent: Intent.DANGER, timeout: 2000, message: Messages.AppGatewayNotInSubnetError()});
  //               return;
  //           }

  //           var tmp = (mxClipboard.parents != null && this.graph.model.contains(mxClipboard.parents[i])) ?
  //               mxClipboard.parents[i] : parent;
  //           cells[i] = this.graph.importCells([cells[i]], delta, delta, tmp)[0];
            
  //         }
  //       }
  //       finally
  //       {
  //         this.graph.model.endUpdate();
  //       }
    
  //       // Increments the counter and selects the inserted cells
  //       mxClipboard.insertCount++;
  //       this.graph.setSelectionCells(cells);
  //     }
  // }

    

  // createVertexFromBrowserClipboard(clipboardResult) {

  //   this.graphManager.graph.getModel().beginUpdate();
  //     var style = 'fontColor=black;fontSize=12;editable=1;verticalLabelPosition=bottom;shape=image;image=';
      
  //     if(clipboardResult.imageFormat == 'png')
  //       style += 'data:image/png,' + clipboardResult.imageBase64;

  //     this.graph.insertVertex
  //     (this.graph.getDefaultParent(), '', '',
  //     MouseEvent.clientX, MouseEvent.clientY, 800, 900, //native javascript MouseEvent 
  //     style);
  //     //data:image/svg+xml,
  //     this.graphManager.graph.getModel().endUpdate();
  // }


  importJsonDiagram = (anonymousDiagramContext) => {

    if(anonymousDiagramContext == undefined ||
       anonymousDiagramContext.DiagramXml == undefined)
      return;

      // window['mxImage'] = mxImage;   
      // window['mxCellOverlay'] = mxCellOverlay;  
      // window['mxCell'] = mxCell;
      // window['mxCellPath'] = mxCellPath;
      // window['mxGeometry'] = mxGeometry;
      // window['mxCodec'] = mxCodec;
      // window['mxPoint'] = mxPoint;
      // window['mxEditor'] = mxEditor;
      // window['mxGeometry'] = mxGeometry;
      // window['mxDefaultKeyHandler'] = mxDefaultKeyHandler;
      // window['mxDefaultPopupMenu'] = mxDefaultPopupMenu;
      // window['mxGraph'] = mxGraph;
      // window['mxStylesheet'] = mxStylesheet;
      // window['mxDefaultToolbar'] = mxDefaultToolbar;
      // window['mxGraphModel'] = mxGraphModel;
      // window['mxGraphSelectionModel'] = mxGraphSelectionModel;
      // window['mxGraphModel'] = mxGraphModel;
      // window['mxChildChange'] = mxChildChange;
      // window['mxChildChangeCodec'] = mxChildChangeCodec;
      // window['mxCellCodec'] = mxCellCodec;
      // window['mxUtils'] = mxUtils;

      var model = go.Model.fromJson(anonymousDiagramContext.DiagramXml);

      this.diagram.clear();
      this.diagram.model = model;

      //reset unsave changes state on new diagram import
      this.setState({unsavedChanges: false}, () => {
        this.setBadgeVisibilityOnUnsaveChanges()});
      
      //codec.decode(doc.documentElement, this.graph.getModel());

      // //re-add cell overlays
      // var cells =
      //   this.graph.getChildVertices(this.graph.getDefaultParent());
      
      //   if(cells != undefined)
      //   {
      //       cells.map(cell => {
              
      //         var result = Utils.TryParseUserObject(cell.value);

      //         if(result.isUserObject &&
      //            JSON.parse(cell.value).GraphModel.ResourceType == 'vnet')
      //         {
      //           this.graph.removeCellOverlays(cell);

      //           var vnetIconOverlay = new mxCellOverlay(
      //             new mxImage(window.location.origin + require('../../assets/azure_icons/Networking Service Color/Virtual Network (Classic).svg'),25, 25),
      //             null,  mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP
      //           );

      //           this.graph.addCellOverlay(cell, vnetIconOverlay);

      //           var childSubnets =
      //              this.graph.getChildVertices(cell);
                
      //           if(childSubnets != null)
      //           {
      //             childSubnets.map(subnet => {
      //               this.graph.removeCellOverlays(subnet);

      //               // var nsgOverlay = new mxCellOverlay(
      //               //   new mxImage(require('../../assets/azure_icons/Networking Service Color/Network Security Groups (Classic).svg'),20, 20),
      //               //   null,  mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP
      //               // );
            
      //               var subnetLogoOverlay = new mxCellOverlay(
      //                 new mxImage(require('../../assets/azure_icons/Networking Service Color/Subnet.svg'),15, 15),
      //                 'Subnet',  mxConstants.ALIGN_Right, mxConstants.ALIGN_TOP
      //               );
    
      //               //this.graph.addCellOverlay(subnet, nsgOverlay);
      //               this.graph.addCellOverlay(subnet, subnetLogoOverlay);

      //             })
      //           }
      //         }
      //       });
      //   }
  }

   loadQuickstartDiagram(category, name) {
      var thisComp = this;
      this.diagService.loadQuickstartDiagram
        (category, name,
          function onSuccess(qsDiagContext) {
            thisComp.importJsonDiagram(qsDiagContext);
          },
          function onFailure(error) {
            Toast.show("danger", 2000, error.message);
          }
        )
  }

  shareDiagram(){
    if(Utils.isCanvasEmpty())
      {
        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.WARNING, timeout: 3000, message: Messages.NoCellOnGraph()});
        return;
      }

    var thisComp = this;
    var anonyDiagramContext = new AnonymousDiagramContext();
    anonyDiagramContext.DiagramName = Utils.uniqueId('diagram');
    anonyDiagramContext.DiagramXml = this.diagram.model.toJson();
    anonyDiagramContext.DateTimeSaved = new Date();

    this.diagramService
      .saveAnonymousDiagram(anonyDiagramContext,
        function (shareLink){

          thisComp.setState({shareLink: shareLink, showShareDiagramPopup: true});
        },
        function(error){
          Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.DANGER, timeout: 3000, message: error.message});
        });
  }

  loadSharedDiagram = () => {
    if(Utils.IsNullOrUndefine(this.state.queryString)) //querystring is object contains path and querystring
      return;

    var parsedQS =  queryString.parse(this.state.queryString.search)
    var anonyDiagramId = parsedQS.id

    if(Utils.IsNullOrUndefine(anonyDiagramId))
    return;

    var thisComp = this;

    this.diagramService.loadAnonymousDiagram(parsedQS.id)
      .then(function (response) {
          var adc = new AnonymousDiagramContext();
          adc.UID = response.data.UID;
          adc.DiagramName = response.data.DiagramName;
          adc.DiagramXml = response.data.DiagramXml;
          adc.SharedLink = response.data.SharedLink;
          thisComp.importJsonDiagram(adc);

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

  // getDiagramAsXml(){
  //   var encoder = new mxCodec();

  //   var node = encoder.encode(this.graph.getModel());

  //   var diagramInXml = mxUtils.getXml(node, true);
  //   return diagramInXml;
  // }

  importWorkbenchFormat(azwbFile) {

    var thisComp = this;
    
    const reader = new FileReader();
    reader.readAsText(azwbFile);
    reader.onload = function() {
      const jsonDiagram = reader.result;
      var diagContext = new AnonymousDiagramContext();
      diagContext.DiagramXml = jsonDiagram;
      thisComp.importJsonDiagram(diagContext);
    };
  
    reader.onerror = function() {
      Toast.show('warning',2000, reader.error);
    };
  }

  exportWorkbenchFormat() {
    if(Utils.isCanvasEmpty())
    {
      Toast.show('primary', 2000, Messages.NoCellOnGraph());
      return;
    }

    var diagramJson = this.diagram.model.toJson();

    const url = window.URL.createObjectURL(new Blob([diagramJson]));
          const link = document.createElement('a');
          link.href = url;
          link.target = "azwbFileDownloader"; //name of iframe
          link.setAttribute('download', 'diagram.azwb');
          document.body.appendChild(link);
          link.click();
  }

  saveDiagramToWorkspace(collectionName, diagramName) {
    if(Utils.isCanvasEmpty())
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
    diagramContext.UID = this.shortUID.randomUUID(6);
    diagramContext.DiagramName = diagramName;
    diagramContext.DiagramXml = this.diagram.model.toJson();
    diagramContext.DateTimeSaved = Date.now();

    var thisComp = this;

    this.diagramService.saveDiagramToWorkspace(diagramContext,
      function onSuccess() {
        thisComp.setState({unsavedChanges: false}, () => {
          thisComp.setBadgeVisibilityOnUnsaveChanges()});

        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.SavedSuccessfully()});
        return;
      },
      function onError(error) {
        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.DANGER, timeout: 2000, message: error});
        return;
      });
  }


  exportAsSvg(){
    if(Utils.isCanvasEmpty())
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.NoCellOnGraph()});
      return;
    }
   
    var svg = this.diagram.makeSvg({scale: 1, background: "white" });

    var svgXmlString = new XMLSerializer().serializeToString(svg);

    const blob = new Blob([svgXmlString], {type: 'image/svg+xml'});

    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'diagram.svg');
    document.body.appendChild(link);
    link.click();
  }

  exportAsPng() {
    if(Utils.isCanvasEmpty())
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.NoCellOnGraph()});
      return;
    }

    var blob = this.diagram.makeImageData
      ({ background: "white", returnType: "blob", callback: callback });

    function callback(blob) {
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'diagram.png');
      document.body.appendChild(link);
      link.click();
    }
   
    // var image = this.diagram.makeImage
    //   ({scale: 1, background: "white" });

    // const blob = new Blob([image], {type: 'image/png'});

    // var link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    // link.setAttribute('download', 'diagram.png');
    // document.body.appendChild(link);
    // link.click();
  }

  exportDiagramAsPDF(){

    if(Utils.isCanvasEmpty())
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.NoCellOnGraph()});
      return;
    }

    var svg = this.diagram.makeSvg({ scale: 1, background: "white" });

    var svgXmlString = new XMLSerializer().serializeToString(svg);
    
    var svgXmlBase64 = window.btoa(svgXmlString);

    var thisComp = this;
    this.diagramService.exportDiagramAsPNG(svgXmlBase64,
      function onSuccess(pdfByteArray)
      {
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
        console.log(error);
      });
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
    this.graph.removeCells(this.graph.getChildCells(this.graph.getDefaultParent(), true, true),false)
    this.graph.getModel().clear();
  }

  closeShareDiagramPopup = () => this.setState({ showShareDiagramPopup: false, useTallContent: false });
}