import React, { Component, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Collapse, H5, Position, Classes, Popover } from "@blueprintjs/core";

import { ReactComponent as Circle } from "../../assets/azure_icons/shape-circle.svg";
import { ReactComponent as User } from "../../assets/azure_icons/shape-user.svg";
import { ReactComponent as OnPremDBServer } from "../../assets/azure_icons/_Flat Symbols/CnE_Enterprise/Database server.svg";
import { ReactComponent as Internet } from "../../assets/azure_icons/_Flat Symbols/CnE_Enterprise/Internet.svg";
import { ReactComponent as ADFS } from "../../assets/azure_icons/_Flat Symbols/CnE_Enterprise/AD FS.svg";
import { ReactComponent as ClientDevice } from "../../assets/azure_icons/_Flat Symbols/CnE_Enterprise/Laptop computer.svg";

import { ReactComponent as SQLDatabase } from "../../assets/azure_icons/Databases Service Color/SQL Databases.svg";
import { ReactComponent as CosmosDB } from "../../assets/azure_icons/Databases Service Color/Azure Cosmos DB.svg";
import { ReactComponent as PostgreSQL } from "../../assets/azure_icons/Databases Service Color/Azure Database for PostgreSQL servers.svg";
import { ReactComponent as MySQL } from "../../assets/azure_icons/Databases Service Color/Azure Database for MySQL servers.svg";
import { ReactComponent as AzSQLElasticPool } from "../../assets/azure_icons/Databases Service Color/Elastic Database Pools.svg";
import { ReactComponent as SQLManagedInstance } from "../../assets/azure_icons/Databases Service Color/SQL Managed Instances.svg";
import { ReactComponent as SQLStretchedDB } from "../../assets/azure_icons/Databases Service Color/SQL Server stretch Databases.svg";
import { ReactComponent as RedisCache } from "../../assets/azure_icons/Databases Service Color/Azure Cache for Redis.svg";

//data
import { ReactComponent as SynapseAnalytics } from "../../assets/azure_icons/Databases Service Color/Azure SQL DataWarehouse.svg";
import { ReactComponent as DataLake } from "../../assets/azure_icons/Databases Service Color/Data Lake.svg";
import { ReactComponent as DataBricks } from "../../assets/azure_icons/Analytics Service Color/Azure Databricks.svg";
import { ReactComponent as DataFactory } from "../../assets/azure_icons/Analytics Service Color/Data Factories.svg";
import { ReactComponent as HDInsights } from "../../assets/azure_icons/Analytics Service Color/HDInsightClusters.svg";
import { ReactComponent as DataExplorer } from "../../assets/azure_icons/Analytics Service Color/Azure Data Explorer Clusters.svg";
import { ReactComponent as DataLakeAnalytics } from "../../assets/azure_icons/Analytics Service Color/Data Lake Analytics.svg";

//compute
import { ReactComponent as VirtualMachine } from "../../assets/azure_icons/ComputeServiceColor/VM/VM-windows.svg";
import { ReactComponent as LinuxVirtualMachine } from "../../assets/azure_icons/ComputeServiceColor/VM/VM-Linux.svg";
import { ReactComponent as VMSS } from "../../assets/azure_icons/ComputeServiceColor/VM/VM Scale Sets.svg";
import { ReactComponent as FunctionApp } from "../../assets/azure_icons/ComputeServiceColor/Function Apps.svg";

