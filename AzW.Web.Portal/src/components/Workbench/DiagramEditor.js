
import React, { Component } from "reactn";
import MySpace from './MySpace';
import OverlaySaveToWorkspace from './OverlaySaveToWorkspace';
import {InputGroup, Classes, Button, Intent, Overlay, Toaster, Position} from "@blueprintjs/core";

//gojs
import * as go from 'gojs';
import { PanningTool } from 'gojs';
import './GojsExtensions/Figures';

import GoNodeType from './Helpers/GoNodeType';

//3rd-party libraries
import ShortUniqueId from 'short-unique-id';
import Messages from "./Helpers/Messages";
import Utils from "./Helpers/Utils";
import Subnet from "../../models/Subnet";
import SharedDiagramMySpaceContext from "../../models/services/SharedDiagramMySpaceContext"
import LoadAnonyDiagramContext from "../../models/LoadAnonyDiagramContext";
import DiagramService from '../../services/DiagramService';
import ProvisionService from '../../services/ProvisionService';
import queryString from 'query-string';
import AzureValidator from './Helpers/AzureValidator';
import LocalStorage from '../../services/LocalStorage';
import WorkspaceDiagramContext from "../../models/services/WorkspaceDiagramContext";
import StatusBarHelper from './StatusBarHelper'

//models
import CommunicationService from "../../models/CommunicationService";
import DeviceProvisioningService from "../../models/DeviceProvisioningService";
import DeviceUpdateForIoTHub from "../../models/DeviceUpdateForIoTHub";
import DigitalTwins from "../../models/DigitalTwins";
import TimeSeriesInsightsEventSource from "../../models/TimeSeriesInsightsEventSource";

import EventHubCluster from "../../models/EventHubCluster";
import LogicAppCustomConnector from "../../models/LogicAppCustomConnector";
import IPGroups from "../../models/IPGroups";
import AMPLS from "../../models/AMPLS";
import NetworkManager from "../../models/NetworkManager";
import RouteFilters from "../../models/RouteFilters";
import WAF from "../../models/WAF";
import AvailabilitySet from "../../models/AvailabilitySet";
import ProximityPlacementGroup from "../../models/ProximityPlacementGroup";

import PrivateLink from "../../models/PrivateLink";
import LocalNetworkGateway from "../../models/LocalNetworkGateway";
import PublicIpPrefixes from "../../models/PublicIpPrefixes";
import Host from "../../models/Host";
import Hostgroup from "../../models/Hostgroup";
import VMWareSolution from "../../models/VMWareSolution";
import WorkspaceWVD from "../../models/WorkspaceWVD";
import DiskEncryptionSet from "../../models/DiskEncryptionSet";
import Image from "../../models/Image";
import DiskSnapshot from "../../models/DiskSnapshot";
import ImageTemplate from "../../models/ImageTemplate";
import Automanage from "../../models/Automanage";
import LabService from "../../models/LabService";
import DataBoxEdge from "../../models/DataBoxEdge";
import StorSimpleDataManager from "../../models/StorSimpleDataManager";
import OnPremDataGateway from "../../models/OnPremDataGateway";
import PurviewAccount from "../../models/PurviewAccount";
import HPCCache from "../../models/HPCCache";
import AzureStackEdge from "../../models/AzureStackEdge";
import BackupVault from "../../models/BackupVault";
import StaticApp from "../../models/StaticApp";
import NotificationHub from "../../models/NotificationHub";
import AppServicePlan from "../../models/AppServicePlan";
import MediaService from "../../models/MediaService";
import SpringCloud from "../../models/SpringCloud";
import DataCatalog from "../../models/DataCatalog";
import DataShare from "../../models/DataShare";
import ManagedIdentity from "../../models/ManagedIdentity";
import ServiceFabricCluster from "../../models/ServiceFabricCluster";
import ServiceFabricManagedCluster from "../../models/ServiceFabricManagedCluster";
import VirtualWAN from "../../models/VirtualWAN";
import Blockchain from "../../models/Blockchain";
import DNS from "../../models/DNS";
import AADDomainService from "../../models/AADDomainService";
import SendGrid from "../../models/SendGrid";
import SecurityCenter from "../../models/SecurityCenter";
import Databox from "../../models/Databox";
import ASG from "../../models/ASG";
import NIC from "../../models/NIC";
import DedicatedHost from "../../models/DedicatedHost";
import AzureBatch from "../../models/AzureBatch";
import AzureADDomainService from "../../models/AzureADDomainService";
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
import EventGridDomain from "../../models/EventGridDomain";

import ServiceEndpoint from "../../models/ServiceEndpoint";
import StreamAnalytics from "../../models/StreamAnalytics";
import EventHub from "../../models/EventHub";
import AzureFirewall from "../../models/AzureFirewall";
import AzureFirewallManager from "../../models/AzureFirewallManager";
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
import StorageAccount from "../../models/StorageAccount";
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
import Arc from "../../models/Arc";
import AnalysisService from "../../models/AnalysisService";
import ElasticJobAgent from "../../models/ElasticJobAgent";
import AnonymousDiagramContext from "../../models/services/AnonymousDiagramContext";

//property panels
import DeviceProvisioningServicePropPanel from './PropPanel/DeviceProvisioningServicePropPanel';
import DeviceUpdateForIoTHubPropPanel from './PropPanel/DeviceUpdateForIoTHubPropPanel';
import DigitialTwinsPropPanel from './PropPanel/DigitialTwinsPropPanel';
import TimeSeriesInsightsEventSourcePropPanel from './PropPanel/TimeSeriesInsightsEventSourcePropPanel';
import CommunicationServicePropPanel from './PropPanel/CommunicationServicePropPanel';
import EventHubClusterPropPanel from './PropPanel/EventHubClusterPropPanel';
import LogicAppCustomConnectorPropPanel from './PropPanel/LogicAppCustomConnectorPropPanel';
import IPGroupsPropPanel from './PropPanel/IPGroupsPropPanel';
import AMPLSPropPanel from './PropPanel/AMPLSPropPanel';
import NetworkManagerPropPanel from './PropPanel/NetworkManagerPropPanel';
import RouteFiltersPropPanel from './PropPanel/RouteFiltersPropPanel';
import WAFPropPanel from './PropPanel/WAFPropPanel';
import AvailabilitySetPropPanel from './PropPanel/AvailabilitySetPropPanel';
import ProximityPlacementGroupPropPanel from './PropPanel/ProximityPlacementGroupPropPanel';

import PrivateLinkPropPanel from './PropPanel/PrivateLinkPropPanel';
import LocalNetworkGatewayPropPanel from './PropPanel/LocalNetworkGatewayPropPanel';
import PublicIpPrefixesPropPanel from './PropPanel/PublicIpPrefixesPropPanel';
import HostPropPanel from './PropPanel/HostPropPanel';
import HostgroupPropPanel from './PropPanel/HostgroupPropPanel';
import VMWareSolutionPropPanel from './PropPanel/VMWareSolutionPropPanel';
import WorkspaceWVDPropPanel from './PropPanel/WorkspaceWVDPropPanel';
import DiskEncryptionSetPropPanel from './PropPanel/DiskEncryptionSetPropPanel';
import ImagePropPanel from './PropPanel/ImagePropPanel';
import DiskSnapshotPropPanel from './PropPanel/DiskSnapshotPropPanel';
import ImageTemplatePropPanel from './PropPanel/ImageTemplatePropPanel';
import AutomanagePropPanel from './PropPanel/AutomanagePropPanel';
import LabServicePropPanel from './PropPanel/LabServicePropPanel';
import DataBoxEdgePropPanel from './PropPanel/DataBoxEdgePropPanel';
import StorSimpleDataManagerPropPanel from './PropPanel/StorSimpleDataManagerPropPanel';
import OnPremiseDataGatewayPropPanel from './PropPanel/OnPremiseDataGatewayPropPanel';
import PurviewAccountPropPanel from './PropPanel/PurviewAccountPropPanel';
import HPCCachePropPanel from './PropPanel/HPCCachePropPanel';
import AzureStackEdgePropPanel from './PropPanel/AzureStackEdgePropPanel';
import BackupVaultPropPanel from './PropPanel/BackupVaultPropPanel';
import StaticAppPropPanel from './PropPanel/StaticAppPropPanel';
import AnalysisServicePropPanel from './PropPanel/AnalysisServicePropPanel';
import NotificationHubPropPanel from './PropPanel/NotificationHubPropPanel';
import BlockchainPropPanel from './PropPanel/BlockchainPropPanel';
import MediaServicePropPanel from './PropPanel/MediaServicePropPanel';
import SpringCloudPropPanel from './PropPanel/SpringCloudPropPanel';
import DataCatalogPropPanel from './PropPanel/DataCatalogPropPanel';
import DataSharePropPanel from './PropPanel/DataSharePropPanel';
import ManagedIdentityPropPanel from './PropPanel/ManagedIdentityPropPanel';
import ServiceFabricClusterPropPanel from './PropPanel/ServiceFabricClusterPropPanel';
import ServiceFabricManagedClusterPropPanel from './PropPanel/ServiceFabricManagedClusterPropPanel';
import VirtualWANPropPanel from './PropPanel/VirtualWANPropPanel';
import ServiceEndpointPropPanel from './PropPanel/ServiceEndpointPropPanel';
import EventGridDomainPropPanel from './PropPanel/EventGridDomainPropPanel';
import ElasticJobAgentPropPanel from './PropPanel/ElasticJobAgentPropPanel';
import AADDomainServicePropPanel from './PropPanel/AADDomainServicePropPanel';
import AzureArcPropPanel from './PropPanel/AzureArcPropPanel';
import SecurityCenterPropPanel from './PropPanel/SecurityCenterPropPanel';
import DataBoxPropPanel from './PropPanel/DataBoxPropPanel';
import ApplicationSecurityGroupPropPanel from './PropPanel/ApplicationSecurityGroupPropPanel';
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
import DNSPrivateZonePropPanel from "./PropPanel/DNSPrivateZonePropPanel";
import DNSZonePropPanel from "./PropPanel/DNSZonePropPanel";
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
import EventGridSubscriptionPropPanel from "./PropPanel/EventGridSubscriptionPropPanel";
import EventHubPropPanel from "./PropPanel/EventHubPropPanel";
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
import IoTHubPropPanel from "./PropPanel/IoTHubPropPanel";
import MapsPropPanel from "./PropPanel/MapsPropPanel";
import TimeSeriesPropPanel from "./PropPanel/TimeSeriesPropPanel";
import IoTCentralPropPanel from "./PropPanel/IoTCentralPropPanel";
import NSGPropPanel from "./PropPanel/NSGPropPanel";
import AzureBatchPropPanel from "./PropPanel/AzureBatchPropPanel";
import DedicatedHostPropPanel from "./PropPanel/DedicatedHostPropPanel";
import NICPropPanel from "./PropPanel/NICPropPanel";

import OverlayPreviewDiagram from "./OverlayPreviewDiagram";
import ARMService from "../../services/ARMService";
import AuthService from "../../services/AuthService";
import ComputeService from "../../services/ComputeService";
import ProvisionHelper from './Helpers/ProvisionHelper';
import Toast from './Helpers/Toast';

