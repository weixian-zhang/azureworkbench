import React, { Component } from "react";
import {InputGroup, Button} from "@blueprintjs/core";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppBar from '@material-ui/core/AppBar';

// import { ReactComponent as SQLDatabase } from "../../assets/azure_icons/Databases Service Color/SQL Databases.svg";
// import { ReactComponent as CosmosDB } from "../../assets/azure_icons/Databases Service Color/Azure Cosmos DB.svg";
// import { ReactComponent as PostgreSQL } from "../../assets/azure_icons/Databases Service Color/Azure Database for PostgreSQL servers.svg";
// import { ReactComponent as MySQL } from "../../assets/azure_icons/Databases Service Color/Azure Database for MySQL servers.svg";
// import { ReactComponent as MariaDB } from "../../assets/azure_icons/Databases Service Color/Azure Database for MariaDB servers.svg";
// import { ReactComponent as AzSQLElasticPool } from "../../assets/azure_icons/Databases Service Color/Elastic Database Pools.svg";
// import { ReactComponent as SQLManagedInstance } from "../../assets/azure_icons/Databases Service Color/SQL Managed Instances.svg";
// import { ReactComponent as SQLStretchedDB } from "../../assets/azure_icons/Databases Service Color/SQL Server stretch Databases.svg";
// import { ReactComponent as RedisCache } from "../../assets/azure_icons/Databases Service Color/Azure Cache for Redis.svg";

// //data
// import { ReactComponent as DataLake } from "../../assets/azure_icons/Databases Service Color/Data Lake Storage.svg";
// import { ReactComponent as DataBricks } from "../../assets/azure_icons/Analytics Service Color/Azure Databricks.svg";
// import { ReactComponent as DataFactory } from "../../assets/azure_icons/Analytics Service Color/Data Factories.svg";
// import { ReactComponent as HDInsights } from "../../assets/azure_icons/Analytics Service Color/HDInsightClusters.svg";
// import { ReactComponent as DataExplorer } from "../../assets/azure_icons/Analytics Service Color/Azure Data Explorer Clusters.svg";
// import { ReactComponent as DataLakeAnalytics } from "../../assets/azure_icons/Analytics Service Color/Data Lake Analytics.svg";

//compute
// import { ReactComponent as LinuxVirtualMachine } from "../../assets/azure_icons/ComputeServiceColor/VM/VM-Linux.svg";
// import { ReactComponent as VMSS } from "../../assets/azure_icons/ComputeServiceColor/VM/VM Scale Sets.svg";
// import { ReactComponent as DevTestLab } from "../../assets/azure_icons/ComputeServiceColor/Azure DevTest Labs.svg";
// import { ReactComponent as SIG } from "../../assets/azure_icons/ComputeServiceColor/Shared Image Galleries.svg";


// import { ReactComponent as VirtualNetwork } from "../../assets/azure_icons/Networking Service Color/Virtual Networks.svg";
// import { ReactComponent as AppGateway } from "../../assets/azure_icons/Networking Service Color/Application Gateway.svg";
// import { ReactComponent as LoadBalancer } from "../../assets/azure_icons/Networking Service Color/Load Balancers.svg";
// import { ReactComponent as DNSPrivateZone } from "../../assets/azure_icons/Networking Service Color/DNS Private Zones.svg";
// import { ReactComponent as FrontDoor } from "../../assets/azure_icons/Networking Service Color/Front Doors.svg";
// import { ReactComponent as PublicIp } from "../../assets/azure_icons/Networking Service Color/Public IP Addresses.svg";
// import { ReactComponent as ExpressRoute } from "../../assets/azure_icons/Networking Service Color/ExpressRoute Circuits.svg";
// import { ReactComponent as TrafficManager } from "../../assets/azure_icons/Networking Service Color/Traffic Manager Profiles.svg";
// import { ReactComponent as VNetGateway } from "../../assets/azure_icons/Networking Service Color/Virtual Network Gateways.svg";
// import { ReactComponent as ASG } from "../../assets/azure_icons/Networking Service Color/Application Security Groups.svg";
// import { ReactComponent as NIC } from "../../assets/azure_icons/Networking Service Color/Network Interfaces.svg";

// import { ReactComponent as Storage } from "../../assets/azure_icons/Storage Service Color/Blob Storage.svg";
// import { ReactComponent as Databox } from "../../assets/azure_icons/Storage Service Color/Data Box.svg";
// import { ReactComponent as FileSync } from "../../assets/azure_icons/Storage Service Color/Storage Sync Services.svg";
// import { ReactComponent as NetAppFiles } from "../../assets/azure_icons/Storage Service Color/Azure NetApp files.svg";
// import { ReactComponent as QueueStorage } from "../../assets/azure_icons/Storage Service Color/Queues Storage.svg";
// import { ReactComponent as TableStorage } from "../../assets/azure_icons/Storage Service Color/Table Storage.svg";


// import { ReactComponent as ContainerInstance } from "../../assets/azure_icons/Container Service Color/Container Instances.svg";
// import { ReactComponent as ContainerRegistry } from "../../assets/azure_icons/Container Service Color/Container Registries.svg";
// import { ReactComponent as Kubernetes } from "../../assets/azure_icons/Container Service Color/Kubernetes Services.svg";

// import { ReactComponent as APIM } from "../../assets/azure_icons/Integration Service Color/API Management Services.svg";
// import { ReactComponent as ServiceBus } from "../../assets/azure_icons/Integration Service Color/Azure Service Bus.svg";
// import { ReactComponent as Relay } from "../../assets/azure_icons/Integration Service Color/Azure Service Bus Relays.svg";
// import { ReactComponent as LogicApp } from "../../assets/azure_icons/Integration Service Color/Logic Apps.svg";
// import { ReactComponent as ISE } from "../../assets/azure_icons/Integration Service Color/Integration Service Environments.svg";
// import { ReactComponent as EventGridTopic } from "../../assets/azure_icons/Integration Service Color/Event Grid Subscriptions.svg";
// import { ReactComponent as EventGridSubscription } from "../../assets/azure_icons/Integration Service Color/Event Grid Topics.svg";
// import { ReactComponent as SendGrid } from "../../assets/azure_icons/Integration Service Color/SendGrid Accounts.svg";

// import { ReactComponent as Sentinel } from "../../assets/azure_icons/Security Service Color/Azure Sentinel.svg";
// import { ReactComponent as KeyVault } from "../../assets/azure_icons/Security Service Color/Key Vaults.svg";
// import { ReactComponent as SecurityCenter } from "../../assets/azure_icons/Security Service Color/Security Center.svg";
// import { ReactComponent as DDOSStandard } from "../../assets/azure_icons/Networking Service Color/DDOS Protection Plans.svg";
// import { ReactComponent as AzFirewall } from "../../assets/azure_icons/Networking Service Color/Azure Firewall.svg";

// import { ReactComponent as AzAutomation } from "../../assets/azure_icons/Management and Governance Service Color/Automation Accounts.svg";

// import { ReactComponent as AzureAD } from "../../assets/azure_icons/Identity Service Color/Active Directory.svg";
// import { ReactComponent as AzureADB2C } from "../../assets/azure_icons/Identity Service Color/Azure AD B2C.svg";