import { ReactComponent as VirtualNetwork } from "../../assets/azure_icons/Networking Service Color/Virtual Networks.svg";
import { ReactComponent as AppGateway } from "../../assets/azure_icons/Networking Service Color/Application Gateway.svg";
import { ReactComponent as LoadBalancer } from "../../assets/azure_icons/Networking Service Color/Load Balancers.svg";
import { ReactComponent as DNSPrivateZone } from "../../assets/azure_icons/Networking Service Color/DNS Private Zones.svg";
import { ReactComponent as FrontDoor } from "../../assets/azure_icons/Networking Service Color/Front Doors.svg";
import { ReactComponent as PublicIp } from "../../assets/azure_icons/Networking Service Color/Public IP Addresses.svg";
import { ReactComponent as ExpressRoute } from "../../assets/azure_icons/Networking Service Color/ExpressRoute Circuits.svg";
import { ReactComponent as NetworkWatcher } from "../../assets/azure_icons/Networking Service Color/Network Watcher.svg";
import { ReactComponent as TrafficManager } from "../../assets/azure_icons/Networking Service Color/Traffic Manager Profiles.svg";
import { ReactComponent as VPNGateway } from "../../assets/azure_icons/Networking Service Color/Virtual Network Gateways.svg";

import { ReactComponent as Storage } from "../../assets/azure_icons/Storage Service Color/Blob Storage.svg";
import { ReactComponent as Databox } from "../../assets/azure_icons/Storage Service Color/Data Box.svg";
import { ReactComponent as FileSync } from "../../assets/azure_icons/Storage Service Color/Storage Sync Services.svg";
import { ReactComponent as NetAppFiles } from "../../assets/azure_icons/Storage Service Color/Azure NetApp files.svg";
import { ReactComponent as QueueStorage } from "../../assets/azure_icons/Storage Service Color/Queues Storage.svg";
import { ReactComponent as TableStorage } from "../../assets/azure_icons/Storage Service Color/Table Storage.svg";


import { ReactComponent as ContainerInstance } from "../../assets/azure_icons/Container Service Color/Container Instances.svg";
import { ReactComponent as ContainerRegistry } from "../../assets/azure_icons/Container Service Color/Container Registries.svg";
import { ReactComponent as Kubernetes } from "../../assets/azure_icons/Container Service Color/Kubernetes Services.svg";
import { ReactComponent as ASE } from "../../assets/azure_icons/Web Service Color/App Service Environments.svg";
import { ReactComponent as AppService } from "../../assets/azure_icons/Web Service Color/App Services.svg";

import { ReactComponent as APIM } from "../../assets/azure_icons/Integration Service Color/API Management Services.svg";
import { ReactComponent as ServiceBus } from "../../assets/azure_icons/Integration Service Color/Azure Service Bus.svg";
import { ReactComponent as LogicApp } from "../../assets/azure_icons/Integration Service Color/Logic Apps.svg";
import { ReactComponent as EventGridTopic } from "../../assets/azure_icons/Integration Service Color/Event Grid Subscriptions.svg";
import { ReactComponent as EventGridSubscription } from "../../assets/azure_icons/Integration Service Color/Event Grid Topics.svg";

import { ReactComponent as Sentinel } from "../../assets/azure_icons/Security Service Color/Azure Sentinel.svg";
import { ReactComponent as KeyVault } from "../../assets/azure_icons/Security Service Color/Key Vaults.svg";
import { ReactComponent as SecurityCenter } from "../../assets/azure_icons/Security Service Color/Security Center.svg";
import { ReactComponent as DDOSStandard } from "../../assets/azure_icons/Networking Service Color/DDOS Protection Plans.svg";
import { ReactComponent as AzFirewall } from "../../assets/azure_icons/Networking Service Color/Azure Firewall.svg";

import { ReactComponent as AzBackup } from "../../assets/azure_icons/_Flat Symbols/CnE_Enterprise/Backup, online.svg";
import { ReactComponent as Monitor } from "../../assets/azure_icons/Management and Governance Service Color/Monitor.svg";
import { ReactComponent as AzAutomation } from "../../assets/azure_icons/Management and Governance Service Color/Automation Accounts.svg";

import { ReactComponent as AzureAD } from "../../assets/azure_icons/Identity Service Color/Active Directory.svg";
import { ReactComponent as AzureADB2C } from "../../assets/azure_icons/Identity Service Color/Azure AD B2C.svg";