import GojsManager from "./Helpers/GojsManager";
import Function from "../../models/Function";
import IPCIDR  from 'ip-cidr';
import GuidedDraggingTool from  "./GojsExtensions/GuidedDraggingTool.ts";
import  ResizeRotateMultipleTool from "./GojsExtensions/ResizeMultipleTool";
import './GojsExtensions/TextEditor';
import LocalStorageCommandHandler from './GojsExtensions/LocalStorageCommandHandler';
import AzureIcons from './Helpers/AzureIcons';

 export default class DiagramEditor extends Component {
 
  constructor(props) {
    super(props);

    this.$ = go.GraphObject.make;

    this.shortUID = new ShortUniqueId();

    //state
    this.state = {
        showShareDiagramPopup: false,
        shareLink: '',
        shareLinkInputbox: null,
        isLoading: false,
        isDiagramLoadedFromStorage: false,
        archetypeLinkMode: "o", //toggle between straight/ortho mode
        unsavedChanges: false,

        queryString: this.props.queryString,
        incrementalChanges: ''
    };

    this.Index = this.props.Index; //Index component contains progress Comp

    this.authsvc = AuthService;
    this.armsvc = new ARMService();
    this.comsvc = new ComputeService();
    this.diagService = new DiagramService();
    this.statusbarHelper = new StatusBarHelper();

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
    
    this.addKeyPressShortcuts();
    this.PromptSaveBeforeCloseBrowser();

    this.initRef();

    this.loadSharedDiagram();

    this.startTimerAutosave();

 }

  render() {
    return (
      <div id="diagramEditor" className="diagramEditor">

        <CommunicationServicePropPanel ref={this.communicationservicePropPanel} />
        <DeviceProvisioningServicePropPanel ref={this.deviceprovisioningservicePropPanel} />
        <DeviceUpdateForIoTHubPropPanel ref={this.deviceupdateforiothubPropPanel} />
        <DigitialTwinsPropPanel ref={this.digitaltwinsPropPanel} />
        <TimeSeriesInsightsEventSourcePropPanel ref={this.timeseriesinsightseventsourcePropPanel} />

        <EventHubClusterPropPanel ref={this.eventhubclusterPropPanel} />
        <LogicAppCustomConnectorPropPanel ref={this.logicappcustomconnectorPropPanel} />
        <IPGroupsPropPanel ref={this.ipgroupsPropPanel} />
        <AMPLSPropPanel ref={this.amplsPropPanel} />
        <NetworkManagerPropPanel ref={this.networkmanagerPropPanel} />
        <RouteFiltersPropPanel ref={this.routefiltersPropPanel} />
        <WAFPropPanel ref={this.wafPropPanel} />
        <AvailabilitySetPropPanel ref={this.availabilitysetPropPanel} />
        <ProximityPlacementGroupPropPanel ref={this.proxpgPropPanel} />

        <PrivateLinkPropPanel ref={this.privatelinkPropPanel} />
        <LocalNetworkGatewayPropPanel  ref={this.localnetworkgwPanel} />
        <PublicIpPrefixesPropPanel ref={this.pipprefixesPanel} />
        <HostPropPanel ref={this.hostpPropPanel} />
        <HostgroupPropPanel ref={this.hostgroupPropPanel} />
        <VMWareSolutionPropPanel ref={this.vmwaresolutionPropPanel} />
        <WorkspaceWVDPropPanel ref={this.workspacewvdPropPanel} />
        <DiskEncryptionSetPropPanel ref={this.diskencryptionsetPropPanel} />
        <ImagePropPanel ref={this.imagePropPanel} />
        <DiskSnapshotPropPanel ref={this.disksnapshotPropPanel} />
        <ImageTemplatePropPanel ref={this.imagetemplatePropPanel} />
        <AutomanagePropPanel  ref={this.automanagePropPanel} />
        <LabServicePropPanel  ref={this.labsvcPropPanel} />
        <DataBoxEdgePropPanel ref={this.databoxedgePropPanel} />
        <StorSimpleDataManagerPropPanel  ref={this.storsimpledatamanagerPropPanel} />
        <OnPremiseDataGatewayPropPanel ref={this.onpremdatagatewayPropPanel} />
        <PurviewAccountPropPanel ref={this.purviewaccountPropPanel} />
        <HPCCachePropPanel ref={this.hpccachePropPanel} />
        <AzureStackEdgePropPanel ref={this.azstackedgePropPanel} />
        <BackupVaultPropPanel ref={this.backupvaultPropPanel} />
        <StaticAppPropPanel ref={this.staticappPropPanel} />
        <AnalysisServicePropPanel ref={this.analysisservicePropPanel} />
        <NotificationHubPropPanel ref={this.notificationhubPropPanel} />
        <BlockchainPropPanel ref={this.blockchainPropPanel} />
        <MediaServicePropPanel ref={this.mediaservicePropPanel} />
        <SpringCloudPropPanel ref={this.springcloudPropPanel} />
        <DataCatalogPropPanel ref={this.datacatalogPropPanel} />
        <DataSharePropPanel ref={this.datasharePropPanel} />
        <ManagedIdentityPropPanel ref={this.managedidentityPropPanel} />
        <ServiceFabricClusterPropPanel ref={this.svcfabricclusterPropPanel} />
        <ServiceFabricManagedClusterPropPanel ref={this.svcfabricmanagedclusterPropPanel} />
        <VirtualWANPropPanel ref={this.virtualwanPropPanel} />
        <EventHubPropPanel ref={this.eventhubPropPanel} />
        <AzureBatchPropPanel ref={this.batchPropPanel} />
        <DedicatedHostPropPanel ref={this.dedicatedhostPropPanel} />
        <NICPropPanel ref={this.nicPropPanel} />
        <CognitivePropPanel ref={this.cognitivePropPanel} />
        <BotsServicePropPanel ref={this.botsPropPanel} />
        <GenomicsPropPanel ref={this.genomicsPropPanel} />
        <MLServiceWorkspacePropPanel ref={this.mlsvcworkspacePropPanel} /> 
        <NatGatewayPropPanel ref={this.natgwPropPanel} />
        <AzureArcPropPanel ref={this.arcPropPanel} />
        <ServiceEndpointPropPanel ref={this.svcendpointPropPanel} />
        <EventGridDomainPropPanel ref={this.egdomainPropPanel} />
        <ElasticJobAgentPropPanel ref={this.elasticjobagentPropPanel} />
        <AADDomainServicePropPanel ref={this.aaddomainservicePropPanel} />
        <SecurityCenterPropPanel  ref={this.ascPropPanel} />
        <DataBoxPropPanel ref={this.databoxPropPanel} />
        <ApplicationSecurityGroupPropPanel ref={this.asgPropPanel} />
        <RouteTablePropPanel ref={this.rtPropPanel} />
        <PrivateEndpointPropPanel ref={this.privateendpointPropPanel} />
        <AzStoragePropPanel ref={this.azstoragePropPanel} />
        <OverlayPreviewDiagram ref={this.previewOverlay} />
        <StylePropPanel ref={this.stylePanel}  />
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
        <IoTHubPropPanel ref={this.iothubPropPanel} />
        <MapsPropPanel ref={this.mapsPropPanel} />
        <TimeSeriesPropPanel ref={this.timeseriesPropPanel} />
        <IoTCentralPropPanel ref={this.iotcentralPropPanel} />
        <VNetPropPanel ref={this.vnetPropPanel} />
        <SubnetPropPanel ref={this.subnetPropPanel} />
        <NLBPropPanel ref={this.nlbPropPanel} />
        <AppGwPropPanel ref={this.appgwPropPanel} />
        <DNSPrivateZonePropPanel ref={this.dnsPrivateZonePropPanel} />
        <DNSZonePropPanel ref={this.dnszonePropPanel} />
        {/* share link copy */}
        <Overlay canEscapeKeyClose={false}
           isOpen={this.state.showShareDiagramPopup} onClose={this.closeShareDiagramPopup} >
          <div style={{width: '450px',height:'100px'}} className={[Classes.CARD, Classes.ELEVATION_4, "login-overlay"]}>
          <InputGroup

                    disabled={false}
                    fill={true}
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
    
    this.communicationservicePropPanel = React.createRef();
    this.deviceprovisioningservicePropPanel = React.createRef();
    this.deviceupdateforiothubPropPanel = React.createRef();
    this.digitaltwinsPropPanel = React.createRef();
    this.timeseriesinsightseventsourcePropPanel = React.createRef();
    this.eventhubclusterPropPanel = React.createRef();
    this.logicappcustomconnectorPropPanel = React.createRef();
    this.ipgroupsPropPanel = React.createRef();
    this.amplsPropPanel = React.createRef();
    this.networkmanagerPropPanel = React.createRef();
    this.routefiltersPropPanel = React.createRef();
    this.availabilitysetPropPanel = React.createRef();
    this.proxpgPropPanel = React.createRef();
    this.wafPropPanel = React.createRef();

    this.privatelinkPropPanel = React.createRef();
    this.localnetworkgwPanel = React.createRef();
    this.pipprefixesPanel = React.createRef();
    this.hostpPropPanel = React.createRef();
    this.hostgroupPropPanel = React.createRef();
    this.vmwaresolutionPropPanel = React.createRef();
    this.workspacewvdPropPanel = React.createRef();
    this.diskencryptionsetPropPanel = React.createRef();
    this.imagePropPanel = React.createRef();
    this.disksnapshotPropPanel = React.createRef();
    this.imagetemplatePropPanel = React.createRef();
    this.automanagePropPanel = React.createRef();
    this.labsvcPropPanel  = React.createRef();
    this.databoxedgePropPanel = React.createRef();
    this.storsimpledatamanagerPropPanel = React.createRef();
    this.onpremdatagatewayPropPanel = React.createRef();
    this.purviewaccountPropPanel = React.createRef();
    this.hpccachePropPanel = React.createRef();
    this.azstackedgePropPanel = React.createRef();
    this.backupvaultPropPanel = React.createRef();
    this.staticappPropPanel = React.createRef();
    this.analysisservicePropPanel = React.createRef();
    this.notificationhubPropPanel = React.createRef();
    this.blockchainPropPanel = React.createRef();
    this.mediaservicePropPanel = React.createRef();
    this.springcloudPropPanel = React.createRef();
    this.datacatalogPropPanel = React.createRef();
    this.datasharePropPanel = React.createRef();
    this.managedidentityPropPanel = React.createRef();
    this.svcfabricclusterPropPanel = React.createRef();
    this.svcfabricmanagedclusterPropPanel = React.createRef();
    this.virtualwanPropPanel = React.createRef();
    this.nicPropPanel = React.createRef();
    this.eventhubPropPanel = React.createRef();
    this.batchPropPanel = React.createRef();
    this.dedicatedhostPropPanel = React.createRef();
    this.cognitivePropPanel = React.createRef();
    this.botsPropPanel = React.createRef();
    this.genomicsPropPanel = React.createRef();
    this.mlsvcworkspacePropPanel = React.createRef();
    this.databoxPropPanel = React.createRef();
    this.natgwPropPanel = React.createRef();
    this.ascPropPanel = React.createRef();
    this.svcendpointPropPanel= React.createRef();
    this.egdomainPropPanel = React.createRef();
    this.elasticjobagentPropPanel = React.createRef();
    this.aaddomainservicePropPanel = React.createRef();
    this.arcPropPanel = React.createRef();
    this.rtPropPanel = React.createRef();
    this.asgPropPanel = React.createRef();
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
    this.dnszonePropPanel = React.createRef();
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
          'animationManager.isEnabled': true,  // turn off automatic animation

          commandHandler: new LocalStorageCommandHandler(this),
          
          autoScrollRegion: new go.Margin(20, 20, 20, 20),
          allowHorizontalScroll: true,
          allowVerticalScroll : true,

          draggingTool: new GuidedDraggingTool(), 
          "draggingTool.horizontalGuidelineColor": "blue",
          "draggingTool.verticalGuidelineColor": "blue",
          "draggingTool.centerGuidelineColor": "green",
          "draggingTool.guidelineWidth": 1,

          // allow Ctrl-G to call groupSelection
          "commandHandler.archetypeGroupData": { text: "Group", isGroup: true, color: "blue" },
          
          "ClipboardPasted": function(e) { e.diagram.commandHandler.copyToClipboard(null); },

          isReadOnly: false,
          allowZoom: true,
          allowSelect: true,
          allowCopy: true,
          allowDelete: true,
          allowInsert: true,
          allowGroup: true,
          allowUngroup: true,
          allowClipboard: true,
          autoScrollRegion: 30,
          "draggingTool.dragsLink": true,
          "relinkingTool.isUnconnectedLinkValid": true,
          "linkingTool.isUnconnectedLinkValid": true,
          "linkingTool.temporaryLink":
              this.$(go.Link,
                {
                  routing: go.Link.AvoidsNodes,
                  curve: go.Link.JumpOver,
                  corner: 5, toShortLength: 4,
                  relinkableFrom: true,
                  relinkableTo: true,
                  reshapable: true
                },
                new go.Binding("points").makeTwoWay(),
                this.$(go.Shape, { strokeWidth: 1.5 })
                
              ),
          "linkingTool.archetypeLinkData": { 
            fromArrow: '',
            toArrow: 'Standard',
            adjusting: go.Link.Stretch,
            stroke: 'black',
            strokeWidth: 1.5,
            opacity: 0,
            strokeDashArray: null,
            nodetype: GoNodeType.Link(),
            category: 'ortho'
          }
      });
    this.diagram.layout.isInitial = false;

    this.diagram.toolManager.textEditingTool.defaultTextEditor = window.TextEditor;

    this.diagram.scrollMode = go.Diagram.InfiniteScroll;

    // this tool operates independently of any existing ResizingTool or RotatingTool
    this.diagram.toolManager.mouseDownTools.add(new ResizeRotateMultipleTool());

    this.initDiagramBehaviors();

    var model =
      new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray);

    //!important, without these 2 properties, when load saved diagram, links won't be connected to parts
    model.linkFromPortIdProperty = "fromPort";
    model.linkToPortIdProperty = "toPort";

    this.diagram.model = model;
}

initDiagramBehaviors() {

  var forelayer = this.diagram.findLayer("Foreground");
  this.diagram.addLayerBefore(this.$(go.Layer, { name: "foreground" }), forelayer);

  this.initTemplates();

  this.initPanningwithRightMouseClick();

  this.initDiagramModifiedEvent();

  this.generalContextmenu = this.initContextMenu();
  this.diagram.contextMenu = this.generalContextmenu;
}


triggerLinkAnimation() {
  var thisComp = this;
  this.animation = new go.Animation();
  this.animation.easing = go.Animation.EaseLinear;
      this.diagram.links.each(function(link) {
        thisComp.animation.add(link.findObject("ANIMATE"), "strokeDashOffset", 20, 0)
      });
      // Run indefinitely
  this.animation.runCount = Infinity;
  this.animation.start();
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
          resizable: true,
          rotatable: true,
          zOrder: 40,
          width: 100,
          height: 30,
          margin: 1,
          selectionChanged: function(p) {
            p.layerName = (p.isSelected ? "Foreground" : '');
          },
          contextMenu: this.initContextMenu()
        },
        new go.Binding("nodetype"),
        new go.Binding("angle").makeTwoWay(),
        new go.Binding("zOrder").makeTwoWay(),
        new go.Binding("width").makeTwoWay(),
        new go.Binding("height").makeTwoWay(),
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        this.$(go.TextBlock,
          { 
            name: "TEXT",
            editable: true,
            isMultiline: true,
            font: 'Segoe UI',
            stroke: 'black',
            textAlign: "center"
          },
          new go.Binding('textAlign').makeTwoWay(),
          new go.Binding('stroke', 'stroke').makeTwoWay(),
          new go.Binding('font', 'font').makeTwoWay(),
          new go.Binding("text").makeTwoWay()
        ),
        this.makePort("T", go.Spot.Top,  go.Spot.TopSide, true, true),
        this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true),
        this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
        this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true)
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
      locationSpot: go.Spot.Center,
      selectable: true,
      resizable: true, 
      resizeObjectName: "PANEL",
      selectionObjectName: "PANEL",
      selectionChanged: function(p) {
        p.layerName = (p.isSelected ? "Foreground" : '');
      },
      contextMenu: this.initContextMenu()
    },
    this.$(go.Panel, "Vertical",
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
              isMultiline: true,
              textAlign: "center"
            },
            {row:1,column:0},
            new go.Binding("textAlign").makeTwoWay(),
            new go.Binding("text").makeTwoWay(),
            new go.Binding("font").makeTwoWay(),
            new go.Binding("stroke").makeTwoWay()
            ),
    ),
    // this.$(go.Picture,
    //   {
    //     name: "PICTURE",
    //     stretch: go.GraphObject.Fill
    //   },
    //   {row:0,column:0},
    //   new go.Binding("source","source"),
    //   new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)
    // ),
    

        this.makePort("T", go.Spot.Top,  go.Spot.TopSide, true, true),
        this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true),
        this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
        this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true)
    );

  return template;
}

createVIRBySkuBased(dropContext) {

  switch(dropContext.resourceType) {

      case ResourceType.SpringCloud():
        if(this.diagram.selection.first() != null)
          this.createVIROntoSubnet({
            resourceType: ResourceType.SpringCloud(),
            x: dropContext.x,
            y: dropContext.y
          })
        else
          this.createNonVIRAzureResource({
            source: require('../../assets/IconCloud/azure/compute/10370-icon-Azure Spring Cloud-Compute.svg'),
            label: 'spring cloud', x: dropContext.x, y: dropContext.y,
            azcontext: new SpringCloud()
          });
      break;

      case ResourceType.NLB():
        if(this.diagram.selection.first() != null)
          this.createVIROntoSubnet({
            resourceType: ResourceType.NLB(),
            x: dropContext.x,
            y: dropContext.y
          })
        else
          this.createNonVIRAzureResource({
            source: require('../../assets/IconCloud/azure/network/10062-icon-Load Balancers-Networking.svg'),
            label: 'external load balancer', x: dropContext.x, y: dropContext.y,
            azcontext: new NLB()
          });
      break;
      
      case ResourceType.APIM():

        if(this.diagram.selection.first() != null)
        this.createVIROntoSubnet({
          resourceType: ResourceType.APIM(),
          x: dropContext.x,
          y: dropContext.y
        })
      else
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/integration/10042-icon-API Management Services-Integration.svg'),
          label: 'non-premium apim', x: dropContext.x, y: dropContext.y,
          azcontext: new APIM()
        });

      break;
      case ResourceType.Redis():

        if(this.diagram.selection.first() != null)
        this.createVIROntoSubnet({
          resourceType: ResourceType.Redis(),
          x: dropContext.x,
          y: dropContext.y
        })
        else
          this.createNonVIRAzureResource({
            source: require('../../assets/IconCloud/azure/databases/10137-icon-Cache Redis-Databases.svg'),
            label: 'non-premium redis', x: dropContext.x, y: dropContext.y,
            azcontext: new Redis()
          });
      break;
  }
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
          var existingContext = Utils.deepClone(azcontext);
          thisComp.determineResourcePropertyPanelToShow
            (azcontext, function onContextSaveCallback(savedContext){

                node.data.azcontext = savedContext;

                if(Utils.isObjPropChange(existingContext, savedContext)) {
                  thisComp.setDiagramModifiedTrue();
                }
                
            });
        }
      },
      new go.Binding("azcontext", "azcontext").makeTwoWay(),
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding("zOrder").makeTwoWay(),
      this.$(go.Panel, "Vertical",
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
              isMultiline: true,
              textAlign: "center"
            },
            {row:1,column:0},
            new go.Binding("textAlign").makeTwoWay(),
            new go.Binding("text").makeTwoWay(),
            new go.Binding("font").makeTwoWay(),
            new go.Binding("stroke").makeTwoWay()
            ),
          ),
          this.makePort("T", go.Spot.Top,  go.Spot.TopSide, true, true),
          this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true),
          this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
          this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true)
      );

  return template;
}

createShapeTemplate() {

  var thisComp = this;

  var shapeTemplate = this.$(go.Node, "Spot",
      {
        movable: true,
        selectable: true,
        resizable: true,
        resizeObjectName: "SHAPE",
        selectionObjectName: "SHAPE",
        rotatable: true,
        // selectionChanged: function(p) {
        //   p.layerName = (p.isSelected ? "Foreground" : '');
        // },
        contextMenu: this.initContextMenu()
      },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding("zOrder").makeTwoWay(),
      new go.Binding("angle").makeTwoWay(),
      this.$(go.Shape,
        {
          name: 'SHAPE',
          strokeWidth: 2,
          desiredSize: new go.Size(100, 100)
        },
        new go.Binding("figure", "figure"),
        new go.Binding("strokeDashArray", "strokeDashArray").makeTwoWay(),
        new go.Binding("fill").makeTwoWay(),
        new go.Binding("stroke").makeTwoWay(),
        new go.Binding("desiredSize").makeTwoWay(),
      ),
      this.$(go.TextBlock,
        { 
          editable: true,
          isMultiline: true,
          textAlign: "center"
        },
        new go.Binding("text").makeTwoWay(),
        new go.Binding("stroke", "textStroke").makeTwoWay(),
        new go.Binding("font").makeTwoWay()),

        this.makeShapePort("T", go.Spot.Top, go.Spot.Top, go.Spot.TopSide, true, true),
        this.makeShapePort("B", go.Spot.Bottom, go.Spot.Bottom, go.Spot.BottomSide, true, true),
        this.makeShapePort("L", go.Spot.Left, go.Spot.Left, go.Spot.LeftSide, true, true),
        this.makeShapePort("R", go.Spot.Right, go.Spot.Right, go.Spot.RightSide, true, true)
      );
    
    return shapeTemplate;
}