// import { ReactComponent as IoTHub } from "../../assets/azure_icons/Internet of Things Service Color/Azure IoT Hub.svg";
// import { ReactComponent as AzureMap } from "../../assets/azure_icons/Internet of Things Service Color/Azure Maps.svg";
// import { ReactComponent as TimeSeriesInsight } from "../../assets/azure_icons/Internet of Things Service Color/Time Series Insights environments.svg";


import ResourceType from '../../models/ResourceType';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

//https://code.benco.io/icon-collection/official/

export default class ResourcePalette extends Component {
 
  constructor(props) {
    super(props);

    this.graphManager = this.props.mxgraphManager;

    this.initRef();
    
    this.state = {
      graphContainer: null,
      searchText: '',
      filteredResources: this.initPaletteResources(),
      onSearchExpandPanel: false
    }

    this.styles = {
      visible: {
        visibility: "visible"
      },
      hidden: {
        visibility: "hidden"
      }
    }
  }

  initRef(){
    this.shapecalico = React.createRef();
    this.shaperesourcegroup = React.createRef();
    this.threedbox = React.createRef();
    this.straightArrow = React.createRef();
    this.elbowArrow = React.createRef();
    this.curveArrow = React.createRef();
    this.label = React.createRef();
    this.rectangle = React.createRef();
    this.roundedrectangle = React.createRef();
    this.circle = React.createRef();
    this.cylinder = React.createRef();
    this.hexagon = React.createRef();
    this.triangle = React.createRef();
    this.user = React.createRef();
    this.userblue = React.createRef();
    this.usergroup = React.createRef();
    this.datacenter = React.createRef();
    this.internet = React.createRef();
    this.clientIcon = React.createRef();
    this.adfsIcon = React.createRef();
    this.andriodIcon = React.createRef();
    this.iphoneIcon = React.createRef();
    this.vm1 = React.createRef();
    this.vm2 = React.createRef();
    this.server1 = React.createRef();
    this.server2 = React.createRef();
    this.dbblack = React.createRef();
    this.dbblackha = React.createRef();
    this.dbblue = React.createRef();
    this.shapefirewall = React.createRef();

    this.shapehelm = React.createRef();
    this.shapeazuredevops = React.createRef();
    this.shapecsharp = React.createRef();
    this.shapedapr = React.createRef();
    this.shapedocker = React.createRef();
    this.shapeelasticsearch = React.createRef();
    this.shapeesbmiddleware = React.createRef();
    this.shapegithub = React.createRef();
    this.shapegithubactions = React.createRef();
    this.shapegolang = React.createRef();
    this.shapegrafana = React.createRef();
    this.shapehashicorpconsul = React.createRef();
    this.shapehashicorpterraform = React.createRef();
    this.shapehashicorpvault = React.createRef();
    this.shapeinfluxdb = React.createRef();
    this.shapejava = React.createRef();
    this.shapejavascript  = React.createRef();
    this.shapekafka = React.createRef();
    this.shapekubernetes = React.createRef();
    this.shapekube = React.createRef();
    this.shapemessagequeue = React.createRef();
    this.shapemongodb = React.createRef();
    this.shapenetcore = React.createRef();
    this.shapenginx = React.createRef();
    this.shapenginxplus = React.createRef();
    this.shapenodejs = React.createRef();
    this.shapepowershell = React.createRef();
    this.shapepowerbi = React.createRef();
    this.shapepython = React.createRef();
    this.shaperabbitmq = React.createRef();
    this.shaperubyonrails= React.createRef();
    this.shapetraefik = React.createRef();
    this.shapezipkin = React.createRef();
    this.shapejaeger = React.createRef();

    this.devtestlabIcon = React.createRef();
    this.sigIcon = React.createRef();
    this.vmWindowsIcon = React.createRef();
    this.vmLinuxIcon = React.createRef();
    this.vmssIcon =  React.createRef();
    this.funcIcon = React.createRef();
    this.aseIcon = React.createRef();
    this.appsvcIcon = React.createRef();
    this.azsearchIcon = React.createRef();
    this.signalrIcon = React.createRef();
    this.appsvccertIcon = React.createRef();
    this.appsvcdomainIcon = React.createRef();
    this.appsvcconfig = React.createRef();

    this.publicipIcon = React.createRef();
    this.expressrouteIcon = React.createRef();
    this.trafficmanagerIcon = React.createRef();
    this.vnetgatewayIcon = React.createRef();
    this.cdnIcon  = React.createRef();
    this.asgIcon = React.createRef();
    this.nicIcon = React.createRef();
    this.azfw = React.createRef();
    this.vnetIcon = React.createRef();
    this.networkwatcherIcon = React.createRef();
    this.privateEndpointIcon = React.createRef();
    this.nlbIcon = React.createRef();
    this.dnsprivatezoneIcon = React.createRef();
    this.appgwIcon = React.createRef();
    this.frontdoorIcon = React.createRef();
    this.containerInstanceIcon = React.createRef();
    this.containerRegistryIcon = React.createRef();
    this.kubeIcon = React.createRef();
    this.siteRecoveryIcon = React.createRef();
    this.azfileIcon = React.createRef();
    this.blobstorageIcon = React.createRef();
    this.azfilesyncIcon = React.createRef();
    this.netappfileIcon = React.createRef();
    this.queuestorageIcon = React.createRef();
    this.tablestorageIcon = React.createRef();
    this.databoxIcon = React.createRef();

    //data ai
    this.cognitivesvcicon = React.createRef();
    this.botsvcicon = React.createRef();
    this.genomicsicon = React.createRef();
    this.mlsvcworkspace = React.createRef();

    this.postgresqlIcon = React.createRef();
    this.mariaDbIcon = React.createRef();
    this.sqldbIcon = React.createRef();
    this.cosmosdbIcon = React.createRef();
    this.mysqlIcon = React.createRef();
    this.azSqlElasticPoolIcon = React.createRef();
    this.sqlmiIcon = React.createRef();
    this.sqlstretchIcon = React.createRef();
    this.redisIcon = React.createRef();
    this.synapseIcon = React.createRef();
    this.dataexplorerIcon = React.createRef();
    this.databricksIcon = React.createRef();
    this.datafactoryIcon = React.createRef();
    this.datalakeanalyticsIcon = React.createRef();
    this.hdinsightIcon = React.createRef();
    this.apimIcon = React.createRef();
    this.asbIcon = React.createRef();
    this.logicAppIcon = React.createRef();
    this.relayIcon =  React.createRef();
    this.iseIcon = React.createRef();
    this.eventGridTopicIcon = React.createRef();
    this.eventGridSubIcon = React.createRef();
    this.streamanalyticsIcon = React.createRef();
    this.eventhubIcon = React.createRef();
    this.sendgridSubIcon = React.createRef();

    this.azfwIcon = React.createRef();
    this.sentinelIcon = React.createRef();
    this.ascIcon = React.createRef();
    this.ddosstandardIcon = React.createRef();
    this.bastionIcon = React.createRef();
    this.akvIcon = React.createRef();
    this.siteRecoveryIcon = React.createRef();
    this.appInsightsIcon = React.createRef();
    this.azloganalyticsIcon = React.createRef();
    this.automationIcon = React.createRef();

    this.aadIcon = React.createRef();
    this.aadb2cIcon = React.createRef();
    this.iothub = React.createRef();
    this.azmaps = React.createRef();
    this.timeseriesinsights = React.createRef();
    this.appconfigIcon = React.createRef();
    this.iotcentralhub =  React.createRef();
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

  componentDidMount = () =>  
  {
      this.makeIconsDraggable();
  }
  
  initPaletteResources() {
    var paletteRscs = [
      {
         resourceGroup: {
           groupName: 'Shapes (Non-Azure)',
           groupExpanded: false,
           groupSearchVisible: true,
           resources: [
             {
                 Name: 'Straight Arrow',
                 Tooltip: 'Straight Arrow',
                 Image: require('../../assets/azure_icons/straight-connector.png'),
                 IsPng: true,
                 IsVisible:true,
                 ref: this.straightArrow
             },
             {
                 Name: 'Elbow Arrow',
                 Tooltip: 'Elbow Arrow',
                 Image: require('../../assets/azure_icons/round-connector.png'),
                 IsPng: true,
                 IsVisible:true,
                 ref: this.elbowArrow
             },
             {
                Name: 'text label',
                Tooltip: 'Text',
                Image: require('../../assets/azure_icons/text.png'),
                IsPng: true,
                IsVisible:true,
                ref: this.label
             },
             {
              Name: 'rectangle rect',
              Tooltip: 'Rectangle',
              Image: require('../../assets/azure_icons/shape-rectangle.png'),
              IsPng: true,
              IsVisible:true,
              ref: this.rectangle
            },
            {
              Name: 'rounded rectangle rect',
              Tooltip: 'Rectangle Rounded',
              Image: require('../../assets/azure_icons/shape-roundedrectangle.png'),
              IsPng: true,
              IsVisible:true,
              ref: this.roundedrectangle
            },
            {
              Name: 'triangle tri',
              Tooltip: 'Triangle',
              Image: require('../../assets/azure_icons/shape-triangle.png'),
              IsPng: true,
              IsVisible:true,
              ref: this.triangle
            },
            {
              Name: 'circle',
              Tooltip: 'Circle',
              Image: require('../../assets/azure_icons/shape-circle.png'),
              IsPng: true,
              IsVisible:true,
              ref: this.circle
            },
            {
              Name: 'cylinder',
              Tooltip: 'Cylinder',
              Image: require('../../assets/azure_icons/shape-cylinder.png'),
              IsPng: true,
              IsVisible:true,
              ref: this.cylinder
            },
            {
              Name: 'hexagon',
              Tooltip: 'Hexagon',
              Image:require('../../assets/azure_icons/shape-hexagon.png'),
              IsPng: true,
              IsVisible:true,
              ref: this.hexagon
            },
            {
              Name: '3d box',
              Tooltip: '3D Box',
              Image:require('../../assets/azure_icons/shape-3dbox.png'),
              IsPng: true,
              IsVisible:true,
              ref: this.threedbox
            }
           ]
         }
      },
      {
       resourceGroup: {
         groupName: 'Devices (Non-Azure)',
         groupExpanded: false,
         groupSearchVisible: true,
         resources: [
           {
               Name: 'client laptop',
               Tooltip: 'Client Machine',
               Image: require('../../assets/azure_icons/_Flat Symbols/CnE_Enterprise/Laptop computer.png'),
               IsPng: false,
               IsVisible:true,
               ref: this.clientIcon
           },
           {
               Name: 'ADFS active directory federation service',
               Tooltip: 'ADFS',
               Image: require('../../assets/azure_icons/_Flat Symbols/CnE_Enterprise/AD FS.png'),
               IsPng: false,
               IsVisible:true,
               ref: this.adfsIcon
           },
           {
                Name: 'andriod driod',
                Tooltip: 'Andriod',
                Image: require('../../assets/azure_icons/shape-andriod.png'),
                IsPng: false,
                IsVisible:true,
                ref: this.andriodIcon
           },
           {
                Name: 'iphone apple',
                Tooltip: 'iPhone',
                Image: require('../../assets/azure_icons/shape-iphone.png'),
                IsPng: false,
                IsVisible:true,
                ref: this.iphoneIcon
           },
          {
            Name: 'user',
            Tooltip: 'User',
            Image:require('../../assets/azure_icons/shape-user.png'),
            IsPng: true,
            IsVisible:true,
            ref: this.user
          },
          {
            Name: 'user',
            Tooltip: 'User Blue',
            Image:require('../../assets/azure_icons/shape-userblue.png'),
            IsPng: true,
            IsVisible:true,
            ref: this.userblue
          },
          {
            Name: 'user',
            Tooltip: 'User Group',
            Image:require('../../assets/azure_icons/shape-usergroup.png'),
            IsPng: true,
            IsVisible:true,
            ref: this.usergroup
          },
          {
            Name: 'datacenter dc',
            Tooltip: 'Datacenter',
            Image:require('../../assets/azure_icons/shape-dc.png'),
            IsPng: true,
            IsVisible:true,
            ref: this.datacenter
          },
          {
            Name: 'internet',
            Tooltip: 'Internet',
            Image:require('../../assets/azure_icons/shape-internet.png'),
            IsPng: true,
            IsVisible:true,
            ref: this.internet
          },
          {
            Name: 'vm virtual machine',
            Tooltip: 'Azure VM',
            Image: require('../../assets/azure_icons/shape-vm.png'),
            IsPng: false,
            IsVisible:true,
            ref: this.vm1
          },
          {
            Name: 'vm virtual machine',
            Tooltip: 'VM',
            Image: require('../../assets/azure_icons/shape-vm2.png'),
            IsPng: false,
            IsVisible:true,
            ref: this.vm2
          },
          {
            Name: 'physical server',
            Tooltip: 'Physical Server',
            Image: require('../../assets/azure_icons/shape-server1.png'),
            IsPng: false,
            IsVisible:true,
            ref: this.server1
          },
          {
            Name: 'physical blade server',
            Tooltip: 'Blade Server',
            Image: require('../../assets/azure_icons/shape-server2.png'),
            IsPng: false,
            IsVisible:true,
            ref: this.server2
          },
          {
            Name: 'database db',
            Tooltip: 'Database Black',
            Image: require('../../assets/azure_icons/shape-dbblack.png'),
            IsPng: false,
            IsVisible:true,
            ref: this.dbblack
          },
          {
            Name: 'database db',
            Tooltip: 'Database HA Black',
            Image: require('../../assets/azure_icons/shape-dbhablack.png'),
            IsPng: false,
            IsVisible:true,
            ref: this.dbblackha
          },
          {
            Name: 'database db',
            Tooltip: 'Database Blue',
            Image: require('../../assets/azure_icons/shape-dbblue.png'),
            IsPng: false,
            IsVisible:true,
            ref: this.dbblue
          },
          {
            Name: 'firewall',
            Tooltip: 'Firewall',
            Image: require('../../assets/azure_icons/shape-firewall.png'),
            IsPng: false,
            IsVisible:true,
            ref: this.shapefirewall
          },
         ]
       }
      },
      {
        resourceGroup: {
          groupName: 'Misc (Non-Azure)',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'helm',
                Tooltip: 'Helm',
                Image: require('../../assets/azure_icons/software/helm.png'),
                IsPng: false,
                IsVisible:true,
                ref: this.shapehelm
            },
            {
              Name: 'azure devops',
              Tooltip: 'Azure DevOps',
              Image: require('../../assets/azure_icons/software/software-azuredevops.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapeazuredevops
            },
            {
              Name: 'c# csharp',
              Tooltip: 'C#, .Net',
              Image: require('../../assets/azure_icons/software/software-c#.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapecsharp
            },
            {
              Name: 'dapr framework microservice',
              Tooltip: 'Dapr',
              Image: require('../../assets/azure_icons/software/software-dapr.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapedapr
            },
            {
              Name: 'docker container',
              Tooltip: 'Docker',
              Image: require('../../assets/azure_icons/software/software-docker.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapedocker
            },
            {
              Name: 'elastic search elk',
              Tooltip: 'ElasticSearch',
              Image: require('../../assets/azure_icons/software/software-elasticsearch.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapeelasticsearch
            },
            {
              Name: 'enterprise service bus esb middleware',
              Tooltip: 'Enterprise Service Bus',
              Image: require('../../assets/azure_icons/software/software-esbmiddleware.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapeesbmiddleware
            },
            {
              Name: 'github git',
              Tooltip: 'GitHub',
              Image: require('../../assets/azure_icons/software/software-github.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapegithub
            },
            {
              Name: 'github actions git',
              Tooltip: 'GitHub Actions',
              Image: require('../../assets/azure_icons/software/software-githubactions.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapegithubactions
            },
            {
              Name: 'go lang',
              Tooltip: 'Go',
              Image: require('../../assets/azure_icons/software/software-golang.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapegolang
            },
            {
              Name: 'grafana',
              Tooltip: 'Grafana',
              Image: require('../../assets/azure_icons/software/software-grafana.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapegrafana
            },
            {
              Name: 'consul hashicorp',
              Tooltip: 'Hashicorp Consul',
              Image: require('../../assets/azure_icons/software/software-hashicorpconsul.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapehashicorpconsul
            },
            {
              Name: 'terraform hashicorp',
              Tooltip: 'Hashicorp ',
              Image: require('../../assets/azure_icons/software/software-hashicorpterraform.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapehashicorpterraform
            },
            {
              Name: 'hashicorp vault',
              Tooltip: 'Hashicorp Vault',
              Image: require('../../assets/azure_icons/software/software-hashicorpvault.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapehashicorpvault
            },
            {
              Name: 'influx db time series',
              Tooltip: 'InfluxDB',
              Image: require('../../assets/azure_icons/software/software-influxdb.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapeinfluxdb
            },
            {
              Name: 'java',
              Tooltip: 'Java',
              Image: require('../../assets/azure_icons/software/software-java.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapejava
            },
            {
              Name: 'javascript',
              Tooltip: 'Javascript',
              Image: require('../../assets/azure_icons/software/software-javascript.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapejavascript
            },
            {
              Name: 'kafka',
              Tooltip: 'Kafka',
              Image: require('../../assets/azure_icons/software/software-kafka.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapekafka
            },
            {
              Name: 'kubernetes microservice',
              Tooltip: 'Kubernetes (shape)',
              Image: require('../../assets/azure_icons/software/software-kubernetes.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapekube
            },
            {
              Name: 'message queue',
              Tooltip: 'Message Queue',
              Image: require('../../assets/azure_icons/software/software-messagequeue.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapemessagequeue
            },
            {
              Name: 'mongo db',
              Tooltip: 'MongoDB',
              Image: require('../../assets/azure_icons/software/software-mongodb.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapemongodb
            },
            {
              Name: '.net core ',
              Tooltip: '.Net Core',
              Image: require('../../assets/azure_icons/software/software-netcore.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapenetcore
            },
            {
              Name: 'nginx',
              Tooltip: 'Nginx',
              Image: require('../../assets/azure_icons/software/software-nginx.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapenginx
            },
            {
              Name: 'nginx plus',
              Tooltip: 'Nginx Plus',
              Image: require('../../assets/azure_icons/software/software-nginxplus.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapenginxplus
            },
            {
              Name: 'nodejs node',
              Tooltip: 'NodeJS',
              Image: require('../../assets/azure_icons/software/software-node.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapenodejs
            },
            {
              Name: 'powershell ps',
              Tooltip: 'Powershell',
              Image: require('../../assets/azure_icons/software/software-powershell.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapepowershell
            },
            {
              Name: 'power bi',
              Tooltip: 'Power BI',
              Image: require('../../assets/azure_icons/software/software-powerbi.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapepowerbi
            },
            {
              Name: 'python py',
              Tooltip: 'Python',
              Image: require('../../assets/azure_icons/software/software-python.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapepython
            },
            {
              Name: 'rabbit mq',
              Tooltip: 'RabbitMQ',
              Image: require('../../assets/azure_icons/software/software-rabbitmq.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shaperabbitmq
            },
            {
              Name: 'ruby on rails',
              Tooltip: 'Ruby On Rails',
              Image: require('../../assets/azure_icons/software/software-rubyonrails.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shaperubyonrails
            },
            {
              Name: 'traefik microservice',
              Tooltip: 'Traefik',
              Image: require('../../assets/azure_icons/software/software-traefik.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapetraefik
            },
            {
              Name: 'zipkin microservice',
              Tooltip: 'Zipkin',
              Image: require('../../assets/azure_icons/software/software-Zipkin.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapezipkin
            },
            {
              Name: 'jaeger microservice',
              Tooltip: 'Jaeger',
              Image: require('../../assets/azure_icons/software/software-jaeger.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapejaeger
            },
            {
              Name: 'calico microservice',
              Tooltip: 'Calico',
              Image: require('../../assets/azure_icons/software/software-calico.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapecalico
            },
            {
              Name: 'resource group',
              Tooltip: 'Azure Resource Group (shape))',
              Image: require('../../assets/azure_icons/software/software-resourcegroup.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shaperesourcegroup
            },
          ]
        }
       },
      {
        resourceGroup: {
          groupName: 'Web',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'app service',
                Tooltip: 'App Service',
                Image: require('../../assets/azure_icons/Web Service Color/App Services.png'),
                Provisionable: true,
                IsPng: false,
                IsVisible:true,
                ref: this.appsvcIcon
            },
            {
              Name: 'app service environment',
              Tooltip: 'App Service Environment',
              Image: require('../../assets/azure_icons/Web Service Color/App Service Environments.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.aseIcon
            },
            {
              Name: 'azure function',
              Tooltip: 'Function',
              Image: require('../../assets/azure_icons/Web Service Color/Function Apps.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.funcIcon
            },
            {
              Name: 'azure search',
              Tooltip: 'Azure Search',
              Image: require('../../assets/azure_icons/Web Service Color/Azure Search.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.azsearchIcon
            },
            {
              Name: 'azure signalr websocket',
              Tooltip: 'Azure SignalR',
              Image: require('../../assets/azure_icons/Web Service Color/SignalR.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.signalrIcon
            },
            {
              Name: 'app service certificate',
              Tooltip: 'App Service Certificate',
              Image: require('../../assets/azure_icons/Web Service Color/App Service Certificates.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.appsvccertIcon
            },
            {
              Name: 'app service domain',
              Tooltip: 'App Service Domain',
              Image: require('../../assets/azure_icons/Web Service Color/App Service Domains.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.appsvcdomainIcon
            },
            {
              Name: 'app configuration',
              Tooltip: 'App Configuration',
              Image: require('../../assets/azure_icons/Web Service Color/App Configuration.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.appconfigIcon
            },
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Compute',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'windows vm',
                Tooltip: 'Windows VM',
                Image: require('../../assets/azure_icons/ComputeServiceColor/VM/VM-windows.png'),
                Provisionable: true,
                IsPng: false,
                IsVisible:true,
                ref: this.vmWindowsIcon
            },
            {
              Name: 'linux vm',
              Tooltip: 'Linux VM',
              Image: require('../../assets/azure_icons/ComputeServiceColor/VM/VM-Linux.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              ref: this.vmLinuxIcon
            },
            {
              Name: 'vm scale sets',
              Tooltip: 'VM Scale Sets',
              Image: require('../../assets/azure_icons/ComputeServiceColor/VM/VM Scale Sets.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.vmssIcon
            },
            {
              Name: 'vm devtest lab',
              Tooltip: 'DevTest Labs',
              Image: require('../../assets/azure_icons/ComputeServiceColor/Azure DevTest Labs.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.devtestlabIcon
            },
            {
              Name: 'shared image gallery sig',
              Tooltip: 'DevTest Labs',
              Image: require('../../assets/azure_icons/ComputeServiceColor/Shared Image Galleries.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.sigIcon
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Network',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'virtual network vnet',
                Tooltip: 'Virtual Network',
                Image: require('../../assets/azure_icons/Networking Service Color/Virtual Networks.png'),
                Provisionable: true,
                IsPng: false,
                IsVisible:true,
                ref: this.vnetIcon
            },
            {
              Name: 'load balancer nlb slb alb route',
              Tooltip: 'Load Balancer',
              Image: require('../../assets/azure_icons/Networking Service Color/Load Balancers.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              ref: this.nlbIcon
            },
            {
              Name: 'application gatway appgw waf route',
              Tooltip: 'Application Gateway',
              Image: require('../../assets/azure_icons/Networking Service Color/Application Gateway.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              ref: this.appgwIcon
            },
            {
              Name: 'dns private zone',
              Tooltip: 'DNS Private Zone',
              Image: require('../../assets/azure_icons/Networking Service Color/DNS Private Zones.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.dnsprivatezoneIcon
            },
            {
              Name: 'front door waf load balancer route',
              Tooltip: 'Front Door',
              Image: require('../../assets/azure_icons/Networking Service Color/Front Doors.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.frontdoorIcon
            },
            {
              Name: 'public ip address pip',
              Tooltip: 'Public IP',
              Image: require('../../assets/azure_icons/Networking Service Color/Public IP Addresses.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.publicipIcon
            },
            {
              Name: 'express route mpls wan',
              Tooltip: 'ExpressRoute',
              Image: require('../../assets/azure_icons/Networking Service Color/ExpressRoute Circuits.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.expressrouteIcon
            },
            {
              Name: 'traffic manager gtm route',
              Tooltip: 'Traffic Manager',
              Image: require('../../assets/azure_icons/Networking Service Color/Traffic Manager Profiles.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.trafficmanagerIcon
            },
            {
              Name: 'virtual network gateway vnet',
              Tooltip: 'Virtual Network Gateway',
              Image: require('../../assets/azure_icons/Networking Service Color/Virtual Network Gateways.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.vnetgatewayIcon
            },
            {
              Name: 'cdn',
              Tooltip: 'Azure CDN',
              Image: require('../../assets/azure_icons/Networking Service Color/CDN Profiles.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.cdnIcon
            },
            {
              Name: 'application security group asg',
              Tooltip: 'Application Security Group',
              Image: require('../../assets/azure_icons/Networking Service Color/Application Security Groups.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.asgIcon
            },
            {
              Name: 'network interface nic',
              Tooltip: 'Network Interface',
              Image: require('../../assets/azure_icons/Networking Service Color/Network Interfaces.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.nicIcon
            },
            {
              Name: 'private endpoint',
              Tooltip: 'Private Endpoint',
              Image: require('../../assets/azure_icons/Networking Service Color/private-endpoint.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.privateEndpointIcon
            },
            {
              Name: 'network watcher',
              Tooltip: 'Network Watcher',
              Image: require('../../assets/azure_icons/Networking Service Color/Network Watcher.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.networkwatcherIcon
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Storage',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'blob storage',
                Tooltip: 'Blob Storage',
                Image: require('../../assets/azure_icons/Storage Service Color/Blob Storage.png'),
                Provisionable: true,
                IsPng: false,
                IsVisible:true,
                ref: this.blobstorageIcon
            },
            {
              Name: 'files file',
              Tooltip: 'Azure File',
              Image: require('../../assets/azure_icons/azure-storage-files.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              ref: this.azfileIcon
            },
            {
              Name: 'file sync',
              Tooltip: 'Azure File Sync',
              Image: require('../../assets/azure_icons/Storage Service Color/Storage Sync Services.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.azfilesyncIcon
            },
            {
              Name: 'netapp files',
              Tooltip: 'Azure NetApp Files',
              Image: require('../../assets/azure_icons/Storage Service Color/Azure NetApp files.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.netappfileIcon
            },
            {
              Name: 'queue storage',
              Tooltip: 'Queue Storage',
              Image: require('../../assets/azure_icons/Storage Service Color/Queues Storage.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              ref: this.queuestorageIcon
            },
            {
              Name: 'table storage',
              Tooltip: 'Table Storage',
              Image: require('../../assets/azure_icons/Storage Service Color/Table Storage.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              ref: this.tablestorageIcon
            },
            {
              Name: 'data box',
              Tooltip: 'Databox',
              Image: require('../../assets/azure_icons/Storage Service Color/Data Box.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.databoxIcon
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Database',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'postgresql',
                Tooltip: 'Azure Database for PostgreSQL',
                Image: require('../../assets/azure_icons/Databases Service Color/Azure Database for PostgreSQL servers.png'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                ref: this.postgresqlIcon
            },
            {
              Name: 'maria',
              Tooltip: 'Azure Database for MariaDB',
              Image: require('../../assets/azure_icons/Databases Service Color/Azure Database for MariaDB servers.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.mariaDbIcon
            },
            {
              Name: 'sql',
              Tooltip: 'Azure SQL',
              Image: require('../../assets/azure_icons/Databases Service Color/SQL Databases.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.sqldbIcon
            },
            {
              Name: 'cosmos mongo cassandra graph documentdb',
              Tooltip: 'CosmosDB',
              Image: require('../../assets/azure_icons/Databases Service Color/Azure Cosmos DB.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.cosmosdbIcon
            },
            {
              Name: 'mysql',
              Tooltip: 'Azure Database for MySQL',
              Image: require('../../assets/azure_icons/Databases Service Color/Azure Database for MySQL servers.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.mysqlIcon
            },
            {
              Name: 'sql elastic pool',
              Tooltip: 'Azure SQL Elastic Pool',
              Image: require('../../assets/azure_icons/Databases Service Color/Elastic Database Pools.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.azSqlElasticPoolIcon
            },
            {
              Name: 'sql managed instance mi',
              Tooltip: 'Azure SQL Managed Instance',
              Image: require('../../assets/azure_icons/Databases Service Color/SQL Managed Instances.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.sqlmiIcon
            },
            {
              Name: 'sql stretch',
              Tooltip: 'SQL Stretch DB',
              Image: require('../../assets/azure_icons/Databases Service Color/SQL Server stretch Databases.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.sqlstretchIcon
            },
            {
              Name: 'redis',
              Tooltip: 'Azure Cache for Redis',
              Image: require('../../assets/azure_icons/Databases Service Color/Azure Cache for Redis.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.redisIcon
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Data',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'synapse analytics',
                Tooltip: 'Synapse Analytics',
                Image: require('../../assets/azure_icons/Databases Service Color/synapseanalytics.png'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                ref: this.synapseIcon
            },
            {
              Name: 'data lake analytics',
              Tooltip: 'Data Lake Analytics',
              Image: require('../../assets/azure_icons/Analytics Service Color/Data Lake Analytics.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.datalakeanalyticsIcon
            },
            {
              Name: 'databricks data bricks',
              Tooltip: 'Databricks',
              Image: require('../../assets/azure_icons/Analytics Service Color/Azure Databricks.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.databricksIcon
            },
            {
              Name: 'data factory',
              Tooltip: 'Data Factory',
              Image: require('../../assets/azure_icons/Analytics Service Color/Data Factories.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.datafactoryIcon
            },
            {
              Name: 'hdinsight hd insight',
              Tooltip: 'HDInsight',
              Image: require('../../assets/azure_icons/Analytics Service Color/HDInsightClusters.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.hdinsightIcon
            },
            {
              Name: 'data explorer',
              Tooltip: 'Data Explorer',
              Image: require('../../assets/azure_icons/Analytics Service Color/Azure Data Explorer Clusters.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.dataexplorerIcon
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Data & AI',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'cognitive',
                Tooltip: 'Cognitive Service',
                Image: require('../../assets/azure_icons/AI and ML Service Color/Cognitive Services.png'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                ref: this.cognitivesvcicon
            },
            {
              Name: 'bots service bot',
              Tooltip: 'Bots Service',
              Image: require('../../assets/azure_icons/AI and ML Service Color/Bot Services.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.botsvcicon
            },
            {
              Name: 'genomics',
              Tooltip: 'Genomics Accounts',
              Image: require('../../assets/azure_icons/AI and ML Service Color/Genomics Accounts.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.genomicsicon
            },
            {
              Name: 'machine learning service workspace',
              Tooltip: 'Machine Learning Service Workspaces',
              Image: require('../../assets/azure_icons/AI and ML Service Color/Machine Learning Service Workspaces.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.mlsvcworkspace
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Containers',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'container instance',
                Tooltip: 'Container Instance',
                Image: require('../../assets/azure_icons/Container Service Color/Container Instances.png'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                ref: this.containerInstanceIcon
            },
            {
              Name: 'container registry',
              Tooltip: 'Container Registry',
              Image: require('../../assets/azure_icons/Container Service Color/Container Registries.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.containerRegistryIcon
            },
            {
              Name: 'kubernetes kube k8s microservice',
              Tooltip: 'Azure Kubernetes',
              Image: require('../../assets/azure_icons/Container Service Color/Kubernetes Services.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.kubeIcon
            },
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Integration',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'api management apim',
                Tooltip: 'API Management',
                Image: require('../../assets/azure_icons/Integration Service Color/API Management Services.png'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                ref: this.apimIcon
            },
            {
              Name: 'service bus asb',
              Tooltip: 'Azure Service Bus',
              Image: require('../../assets/azure_icons/Integration Service Color/Azure Service Bus.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.asbIcon
            },
            {
              Name: 'relays',
              Tooltip: 'Azure Relays',
              Image: require('../../assets/azure_icons/Integration Service Color/Azure Service Bus Relays.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.relayIcon
            },
            {
              Name: 'logic app',
              Tooltip: 'Logic App',
              Image: require('../../assets/azure_icons/Integration Service Color/Logic Apps.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.logicAppIcon
            },
            {
              Name: 'integration service environment ise',
              Tooltip: 'Integration Service Environment',
              Image: require('../../assets/azure_icons/Integration Service Color/Integration Service Environments.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.iseIcon
            },
            {
              Name: 'event grid topic',
              Tooltip: 'Event Grid Topic',
              Image: require('../../assets/azure_icons/Integration Service Color/Event Grid Topics.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.eventGridTopicIcon
            },
            {
              Name: 'event grid subscription',
              Tooltip: 'Event Grid Subscription',
              Image: require('../../assets/azure_icons/Integration Service Color/Event Grid Subscriptions.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.eventGridSubIcon
            },
            {
              Name: 'stream analytics',
              Tooltip: 'Stream Analytics',
              Image: require('../../assets/azure_icons/Integration Service Color/Stream-Analytics.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.streamanalyticsIcon
            },
            {
              Name: 'event hub',
              Tooltip: 'Event Hub',
              Image: require('../../assets/azure_icons/Integration Service Color/event hub.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.eventhubIcon
            },
            {
              Name: 'sendgrid email',
              Tooltip: 'SendGrid',
              Image: require('../../assets/azure_icons/Integration Service Color/SendGrid Accounts.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.sendgridSubIcon
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Security',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'firewall',
                Tooltip: 'Azure Firewall',
                Image: require('../../assets/azure_icons/Security Service Color/Azure Firewall.png'),
                Provisionable: true,
                IsPng: false,
                IsVisible:true,
                ref: this.azfwIcon
            },
            {
              Name: 'sentinel',
              Tooltip: 'Azure Sentinel',
              Image: require('../../assets/azure_icons/Security Service Color/Azure Sentinel.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.sentinelIcon
            },
            {
              Name: 'key vault akv',
              Tooltip: 'Key Vault',
              Image: require('../../assets/azure_icons/Security Service Color/Key Vaults.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.akvIcon
            },
            {
              Name: 'security center asc',
              Tooltip: 'Security Center',
              Image: require('../../assets/azure_icons/Security Service Color/Security Center.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.ascIcon
            },
            {
              Name: 'ddos protection standard',
              Tooltip: 'DDoS Protection Standard',
              Image: require('../../assets/azure_icons/Security Service Color/DDOS Protection Plans.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.ddosstandardIcon
            },
            {
              Name: 'bastion jumphost jh',
              Tooltip: 'Bastion',
              Image: require('../../assets/azure_icons/Security Service Color/azure-bastion-icon.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.bastionIcon
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Management & Identity',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'site recovery backup dr',
                Tooltip: 'Site Recovery (Backup/DR)',
                Image: require('../../assets/azure_icons/Management and Governance Service Color/SiteRecovery.png'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                ref: this.siteRecoveryIcon
            },
            {
              Name: 'app insights apm',
              Tooltip: 'Application Insights',
              Image: require('../../assets/azure_icons/Management and Governance Service Color/AppInsights.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.appInsightsIcon
            },
            {
              Name: 'log analytics monitor',
              Tooltip: 'Log Analytics',
              Image: require('../../assets/azure_icons/Management and Governance Service Color/Log Analytics Workspaces.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.azloganalyticsIcon
            },
            {
              Name: 'automation update',
              Tooltip: 'Automation',
              Image: require('../../assets/azure_icons/Management and Governance Service Color/Automation Accounts.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.automationIcon
            },
            {
              Name: 'ad aad oauth oidc openid',
              Tooltip: 'Azure AD',
              Image: require('../../assets/azure_icons/Identity Service Color/Azure AD.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.aadIcon
            },
            {
              Name: 'ad b2c oauth oidc openid',
              Tooltip: 'Azure AD B2C',
              Image: require('../../assets/azure_icons/Identity Service Color/Azure AD B2C.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.aadb2cIcon
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'IoT',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'iot hub',
                Tooltip: 'IoT Hub',
                Image: require('../../assets/azure_icons/Internet of Things Service Color/Azure IoT Hub.png'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                ref: this.iothub
            },
            {
              Name: 'iot central app applications',
              Tooltip: 'IoT Central Applications',
              Image: require('../../assets/azure_icons/Internet of Things Service Color/IoT Central Applications.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.iotcentralhub
            },
            {
              Name: 'map',
              Tooltip: 'Azure Map',
              Image: require('../../assets/azure_icons/Internet of Things Service Color/Azure Maps.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.azmaps
            },
            {
              Name: 'time series insights environment',
              Tooltip: 'Time Series Insights Environment',
              Image: require('../../assets/azure_icons/Internet of Things Service Color/Time Series Insights environments.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              ref: this.timeseriesinsights
            },
          ]
        }
       },
    ]

    return paletteRscs;
 }

  render() {
    
    return(
        <div className='sidebar'>
          <AppBar position="static" color="transparent">
            <InputGroup
                        leftIcon="filter"
                        rightElement={
                          <Button
                            icon="cross"
                            minimal={true}
                            onClick={this.handleSearchboxClear}
                          />
                        }
                        onChange={this.searchResources}
                        value={this.state.searchText}
                        placeholder="Search resources..."
                        fill={true} />
          </AppBar>
          <div className="resourcePalette">
            {
              this.state.filteredResources.map(rsc => {
                return (
                  <ExpansionPanel
                    style={{display: rsc.resourceGroup.groupSearchVisible ? 'block' : 'none'}}
                    expanded={rsc.resourceGroup.groupExpanded}
                    square={false}
                    onChange={ (evt, expanded) => {
                       this.toggleExpansionPanelExpandOnClick
                        (evt.currentTarget.innerText, expanded);
                    }}>
                    <ExpansionPanelSummary
                      style={{backgroundColor:'rgba(0, 0, 0, .03)', borderBottom: '1px solid rgba(0, 0, 0, .125)',paddingLeft: '6px'}}
                      expandIcon={<ExpandMoreIcon />}

                      id="panel1a-header">
                      <Typography variant='body2'>{rsc.resourceGroup.groupName}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails class="tile-panel">
                      {
                        rsc.resourceGroup.resources.map(r => {
                            return (
                              <div  ref={r.ref} style={{display: r.IsVisible ? 'block' : 'none'}}>
                                <div class="tile-item">
                                  <Tippy content={r.Tooltip} followCursor={true} placement="bottom">
                                    {
                                      (r.Provisionable != undefined && r.Provisionable == true)
                                      ? <Badge color="secondary" variant="dot">
                                          <img src={r.Image} width="30" height="30" />
                                        </Badge>
                                      : <img src={r.Image} width="30" height="30" />
                                    }
                                  </Tippy>
                                </div>
                              </div>
                            )
                        })
                      }
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              })
            }
            
          </div>
        </div>
    );
  };

  searchResources = (evt) =>  {
    var searchText = evt.target.value;
 
    this.setState({searchText:searchText});
 
    if(searchText == '') {
      this.resetVisibility();
      return;
    }
 
    this.resetVisibility();
    var resourcesToFilter = this.state.filteredResources;
    resourcesToFilter.forEach(function (rsc, index) {
      var isGroupContainsfoundResource = [];
      for(var x of rsc.resourceGroup.resources) {
          if(x.Name.toLowerCase().indexOf(searchText) == -1)
          {
              x.IsVisible = false;
          }
          else
            isGroupContainsfoundResource.push(true);
      }
 
      if(isGroupContainsfoundResource.length > 0) {
          rsc.resourceGroup.groupSearchVisible = true;
          rsc.resourceGroup.groupExpanded = true;
      }
      else {
          rsc.resourceGroup.groupSearchVisible = false;
          rsc.resourceGroup.groupExpanded = false;
      }
 
    });
 
    this.setState({ filteredResources: resourcesToFilter });
  }
 
  resetVisibility() {
    var allRsc = this.state.filteredResources;
    allRsc.forEach(rsc => {
        rsc.resourceGroup.groupSearchVisible = true;
        rsc.resourceGroup.groupExpanded = false;
        rsc.resourceGroup.resources.forEach(x => {
            x.IsVisible = true;
        });
    });
    this.setState({filteredResources:allRsc});
  }
 
  toggleExpansionPanelExpandOnClick = (groupName, expandState) => {
     var allRsc = this.state.filteredResources;
     for(var rsc of allRsc) {
         if(rsc.resourceGroup.groupName == groupName) {
           rsc.resourceGroup.groupExpanded = expandState;
           break;
         }
     };
     this.setState({filteredResources:allRsc});
  }

  handleSearchboxClear = () => {
    if(this.state.searchText == '')
      return;

    this.setState({searchText: ''});
    this.resetVisibility();
  }

  makeIconsDraggable = () => {

    var thisComponent = this;

    //shape
    this.graphManager.makeIconDraggable(this.straightArrow.current, "straightarrow", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.elbowArrow.current, "elbowarrow", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.cylinder.current, "cylinder", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.hexagon.current, "hexagon", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.label.current, "label", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.rectangle.current, "rectangle", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.roundedrectangle.current, "roundedrectangle", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.triangle.current, "triangle", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.circle.current, "circle", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.user.current, "user", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.user.current, "user", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.user.current, "user", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.datacenter.current, "datacenter", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.internet.current, "internet", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.threedbox.current, "3dbox", thisComponent.props.addResourceToDiagramEditor);

    //devices
    this.graphManager.makeIconDraggable(this.clientIcon.current, "clientdevice", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.adfsIcon.current, "adfs", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.andriodIcon.current, "andriod", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.iphoneIcon.current, "iphone", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vm1.current, "shape-vm1", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vm2.current, "shape-vm2", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.server1.current, "shape-server1", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.server2.current, "shape-server2", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.dbblack.current, "shape-dbblack", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.dbblackha.current, "shape-dbblackha", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.dbblue.current, "shape-dbblue", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapefirewall.current, "shape-firewall", thisComponent.props.addResourceToDiagramEditor);
    
    //software
    this.graphManager.makeIconDraggable(this.shapehelm.current, "software-shapehelm", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapeazuredevops.current, "software-shapeazuredevops", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapecsharp.current, "software-shapecsharp", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapedapr.current, "software-shapedapr", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapedocker.current, "software-shapedocker", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapeelasticsearch.current, "software-shapeelasticsearch", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapeesbmiddleware.current, "software-shapeesbmiddleware", thisComponent.props.addResourceToDiagramEditor);
    
    this.graphManager.makeIconDraggable(this.shapegithub.current, "software-shapegithub", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapegithubactions.current, "software-shapegithubactions", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapegolang.current, "software-shapegolang", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapegrafana.current, "software-shapegrafana", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapehashicorpconsul.current, "software-shapehashicorpconsul", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapehashicorpterraform.current, "software-shapehashicorpterraform", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapehashicorpvault.current, "software-shapehashicorpvault", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapeinfluxdb.current, "software-shapeinfluxdb", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapejava.current, "software-shapejava", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapejavascript.current, "software-shapejavascript", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapekafka.current, "software-shapekafka", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapekube.current, "software-shapekube", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapemessagequeue.current, "software-shapemessagequeue", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapemongodb.current, "software-shapemongodb", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapenetcore.current, "software-shapenetcore", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapenginx.current, "software-shapenginx", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapenginxplus.current, "software-shapenginxplus", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapenodejs.current, "software-shapenodejs", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapepowershell.current, "software-shapepowershell", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapepowerbi.current, "software-shapepowerbi", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapepython.current, "software-shapepython", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shaperabbitmq.current, "software-shaperabbitmq", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shaperubyonrails.current, "software-shaperubyonrails", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapetraefik.current, "software-shapetraefik", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapezipkin.current, "software-shapezipkin", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapejaeger.current, "software-shapejaeger", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shapecalico.current, "software-calico", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.shaperesourcegroup.current, "software-resourcegroup", thisComponent.props.addResourceToDiagramEditor);

    //web
    this.graphManager.makeIconDraggable(this.appsvcIcon.current, ResourceType.AppService(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.aseIcon.current, ResourceType.ASE(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.funcIcon.current, ResourceType.Function(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.azsearchIcon.current, ResourceType.AzureSearch(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.signalrIcon.current, ResourceType.SignalR(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.appsvccertIcon.current, ResourceType.AppServiceCert(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.appsvcdomainIcon.current, ResourceType.AppServiceDomain(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.appconfigIcon.current, ResourceType.AppConfig(), thisComponent.props.addResourceToDiagramEditor);
    
    //compute
    this.graphManager.makeIconDraggable(this.sigIcon.current, ResourceType.SharedImageGallery(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vmWindowsIcon.current, ResourceType.WindowsVM(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vmLinuxIcon.current, ResourceType.LinuxVM(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vmssIcon.current, ResourceType.VMSS(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.devtestlabIcon.current, ResourceType.DevTestLab(), thisComponent.props.addResourceToDiagramEditor);

    //network
    this.graphManager.makeIconDraggable(this.publicipIcon.current, ResourceType.PublicIp(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.expressrouteIcon.current, ResourceType.ExpressRouteCircuit(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.trafficmanagerIcon.current, ResourceType.TrafficManager(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vnetgatewayIcon.current, ResourceType.VirtualNetworkGateway(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.cdnIcon.current, ResourceType.CDN(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.asgIcon.current, ResourceType.ASG(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.nicIcon.current, ResourceType.NIC(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.privateEndpointIcon.current, ResourceType.PrivateEndpoint(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.networkwatcherIcon.current, ResourceType.NetworkWatcher(), thisComponent.props.addResourceToDiagramEditor);
    
    this.graphManager.makeIconDraggable(this.vnetIcon.current, ResourceType.VNet(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.nlbIcon.current, ResourceType.NLB(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.appgwIcon.current, ResourceType.AppGw(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.dnsprivatezoneIcon.current, ResourceType.DNSPrivateZone(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.frontdoorIcon.current, ResourceType.FrontDoor(), thisComponent.props.addResourceToDiagramEditor);

    //storage
    this.graphManager.makeIconDraggable(this.blobstorageIcon.current, ResourceType.BlobStorage(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.azfileIcon.current, ResourceType.AzFile(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.azfilesyncIcon.current, ResourceType.AzFileSync(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.netappfileIcon.current, ResourceType.NetAppFile(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.queuestorageIcon.current, ResourceType.QueueStorage(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.tablestorageIcon.current, ResourceType.TableStorage(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.databoxIcon.current, ResourceType.Databox(), thisComponent.props.addResourceToDiagramEditor);   
    
    //database
    this.graphManager.makeIconDraggable(this.postgresqlIcon.current, ResourceType.PostgreSQL(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.mariaDbIcon.current, ResourceType.MariaDB(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.sqldbIcon.current, ResourceType.SQLDB(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.cosmosdbIcon.current, ResourceType.CosmosDB(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.mysqlIcon.current, ResourceType.MySQL(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.azSqlElasticPoolIcon.current, ResourceType.SQLElasticPool(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.sqlmiIcon.current, ResourceType.SQLMI(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.sqlstretchIcon.current, ResourceType.SQLStretchDB(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.redisIcon.current, ResourceType.Redis(), thisComponent.props.addResourceToDiagramEditor);
    
    //Data
    this.graphManager.makeIconDraggable(this.synapseIcon.current, ResourceType.Synapse(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.dataexplorerIcon.current, ResourceType.DataExplorer(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.databricksIcon.current, ResourceType.Databricks(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.datafactoryIcon.current, ResourceType.DataFactory(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.datalakeanalyticsIcon.current, ResourceType.DataLakeAnalytics(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.hdinsightIcon.current, ResourceType.HdInsight(), thisComponent.props.addResourceToDiagramEditor);

    //ai and ml
    this.graphManager.makeIconDraggable(this.cognitivesvcicon.current, ResourceType.Cognitive(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.botsvcicon.current, ResourceType.BotsService(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.genomicsicon.current, ResourceType.Genomics(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.mlsvcworkspace.current, ResourceType.MLServiceWorkspace(), thisComponent.props.addResourceToDiagramEditor);
    
    //Container
    this.graphManager.makeIconDraggable(this.containerInstanceIcon.current, ResourceType.ContainerInstance(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.containerRegistryIcon.current, ResourceType.ContainerRegistry(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.kubeIcon.current, ResourceType.Kubernetes(), thisComponent.props.addResourceToDiagramEditor);

    //integration
    this.graphManager.makeIconDraggable(this.apimIcon.current, ResourceType.APIM(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.asbIcon.current, ResourceType.ASB(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.logicAppIcon.current, ResourceType.LogicApp(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.iseIcon.current, ResourceType.ISE(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.eventGridTopicIcon.current, ResourceType.EventGridTopic(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.eventGridSubIcon.current, ResourceType.EventGridSubscription(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.streamanalyticsIcon.current, ResourceType.StreamAnalytics(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.sendgridSubIcon.current, ResourceType.SendGrid(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.relayIcon.current, ResourceType.Relay(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.eventhubIcon.current, ResourceType.EventHub(), thisComponent.props.addResourceToDiagramEditor);

    
    this.graphManager.makeIconDraggable(this.azfwIcon.current, ResourceType.Firewall(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.sentinelIcon.current, ResourceType.Sentinel(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.akvIcon.current, ResourceType.KeyVault(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.ascIcon.current, ResourceType.SecurityCenter(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.ddosstandardIcon.current, ResourceType.DDoSStandard(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.bastionIcon.current, ResourceType.Bastion(), thisComponent.props.addResourceToDiagramEditor);

    this.graphManager.makeIconDraggable(this.siteRecoveryIcon.current, ResourceType.RecoveryServiceVault(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.appInsightsIcon.current, ResourceType.AppInsights(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.azloganalyticsIcon.current, ResourceType.LogAnalytics(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.automationIcon.current, ResourceType.Automation(), thisComponent.props.addResourceToDiagramEditor);

    this.graphManager.makeIconDraggable(this.aadIcon.current, ResourceType.AAD(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.aadb2cIcon.current, ResourceType.AADB2C(), thisComponent.props.addResourceToDiagramEditor);
    
    this.graphManager.makeIconDraggable(this.iothub.current, ResourceType.IoTHub(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.azmaps.current, ResourceType.AzureMaps(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.timeseriesinsights.current, ResourceType.TimeSeriesInsights(), thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.iotcentralhub.current, ResourceType.IoTCentral(), thisComponent.props.addResourceToDiagramEditor);
    
  }
}