import { ReactComponent as IoTHub } from "../../assets/azure_icons/Internet of Things Service Color/Azure IoT Hub.svg";
import { ReactComponent as AzureMap } from "../../assets/azure_icons/Internet of Things Service Color/Azure Maps.svg";
import { ReactComponent as TimeSeriesInsight } from "../../assets/azure_icons/Internet of Things Service Color/Time Series Insights environments.svg";


import ResourceType from '../../models/ResourceType';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';


export default class ResourcePalette extends Component {
 
  constructor(props) {
    super(props);

    this.graphManager = this.props.mxgraphManager;

    this.straightArrow = React.createRef();
    this.dashedArrow = React.createRef();
    this.elbowArrow = React.createRef();
    this.curveArrow = React.createRef();
    this.label = React.createRef();
    this.rectangle = React.createRef();
    this.circle = React.createRef();
    this.triangle = React.createRef();
    this.user = React.createRef();
    this.datacenter = React.createRef();
    this.internet = React.createRef();

    this.vmWindowsIcon = React.createRef();
    this.vmLinuxIcon = React.createRef();
    this.vmssIcon =  React.createRef();
    this.funcIcon = React.createRef();
    this.aseIcon = React.createRef();
    this.appsvcIcon = React.createRef();

    this.azfw = React.createRef();
    this.vnetIcon = React.createRef();
    this.nlbIcon = React.createRef();
    this.dnsprivatezoneIcon = React.createRef();
    this.appgwIcon = React.createRef();

    this.containerInstanceIcon = React.createRef();
    this.containerRegistryIcon = React.createRef();
    this.kubeIcon = React.createRef();
    this.siteRecoveryIcon = React.createRef();
    this.backupIcon = React.createRef();

    this.state = {
      isShapeOpen: false,
      isComputeOpen: false,
      isNetworkingOpen: false,
      isContainerOpen: false,
      isIntegrationOpen: false,
      isManagementOpen: false,
      isStorageOpen: false,
      isDatabaseOpen: false,
      isIdentityOpen: false,
      isIoTOpen : false,
      isDataOpen: false,
      graphContainer: null
    }
  }
  