makePort(name, align, spot, output, input) {
  var diagram = this.diagram;

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

makeShapePort(name, align, alignFocus, spot, output, input, figure) {
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
      alignmentFocus: alignFocus,
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
              { isPanelMain: true, strokeWidth: 1.5, stroke: "transparent", name: "HIGHLIGHT" },
              new go.Binding("stroke").makeTwoWay(),
              new go.Binding("strokeDashArray", "strokeDashArray").makeTwoWay(),
              new go.Binding("strokeWidth").makeTwoWay(),
              new go.Binding("stroke").makeTwoWay(),
            ),
            this.$(go.Shape, 
              { isPanelMain: true, opacity: 0, stroke: "white", name: "ANIMATE", strokeDashArray: [10, 10] 
              },
              new go.Binding("opacity").makeTwoWay(),
              new go.Binding("strokeWidth").makeTwoWay()
            ),
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
          new go.Binding("zOrder").makeTwoWay(),
          this.$(go.Shape,  // the highlight shape, normally transparent
            { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" },
            new go.Binding("stroke").makeTwoWay(),
            new go.Binding("strokeDashArray", "strokeDashArray").makeTwoWay(),
            new go.Binding("strokeWidth").makeTwoWay(),
            new go.Binding("stroke").makeTwoWay(),
          ),
        new go.Binding("strokeWidth").makeTwoWay(),
        new go.Binding("stroke").makeTwoWay(),
        this.$(go.Shape, 
          { isPanelMain: true, opacity: 0, stroke: "white", name: "ANIMATE", strokeDashArray: [10, 10] 
          },
          new go.Binding("opacity").makeTwoWay(),
          new go.Binding("strokeWidth").makeTwoWay()
        ),
        this.$(go.Shape,
              new go.Binding("fromArrow", "fromArrow")),
        this.$(go.Shape,
                new go.Binding("toArrow", "toArrow"))
    );

    var orthogonalLink =
        this.$(go.Link,  // the whole link panel
          {
            routing: go.Link.Orthogonal,
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
          new go.Binding("points").makeTwoWay(),
          new go.Binding("zOrder").makeTwoWay(),
          this.$(go.Shape,  // the highlight shape, normally transparent
            { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" },
            new go.Binding("stroke").makeTwoWay(),
            new go.Binding("strokeDashArray", "strokeDashArray").makeTwoWay(),
            new go.Binding("strokeWidth").makeTwoWay(),
            new go.Binding("stroke").makeTwoWay(),
          ),
          this.$(go.Shape, 
            { isPanelMain: true, opacity: 0, stroke: "white", name: "ANIMATE", strokeDashArray: [10, 10] 
            },
            new go.Binding("opacity").makeTwoWay(),
            new go.Binding("strokeWidth").makeTwoWay()
          ),
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
        selectionObjectName: "GROUPBORDER",  // selection handle goes around shape, not label
        resizeObjectName: "GROUPBORDER",
        ungroupable: true,  // enable Ctrl-Shift-G to ungroup a selected Group
        contextMenu: this.initContextMenu()
      },
      new go.Binding("location", "loc", go.Point.parse),
      this.$(go.Shape, "Rectangle",  // the rectangular shape around the members
          {
            name: "GROUPBORDER",
            fill: "transparent", stroke: "transparent", strokeWidth: 0,
            portId: "", cursor: "pointer",
            fromLinkable: false, fromLinkableSelfNode: false, fromLinkableDuplicates: false,
            toLinkable: false, toLinkableSelfNode: false, toLinkableDuplicates: false
          }),
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
          this.$(go.Panel, "Auto",
            {
              stretch: go.GraphObject.Fill
            },
            this.$(go.Placeholder, { margin: 5, background: "transparent" })
          ),
      this.makePort("T", go.Spot.Top,  go.Spot.TopSide, true, true),
      this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true),
      this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
      this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true)  
    );

    return groupTemplate;
}
//loadFromSourceCallback can be undefined on purpose
initDiagramModifiedEvent(isLoadFromSource) {
  var thisComp = this;

  //on graphobject change
  // this.diagram.addDiagramListener("Modified",
  //   function(e) {

  //     //nothing on canvas remove change flag
  //     if(e.diagram.nodes.count == 0) {
  //       thisComp.setDiagramModifiedFalse();
  //       return;
  //     }
      
  //     if(thisComp.diagram.isModified) {
  //       if(thisComp.state.unsavedChanges)
  //         return;
  //        thisComp.setDiagramModifiedTrue();
  //     }
  //   });

    //on model change
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
            thisComp.setDiagramModifiedFalse();
            thisComp.statusbarHelper.resetStatusBar(StatusBarHelper.SourceNone());
            return;
          }

          if(isLoadFromSource) {
            isLoadFromSource = false;
            thisComp.setDiagramModifiedFalse();
            return;
          }
          
          if(thisComp.state.unsavedChanges)
              return;

          //none of the above criteria, set modify true
          thisComp.setDiagramModifiedTrue();
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
                    
                      thisComp.setDiagramModifiedTrue();
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
                    
                      thisComp.setDiagramModifiedTrue();
                  }
                } 
              },
              new go.Binding("visible", "", function(o) {
                  return Utils.isSubnet(o.diagram.selection.first());
              }).ofObject()
          ),
        
        this.$("ContextMenuButton",
          this.$(go.TextBlock, "Add/Remove Service Endpoint"),
              { 
                click: function(e, obj) {
                  if(Utils.isUDR(obj.part)) {
                      if(obj.part.data.svcendVisible == false)
                        thisComp.diagram.model.setDataProperty(obj.part.data, 'svcendVisible', true);
                      else
                        thisComp.diagram.model.setDataProperty(obj.part.data, 'svcendVisible', false);
                      
                      thisComp.setDiagramModifiedTrue();
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
                   var selectedNodes =  e.diagram.selection;
                   var it = selectedNodes.iterator;
                   while(it.next()){
                     var node = it.value;
                     e.diagram.commit(function(d) {
                     var data = node.data;
                      d.model.set(data, "zOrder", data.zOrder + 20);
                    }, 'increase zOrder');
                   }
                }
              },
              new go.Binding("visible", "", 
              function(o) {
                  if(o.diagram.selection.count == 0)
                      return false;
                  else
                      return true;
              }).ofObject()),
        
          this.$("ContextMenuButton",
              this.$(go.TextBlock, "Send to Back"),
                  { 
                    click: function(e, obj) 
                    { 
                       var selectedNodes =  e.diagram.selection;
                       var it = selectedNodes.iterator;
                       while(it.next()){
                         var node = it.value;
                         e.diagram.commit(function(d) {
                         var data = node.data;
                          d.model.set(data, "zOrder", data.zOrder - 20);
                        }, 'decrease zOrder');
                       }
                    }
                  },
                  new go.Binding("visible", "", 
                  function(o) {
                      if(o.diagram.selection.count == 0)
                          return false;
                      else
                          return true;
                  }).ofObject()),

        this.$("ContextMenuButton",
          this.$(go.TextBlock, "Zoom to Fit"),
              { 
                click: function(e, obj) 
                { 
                  e.diagram.commandHandler.zoomToFit();
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
                ),
          
          this.$("ContextMenuButton",
              this.$(go.TextBlock, "Animate"),
                  { 
                    click: function(e, obj) {
                    
                      var node =  e.diagram.selection.first();
                      var linkAnimatePart = node.findObject("ANIMATE");
                      if(linkAnimatePart != null) {
                        if(linkAnimatePart.opacity == 0) {
                          e.diagram.model.setDataProperty(node.data, 'opacity', 1);
                          thisComp.setDiagramModifiedTrue();
                        }
                        else {
                          e.diagram.model.setDataProperty(node.data, 'opacity', 0);
                          thisComp.setDiagramModifiedTrue();
                        }
                        thisComp.triggerLinkAnimation();
                      }
                    } 
                  },
                  new go.Binding("visible", "", function(o) {
                      return o.data.nodetype == "link";
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
      e.handled = true;
      e.event.preventDefault();
      e.event.stopPropagation();

      var result =  thisComp.getSubnetsCidrsAzContextOfVNet(vnet);
      
      var azcontext = vnet.data.azcontext;
      var existingContext = Utils.deepClone(azcontext);
      azcontext.GraphModel.SubnetsAndCidrs = result.SubnetsCidrs;

      thisComp.determineResourcePropertyPanelToShow
        (azcontext, function onContextSaveCallback(savedContext){

          vnet.azcontext = savedContext;

          if(Utils.isObjPropChange(existingContext, savedContext)) {
            thisComp.setDiagramModifiedTrue();
          }

        });
    }
  },
  new go.Binding("azcontext"),
  new go.Binding("zOrder").makeTwoWay(),
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
          isMultiline: false
        },
        new go.Binding("text").makeTwoWay(),
        new go.Binding("stroke", "textStroke").makeTwoWay(),
        new go.Binding("font").makeTwoWay(),
        new go.Binding("alignment").makeTwoWay(),
        new go.Binding("alignmentFocus").makeTwoWay()
        ),
    this.$(go.Picture, {
          stretch: go.GraphObject.Fill,
          desiredSize: new go.Size(25,25),
          alignment: go.Spot.TopRight, alignmentFocus: go.Spot.BottomRight,
          source: require('../../assets/IconCloud/azure/network/10061-icon-Virtual Networks-Networking.svg')
        }),
        this.$(go.Picture, {
          name: "NATGW",
          stretch: go.GraphObject.Fill,
          desiredSize: new go.Size(25,25),
          alignment: new go.Spot(1, 0, -42, -12),
          source: require('../../assets/IconCloud/azure/network/10310-icon-NAT-Networking.svg'),
          doubleClick: function(e, shape) {
            e.handled = true;
            e.event.preventDefault();
            e.event.stopPropagation();

            var azcontext = shape.natgwazcontext;
            var existingContext = Utils.deepClone(azcontext);
            thisComp.determineResourcePropertyPanelToShow
              (azcontext, function onContextSaveCallback(savedContext){
                shape.azcontext = savedContext;

                if(Utils.isObjPropChange(existingContext, savedContext)) {
                  thisComp.setDiagramModifiedTrue();
                }
              });
          }
        },
          new go.Binding('visible', 'natgwVisible').makeTwoWay(),
          new go.Binding('natgwazcontext').makeTwoWay()
        ),
        this.makePort("T", go.Spot.Top,  go.Spot.TopSide, true, true),
        this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true),
        this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
        this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true)
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

        e.handled = true;
        e.event.preventDefault();
        e.event.stopPropagation();

        var vnet = subnet.containingGroup;

        var result =  thisComp.getSubnetsCidrsAzContextOfVNet(vnet);
        
        var azcontext = subnet.data.azcontext;
        var existingContext = Utils.deepClone(azcontext);

        azcontext.GraphModel.VNetAddressSpace = result.VNetAddressSpace;
        azcontext.GraphModel.SubnetsAndCidrs = result.SubnetsCidrs;

        thisComp.determineResourcePropertyPanelToShow
          (azcontext, function onContextSaveCallback(savedContext){
            subnet.azcontext = savedContext;
            if(Utils.isObjPropChange(existingContext, savedContext)) {
              thisComp.setDiagramModifiedTrue();
            }
          });
      }
    },
    new go.Binding("azcontext", "azcontext"),
    new go.Binding("zOrder").makeTwoWay(),
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
        isMultiline: false
      },
      new go.Binding("text").makeTwoWay(),
      new go.Binding("stroke", "textStroke").makeTwoWay(),
      new go.Binding("font").makeTwoWay(),
      new go.Binding("alignment").makeTwoWay(),
      new go.Binding("alignmentFocus").makeTwoWay()
      ),
      this.$(go.Picture, {
        name: "NSG",
        stretch: go.GraphObject.Fill,
        desiredSize: new go.Size(24,24),
        alignment: new go.Spot(0, 0, 6, -15),
        source: require('../../assets/IconCloud/azure/nondeployable/10067-icon-Network Security Groups-Networking.svg'),
        
        doubleClick: function(e, picture) {
          e.handled = true;
          e.event.preventDefault();
          e.event.stopPropagation();

          var azcontext = picture.nsgazcontext;
          var existingContext = Utils.deepClone(azcontext);

          thisComp.determineResourcePropertyPanelToShow
            (azcontext, function onContextSaveCallback(savedContext){
                picture.azcontext = savedContext;

                if(Utils.isObjPropChange(existingContext, savedContext)) {
                  thisComp.setDiagramModifiedTrue();
                }
            });
        }
      },
        new go.Binding('visible', 'nsgVisible').makeTwoWay(),
        new go.Binding('nsgazcontext').makeTwoWay()
      ),
      this.$(go.Picture, {
        name: "UDR",
        stretch: go.GraphObject.Fill,
        desiredSize: new go.Size(25,25),
        alignment: new go.Spot(0, 0, 31, -17),
        source: require('../../assets/IconCloud/azure/nondeployable/10082-icon-Route Tables-Networking.svg'),
        doubleClick: function(e, picture) {
          e.handled = true;
          e.event.preventDefault();
          e.event.stopPropagation();

          var azcontext = picture.udrazcontext;
          var existingContext = Utils.deepClone(azcontext);

          thisComp.determineResourcePropertyPanelToShow
            (azcontext, function onContextSaveCallback(savedContext){
              picture.azcontext = savedContext;

              if(Utils.isObjPropChange(existingContext, savedContext)) {
                thisComp.setDiagramModifiedTrue();
              }

            });
        }
      },
        new go.Binding('visible', 'udrVisible').makeTwoWay(),
        new go.Binding('udrazcontext').makeTwoWay()
      ),
      this.$(go.Picture, {
        stretch: go.GraphObject.Fill,
        desiredSize: new go.Size(25,25),
        alignment: go.Spot.TopRight,
        alignmentFocus: go.Spot.BottomLeft,
        
        source: require('../../assets/IconCloud/azure/network/02742-icon-Subnet-menu.svg')
      }),
      this.$(go.Picture, {
        name: "SVCEndpoint",
        stretch: go.GraphObject.Fill,
        desiredSize: new go.Size(25,25),
        alignment: new go.Spot(0, 0, 61, -15),
        isActionable: true,  
        source: require('../../assets/IconCloud/azure/nondeployable/02578-icon-Service Endpoints-menu.svg'),
        doubleClick: function(e, picture) {
          e.handled = true;
          e.event.preventDefault();
          e.event.stopPropagation();

          var azcontext = picture.svcendazcontext;
          var existingContext = Utils.deepClone(azcontext);

          thisComp.determineResourcePropertyPanelToShow
            (azcontext, function onContextSaveCallback(savedContext){
              picture.azcontext = savedContext;
              if(Utils.isObjPropChange(existingContext, savedContext)) {
                thisComp.setDiagramModifiedTrue();
              }
            });
        }
      },
        new go.Binding('visible', 'svcendVisible').makeTwoWay(),
        new go.Binding('svcendazcontext').makeTwoWay()
      ),
      this.makePort("T", go.Spot.Top,  go.Spot.TopSide, true, true),
      this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true),
      this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
      this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true)
    );

return subnetTemplate;
}