  componentWillMount() {
    
      var useStyles = makeStyles(theme => ({
        root: {
          width: '100%',
        },
        heading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular,
        },
      }));

      
  }

  shapePanelHeaderClick = () => { 
    this.setState(
      { 
        isShapeOpen: !this.state.isShapeOpen
      }) 
  }

  iotPanelHeaderClick = () => {
    this.setState(
      { 
        isIoTOpen: !this.state.isIoTOpen
      }) 
  }

  dataPanelHeaderClick = () => {
    this.setState(
      { 
        isDataOpen: !this.state.isDataOpen
      }) 
  }

  serverPanelHeaderClick = () => {
    this.setState(
      { 
        isServerOpen: !this.state.isServerOpen
      }) 
  }

  storagePanelHeaderClick = () => { 
    this.setState(
      { 
        isStorageOpen: !this.state.isStorageOpen
      }) 
  }  

  computePanelHeaderClick = () => { 
    this.setState(
      { 
        isComputeOpen: !this.state.isComputeOpen
      }) 
  }

  networkingPanelHeaderClick = () => { 
    this.setState(
      { 
        isNetworkingOpen: !this.state.isNetworkingOpen
      }) 
  }

  containerPanelHeaderClick = () => {
    this.setState(
      { 
        isContainerOpen: !this.state.isContainerOpen
      })
  }

  integrationPanelHeaderClick = () => {
    this.setState(
      { 
        isIntegrationOpen: !this.state.isIntegrationOpen
      })
  }

  managementPanelHeaderClick = () => {
    this.setState(
      { 
        isManagementOpen: !this.state.isManagementOpen
      })
  }

  identityPanelHeaderClick = () => {
    this.setState(
      { 
        isIdentityOpen: !this.state.isIdentityOpen
      })
  }

  databasePanelHeaderClick = () => {
    this.setState(
      { 
        isDatabaseOpen: !this.state.isDatabaseOpen
      })
  }

  securityPanelHeaderClick = () => {
    this.setState(
      { 
        isSecurityOpen: !this.state.isSecurityOpen
      })
  }

  componentDidMount = () =>  
  {
      this.makeIconsDraggable();
  }

 

  render(){
    

    return (
      <div className='resourcePalette'>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>Shapes (Non-Azure)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
            <div class="tile-panel" ref={this.straightArrow}>
                <Tippy content="Straight Arrow" followCursor={true} placement="bottom">
                  <img src={require('../../assets/azure_icons/straight-connector.png')} width="30" height="30" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.dashedArrow}>
                <Tippy content="Dashed Arrow" followCursor={true} placement="bottom">
                  <img src={require('../../assets/azure_icons/shape-dasharrow.png')} width="30" height="30" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.elbowArrow}>
                <Tippy content="Elbow Arrow" followCursor={true} placement="bottom">
                  <img src={require('../../assets/azure_icons/round-connector.png')} width="30" height="30" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.curveArrow}>
                <Tippy content="Curved Arrow" followCursor={true} placement="bottom">
                  <img src={require('../../assets/azure_icons/shape-curvearrow.png')} width="30" height="30" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.label}>
                <Tippy content="Label" followCursor={true} placement="bottom">
                  <img src={require('../../assets/azure_icons/text.png')} width="30" height="30" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.rectangle}>
                <Tippy content="Rectangle" followCursor={true} placement="bottom">
                  <img src={require('../../assets/azure_icons/shape-rectangle.png')} width="30" height="30" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.triangle}>
                <Tippy content="Triangle" followCursor={true} placement="bottom">
                  <img src={require('../../assets/azure_icons/shape-triangle.png')} width="30" height="30" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.circle}>
                <Tippy content="Circle" followCursor={true} placement="bottom">
                  <Circle class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.user}>
                <Tippy content="User" followCursor={true} placement="bottom">
                  <User class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.datacenter}>
                <Tippy content="On-Premise DC" followCursor={true} placement="bottom">
                <img src={require('../../assets/azure_icons/shape-dc.png')} width="25" height="25" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.internet}>
                <Tippy content="Internet" followCursor={true} placement="bottom">
                  <Internet class="azure-rsc-icon" />
                </Tippy>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography>Devices (Non-Azure)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
              <div class="tile-panel" ref={this.user}>
                  <Tippy content="Client" followCursor={true} placement="bottom">
                    <ClientDevice class="azure-rsc-icon" style={{height: '55px', width:'55px'}} />
                  </Tippy>
              </div>
              <div class="tile-panel" ref={this.user}>
                <Tippy content="ADFS" followCursor={true} placement="bottom">
                  <ADFS class="azure-rsc-icon" style={{height: '55px', width:'55px'}} />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.user}>
                <Tippy content="Andriod" followCursor={true} placement="bottom">
                  <img src={require('../../assets/azure_icons/shape-andriod.png')} width="30" height="30" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.user}>
                <Tippy content="iPhone" followCursor={true} placement="bottom">
                  <img src={require('../../assets/azure_icons/shape-iphone.png')} width="35" height="35" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.user}>
                <Tippy content="On-Premise Database Server" followCursor={true} placement="bottom">
                  <OnPremDBServer class="azure-rsc-icon" style={{height: '55px', width:'55px'}} />
                </Tippy>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography>Compute</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
              <div class="tile-panel" ref={this.vmWindowsIcon}>
                <Tippy content="Windows VM" followCursor={true} placement="bottom">
                  <VirtualMachine class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.vmLinuxIcon}>
                <Tippy content="Linux VM" followCursor={true} placement="bottom">
                  <LinuxVirtualMachine class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.vmssIcon}>
                <Tippy content="Virtual Machine Scale Sets" followCursor={true} placement="bottom">
                  <VMSS class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.appsvcIcon}>
                <Tippy content="App Service" followCursor={true} placement="bottom">
                  <AppService class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.aseIcon}>
                <Tippy content="App Service Environment" followCursor={true} placement="bottom">
                  <ASE class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.funcIcon}>
                <Tippy content="Function" followCursor={true} placement="bottom">
                  <FunctionApp class="azure-rsc-icon" />
                </Tippy>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography>Networking</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
              <div class="tile-panel" ref={this.vnetIcon}>
                <Tippy content="Virtual Network" followCursor={true} placement="bottom">
                  <VirtualNetwork class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.nlbIcon}>
                <Tippy content="Load Balancer" followCursor={true} placement="bottom">
                  <LoadBalancer class="azure-rsc-icon" />
              </Tippy>
              </div>
              <div class="tile-panel" ref={this.appgwIcon}>
                <Tippy content="Application Gateway" followCursor={true} placement="bottom">
                  <AppGateway class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.dnsprivatezoneIcon}>
                <Tippy content="Private DNS Zone" followCursor={true} placement="bottom">
                  <DNSPrivateZone class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.frontdoorIcon}>
                <Tippy content="Front Door" followCursor={true} placement="bottom">
                  <FrontDoor class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.publicipIcon}>
                <Tippy content="Public IP" followCursor={true} placement="bottom">
                  <PublicIp class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.expressrouteIcon}>
                <Tippy content="Express Route" followCursor={true} placement="bottom">
                  <ExpressRoute class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.networkwatcherIcon}>
                <Tippy content="Network Watcher" followCursor={true} placement="bottom">
                  <NetworkWatcher class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.trafficmanagerIcon}>
                <Tippy content="Traffic Manager" followCursor={true} placement="bottom">
                  <TrafficManager class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.vpngatewayIcon}>
                <Tippy content="VPN Gateway" followCursor={true} placement="bottom">
                  <VPNGateway class="azure-rsc-icon" />
                </Tippy>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography>Storage</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
              <div class="tile-panel" ref={this.storageIcon}>
                <Tippy content="Blob Storage" followCursor={true} placement="bottom">
                  <Storage class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.azfileIcon}>
                <Tippy content="Azure Files" followCursor={true} placement="bottom">
                  <img src={require('../../assets/azure_icons/azure-storage-files.png')} width="25" height="25" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.azfileIcon}>
                <Tippy content="Azure File Sync" followCursor={true} placement="bottom">
                  <FileSync class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.azfileIcon}>
                <Tippy content="NetApp Files" followCursor={true} placement="bottom">
                  <NetAppFiles class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.azfileIcon}>
                <Tippy content="Queue Storage" followCursor={true} placement="bottom">
                  <QueueStorage class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.azfileIcon}>
                <Tippy content="Table Storage" followCursor={true} placement="bottom">
                  <TableStorage class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.azfileIcon}>
                <Tippy content="Databox" followCursor={true} placement="bottom">
                  <Databox class="azure-rsc-icon" />
                </Tippy>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography>Database</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
              <div class="tile-panel" ref={this.postgresqlIcon}>
              <Tippy content="Azure Database for PostgreSQL" followCursor={true} placement="bottom">
                <PostgreSQL class="azure-rsc-icon" />
              </Tippy>
              </div>
              <div class="tile-panel" ref={this.sqldbIcon}>
                <Tippy content="Azure SQL" followCursor={true} placement="bottom">
                  <SQLDatabase class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.cosmosdbIcon}>
                <Tippy content="Cosmos DB" followCursor={true} placement="bottom">
                  <CosmosDB class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.azDbMySqlIcon}>
                <Tippy content="Azure Database for MySQL" followCursor={true} placement="bottom">
                  <MySQL class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.azSqlElasticPoolIcon}>
                <Tippy content="Azure SQL Elastic Pool" followCursor={true} placement="bottom">
                  <AzSQLElasticPool class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.azsqlmiPoolIcon}>
                <Tippy content="Azure SQL Managed Instance" followCursor={true} placement="bottom">
                  <SQLManagedInstance class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.azsqlmiIcon}>
                <Tippy content="SQL Stretched DB" followCursor={true} placement="bottom">
                  <SQLStretchedDB class="azure-rsc-icon" />
                </Tippy>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography>Data</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
              <div class="tile-panel" ref={this.synapseIcon}>
                <Tippy content="Synapse Analytics" followCursor={true} placement="bottom">
                  <SynapseAnalytics class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.datalakeIcon}>
                <Tippy content="Data Lake Storage" followCursor={true} placement="bottom">
                  <DataLake class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.databricksIcon}>
                <Tippy content="Databricks" followCursor={true} placement="bottom">
                  <DataBricks class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.datafactoryIcon}>
                <Tippy content="Data Factory" followCursor={true} placement="bottom">
                  <DataFactory class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.hdinsightIcon}>
                <Tippy content="HDInsight" followCursor={true} placement="bottom">
                  <HDInsights class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.dataexplorerIcon}>
                <Tippy content="Data Explorer" followCursor={true} placement="bottom">
                  <DataExplorer class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.dataexplorerIcon}>
                <Tippy content="Data Lake Analytics" followCursor={true} placement="bottom">
                  <DataLakeAnalytics class="azure-rsc-icon" />
                </Tippy>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography>Container</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
              <div class="tile-panel" ref={this.containerInstanceIcon}>
              <Tippy content="Container Instance" followCursor={true} placement="bottom">
                <ContainerInstance class="azure-rsc-icon" />
              </Tippy>
            </div>
            <div class="tile-panel" ref={this.containerRegistryIcon}>
              <Tippy content="Container Registry" followCursor={true} placement="bottom">
                <ContainerRegistry class="azure-rsc-icon" />
              </Tippy>
            </div>
            <div class="tile-panel" ref={this.kubeIcon}>
              <Tippy content="Kubernetes Service" followCursor={true} placement="bottom">
                <Kubernetes class="azure-rsc-icon" />
              </Tippy>
            </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography>Integration</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
              <div class="tile-panel" ref={this.apimIcon}>
                <Tippy content="API Management" followCursor={true} placement="bottom">
                  <APIM class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.asbIcon}>
                <Tippy content="Service Bus" followCursor={true} placement="bottom">
                  <ServiceBus class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.logicAppIcon}>
                <Tippy content="Logic App" followCursor={true} placement="bottom">
                  <LogicApp class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.eventGridTopicIcon}>
                <Tippy content="Event Grid Topic" followCursor={true} placement="bottom">
                  <EventGridTopic class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.eventGridSubIcon}>
                <Tippy content="Event Grid Subscription" followCursor={true} placement="bottom">
                  <EventGridSubscription class="azure-rsc-icon" />
                </Tippy>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography>Security</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
              <div class="tile-panel" ref={this.azfwIcon}>
                <Tippy content="Firewall" followCursor={true} placement="bottom">
                  <AzFirewall class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.sentinelIcon}>
                <Tippy content="Sentinel" followCursor={true} placement="bottom">
                  <Sentinel class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.akvIcon}>
                <Tippy content="Key Vault" followCursor={true} placement="bottom">
                  <KeyVault class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.ascIcon}>
                <Tippy content="Security Center" followCursor={true} placement="bottom">
                  <SecurityCenter class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.azddosstandardIcon}>
                <Tippy content="DDoS Protection Standard" followCursor={true} placement="bottom">
                  <DDOSStandard class="azure-rsc-icon" />
                </Tippy>
              </div>
              <div class="tile-panel" ref={this.bastionIcon}>
                <Tippy content="Azure Bastion" followCursor={true} placement="bottom">
                  <img src={require('../../assets/azure_icons/Security Service Color/azure-bastion-icon.png')} width="25" height="25" />
                </Tippy>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography>Management</Typography>
          </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography component={'span'} variant={'body2'}>
                  <div class="tile-panel" ref={this.backupIcon}>
                  <Tippy content="Backup Service" followCursor={true} placement="bottom">
                    <AzBackup class="azure-rsc-icon" />
                  </Tippy>
                </div>
                <div class="tile-panel" ref={this.siteRecoveryIcon}>
                  <Tippy content="Site Recovery" followCursor={true} placement="bottom">
                    <img src={require('../../assets/azure_icons/Management and Governance Service Color/SiteRecovery.png')} width="30" height="30" />
                  </Tippy>
                </div>
                <div class="tile-panel" ref={this.appInsightsIcon}>
                  <Tippy content="Application Insights" followCursor={true} placement="bottom">
                    <img src={require('../../assets/azure_icons/Management and Governance Service Color/AppInsights.png')} width="25" height="25" />
                  </Tippy>
                </div>
                <div class="tile-panel" ref={this.azMonitorIcon}>
                  <Tippy content="Monitor/Log Analytics" followCursor={true} placement="bottom">
                    <Monitor class="azure-rsc-icon" />
                  </Tippy>
                </div>
                <div class="tile-panel" ref={this.automationIcon}>
                  <Tippy content="Automation" followCursor={true} placement="bottom">
                    <AzAutomation class="azure-rsc-icon" />
                  </Tippy>
                </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header">
              <Typography>Identity</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography component={'span'} variant={'body2'}>
                <div class="tile-panel" ref={this.azad}>
                  <Tippy content="Azure AD" followCursor={true} placement="bottom">
                    <AzureAD class="azure-rsc-icon" />
                  </Tippy>
                </div>
                <div class="tile-panel" ref={this.azdbb2c}>
                  <Tippy content="Azure AD B2C" followCursor={true} placement="bottom">
                    <AzureADB2C class="azure-rsc-icon" />
                  </Tippy>
                </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header">
              <Typography>IoT</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography component={'span'} variant={'body2'}>
                <div class="tile-panel" ref={this.iothub}>
                  <Tippy content="IoT Hub" followCursor={true} placement="bottom">
                    <IoTHub class="azure-rsc-icon" />
                  </Tippy>
                </div>
                <div class="tile-panel" ref={this.azmaps}>
                  <Tippy content="Azure Maps" followCursor={true} placement="bottom">
                    <AzureMap class="azure-rsc-icon" />
                  </Tippy>
                </div>
                <div class="tile-panel" ref={this.timeseriesinsights}>
                  <Tippy content="Time Series Insights" followCursor={true} placement="bottom">
                    <TimeSeriesInsight class="azure-rsc-icon" />
                  </Tippy>
                </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
    );
  };

  makeIconsDraggable = () => {

    var thisComponent = this;

    this.graphManager.makeIconDraggable(this.straightArrow.current, "straightarrow", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.dashedArrow.current, "dashedarrow", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.elbowArrow.current, "elbowarrow", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.curveArrow.current, "curvearrow", thisComponent.props.addResourceToDiagramEditor);
    
    this.graphManager.makeIconDraggable(this.label.current, "label", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.rectangle.current, "rectangle", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.triangle.current, "triangle", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.circle.current, "circle", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.user.current, "user", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.datacenter.current, "datacenter", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.internet.current, "internet", thisComponent.props.addResourceToDiagramEditor);

    this.graphManager.makeIconDraggable(this.vmWindowsIcon.current, ResourceType.WindowsVM(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vmLinuxIcon.current, ResourceType.LinuxVM(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vmssIcon.current, ResourceType.VMSS(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.appsvcIcon.current, ResourceType.AppService(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.aseIcon.current, ResourceType.ASE(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.funcIcon.current, ResourceType.Function(), thisComponent.props.addResourceToDiagramEditor);

    this.graphManager.makeIconDraggable(this.vnetIcon.current, ResourceType.VNet(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.nlbIcon.current, ResourceType.NLB(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.appgwIcon.current, ResourceType.AppGw(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.dnsprivatezoneIcon.current, ResourceType.DNSPrivateZone(), thisComponent.props.addResourceToDiagramEditor);
  
  }
}