getSubnetsCidrsAzContextOfVNet(vnetGroup) {
  if(!Utils.isAzContextExist(vnetGroup))
    return {
        VNetAddressSpace: vnetGroup.data.azcontext.ProvisionContext.AddressSpace,
        SubnetsCidrs: []
    };

    var result = {
        VNetAddressSpace: vnetGroup.data.azcontext.ProvisionContext.AddressSpace,
        SubnetsCidrs: []
    };

    var ite = vnetGroup.memberParts;

    while(ite.next()) {
      var nodeInVNet = ite.value;

      if(!Utils.isSubnet(nodeInVNet))
        continue;

        var subnetAzContext = nodeInVNet.data.azcontext;

        result.SubnetsCidrs.push({
          subnetName: subnetAzContext.ProvisionContext.Name,
          cidr: subnetAzContext.ProvisionContext.AddressSpace,
          addressCount: Utils.getIPCountFromCidr(subnetAzContext.ProvisionContext.AddressSpace),
          usableAddress: Utils.getIPCountFromCidr(subnetAzContext.ProvisionContext.AddressSpace) - 5,
          lastIP: subnetAzContext.ProvisionContext.AddressSpace != ''
            ? new IPCIDR(subnetAzContext.ProvisionContext.AddressSpace).end()
            : ''
        });
    }

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
          var existingContext = Utils.deepClone(azcontext);

          thisComp.determineResourcePropertyPanelToShow
            (azcontext, function onContextSaveCallback(savedContext){
                node.data.azcontext = savedContext;

                if(Utils.isObjPropChange(existingContext, savedContext)) {
                  thisComp.setDiagramModifiedTrue();
                }
            });
        },
        dragComputation: this.makeSubnetVIRStayInGroup
      },
      new go.Binding("azcontext", "azcontext"),
      new go.Binding("zOrder").makeTwoWay(),
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
              isMultiline: true,
              textAlign: "center"
            },
            {row:1,column:0},
            new go.Binding("text").makeTwoWay(),
            new go.Binding("font").makeTwoWay(),
            new go.Binding("stroke").makeTwoWay()
            ),
          ),
          this.makePort("T", go.Spot.Top,  go.Spot.TopSide, true, true),
          this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true),
          this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
          this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true)
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
      angle: dropContext.angle != undefined ? dropContext.angle : 0,
      zOrder: 0,
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
      zOrder: -50,
      alignment: go.Spot.TopLeft,
      alignmentFocus: go.Spot.BottomLeft,
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
      svcendazcontext: new ServiceEndpoint(),

      alignment: go.Spot.TopRight,
      alignmentFocus: go.Spot.BottomRight,

      nsgVisible: false,
      udrVisible: false,
      svcendVisible: false,
      zOrder: -20,
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

    this.setDiagramModifiedTrue();
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

        case ResourceType.SpringCloud():
          if(Utils.isSubnetTakenByDedicatedSubnetVIR(subnet)) {
            Toast.show('warining', 2500, Messages.ResourceInSubnetTakenByDedicatedSubnetResource());
            return;
          }
          
          text = 'spring cloud';
          nodeKey = 'springcloud-' + this.shortUID.randomUUID(6);
          image = require('../../assets/IconCloud/azure/compute/10370-icon-Azure Spring Cloud-Compute.svg');
          azcontext = new SpringCloud();
        break;

        case ResourceType.ServiceFabricCluster():
          if(Utils.isSubnetTakenByDedicatedSubnetVIR(subnet)) {
            Toast.show('warining', 2500, Messages.ResourceInSubnetTakenByDedicatedSubnetResource());
            return;
          }
          
          text = 'service fabric cluster';
          nodeKey = 'svcfabriccluster-' + this.shortUID.randomUUID(6);
          image = require('../../assets/IconCloud/azure/compute/10036-icon-Service Fabric Clusters-Compute.svg');
          azcontext = new ServiceFabricCluster();
        break;

        case ResourceType.ServiceFabricManagedCluster():
          if(Utils.isSubnetTakenByDedicatedSubnetVIR(subnet)) {
            Toast.show('warining', 2500, Messages.ResourceInSubnetTakenByDedicatedSubnetResource());
            return;
          }
          
          text = 'service fabric managed cluster';
          nodeKey = 'svcfabricmanagedcluster-' + this.shortUID.randomUUID(6);
          image = require('../../assets/IconCloud/azure/compute/02370-icon-Managed Service Fabric-New Icons.svg');
          azcontext = new ServiceFabricManagedCluster();
        break;

        case ResourceType.HPCCache():
          if(Utils.isSubnetTakenByDedicatedSubnetVIR(subnet)) {
            Toast.show('warining', 2500, Messages.ResourceInSubnetTakenByDedicatedSubnetResource());
            return;
          }
          
          text = 'hpc cache';
          nodeKey = 'hpccache-' + this.shortUID.randomUUID(6);
          image = require('../../assets/IconCloud/azure/data_storage/00776-icon-Azure HCP Cache-Storage.svg');
          azcontext = new HPCCache();
        break;

        case ResourceType.PrivateEndpoint():
          if(Utils.isSubnetTakenByDedicatedSubnetVIR(subnet)) {
            Toast.show('warining', 7000, Messages.ResourceInSubnetTakenByDedicatedSubnetResource());
            return;
          }
          text = 'private endpoint';
          nodeKey = Utils.uniqueId('pendp');
          image = require('../../assets/IconCloud/azure/network/02579-icon-Private Endpoints-menu.svg');
          azcontext = new PrivateEndpoint();
        break;
        case ResourceType.WindowsVM():
          if(Utils.isSubnetTakenByDedicatedSubnetVIR(subnet)) {
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
          if(Utils.isSubnetTakenByDedicatedSubnetVIR(subnet)) {
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
          if(Utils.isSubnetTakenByDedicatedSubnetVIR(subnet)) {
            Toast.show('warining', 2500, Messages.ResourceInSubnetTakenByDedicatedSubnetResource());
            return;
          }
          
          text = 'vm scale sets';
          nodeKey = 'vmss-' + this.shortUID.randomUUID(6);
          image = require('../../assets/IconCloud/azure/compute/10034-icon-VM Scale Sets-Compute.svg');
          azcontext = new VMSS();
        break;
        case ResourceType.Firewall():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }
          text = 'firewall';
          nodeKey = 'azfw-' + this.shortUID.randomUUID(6);
          image = require('../../assets/IconCloud/azure/network/10084-icon-Firewalls-Networking.svg');
          azcontext = new AzureFirewall();
        break;
        case ResourceType.Bastion():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }
          text = 'bastion';
          nodeKey = 'bastion-' + this.shortUID.randomUUID(6);
          image = require('../../assets/IconCloud/azure/security_identity/02422-icon-Bastions-Preview.svg');
          azcontext = new Bastion();
        break;
        case ResourceType.AppGw():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }
          text = 'app gateway';
          nodeKey = 'appgw-' + this.shortUID.randomUUID(6);
          image = require('../../assets/IconCloud/azure/network/10076-icon-Application Gateways-Networking.svg');
          azcontext = new AppGateway();
        break;
        case ResourceType.ASE():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }
          text = 'ase';
          nodeKey = Utils.uniqueId('ase');
          image = require('../../assets/IconCloud/azure/appservices/10047-icon-App Service Environments-App Services.svg');
          azcontext = new ASE();
        break;
        case ResourceType.ISE():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }
          text = 'ise';
          nodeKey = Utils.uniqueId('ise');
          image = require('../../assets/IconCloud/azure/integration/00555-icon-Integration Service Environments-Integration.svg');
          azcontext = new IntegratedServiceEnvironment();
        break;
        case ResourceType.SQLMI():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }
          text = 'sql mi';
          nodeKey = Utils.uniqueId('sqlmi');
          image = require('../../assets/IconCloud/azure/databases/10136-icon-SQL Managed Instance-Databases.svg');
          azcontext = new SQLMI();
        break;
        case ResourceType.HdInsight():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }

          text = 'hdinsight';
          nodeKey = Utils.uniqueId('hdinsight');
          image = require('../../assets/IconCloud/azure/data_analytics/10142-icon-HD Insight Clusters-Analytics.svg');
          azcontext = new HdInsight();
        break;
        case ResourceType.Databricks():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }

          text = 'databricks';
          nodeKey = Utils.uniqueId('databricks');
          image = require('../../assets/IconCloud/azure/data_analytics/10787-icon-Azure Databricks-Analytics.svg');
          azcontext = new Databricks();
        break;
        case ResourceType.AADDomainService():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }

          text = 'aad domain service';
          nodeKey = Utils.uniqueId('databricks');
          image = require('../../assets/IconCloud/azure/security_identity/10222-icon-Azure AD Domain Services-Identity.svg');
          azcontext = new AzureADDomainService();
        break;
        case ResourceType.Kubernetes():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }

          text = 'k8s';
          nodeKey = Utils.uniqueId('k8s');
          image = require('../../assets/IconCloud/azure/compute/10023-icon-Kubernetes Services-Compute.svg');
          azcontext = new Kubernetes();
        break;
        case ResourceType.NetAppFile():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }

          text = 'netapp files';
          nodeKey = Utils.uniqueId('netapp');
          image = require('../../assets/IconCloud/azure/data_storage/10096-icon-Azure NetApp Files-Storage.svg');
          azcontext = new NetAppFile();
        break;
        case ResourceType.VirtualNetworkGateway():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }

          text = 'vnet gateway';
          nodeKey = Utils.uniqueId('vnetgw');
          image = require('../../assets/IconCloud/azure/network/10063-icon-Virtual Network Gateways-Networking.svg');
          azcontext = new VirtualNetworkGateway();
        break;
        case ResourceType.ASE():
          if(!Utils.isVIRinDedicatedSubnet(subnet)) {
            Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
            return;
          }

          text = 'ase';
          nodeKey = Utils.uniqueId('vnetgw');
          image = require('../../assets/azure_icons/Networking Service Color/Virtual Network Gateways.png');
          azcontext = new VirtualNetworkGateway();
          break;
        case ResourceType.NLB():
          if(Utils.isSubnetTakenByDedicatedSubnetVIR(subnet)) {
            Toast.show('warining', 7000, Messages.ResourceInSubnetTakenByDedicatedSubnetResource());
            return;
          }

          text = 'internal lb';
          nodeKey = Utils.uniqueId('internallb');
          image = require('../../assets/IconCloud/azure/network/10062-icon-Load Balancers-Networking.svg');
          
          var nlb = new NLB();
          nlb.ProvisionContext.IsInternalNLB = true;
          azcontext = nlb
          break;
        case ResourceType.APIM():
          if(Utils.isSubnetTakenByDedicatedSubnetVIR(subnet)) {
            Toast.show('warining', 7000, Messages.ResourceInSubnetTakenByDedicatedSubnetResource());
            return;
          }

          text = 'apim premium';
          nodeKey = Utils.uniqueId('apimpremium');
          image = require('../../assets/IconCloud/azure/integration/10042-icon-API Management Services-Integration.svg');
          azcontext = new APIM();
          break;
        case ResourceType.Redis():
            if(Utils.isSubnetTakenByDedicatedSubnetVIR(subnet)) {
              Toast.show('warining', 7000, Messages.ResourceInSubnetTakenByDedicatedSubnetResource());
              return;
            }
  
            text = 'redis premium';
            nodeKey = Utils.uniqueId('redispremium');
            image = require('../../assets/IconCloud/azure/databases/10137-icon-Cache Redis-Databases.svg');
            azcontext = new Redis();
            break;
        case ResourceType.ContainerInstance():
              if(!Utils.isVIRinDedicatedSubnet(subnet)) {
                Toast.show('warining', 2500, Messages.VIRMustBeInDedicatedSubnet());
                return;
              }
              text = 'private container instance';
              nodeKey = Utils.uniqueId('privateci');
              image = require('../../assets/azure_icons/Container Service Color/Container Instances.png');
              azcontext = new ContainerInstance();
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
        zOrder: 50,
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
      font: '17px Segoe UI',
      stroke: 'black',
      nodetype: GoNodeType.ImageShape(),
      size: go.Size.stringify(new go.Size(60,60)),
      width: 60,
      height: 60,
      zOrder: 50,
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
      size: go.Size.stringify(new go.Size(50,50)),
      zOrder: 50,
      font: '17px Segoe UI',
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
      font:'22px Segoe UI', 
      text: label != '' ? label : 'text',
      stroke: 'black', 
      textAlign: 'center',
      zOrder: 50,
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
        zOrder: 50,
        strokeDashArray: null,
        nodetype: GoNodeType.Link(),
        opacity: 0,
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
        zOrder: 50,
        strokeDashArray: null,
        nodetype: GoNodeType.Link(),
        opacity: 0,
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
        zOrder: 50,
        strokeDashArray: null,
        nodetype: GoNodeType.Link(),
        opacity: 0,
        category: 'ortho'
      }
    );
  }

  var animation = new go.Animation();
        animation.easing = go.Animation.EaseLinear;
        this.diagram.links.each(function(link) {
          var white = link.findObject("PIPE");
          animation.add(white, "strokeDashOffset", 20, 0)
        });
        animation.runCount = Infinity;
        animation.start();
}

addKeyPressShortcuts() {
  document.addEventListener("keydown", function(e) {
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
    }
  }, false);

  var thisComp = this;
  var $ = this.$;

  this.diagram.commandHandler.doKeyDown = function() {
    var e = thisComp.diagram.lastInput;
    var cmd = thisComp.diagram.commandHandler;

    if (e.shift && e.key === "R") { //open/close resource palette shortcut
      if(thisComp.global.drawResourcePaletteOpen)
          thisComp.setGlobal({drawResourcePaletteOpen:false});
      else
          thisComp.setGlobal({drawResourcePaletteOpen:true});
      return;
    }

    if (e.control && e.key === "S") {  // could also check for e.control or e.shift
      thisComp.saveDiagramToBrowser();
      return;
    }

    if (e.alt && e.key === "S") {
      var selectedNode = thisComp.diagram.selection.first();
      if(selectedNode == null)
        return;
      thisComp.openStylePanel(selectedNode);
      return;
    }

    if (e.alt && e.key === "X") {
      var selectedNode = thisComp.diagram.selection.first();
      if(selectedNode == null)
        return;

        var animation = new go.Animation();
        animation.easing = go.Animation.EaseLinear;
        thisComp.diagram.links.each(function(link) {
          animation.add(link.findObject("ANIMATE"), "strokeDashOffset", 20, 0)
        });
        animation.runCount = Infinity;
        animation.start();
      
      var linkAnimatePart = selectedNode.findObject("ANIMATE");
      if(linkAnimatePart != null) {
        if(linkAnimatePart.opacity == 0) {
          e.diagram.model.setDataProperty(selectedNode.data, 'opacity', 1);
          thisComp.setDiagramModifiedTrue();
        }
        else {
          e.diagram.model.setDataProperty(selectedNode.data, 'opacity', 0);
          thisComp.setDiagramModifiedTrue();
        }
        thisComp.triggerLinkAnimation();
      }
      
      return;
    }

    if (e.alt && e.key === "A") {
      var selectedNode = thisComp.diagram.selection.first();
      
      if(selectedNode == null || !Utils.isAzContextExist(selectedNode))
        return;

      var azcontext = selectedNode.data.azcontext;
          thisComp.determineResourcePropertyPanelToShow
            (azcontext, function onContextSaveCallback(savedContext){
              selectedNode.data.azcontext = savedContext;
            });
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

    if(e.key === "S") {

      if(thisComp.state.archetypeLinkMode == "o") { //straight link mode

        thisComp.setState({archetypeLinkMode: "s"});

          this.diagram.toolManager.linkingTool.temporaryLink =
          $(go.Link,
            {
              relinkableFrom: true,
              relinkableTo: true,
              reshapable: true
            },
            new go.Binding("points").makeTwoWay(),
            $(go.Shape, { toArrow: "Standard",strokeWidth: 1.5 })
          );
          this.diagram.toolManager.linkingTool.archetypeLinkData =
          { 
            fromArrow: '',
            toArrow: 'Standard',
            adjusting: go.Link.Stretch,
            stroke: 'black',
            strokeWidth: 1.5,
            strokeDashArray: null,
            nodetype: GoNodeType.Link(),
            opacity: 0,
            category: 'straight'
          } 
          Toast.show('primary', 2000, 'Straight connector mode');
          return;

      }
      else { //orthogonal link mode
        thisComp.setState({archetypeLinkMode: "o"});

        this.diagram.toolManager.linkingTool.temporaryLink =
          $(go.Link,
            {
              routing: go.Link.AvoidsNodes,
              curve: go.Link.JumpOver,
              corner: 5, toShortLength: 4,
              relinkableFrom: true,
              relinkableTo: true,
              reshapable: true
              //resegmentable: true
            },
            new go.Binding("points").makeTwoWay(),
            $(go.Shape, { toArrow: "Standard",strokeWidth: 1.5})
          );
          this.diagram.toolManager.linkingTool.archetypeLinkData = 
            { 
                fromArrow: '',
                toArrow: 'Standard',
                adjusting: go.Link.Stretch,
                stroke: 'black',
                strokeWidth: 1.5,
                strokeDashArray: null,
                nodetype: GoNodeType.Link(),
                opacity: 0,
                category: 'ortho'
            }
            Toast.show('primary', 2000, 'Orthogonal connector mode');
            return;
      }
      
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

  var diagramJson = this.getDiagramBase64Json(); //this.diagram.model.toJson();

  var result = LocalStorage.set
    (LocalStorage.KeyNames.TempLocalDiagram, diagramJson);
  if(result == true) {
    this.setDiagramModifiedFalse();
    this.clearAutosaveDiagram();

    this.statusbarHelper.setShortcutFromBrowser()

    Toaster.create({
      position: Position.TOP,
      autoFocus: false,
      canEscapeKeyClear: true
    }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.DiagramSavedInBrowser()});
    return;
 }
 else {
  Toast.show('warning',4000, 'Diagram is too large to save in browser storage, save in My Space instead')
 }
}

loadDraftDiagramFromBrowser = () => {
  if(!this.isdraftDiagramExistInBrowser()) {
    Toast.show('primary', 3000, 'You do not have diagram saved in browser');
    return;
  }

 var jsonStr = LocalStorage.get(LocalStorage.KeyNames.TempLocalDiagram);
 
 this.importJsonDiagram(jsonStr);

  this.notifyStatusBarLoadSource('browser');
}

deleteDraftDiagramFromBrowser = () => {
  if(!this.isdraftDiagramExistInBrowser()) {
    Toast.show('primary', 3000, 'You do not have diagram saved in browser');
    return;
  }
  LocalStorage.remove(LocalStorage.KeyNames.TempLocalDiagram);
  this.setState({ isOpen: false });
}

isdraftDiagramExistInBrowser() {
  if(LocalStorage.get(LocalStorage.KeyNames.TempLocalDiagram) === null)
      return false;
  else
      return true;
}

PromptSaveBeforeCloseBrowser() {
  var thisComp = this;
  window.addEventListener('beforeunload', (event) => {
    if(Utils.isCanvasEmpty(this.diagram)) return;
    if(thisComp.state.unsavedChanges){
      event.returnValue = 'You have unsaved changes';
    }
  });
}

notifyStatusBarLoadSource(source, collection, diagramName) {
    var diagramSrc = this.global.diagramSource;
    diagramSrc.source = source;

    if(source == 'myspace') {
      diagramSrc.collection = collection;
      diagramSrc.diagramName = diagramName;
    }

    this.setGlobal(diagramSrc);
}

//create vertex from browser clipboard image
async pasteImageFromBrowserClipboard() {

      var thisComp = this;

      window.addEventListener("paste", function(e) {

        //to handle paste into existing TextBlock, let the paste event flow and not intercept it
        if(e.target instanceof HTMLTextAreaElement)
            return true;

        thisComp.retrieveImageFromClipboardAsBase64(e, function(imageDataBase64){

            if(imageDataBase64 == 'IsNewTextBlock')
                return;

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
      });
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

    //handle text paste
    if (items[i].type.indexOf("text/plain") != -1) {
        
        items[i].getAsString((str) => {
        var text = str;

        var cursorPt = this.diagram.lastInput.viewPoint;
        this.createText({label: text, x: cursorPt.x, y: cursorPt.y});
        
        callback('IsNewTextBlock'); //is text, can skip image paste
        return;
      });
    }

      //handle image paste
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

  loadAutoSavedRecoveryPoint() {
    if(LocalStorage.isExist(LocalStorage.KeyNames.AutoSave)) {

        this.loadAutoSavedRecoveryPointDiagram();

        this.setDiagramModifiedFalse();
        this.clearAutosaveDiagram();
        
        Toast.show('primary',  6500, 'Workbench has recovered your unsaved diagram, save it now to browser or My Space');
    }
    else
    Toast.show('primary',  5000, 'No recovery point found. (Recovery point gets deleted once saved or loaded)');
  }

  loadAutoSavedRecoveryPointDiagram = () => {
    try{
      if(LocalStorage.isExist(LocalStorage.KeyNames.AutoSave)) {
        var jsonStr = LocalStorage.get(LocalStorage.KeyNames.AutoSave);
      
        this.importJsonDiagram(jsonStr);
        this.statusbarHelper.resetStatusBar(StatusBarHelper.SourceNone());
      }
    }
    catch
    {
      LocalStorage.remove(LocalStorage.KeyNames.AutoSave);
    }
  }

  clearAutosaveDiagram() {
    LocalStorage.remove(LocalStorage.KeyNames.AutoSave);
  }

  //timer auto-save every 5 secs
  startTimerAutosave() {
    var thisComp = this;
    window.setInterval(() => {
        if(this.diagram.nodes.count == 0) //)
          return;

        if(!this.state.unsavedChanges)
          return;
      
        var diagramJson =  this.getDiagramBase64Json(); //this.diagram.model.toJson();

        LocalStorage.set
          (LocalStorage.KeyNames.AutoSave, diagramJson);
        
    }, 5000);
  }

  onDropPNGAZWBFileHandler = (evt) => {

      var thisComp = this;

      evt.stopPropagation();
      evt.preventDefault();

      // Converts local images to data urls
      var filesArray = evt.originalEvent.dataTransfer.files;

      Array.from(filesArray).forEach( file => {
        if(file.name.endsWith('.azwb')) {
          thisComp.importWorkbenchFormat(file);
        }
        else if(file.name.endsWith('.png') || file.name.endsWith('.svg')) { //insert image as Vertex

          if(thisComp.checkFileLargerThanLimit(file.size, 400)) {
              Toast.show('warning',  3500, 'PNG file size cannot be over 400Kb, try compressing it.')
              return;
          }

          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function() {

          var dataUrl = fileReader.result;
          
          var cursor = thisComp.diagram.lastInput.viewPoint;

          thisComp.createPictureShape
            ({source: dataUrl,
              label: 'picture', x: cursor.x, y: cursor.y});
          };
          fileReader.onerror = function(error) {
            Toast.show('warning', 3000, error);
          };
        }
        else
          Toast.show('warning', '3500', 'Workbench currently supports importing PNG and .azwb file types')
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
        this.createShape({figure: 'DoubleEndArrow', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
      break;
      case 'Cylinder':
        this.createShape({figure: 'Cylinder1', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case 'Hexagon':
        this.createShape({figure: 'Hexagon', label: '', angle: 90, x: dropContext.x, y: dropContext.y});
        break;
      case 'Nonagon':
        this.createShape({figure: 'Nonagon', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case 'Text':
        this.createText({label: 'text', x: dropContext.x, y: dropContext.y});
        break;
      case 'Rectangle':
        this.createShape({figure: 'Rectangle', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case 'Rectangle Rounded':
        this.createShape({figure: 'RoundedRectangle', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case 'Triangle':
        this.createShape({figure: 'TriangleUp', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case 'Circle':
        this.createShape({figure: 'Circle', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case '3D Cube':
          this.createShape({figure: 'Cube2', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case 'Arrow':
          this.createShape({figure: 'Arrow', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case 'ThinX':
          this.createShape({figure: 'ThinX', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case 'Lightning':
          this.createShape({figure: 'Lightning', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case 'Chevron':
          this.createShape({figure: 'Chevron', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case 'Decision':
          this.createShape({figure: 'Decision', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case 'Component':
          this.createShape({figure: 'Component', label: '', angle: 0, x: dropContext.x, y: dropContext.y});
        break;
      case 'Location 1':
          this.createPictureShape
          ({source: require('../../assets/IconCloud/fluent/shape/shape-location-1.svg'),
            label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Location 2':
          this.createPictureShape
          ({source: require('../../assets/IconCloud/fluent/shape/shape-location-2.svg'),
            label: '', x: dropContext.x, y: dropContext.y});
      break;
      
      //*picture

      //people
      case 'User 1':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/people/ic_fluent_person-1.svg'),
          label: 'user', x: dropContext.x, y: dropContext.y});
      break;

      case 'User 2':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/people/user-2.svg'),
          label: 'user', x: dropContext.x, y: dropContext.y});
      break;

      case 'User Account':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/people/ic_fluent_person_accounts_24_filled.svg'),
          label: 'user account', x: dropContext.x, y: dropContext.y});
      break;

      case 'User Support':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/people/ic_fluent_person_support_24_filled.svg'),
          label: 'support', x: dropContext.x, y: dropContext.y});
      break;

      case 'Team 1':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/people/ic_fluent_people_team-1.svg'),
          label: 'users', x: dropContext.x, y: dropContext.y});
      break;

      case 'Team 2':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/people/people-team-2.svg'),
          label: 'users', x: dropContext.x, y: dropContext.y});
      break;

      case 'Team 3':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/people/team-3.svg'),
          label: 'users', x: dropContext.x, y: dropContext.y});
      break;

      
      
      //devices
      case 'Server Farm':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/10835-icon-Server Farm-General.svg'),
          label: 'server farm', x: dropContext.x, y: dropContext.y});
      break;

      case 'Server':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/00060-icon-Servers-menu.svg'),
          label: 'server', x: dropContext.x, y: dropContext.y});
      break;
      
      case 'Web Server':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/IconLightWebServer.svg'),
          label: 'web server', x: dropContext.x, y: dropContext.y});
      break;
     
      case 'Firewall':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/00059-icon-Firewall-menu.svg'),
          label: 'firewall', x: dropContext.x, y: dropContext.y});
      break;
      
      case 'MacOS':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/00593-icon-macOS-menu.svg'),
          label: 'macos', x: dropContext.x, y: dropContext.y});
      break;
      
      case 'Windows WSUS':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/02212-icon-WSUS-menu.svg'),
          label: 'wsus', x: dropContext.x, y: dropContext.y});
      break;

      case 'BareMetal Server':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/02561-icon-Bare Metal Infrastructure-New Icons.svg'),
          label: 'baremetal', x: dropContext.x, y: dropContext.y});
      break;

      case 'VM':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/10021-icon-Virtual Machine-Compute.svg'),
          label: 'vm', x: dropContext.x, y: dropContext.y});
      break;

      case 'SQL VM':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/10124-icon-Azure SQL VM-Databases.svg'),
          label: 'sql vm', x: dropContext.x, y: dropContext.y});
      break;

      case 'Devices':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/10332-icon-Devices-family.svg'),
          label: 'devices', x: dropContext.x, y: dropContext.y});
      break;

      case 'Camera':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/device-camera.svg'),
          label: 'camera', x: dropContext.x, y: dropContext.y});
      break;


      case 'Mobile':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/device-mobile.svg'),
          label: 'mobile', x: dropContext.x, y: dropContext.y});
      break;

      case 'Printer':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/device-printer.svg'),
          label: 'printer', x: dropContext.x, y: dropContext.y});
      break;

      case 'Tape':
        this.createPictureShape
        ({source:  require('../../assets/IconCloud/fluent/devices/tape.svg'),
          label: 'storage device', x: dropContext.x, y: dropContext.y});
      break;

      case 'Storage Device':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/device-storage.svg'),
          label: 'storage device', x: dropContext.x, y: dropContext.y});
      break;

      case 'Storage Device 2':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/device-storage-2.svg'),
          label: 'storage device', x: dropContext.x, y: dropContext.y});
      break;

      case 'Cloud Server':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/IconLightCloudServer.svg'),
          label: 'cloud server', x: dropContext.x, y: dropContext.y});
      break;

      case 'Database':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/IconLightDatabase.svg'),
          label: 'db', x: dropContext.x, y: dropContext.y});
      break;

      case 'Database Server':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/fluent/devices/IconLightServerDatabase.svg'),
          label: 'db', x: dropContext.x, y: dropContext.y});
      break; 

      //people

      //devices

      //software
      case 'CLI':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-cli.png'),
          label: 'cli', x: dropContext.x, y: dropContext.y});
      break;
      case 'Helm':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/helm.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Azure DevOps':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeAzureDevOps()),
          label: 'Azure DevOps', x: dropContext.x, y: dropContext.y});
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
        ({source: Utils.pngDataUrl(AzureIcons.ShapeDocker()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'ElasticSearch':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeElasticSearch()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Enterprise Service Bus':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-esbmiddleware.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'GitHub':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeGithub()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'GitHub Actions':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeGithubActions()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Go':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeGo()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Grafana':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeGrafana()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Hashicorp Consul':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeHashicorpConsul()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Terraform':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeHashicorpTerraform()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Hashicorp Vault':
        this.createPictureShape
        ({source: require('../../assets/azure_icons/software/software-hashicorpvault.png'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'InfluxDB':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeInfluxDB()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Java':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeJava()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Javascript':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeJavascript()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Kafka':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeKafka()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Kubernetes (shape)':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeKube()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Message Queue':
        this.createPictureShape
        ({source:Utils.pngDataUrl(AzureIcons.ShapeMessageQueue()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'MongoDB':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeMongoDB()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case '.Net Core':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeNetCore()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Nginx':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeNginx()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Nginx Plus':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeNginxPlus()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'NodeJS':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeNode()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Powershell':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapePowershell()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Power BI':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapePowerBI()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Python':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapePython()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'RabbitMQ':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeRabbitMQ()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Ruby On Rails':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeRubyOnRails()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Traefik':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeTraefik()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Zipkin':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeZipkin()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Jaeger':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeJaeger()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Calico':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeCalico()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Json File':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.JsonFile()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'API':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.API()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      case 'Jenkins':
        this.createPictureShape
        ({source: Utils.pngDataUrl(AzureIcons.ShapeJenkins()),
          label: '', x: dropContext.x, y: dropContext.y});
      break;

      //azure nondeployable
      
      case 'Azure':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/60115-Icon-Azure.svg'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;

      case 'Azure DevOps':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10261-icon-Azure DevOps-DevOps.svg'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;

      case 'Azure DevOps':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10261-icon-Azure DevOps-DevOps.svg'),
          label: '', x: dropContext.x, y: dropContext.y});
      break;
      
      case 'Azure LightHouse':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/00471-icon-Azure Lighthouse-Management + Governance.svg'),
          label: 'lighthouse', x: dropContext.x, y: dropContext.y});
      break;

      case 'Azure Monitor':
        this.createPictureShape
        ({source:  require('../../assets/IconCloud/azure/nondeployable/00001-icon-Monitor-Management + Governance.svg'),
          label: 'monitor', x: dropContext.x, y: dropContext.y});
      break;

      case 'Alert':
        this.createPictureShape
        ({source:  require('../../assets/IconCloud/azure/nondeployable/00002-icon-Alerts-Management + Governance.svg'),
          label: 'alert', x: dropContext.x, y: dropContext.y});
      break;

      case 'Advisor':
        this.createPictureShape
        ({source:require('../../assets/IconCloud/azure/nondeployable/00003-icon-Advisor-Management + Governance.svg'),
          label: 'advisor', x: dropContext.x, y: dropContext.y});
      break;

      case 'Cost Management':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/00004-icon-Cost Management and Billing-Migrate.svg'),
          label: 'cost', x: dropContext.x, y: dropContext.y});
      break;

      case 'Blueprint':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/00006-icon-Blueprints-Management + Governance.svg'),
          label: 'blueprint', x: dropContext.x, y: dropContext.y});
      break;

      case 'Policy':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10316-icon-Policy-Management + Governance.svg'),
          label: 'policy', x: dropContext.x, y: dropContext.y});
      break;

      case 'Activity Log':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/00007-icon-Activity Log-Management + Governance.svg'),
          label: 'activity', x: dropContext.x, y: dropContext.y});
      break;

      case 'Metrics':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/00020-icon-Metrics-Management + Governance.svg'),
          label: 'metrics', x: dropContext.x, y: dropContext.y});
      break;

      case 'Monitoring Solution':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/00021-icon-Solutions-Management + Governance.svg'),
          label: 'solution', x: dropContext.x, y: dropContext.y});
      break;

      case 'Peering Service':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/00973-icon-Peering Service prefix-menu.svg'),
          label: 'peering service', x: dropContext.x, y: dropContext.y});
      break;

      case 'Universal Print':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/00631-icon-Universal Print Connectors-menu.svg'),
          label: 'universal print', x: dropContext.x, y: dropContext.y});
      break;

      case 'Workbook':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/02189-icon-Azure Workbooks-Preview.svg'),
          label: 'workbook', x: dropContext.x, y: dropContext.y});
      break;

      case 'Azure Defender':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/02247-icon-Azure Defender-Security.svg'),
          label: 'defender', x: dropContext.x, y: dropContext.y});
      break;

      case 'Backup Center':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/02360-icon-Azure Backup Center-Other.svg'),
          label: 'backup center', x: dropContext.x, y: dropContext.y});
      break;

      case 'Azure Dashboard':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10015-icon-Dashboard-General.svg'),
          label: 'dashboard', x: dropContext.x, y: dropContext.y});
      break;

      case 'Azure Data Studio':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/02558-icon-Azure Data Studio-menu.svg'),
          label: 'data studio', x: dropContext.x, y: dropContext.y});
      break;

      case 'Storage Explorer':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10091-icon-Storage Explorer-Storage.svg'),
          label: 'storage explorer', x: dropContext.x, y: dropContext.y});
      break;

      case 'Resource Graph Explorer':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10318-icon-Resource Graph Explorer-Management + Governance.svg'),
          label: 'resource graph explorer', x: dropContext.x, y: dropContext.y});
      break;

      case 'Resource Explorer':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10349-icon-Resource Explorer-General.svg'),
          label: 'resource explorer', x: dropContext.x, y: dropContext.y});
      break;

      case 'Cloud Shell':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/cloudshell.svg'),
          label: 'cloud shell', x: dropContext.x, y: dropContext.y});
      break;

      case 'Storage Block Blob':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10780-icon-Blob Block-General.svg'),
          label: 'block blob', x: dropContext.x, y: dropContext.y});
      break;

      case 'Storage Page Blob':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10781-icon-Blob Page-General.svg'),
          label: 'page blob', x: dropContext.x, y: dropContext.y});
      break;

      case 'Azure Stack':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10114-icon-Azure Stack-Azure Stack.svg'),
          label: 'stack', x: dropContext.x, y: dropContext.y});
      break;

      case 'Azure SQL Stretch DB':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10137-icon-Azure SQL Server Stretch Databases-Databases.svg'),
          label: 'stretch db', x: dropContext.x, y: dropContext.y});
      break;

      case 'Azure Sphere':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10190-icon-Azure Sphere-Preview.svg'),
          label: 'sphere', x: dropContext.x, y: dropContext.y});
      break;

      case 'VM Health':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/02648-icon-VM Health-menu.svg'),
          label: 'vm health', x: dropContext.x, y: dropContext.y});
      break;

      case 'Azure Service Health':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10004-icon-Service Health-General.svg'),
          label: 'service health', x: dropContext.x, y: dropContext.y});
      break;

      case 'Azure Orbital':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/02697-icon-Azure Orbital-Preview.svg'),
          label: 'orbital', x: dropContext.x, y: dropContext.y});
      break;

      case 'Management Group':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10011-icon-Management Groups-General.svg'),
          label: 'management group', x: dropContext.x, y: dropContext.y});
      break;

      case 'Subscription':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10002-icon-Subscriptions-General.svg'),
          label: 'subscription', x: dropContext.x, y: dropContext.y});
      break;

      case 'Resource Group':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10007-icon-Resource Groups-General.svg'),
          label: 'rg', x: dropContext.x, y: dropContext.y});
      break;

      case 'Azure Kubernetes':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10023-icon-Kubernetes Services-Compute.svg'),
          label: 'aks', x: dropContext.x, y: dropContext.y});
      break;

      case 'Cloud Service(classic)':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10030-icon-Cloud Services (Classic)-Compute.svg'),
          label: 'cloud service', x: dropContext.x, y: dropContext.y});
      break;

      case 'Network Watcher':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10066-icon-Network Watcher-Networking.svg'),
          label: 'network watcher', x: dropContext.x, y: dropContext.y});
      break;

      case 'Subnet':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/02742-icon-Subnet-menu.svg'),
          label: 'subnet', x: dropContext.x, y: dropContext.y});
      break;

      case 'VNet Peering':
        this.createPictureShape
        ({source:require('../../assets/IconCloud/azure/nondeployable/02743-icon-Peerings-menu.svg'),
          label: 'peering', x: dropContext.x, y: dropContext.y});
      break;

      case 'Nat Gateway':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10310-icon-NAT-Networking.svg'),
          label: 'nat gateway', x: dropContext.x, y: dropContext.y});
      break;

      case 'Service Endpoint':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/02578-icon-Service Endpoints-menu.svg'),
          label: 'service endpoint', x: dropContext.x, y: dropContext.y});
      break;

      case 'Network Security Group':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10067-icon-Network Security Groups-Networking.svg'),
          label: 'nsg', x: dropContext.x, y: dropContext.y});
      break;

      case 'Route Table':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10082-icon-Route Tables-Networking.svg'),
          label: 'udr', x: dropContext.x, y: dropContext.y});
      break;

      case 'Kusto':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/Kusto.png'),
          label: 'kusto', x: dropContext.x, y: dropContext.y});
      break;



      case 'Azure Arc':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/00756-icon-Azure Arc-Management + Governance.svg'),
          label: 'arc', x: dropContext.x, y: dropContext.y});
        break;

      case 'Azure AD':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/identity/10221-icon-Azure Active Directory-Identity.svg'),
          label: 'aad', x: dropContext.x, y: dropContext.y});
        break;

      case 'Azure AD B2C':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/identity/10228-icon-Azure AD B2C-Identity.svg'),
          label: 'b2c', x: dropContext.x, y: dropContext.y});
        break;

      case 'Azure Migrate':
        this.createPictureShape
        ({source: require('../../assets/IconCloud/azure/nondeployable/10281-icon-Azure Migrate-Migrate.svg'),
          label: 'az migrate', x: dropContext.x, y: dropContext.y});
        break;


      //*non VIR
      case ResourceType.CommunicationService():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/integration/00968-icon-Azure Communication Services-Other.svg'),
          label: 'communication service', x: dropContext.x, y: dropContext.y,
          azcontext: new CommunicationService()
        });
      break;

      case ResourceType.DeviceProvisioningService():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/iot/10369-icon-Device Provisioning Services-IoT.svg'),
          label: 'device provisioning service', x: dropContext.x, y: dropContext.y,
          azcontext: new DeviceProvisioningService()
        });
      break;

      case ResourceType.DeviceUpdateForIoTHub():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/iot/02475-icon-Device Update IoT Hub-IoT.svg'),
          label: 'device update for iot hub', x: dropContext.x, y: dropContext.y,
          azcontext: new DeviceUpdateForIoTHub()
        });
      break;

      case ResourceType.DigitalTwins():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/iot/01030-icon-Digital Twins-IoT.svg'),
          label: 'digital twins', x: dropContext.x, y: dropContext.y,
          azcontext: new DigitalTwins()
        });
      break;

      case ResourceType.TimeSeriesInsightsEventSource():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/iot/10188-icon-Time Series Insights Event Sources-IoT.svg'),
          label: 'time series insights event source', x: dropContext.x, y: dropContext.y,
          azcontext: new TimeSeriesInsightsEventSource()
        });
      break;

      case ResourceType.EventHubCluster():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/iot/10149-icon-Event Hub Clusters-Analytics.svg'),
          label: 'event hub cluster', x: dropContext.x, y: dropContext.y,
          azcontext: new EventHubCluster()
        });
      break;

      case ResourceType.LogicAppCustomConnector():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/integration/10363-icon-Logic Apps Custom Connector-Integration.svg'),
          label: 'logic app custom connector', x: dropContext.x, y: dropContext.y,
          azcontext: new LogicAppCustomConnector()
        });
      break;

      case ResourceType.ProximityPlacementGroup():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10365-icon-Proximity Placement Groups-Networking.svg'),
          label: 'proximity placement group', x: dropContext.x, y: dropContext.y,
          azcontext: new ProximityPlacementGroup()
        });
      break;

      case ResourceType.AvailabilitySet():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10025-icon-Availability Sets-Compute.svg'),
          label: 'availability set', x: dropContext.x, y: dropContext.y,
          azcontext: new AvailabilitySet()
        });
      break;

      case ResourceType.WAF():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10362-icon-Web Application Firewall Policies(WAF)-Networking.svg'),
          label: 'waf', x: dropContext.x, y: dropContext.y,
          azcontext: new WAF()
        });
      break;

      case ResourceType.RouteFilters():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10071-icon-Route Filters-Networking.svg'),
          label: 'route filters', x: dropContext.x, y: dropContext.y,
          azcontext: new RouteFilters()
        });
      break;

      case ResourceType.NetworkManager():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/02237-icon-Azure Network Manager-Preview.svg'),
          label: 'network manager', x: dropContext.x, y: dropContext.y,
          azcontext: new NetworkManager()
        });
      break;

      case ResourceType.AMPLS():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/01036-icon-Azure Monitor Private Link Scope-menu.svg'),
          label: 'ampls', x: dropContext.x, y: dropContext.y,
          azcontext: new AMPLS()
        });
      break;

      case ResourceType.IPGroup():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/00701-icon-IP Groups-Networking.svg'),
          label: 'ip group', x: dropContext.x, y: dropContext.y,
          azcontext: new IPGroups()
        });
      break;

      case ResourceType.PrivateLink():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/00427-icon-Private Link-Networking.svg'),
          label: 'private link', x: dropContext.x, y: dropContext.y,
          azcontext: new PrivateLink()
        });
      break;

      case ResourceType.LocalNetworkGateway():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10077-icon-Local Network Gateways-Networking.svg'),
          label: 'local network gateway', x: dropContext.x, y: dropContext.y,
          azcontext: new LocalNetworkGateway()
        });
      break;

      case ResourceType.PublicIpPrefixes():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10372-icon-Public IP Prefixes-Networking.svg'),
          label: 'publicip prefixes', x: dropContext.x, y: dropContext.y,
          azcontext: new PublicIpPrefixes()
        });
      break;

      case ResourceType.Host():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/10347-icon-Hosts-Compute.svg'),
          label: 'host', x: dropContext.x, y: dropContext.y,
          azcontext: new Host()
        });
      break;

      case ResourceType.Hostgroup():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/10346-icon-Host Groups-Compute.svg'),
          label: 'host group', x: dropContext.x, y: dropContext.y,
          azcontext: new Hostgroup()
        });
      break;

      case ResourceType.VMWareSolution():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/00524-icon-AVS-Azure VMware Solution.svg'),
          label: 'avs', x: dropContext.x, y: dropContext.y,
          azcontext: new VMWareSolution()
        });
      break;

      case ResourceType.WorkspaceWVD():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/00400-icon-Workspaces-Compute.svg'),
          label: 'workspace', x: dropContext.x, y: dropContext.y,
          azcontext: new WorkspaceWVD()
        });
      break;

      case ResourceType.DiskEncryptionSet():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/00398-icon-Disk Encryption Sets-Compute.svg'),
          label: 'image', x: dropContext.x, y: dropContext.y,
          azcontext: new DiskEncryptionSet()
        });
      break;

      case ResourceType.Image():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/10033-icon-Images-Compute.svg'),
          label: 'image', x: dropContext.x, y: dropContext.y,
          azcontext: new Image()
        });
      break;

      case ResourceType.DiskSnapshot():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/10026-icon-Disks Snapshots-Compute.svg'),
          label: 'disk snapshot', x: dropContext.x, y: dropContext.y,
          azcontext: new DiskSnapshot()
        });
      break;

      case ResourceType.ImageTemplate():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/02634-icon-Image Templates-Compute.svg'),
          label: 'image template', x: dropContext.x, y: dropContext.y,
          azcontext: new ImageTemplate()
        });
      break;

      case ResourceType.Automanage():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/02112-icon-Automanaged VM-Compute.svg'),
          label: 'automanage', x: dropContext.x, y: dropContext.y,
          azcontext: new Automanage()
        });
      break;

      case ResourceType.LabService():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/10265-icon-Lab Services-DevOps.svg'),
          label: 'lab service', x: dropContext.x, y: dropContext.y,
          azcontext: new LabService()
        });
      break;
      case ResourceType.Batch():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/10031-icon-Batch Accounts-Containers.svg'),
          label: 'batch account', x: dropContext.x, y: dropContext.y,
          azcontext: new AzureBatch()
        });
      break;

      case ResourceType.DataboxEdge():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage/10095-icon-Data Box Edge-Migrate.svg'),
          label: 'data box edge', x: dropContext.x, y: dropContext.y,
          azcontext: new DataBoxEdge()
        });
      break;
      case ResourceType.StorSimpleDataManager():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage/10092-icon-StorSimple Data Managers-Storage.svg'),
          label: 'storesimple data manager', x: dropContext.x, y: dropContext.y,
          azcontext: new StorSimpleDataManager()
        });
      break;
      case ResourceType.OnPremDataGateway():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage/10070-icon-On Premises Data Gateways-Networking.svg'),
          label: 'on-prem data gateway', x: dropContext.x, y: dropContext.y,
          azcontext: new OnPremDataGateway()
        });
      break;
      case ResourceType.PurviewAccount():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage/02517-icon-Azure Purview Accounts-other.svg'),
          label: 'purview', x: dropContext.x, y: dropContext.y,
          azcontext: new PurviewAccount()
        });
      break;
      case ResourceType.AzureStackEdge():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage/00691-icon-Azure Stack Edge-Storage.svg'),
          label: 'stack edge', x: dropContext.x, y: dropContext.y,
          azcontext: new AzureStackEdge()
        });
      break;
      case ResourceType.BackupVault():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage/02361-icon-Backup Vault-menu.svg'),
          label: 'backup vault', x: dropContext.x, y: dropContext.y,
          azcontext: new BackupVault()
        });
      break;
      case ResourceType.StaticApp():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/appservices/01007-icon-Static Apps-Preview.svg'),
          label: 'static app', x: dropContext.x, y: dropContext.y,
          azcontext: new StaticApp()
        });
      break;
      case ResourceType.AnalysisService():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_analytics/10148-icon-Analysis Services-Analytics.svg'),
          label: 'analysis service', x: dropContext.x, y: dropContext.y,
          azcontext: new AnalysisService()
        });
      break;
      case ResourceType.AppServicePlan():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/appservices/00046-icon-App Service Plans-App Services.svg'),
          label: 'app service plan', x: dropContext.x, y: dropContext.y,
          azcontext: new AppServicePlan()
        });
      break;
      case ResourceType.FirewallManager():
        this.createNonVIRAzureResource({
          source: require('../../assets/azure_icons/Networking Service Color/FirewallManager.svg'),
          label: 'firewall manager', x: dropContext.x, y: dropContext.y,
          azcontext: new AzureFirewallManager()
        });
      break;
      case ResourceType.MediaService():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/appservices/10309-icon-Azure Media Service-Web.svg'),
          label: 'media service', x: dropContext.x, y: dropContext.y,
          azcontext: new MediaService()
        });
      break;
      case ResourceType.SpringCloud():
        this.createVIRBySkuBased({
          resourceType: ResourceType.SpringCloud(),
          x: dropContext.x,
          y: dropContext.y
        });
      break;
      case ResourceType.DataCatalog():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage/10216-icon-Azure Data Catalog-Integration.svg'),
          label: 'data catalog', x: dropContext.x, y: dropContext.y,
          azcontext: new DataCatalog()
        });
      break;
      case ResourceType.DataShare():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage//10098-icon-Data Shares-Storage.svg'),
          label: 'data share', x: dropContext.x, y: dropContext.y,
          azcontext: new DataShare()
        });
      break;
      case ResourceType.ManagedIdentity():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/security_identity/10227-icon-Managed Identities-Identity.svg'),
          label: 'user assigned managed identity', x: dropContext.x, y: dropContext.y,
          azcontext: new ManagedIdentity()
        });
      break;
      case ResourceType.VirtualWAN():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10353-icon-Virtual WANs-Networking.svg'),
          label: 'virtual wan', x: dropContext.x, y: dropContext.y,
          azcontext: new VirtualWAN()
        });
      break;
      case ResourceType.Blockchain():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/blockchain/10366-icon-Azure Blockchain Service-Blockchain.svg'),
          label: 'blockchain service', x: dropContext.x, y: dropContext.y,
          azcontext: new Blockchain()
        });
      break;
      case ResourceType.AppService():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/appservices/10035-icon-App Services-App Services.svg'),
          label: 'app service', x: dropContext.x, y: dropContext.y,
          azcontext: new AppService()
        });
        break;
      case ResourceType.ASE():
        //vnet injection
        break;
      case ResourceType.Function():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/appservices/10029-icon-Function Apps-IoT.svg'),
          label: 'func', x: dropContext.x, y: dropContext.y,
          azcontext: new Function()
        });
        break;
      case ResourceType.AzureSearch():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/appservices/10044-icon-Search Services-App Services.svg'),
          label: 'azure search', x: dropContext.x, y: dropContext.y,
          azcontext: new AzureSearch()
        });
        break;
      case ResourceType.SignalR():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/appservices/10052-icon-SignalR-Web.svg'),
          label: 'signalr', x: dropContext.x, y: dropContext.y,
          azcontext: new SignalR()
        });
        break;
      case ResourceType.AppServiceCert():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/appservices/00049-icon-App Service Certificates-App Services.svg'),
          label: 'app service certificate', x: dropContext.x, y: dropContext.y,
          azcontext: new AppServiceCert()
        });
        break;
      case ResourceType.AppServiceDomain():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/appservices/00050-icon-App Service Domains-App Services.svg'),
          label: 'app service domain', x: dropContext.x, y: dropContext.y,
          azcontext: new AppServiceDomain()
        });
        break;
        case ResourceType.NotificationHub():
          this.createNonVIRAzureResource({
            source: require('../../assets/IconCloud/azure/appservices/10045-icon-Notification Hubs-App Services.svg'),
            label: 'notification hub', x: dropContext.x, y: dropContext.y,
            azcontext: new NotificationHub()
          });
          break;
      case ResourceType.AppConfig():
        this.createNonVIRAzureResource({
          source: Utils.pngDataUrl(AzureIcons.AppConfig()),
          label: 'app configuration', x: dropContext.x, y: dropContext.y,
          azcontext: new AppConfig()
        });
        break;
        case ResourceType.DedicatedHost():
        this.createNonVIRAzureResource({
          source: require('../../assets/azure_icons/ComputeServiceColor/azure-dedicatedhost.png'),
          label: 'dedicated host', x: dropContext.x, y: dropContext.y,
          azcontext: new DedicatedHost()
        });
        break;
      case ResourceType.SharedImageGallery():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/10039-icon-Shared Image Galleries-Compute.svg'),
          label: 'shared image gallery', x: dropContext.x, y: dropContext.y,
          azcontext: new SharedImageGallery()
        });
        break;
      case ResourceType.DevTestLab():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/compute/10264-icon-DevTest Labs-DevOps.svg'),
          label: 'devtest lab', x: dropContext.x, y: dropContext.y,
          azcontext: new DevTestLab()
        });
        break;
      case ResourceType.PublicIp():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10069-icon-Public IP Addresses-Networking.svg'),
          label: 'public ip', x: dropContext.x, y: dropContext.y,
          azcontext: new PublicIp()
        });
        break;
      case ResourceType.TrafficManager():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10065-icon-Traffic Manager Profiles-Networking.svg'),
          label: 'traffic manager', x: dropContext.x, y: dropContext.y,
          azcontext: new TrafficManager()
        });
        break;
      
      case ResourceType.CDN():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/00056-icon-CDN Profiles-Networking.svg'),
          label: 'cdn', x: dropContext.x, y: dropContext.y,
          azcontext: new AzureCDN()
        });
        break;
        case ResourceType.ASG():
          this.createNonVIRAzureResource({
            source: require('../../assets/IconCloud/azure/security_identity/10244-icon-Application Security Groups-Security.svg'),
            label: 'asg', x: dropContext.x, y: dropContext.y,
            azcontext: new ASG()
          });
        break;
      case ResourceType.NIC():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10080-icon-Network Interfaces-Networking.svg'),
          label: 'nic', x: dropContext.x, y: dropContext.y,
          azcontext: new NIC()
        });
        break;

      case ResourceType.StorageAccount():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage/10086-icon-Storage Accounts-Storage.svg'),
          label: 'storage account', x: dropContext.x, y: dropContext.y,
          azcontext: new StorageAccount()
        });
        break;
      case ResourceType.Databox():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage/10094-icon-Data Box-Migrate.svg'),
          label: 'databox', x: dropContext.x, y: dropContext.y,
          azcontext: new Databox()
        });
        break;
      case ResourceType.PostgreSQL():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/databases/10131-icon-Azure Database PostgreSQL Server-Databases.svg'),
          label: 'postgresql', x: dropContext.x, y: dropContext.y,
          azcontext: new PostgreSQL()
        });
        break;
      case ResourceType.MariaDB():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/databases/10123-icon-Azure Database MariaDB Server-Databases.svg'),
          label: 'mariadb', x: dropContext.x, y: dropContext.y,
          azcontext: new MariaDB()
        });
        break;
      case ResourceType.SQLDB():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/databases/10130-icon-SQL Database-Databases.svg'),
          label: 'sql db', x: dropContext.x, y: dropContext.y,
          azcontext: new SQLDB()
        });
        break;
      case ResourceType.ElasticJobAgent():
          this.createNonVIRAzureResource({
            source: require('../../assets/IconCloud/azure/databases/10128-icon-Elastic Job Agents-Databases.svg'),
            label: 'elastic job agent', x: dropContext.x, y: dropContext.y,
            azcontext: new ElasticJobAgent()
          });
        break;
      case ResourceType.CosmosDB():
          this.createNonVIRAzureResource({
          source:require('../../assets/IconCloud/azure/databases/10121-icon-Azure Cosmos DB-Databases.svg'),
          label: 'cosmos db', x: dropContext.x, y: dropContext.y,
          azcontext: new Cosmos()
        });
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
        this.createVIRBySkuBased({
          resourceType: ResourceType.NLB(),
          x: dropContext.x,
          y: dropContext.y
        });
        break;
      case ResourceType.DNS():
          this.createNonVIRAzureResource({
            source: require('../../assets/IconCloud/azure/network/10064-icon-DNS Zones-Networking.svg'),
            label: 'dns zone', x: dropContext.x, y: dropContext.y,
            azcontext: new DNS()
          });
          break;
      case ResourceType.DNSPrivateZone():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10064-icon-DNS Zones-Networking.svg'),
          label: 'private dns zone', x: dropContext.x, y: dropContext.y,
          azcontext: new DNSPrivateZone()
        });
        break;
      case ResourceType.FrontDoor():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10073-icon-Front Doors-Networking.svg'),
          label: 'front door', x: dropContext.x, y: dropContext.y,
          azcontext: new FrontDoor()
        });
        break;
      case ResourceType.ExpressRouteCircuit():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/network/10079-icon-ExpressRoute Circuits-Networking.svg'),
          label: 'expressroute circuit', x: dropContext.x, y: dropContext.y,
          azcontext: new ExpressRouteCircuit()
        });
        break;
      case ResourceType.AzFileSync():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage/10093-icon-Storage Sync Services-Storage.svg'),
          label: 'storage sync service', x: dropContext.x, y: dropContext.y,
          azcontext: new FileSync()
        });
        break;
      case ResourceType.MySQL():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/databases/10122-icon-Azure Database MySQL Server-Databases.svg'),
          label: 'mysql', x: dropContext.x, y: dropContext.y,
          azcontext: new MySQL()
        });
        break;
      case ResourceType.SQLElasticPool():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/databases/10134-icon-SQL Elastic Pools-Databases.svg'),
          label: 'elastic db pool', x: dropContext.x, y: dropContext.y,
          azcontext: new SQLElasticPool()
        });
        break;
      case ResourceType.Redis():
        this.createVIRBySkuBased({
          resourceType: ResourceType.Redis(),
          x: dropContext.x,
          y: dropContext.y
        });
        break;
      case ResourceType.DataLakeStorage():
        this.addDataLakeStorage(dropContext);
        break;
      case ResourceType.Synapse():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_analytics/00606-icon-Azure Synapse Analytics-Analytics.svg'),
          label: 'synapse', x: dropContext.x, y: dropContext.y,
          azcontext: new SynapseAnalytics()
        });
        break;

      case ResourceType.DataExplorer():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage/10145-icon-Azure Data Explorer Clusters-Databases.svg'),
          label: 'data explorer', x: dropContext.x, y: dropContext.y,
          azcontext: new DataExplorer()
        });
        break;

      case ResourceType.Databricks():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_analytics/10787-icon-Azure Databricks-Analytics.svg'),
          label: 'databricks', x: dropContext.x, y: dropContext.y,
          azcontext: new Databricks()
        });
        break;

      case ResourceType.DataFactory():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_storage/10126-icon-Data Factory-Databases.svg'),
          label: 'data factory', x: dropContext.x, y: dropContext.y,
          azcontext: new DataFactory()
        });
        break;

      case ResourceType.DataLakeAnalytics():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/data_analytics/10143-icon-Data Lake Analytics-Analytics.svg'),
          label: 'datalake analytics', x: dropContext.x, y: dropContext.y,
          azcontext: new DataLakeAnalytics()
        });
        break;
      case ResourceType.HdInsight():
        this.createNonVIRAzureResource({
          source: require('../../assets/azure_icons/Analytics Service Color/HDInsightClusters.png'),
          label: 'hdinsight', x: dropContext.x, y: dropContext.y,
          azcontext: new HdInsight()
        });
        break;

      case ResourceType.Cognitive():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/ai_ml/10162-icon-Cognitive Services-AI + Machine Learning.svg'),
          label: 'cognitive', x: dropContext.x, y: dropContext.y,
          azcontext: new Cognitive()
        });
        break;
      case ResourceType.BotsService():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/ai_ml/10165-icon-Bot Services-AI + Machine Learning.svg'),
          label: 'bot service', x: dropContext.x, y: dropContext.y,
          azcontext: new BotsService()
        });
        break;
      case ResourceType.Genomics():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/ai_ml/10164-icon-Genomics Accounts-AI + Machine Learning.svg'),
          label: 'genomics', x: dropContext.x, y: dropContext.y,
          azcontext: new Genomics()
        });
        break;
      case ResourceType.MLServiceWorkspace():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/ai_ml/10166-icon-Machine Learning-AI + Machine Learning.svg'),
          label: 'ml', x: dropContext.x, y: dropContext.y,
          azcontext: new MLServiceWorkspace()
        });
        break;

      case ResourceType.ContainerInstance():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/container/10104-icon-Container Instances-Containers.svg'),
          label: 'container instance', x: dropContext.x, y: dropContext.y,
          azcontext: new ContainerInstance()
        });
        break;
      case ResourceType.ContainerRegistry():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/container/10105-icon-Container Registries-Containers.svg'),
          label: 'container registry', x: dropContext.x, y: dropContext.y,
          azcontext: new ContainerRegistry()
        });
        break;
      

      case ResourceType.ASB():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/integration/10836-icon-Service Bus-General.svg'),
          label: 'service bus', x: dropContext.x, y: dropContext.y,
          azcontext: new ServiceBus()
        });
        break;
      case ResourceType.LogicApp():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/integration/10201-icon-Logic Apps-IoT.svg'),
          label: 'logic app', x: dropContext.x, y: dropContext.y,
          azcontext: new LogicApp()
        });
        break;
      case ResourceType.EventGridTopic():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/integration/10206-icon-Event Grid Topics-Integration.svg'),
          label: 'event grid topic', x: dropContext.x, y: dropContext.y,
          azcontext: new EventGridTopic()
        });
        break;
      case ResourceType.EventGridSubscription():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/integration/10221-icon-Event Grid Subscriptions-Integration.svg'),
          label: 'event grid subscription', x: dropContext.x, y: dropContext.y,
          azcontext: new EventGridSubscription()
        });
        break;
      case ResourceType.EventGridDomain():
          this.createNonVIRAzureResource({
            source: require('../../assets/IconCloud/azure/integration/10215-icon-Event Grid Domains-Integration.svg'),
            label: 'event grid domain', x: dropContext.x, y: dropContext.y,
            azcontext: new EventGridDomain()
          });
          break;
      case ResourceType.StreamAnalytics():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/iot/00042-icon-Stream Analytics Jobs-IoT.svg'),
          label: 'stream analytics', x: dropContext.x, y: dropContext.y,
          azcontext: new StreamAnalytics()
        });
        break;
      case ResourceType.EventHub():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/iot/00039-icon-Event Hubs-IoT.svg'),
          label: 'event hub', x: dropContext.x, y: dropContext.y,
          azcontext: new EventHub()
        });
        break;
      case ResourceType.SendGrid():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/integration/10220-icon-SendGrid Accounts-Integration.svg'),
          label: 'sendgrid', x: dropContext.x, y: dropContext.y,
          azcontext: new SendGrid()
        });
        break;
      case ResourceType.Relay():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/integration/10209-icon-Relays-Integration.svg'),
          label: 'relay', x: dropContext.x, y: dropContext.y,
          azcontext: new Relay()
        });
        break;
  
      // case ResourceType.Firewall():
      //   this.addFirewall(dropContext);
      //   break;
      case ResourceType.Sentinel():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/security_identity/10248-icon-Azure Sentinel-Security.svg'),
          label: 'sentinel', x: dropContext.x, y: dropContext.y,
          azcontext: new Sentinel()
        });
        break;
      case ResourceType.KeyVault():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/security_identity/10245-icon-Key Vaults-Security.svg'),
          label: 'key vault', x: dropContext.x, y: dropContext.y,
          azcontext: new KeyVault()
        });
        break;
      case ResourceType.SecurityCenter():
        this.createNonVIRAzureResource({
          source:  require('../../assets/IconCloud/azure/security_identity/10241-icon-Security Center-Security.svg'),
          label: 'security center', x: dropContext.x, y: dropContext.y,
          azcontext: new SecurityCenter()
        });
        break;
      case ResourceType.DDoSStandard():
        this.createNonVIRAzureResource({
          source:  require('../../assets/IconCloud/azure/network/10072-icon-DDoS Protection Plans-Networking.svg'),
          label: 'ddos standard', x: dropContext.x, y: dropContext.y,
          azcontext: new DDoSStandard()
        });
        break;
        break;
      case ResourceType.RecoveryServiceVault():
        this.createNonVIRAzureResource({
          source:  require('../../assets/IconCloud/azure/data_storage/00017-icon-Recovery Services Vaults-Storage.svg'),
          label: 'site recovery', x: dropContext.x, y: dropContext.y,
          azcontext: new RecoveryServiceVault()
        });
        break;
      case ResourceType.AppInsights():
        this.createNonVIRAzureResource({
          source:  require('../../assets/IconCloud/azure/management/00012-icon-Application Insights-Management + Governance.svg'),
          label: 'app insights', x: dropContext.x, y: dropContext.y,
          azcontext: new AppInsights()
        });
        break;
      case ResourceType.LogAnalytics():
        this.createNonVIRAzureResource({
          source:  require('../../assets/IconCloud/azure/data_analytics/00009-icon-Log Analytics Workspaces-Analytics.svg'),
          label: 'log analytics', x: dropContext.x, y: dropContext.y,
          azcontext: new LogAnalytics()
        });
        break;
      case ResourceType.Automation():
        this.createNonVIRAzureResource({
          source:  require('../../assets/IconCloud/azure/management/00022-icon-Automation Accounts-Management + Governance.svg'),
          label: 'automation', x: dropContext.x, y: dropContext.y,
          azcontext: new Automation()
        });
      break;

      case ResourceType.IoTHub():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/iot/10182-icon-IoT Hub-IoT.svg'),
          label: 'iot hub', x: dropContext.x, y: dropContext.y,
          azcontext: new IoTHub()
        });
        break;
      case ResourceType.IoTCentral():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/iot/10184-icon-IoT Central Applications-IoT.svg'),
          label: 'iot central', x: dropContext.x, y: dropContext.y,
          azcontext: new IoTCentral()
        });
      break;
      case ResourceType.AzureMaps():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/iot/10185-icon-Azure Maps Accounts-IoT.svg'),
          label: 'maps', x: dropContext.x, y: dropContext.y,
          azcontext: new Maps()
        });
        break;
      case ResourceType.TimeSeriesInsights():
        this.createNonVIRAzureResource({
          source: require('../../assets/IconCloud/azure/iot/10181-icon-Time Series Insights Environments-IoT.svg'),
          label: 'time series insights environment', x: dropContext.x, y: dropContext.y,
          azcontext: new TimeSeriesInsights()
        });
        break;

      //*create vir
      case ResourceType.APIM():
        this.createVIRBySkuBased({
          resourceType: ResourceType.APIM(),
          x: dropContext.x,
          y: dropContext.y
        });
        break;
      case ResourceType.HPCCache():
          this.createVIROntoSubnet({
            resourceType: ResourceType.HPCCache(),
            x: dropContext.x,
            y: dropContext.y
          })
        break;

      default:
        break;
    }

    this.setDiagramModifiedTrue();
  }

  determineResourcePropertyPanelToShow = (userObject, onContextSaveCallback) => {

    let thisComp = this;

    switch (userObject.GraphModel.ResourceType) {

  case ResourceType.WAF():
    this.wafPropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;

  case ResourceType.ProximityPlacementGroup():
    this.proxpgPropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;

  case ResourceType.AvailabilitySet():
    this.availabilitysetPropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;

  case ResourceType.RouteFilters():
    this.routefiltersPropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;

  

  case ResourceType.CommunicationService():
    this.communicationservicePropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;

  case ResourceType.DeviceProvisioningService():
    this.deviceprovisioningservicePropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;

  case ResourceType.DeviceUpdateForIoTHub():
    this.deviceupdateforiothubPropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;

  case ResourceType.DigitalTwins():
    this.digitaltwinsPropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;
  
  case ResourceType.TimeSeriesInsightsEventSource():
    this.timeseriesinsightseventsourcePropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;

  case ResourceType.EventHubCluster():
    this.eventhubclusterPropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;

  case ResourceType.LogicAppCustomConnector():
    this.logicappcustomconnectorPropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;

  case ResourceType.IPGroup():
    this.ipgroupsPropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;

  case ResourceType.AMPLS():
    this.amplsPropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;

  case ResourceType.NetworkManager():
    this.networkmanagerPropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;
      
  case ResourceType.PrivateLink():
    this.privatelinkPropPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;
  case ResourceType.LocalNetworkGateway():
    this.localnetworkgwPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;
  case ResourceType.PublicIpPrefixes():
    this.pipprefixesPanel.current.show(userObject, function(savedUserObject){
        onContextSaveCallback(Utils.deepClone(savedUserObject));
    });
  break;
  case ResourceType.Host():
        this.hostpPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.Hostgroup():
        this.hostgroupPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.VMWareSolution():
        this.vmwaresolutionPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.WorkspaceWVD():
        this.workspacewvdPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.DiskEncryptionSet():
        this.diskencryptionsetPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.Image():
        this.imagePropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.DiskSnapshot():
        this.disksnapshotPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.ImageTemplate():
        this.imagetemplatePropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.Automanage():
        this.automanagePropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.LabService():
        this.labsvcPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.DataboxEdge():
        this.databoxedgePropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;   
  case ResourceType.StorSimpleDataManager():
        this.storsimpledatamanagerPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.OnPremDataGateway():
        this.onpremdatagatewayPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.PurviewAccount():
        this.purviewaccountPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;  
  case ResourceType.HPCCache():
        this.hpccachePropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.AzureStackEdge():
        this.azstackedgePropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.BackupVault():
        this.backupvaultPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
  case ResourceType.StaticApp():
        this.staticappPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
   case ResourceType.AnalysisService():
        this.analysisservicePropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
    case ResourceType.NotificationHub():
        this.notificationhubPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
    case ResourceType.Blockchain():
        this.blockchainPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
    break;
    case ResourceType.MediaService():
      this.mediaservicePropPanel.current.show(userObject, function(savedUserObject){
         onContextSaveCallback(Utils.deepClone(savedUserObject));
      });
    break;
    case ResourceType.SpringCloud():
      this.springcloudPropPanel.current.show(userObject, function(savedUserObject){
         onContextSaveCallback(Utils.deepClone(savedUserObject));
      });
    break;
    case ResourceType.DataCatalog():
      this.datacatalogPropPanel.current.show(userObject, function(savedUserObject){
         onContextSaveCallback(Utils.deepClone(savedUserObject));
      });
    break;
    case ResourceType.DataShare():
      this.datasharePropPanel.current.show(userObject, function(savedUserObject){
         onContextSaveCallback(Utils.deepClone(savedUserObject));
      });
    break;
    case ResourceType.ManagedIdentity():
      this.managedidentityPropPanel.current.show(userObject, function(savedUserObject){
         onContextSaveCallback(Utils.deepClone(savedUserObject));
      });
    break;
    case ResourceType.ServiceFabricCluster():
      this.svcfabricclusterPropPanel.current.show(userObject, function(savedUserObject){
         onContextSaveCallback(Utils.deepClone(savedUserObject));
      });
    break;
    case ResourceType.ServiceFabricManagedCluster():
      this.svcfabricmanagedclusterPropPanel.current.show(userObject, function(savedUserObject){
         onContextSaveCallback(Utils.deepClone(savedUserObject));
      });
    break;
    case ResourceType.VirtualWAN():
      this.virtualwanPropPanel.current.show(userObject, function(savedUserObject){
         onContextSaveCallback(Utils.deepClone(savedUserObject));
      });
    break;
    case ResourceType.ServiceEndpoint():
        this.svcendpointPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
    case ResourceType.AADDomainService():
      this.aaddomainservicePropPanel.current.show(userObject, function(savedUserObject){
         onContextSaveCallback(Utils.deepClone(savedUserObject));
      });
      break;
    case ResourceType.ElasticJobAgent():
      this.elasticjobagentPropPanel.current.show(userObject, function(savedUserObject){
         onContextSaveCallback(Utils.deepClone(savedUserObject));
      });
      break;
      case ResourceType.Arc():
        this.arcPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.SecurityCenter():
        this.ascPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Batch():
        this.batchPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.DedicatedHost():
        this.dedicatedhostPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.RouteTable():
        this.rtPropPanel.current.show(userObject, function(savedUserObject){
           onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.ASG():
          this.asgPropPanel.current.show(userObject, function(savedUserObject){
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
        break;
      case ResourceType.PrivateEndpoint():
        this.privateendpointPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.StorageAccount():
        this.azstoragePropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Databox():
          this.databoxPropPanel.current.show(userObject, function(savedUserObject){
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
        this.recoveryservicevaultPropPanel.current.show(this.diagram, userObject, function(savedUserObject){
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
      case ResourceType.EventGridDomain():
        this.egdomainPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.EventHub():
        this.eventhubPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
      break;
      case ResourceType.NIC():
        this.nicPropPanel.current.show(userObject, function(savedUserObject){
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
      case ResourceType.SQLMI():
          this.sqlmiPropPanel.current.show(userObject, function(savedUserObject){
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
        this.vnetPropPanel.current.show(userObject, function(savedUserObject){
            onContextSaveCallback(Utils.deepClone(savedUserObject));
        });
        break;
      case ResourceType.Subnet():
          
          this.subnetPropPanel.current.show(userObject, function(savedUserObject){
              onContextSaveCallback(Utils.deepClone(savedUserObject));
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
      case ResourceType.DNS():
          this.dnszonePropPanel.current.show(userObject, function(savedUserObject){
             onContextSaveCallback(Utils.deepClone(savedUserObject));
          });
      break;
      default:
        break;
    }
  }

  importJsonDiagram = (diagramJson) => {

    if(diagramJson == null || diagramJson == '')
      return;

      var jsonFromBase64 = this.getDiagramFromBase64(diagramJson);
      var model = go.Model.fromJson(jsonFromBase64);

      this.diagram.removeModelChangedListener();

      this.diagram.startTransaction('loaddiagramfrombrowser');

      this.diagram.clear();
      this.diagram.model = model;

      this.diagram.commitTransaction('loaddiagramfrombrowser');

      this.initDiagramModifiedEvent(true);

      this.triggerLinkAnimation()
  }

   loadQuickstartDiagram(category, name) {
      var thisComp = this;
      this.diagService.loadQuickstartDiagram
        (category, name,
          function onSuccess(qsDiagContext) {
            thisComp.importJsonDiagram(qsDiagContext.DiagramXml);
            thisComp.statusbarHelper.resetStatusBar(StatusBarHelper.SourceNone());
          },
          function onFailure(error) {
            Toast.show("danger", 2000, error.message);
          }
        )
  }

  shareDiagram = async (diagramNameForSharedDiagMySpace) => {
    if(Utils.isCanvasEmpty(this.diagram))
      {
        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.WARNING, timeout: 3000, message: Messages.NoCellOnGraph()});
        return;
      }
    
    var thisComp = this;

    //if loggedin, save shared diagram to MySpace
    if(await this.authsvc.isUserLogin())
    {
      var context = new SharedDiagramMySpaceContext();
      context.DiagramName = diagramNameForSharedDiagMySpace;
      context.DiagramXml = this.getDiagramBase64Json(); //this.diagram.model.toJson();
      context.DateTimeSaved = new Date();

      this.diagramService.saveSharedDiagramInMySpace(context,
        function (result){
          thisComp.setState({shareLink: result.sharedLink, showShareDiagramPopup: true});
          Toast.show('primary', 4500, "Shared diagram is in MySpace");
        },
        function(error){
          Toast.show('danger', 3000, error.message);
        })

      return;
    }
    else {
      var anonyDiagramContext = new AnonymousDiagramContext();
      anonyDiagramContext.DiagramName = Utils.uniqueId('diagram');
      anonyDiagramContext.DiagramXml = this.getDiagramBase64Json(); //this.diagram.model.toJson();
      anonyDiagramContext.DateTimeSaved = new Date();

      this.diagramService
        .saveAnonymousDiagram(anonyDiagramContext,
          function (shareLink){
            thisComp.setState({shareLink: shareLink, showShareDiagramPopup: true});
          },
          function(error){
            Toast.show('danger', 3000, error.message);
          });
      }
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

        if(response.data.DiagramXml == "")
        {
            Toast.show('primary', 4000, 'Shared link is either housekept or deleted by originator');
            return
        }

          thisComp.importJsonDiagram(response.data.DiagramXml);
          thisComp.statusbarHelper.resetStatusBar(StatusBarHelper.SourceNone());

          Toast.show('success', 2000, Messages.ShareLinkLoadedSuccess());

          // Toaster.create({
          //   position: Position.TOP,
          //   autoFocus: false,
          //   canEscapeKeyClear: true
          // }).show({intent: Intent.SUCCESS, timeout: 2000, message: });
          return;
      })
      .catch(function (error) {
        console.log(error);
        Toast.show('warning', 2000, Messages.ShareLinkLoadedError());

        // Toaster.create({
        //   position: Position.TOP,
        //   autoFocus: false,
        //   canEscapeKeyClear: true
        // }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.ShareLinkLoadedError()});
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

  removeDiagramChangeListeners() {
    this.diagram.removeModelChangedListener((evt) => {
      var a = 'a';
    });
    this.diagram.removeDiagramListener("Modified", (evt) => {
      var a = 'a';
    });
  }

  importWorkbenchFormat(azwbFile) {

    var thisComp = this;
    
    const reader = new FileReader();
    reader.readAsText(azwbFile);
    reader.onload = function() {
      const jsonDiagram = reader.result;
      thisComp.importJsonDiagram(jsonDiagram);
    };
  
    reader.onerror = function() {
      Toast.show('warning',2000, reader.error);
    };
  }

  exportWorkbenchFormat() {
    if(Utils.isCanvasEmpty(this.diagram))
    {
      Toast.show('primary', 2000, Messages.NoCellOnGraph());
      return;
    }

    var diagramJson = this.getDiagramBase64Json(); //this.diagram.model.toJson();

    const url = window.URL.createObjectURL(new Blob([diagramJson]));
          const link = document.createElement('a');
          link.href = url;
          link.target = "azwbFileDownloader"; //name of iframe
          link.setAttribute('download', 'diagram.azwb');
          document.body.appendChild(link);
          link.click();
  }

  async updateSharedDiagramInMySpace(emailId, diagramUID) {
      if(Utils.isCanvasEmpty(this.diagram))
      {
        Toaster.create({
          position: Position.TOP,
          autoFocus: false,
          canEscapeKeyClear: true
        }).show({intent: Intent.WARNING, timeout: 3000, message: Messages.NoCellOnGraph()});
        return;
      }

      if(!this.state.unsavedChanges)
      {
        Toast.show('primary', 2000, 'No change detected')
        return;
      }

      if(! await this.authsvc.isUserLogin())
      {
        Toast.show('primary', 2500, 'You need to login before saving to MySpace')
        return;
      }

      var thisComp = this;

      var diagramJson = this.getDiagramBase64Json();

      this.diagramService.updateSharedDiagramInMySpace(emailId, diagramUID, diagramJson,
        function onSuccess() {
  
          thisComp.setDiagramModifiedFalse();
          thisComp.clearAutosaveDiagram();
  
          Toast.show('success', 2000, Messages.SavedSuccessfully());
  
          return;
        },
        function onError(error) {
          Toast.show('danger', 2000, error);
          return;
        });
  }

  async saveDiagramToWorkspace(collectionName, diagramName) {
    if(Utils.isCanvasEmpty(this.diagram))
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.WARNING, timeout: 3000, message: Messages.NoCellOnGraph()});
      return;
    }

    if(!this.state.unsavedChanges)
    {
      Toast.show('primary', 2000, 'No change detected')
      return;
    }

    if(! await this.authsvc.isUserLogin())
    {
      Toast.show('primary', 2500, 'You need to login before saving to MySpace')
      return;
    }

    var diagramContext = new WorkspaceDiagramContext();
    diagramContext.CollectionName = collectionName;
    diagramContext.EmailId = this.authsvc.getUserProfile().UserName;
    diagramContext.UID = this.shortUID.randomUUID(6);
    diagramContext.DiagramName = diagramName;
    diagramContext.DiagramXml = this.getDiagramBase64Json();
    diagramContext.DateTimeSaved = Date.now();

    var thisComp = this;

    this.diagramService.saveDiagramToWorkspace(diagramContext,
      function onSuccess() {

        thisComp.setDiagramModifiedFalse();
        thisComp.clearAutosaveDiagram();

        thisComp.statusbarHelper.setShortcutSavedDiagram(diagramContext.CollectionName, diagramContext.DiagramName)

        Toast.show('success', 2000, Messages.SavedSuccessfully());

        return;
      },
      function onError(error) {
        Toast.show('danger', 2000, error);
        return;
      });
  }

  getDiagramBase64Json() {
    var json = this.diagram.model.toJson();
    return btoa(json);
  }

  getDiagramFromBase64(base64OrJson) {
      if(Utils.isObject(base64OrJson)) {
        return base64OrJson;
      }
      else if(Utils.IsJsonString(base64OrJson)) {//for backward compatibility
          return base64OrJson;
      }
      else {
        return atob(base64OrJson);
      }
  }


  exportAsSvg(){
    if(Utils.isCanvasEmpty(this.diagram))
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.NoCellOnGraph()});
      return;
    }
   
    var svg = this.diagram.makeSvg({ scale: 1.0,
      background: "transparent", showTemporary:true,
      maxSize: new go.Size(Infinity, Infinity)});

    //var svg =document.getElementById('diagramEditor').firstChild;

    var svgXmlString = new XMLSerializer().serializeToString(svg);

    const blob = new Blob([svgXmlString], {type: 'image/svg+xml'});

    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'diagram.svg');
    document.body.appendChild(link);
    link.click();
  }

  exportAsPng() {
    if(Utils.isCanvasEmpty(this.diagram))
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.NoCellOnGraph()});
      return;
    }

    var png = this.diagram.makeImageData({ scale: 1.0,
      background: "white", returnType: 'blob', callback: callback,
      maxSize: new go.Size(Infinity, Infinity)});

      function callback(blob) {
        var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'diagram.png');
      document.body.appendChild(link);
      link.click();
      }

  }

  exportDiagramAsPDF(){

    if(Utils.isCanvasEmpty(this.diagram))
    {
      Toaster.create({
        position: Position.TOP,
        autoFocus: false,
        canEscapeKeyClear: true
      }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.NoCellOnGraph()});
      return;
    }

    var base64Image = this.diagram.makeImageData({ scale: 1.0,
      background: "white",
      maxSize: new go.Size(Infinity, Infinity)});
    //background: "white", returnType: "blob", callback: callback });

    this.diagramService.exportDiagramAsPNG(base64Image,
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

      if(Utils.isCanvasEmpty(this.diagram))
      {
        Toast.show(Intent.WARNING, 2000, Messages.NoCellOnGraph());
        return;
      }

      var contexts = this.provisionHelper.ExtractProvisionContexts(this.diagram);

      if(Utils.IsNullOrUndefine(contexts))
      {
        Toast.show(Intent.WARNING, 2000, Messages.NoResourceToProvision());
        return;
      }

      this.provisionService.provisionDiagram(subscription.SubscriptionId, contexts,
        function onSuccess() {
          Toast.show("success", 2000, 'Diagram successfully deployed');
        },
        function onFailure(error) {
          Toast.show("danger", 6000, error);
        }
      );
  }

  // setBadgeVisibilityOnUnsaveChanges = (toShow) => {
  //    this.setGlobal({showSaveBadge: toShow});
  // }

  
  setDiagramModifiedFalse(){
    this.setState({ 
      unsavedChanges: false
   });

    this.setGlobal({showSaveBadge: false});
  }

  setDiagramModifiedTrue() {
    this.setState({ 
      unsavedChanges: true
   });

    this.setGlobal({showSaveBadge: true});
  }

  showWorkspace () {
    this.workspace.current.show();
  }

  showOverlaySavetoWorkspace = () => {
    this.overlaySaveToWorkspace.current.show();
  }

  closeShareDiagramPopup = () => this.setState({ showShareDiagramPopup: false, useTallContent: false });
}