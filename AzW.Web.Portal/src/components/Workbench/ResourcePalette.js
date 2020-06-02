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
import Utils from './Helpers/Utils';

import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';


import ResourceType from '../../models/ResourceType';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

export default class ResourcePalette extends Component {
 
  constructor(props) {
    super(props);

    this.graphManager = this.props.mxgraphManager;
    
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
                 Name: 'Orthognal Arrow',
                 Tooltip: 'Orthognal Arrow',
                 Image: require('../../assets/azure_icons/round-connector.png'),
                 IsPng: true,
                 IsVisible:true,
                 ref: this.elbowArrow
             },
            {
              Name: 'curve bezier arrow',
              Tooltip: 'Bezier Curve Arrow',
              Image:require('../../assets/azure_icons/shape-bezierarrow.png'),
              IsPng: true,
              IsVisible:true
            },
            {
              Name: 'double ended arrow',
              Tooltip: 'Double Ended Arrow',
              Image:require('../../assets/azure_icons/shape-doubleendedarrow.png'),
              IsPng: true,
              IsVisible:true
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
            },
            {
              Name: 'hexagon',
              Tooltip: 'Hexagon',
              Image:require('../../assets/azure_icons/shape-hexagon.png'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'nonagon',
              Tooltip: 'Nonagon',
              Image:require('../../assets/azure_icons/shape-nonagon.png'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: '3d box cube',
              Tooltip: '3D Cube',
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
           },
           {
                Name: 'andriod driod',
                Tooltip: 'Andriod',
                Image: require('../../assets/azure_icons/shape-andriod.png'),
                IsPng: false,
                IsVisible:true,
           },
           {
                Name: 'iphone apple',
                Tooltip: 'iPhone',
                Image: require('../../assets/azure_icons/shape-iphone.png'),
                IsPng: false,
                IsVisible:true,
           },
          {
            Name: 'user',
            Tooltip: 'User',
            Image:require('../../assets/azure_icons/shape-user.png'),
            IsPng: true,
            IsVisible:true,
          },
          {
            Name: 'user',
            Tooltip: 'User Blue',
            Image:require('../../assets/azure_icons/shape-userblue.png'),
            IsPng: true,
            IsVisible:true,
          },
          {
            Name: 'user',
            Tooltip: 'User Group',
            Image:require('../../assets/azure_icons/shape-usergroup.png'),
            IsPng: true,
            IsVisible:true,
          },
          {
            Name: 'user',
            Tooltip: 'User Ian',
            Image:require('../../assets/azure_icons/shape-user-ian.png'),
            IsPng: true,
            IsVisible:true,
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
            IsVisible:true
          },
          {
            Name: 'vm virtual machine',
            Tooltip: 'Azure VM',
            Image: require('../../assets/azure_icons/shape-vm.png'),
            IsPng: false,
            IsVisible:true
          },
          {
            Name: 'vm virtual machine',
            Tooltip: 'VM',
            Image: require('../../assets/azure_icons/shape-vm2.png'),
            IsPng: false,
            IsVisible:true
          },
          {
            Name: 'physical server',
            Tooltip: 'Physical Server',
            Image: require('../../assets/azure_icons/shape-server1.png'),
            IsPng: false,
            IsVisible:true
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
            IsVisible:true
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
              Tooltip: 'C#',
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
            },
            {
              Name: 'terraform hashicorp',
              Tooltip: 'Terraform',
              Image: require('../../assets/azure_icons/software/software-hashicorpterraform.png'),
              IsPng: false,
              IsVisible:true,
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
              Tooltip: 'Azure Resource Group (shape)',
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
                resourceType: ResourceType.AppService()
            },
            {
              Name: 'app service environment',
              Tooltip: 'App Service Environment',
              Image: require('../../assets/azure_icons/Web Service Color/App Service Environments.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ASE()
            },
            {
              Name: 'azure function',
              Tooltip: 'Function',
              Image: require('../../assets/azure_icons/Web Service Color/Function Apps.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Function()
            },
            {
              Name: 'azure search',
              Tooltip: 'Azure Search',
              Image: require('../../assets/azure_icons/Web Service Color/Azure Search.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AzureSearch()
            },
            {
              Name: 'azure signalr websocket',
              Tooltip: 'Azure SignalR',
              Image: require('../../assets/azure_icons/Web Service Color/SignalR.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SignalR()
            },
            {
              Name: 'app service certificate',
              Tooltip: 'App Service Certificate',
              Image: require('../../assets/azure_icons/Web Service Color/App Service Certificates.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AppServiceCert()
            },
            {
              Name: 'app service domain',
              Tooltip: 'App Service Domain',
              Image: require('../../assets/azure_icons/Web Service Color/App Service Domains.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AppServiceDomain()
            },
            {
              Name: 'app configuration',
              Tooltip: 'App Configuration',
              Image: require('../../assets/azure_icons/Web Service Color/App Configuration.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AppConfig()
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
                resourceType: ResourceType.WindowsVM()
            },
            {
              Name: 'linux vm',
              Tooltip: 'Linux VM',
              Image: require('../../assets/azure_icons/ComputeServiceColor/VM/VM-Linux.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.LinuxVM()
            },
            {
              Name: 'vm scale sets',
              Tooltip: 'VM Scale Sets',
              Image: require('../../assets/azure_icons/ComputeServiceColor/VM/VM Scale Sets.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.VMSS()
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
                resourceType: ResourceType.Firewall()
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
              resourceType: ResourceType.Bastion()
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
                            onClick={this.handleSearchboxClear} />
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
                              <div style={{display: r.IsVisible ? 'block' : 'none'}}>
                                <div class="tile-item" data-shape={(r.resourceType != undefined) ? r.resourceType : r.Tooltip}>
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

    var thisComp = this;

    $(".tile-item").draggable({
      stack: "#diagramEditor",
      revert: 'invalid',
      revertDuration: 0,
      refreshPositions: true,
      scroll: false,
      cursor: 'move',
      helper: 'clone',
      zIndex: 10000,
      appendTo: "body"
      //TODO: drag VIR and highlight subnet
      // drag: function (evt, ui) {
      //   var diagram = thisComp.props.DiagramEditor.current.getDiagram();

      //   var mx = evt.clientX; // - bbox.left * ((can.width / pixelratio) / bbw);
      //   var my = evt.clientY; // - bbox.top * ((can.height / pixelratio) / bbh);
      //   var point = diagram.transformViewToDoc(new go.Point(mx, my));
      //   var subnet = diagram.findPartAt(point, true);
      //   if (subnet instanceof go.Node) {
      //       var azcontext = subnet.data.azcontext;
      //       if(azcontext != undefined || azcontext != null) {
      //         if(azcontext.ProvisionContext.ResourceType == ResourceType.Subnet()) {
      //           highlightNode(diagram,subnet);
      //         }
      //       }
      //   }
      //   else
      //     highlightNode(diagram,null);
      // },
      // stop: function () {
      //   var diagram = thisComp.props.DiagramEditor.current.getDiagram();
      //   highlightNode(diagram,null);
      // }
    });

    // function highlightNode(diagram, node) {  // may be null
    //   var oldskips = diagram.skipsUndoManager;
    //   diagram.skipsUndoManager = true;
    //   diagram.startTransaction("highlight");
    //   if (node !== null) {
    //     diagram.highlight(node);
    //   } else {
    //     diagram.clearHighlighteds();
    //   }
    //   diagram.commitTransaction("highlight");
    //   diagram.skipsUndoManager = oldskips;
    // }

    // $("#diagramEditor").bind({
    //   dragover: function(e) {
    //     var a = 'a';
    //   },
    //   dragleave: function(e) {
    //     var a = 'a';
    //   }
    // });

    //highlight subnet for VIR
    //$('#diagramEditor').bind('dragover', function(){
        // var diagramEditor = event.target;

        // if (!(diagramEditor instanceof HTMLCanvasElement)) return;

        // var diagram = this.props.DiagramEditor.getDiaram();

        // var mx = event.clientX; // - bbox.left * ((can.width / pixelratio) / bbw);
        // var my = event.clientY; // - bbox.top * ((can.height / pixelratio) / bbh);
        // var point = diagram.transformViewToDoc(new go.Point(mx, my));
        // var subnet = diagram.findPartAt(point, true);

        // if (subnet instanceof go.Node) {
        //   highlightNode(subnet);
        // }


    //});

    

    $("#diagramEditor").droppable({
      accept: ".tile-item", 
      drop: function(event, ui) {
        var elt = ui.draggable.first();
        var resourceType = ui.draggable.data('shape'); //data-shape
        var x = ui.offset.left - $(this).offset().left;
        var y = ui.offset.top - $(this).offset().top;

        if(Utils.isResourceTypeVIR(resourceType)) {
          thisComp.props.DiagramEditor.current.createVIROntoSubnet({
              x: x,
              y, y,
              resourceType: resourceType
          });
        }
        else 
          thisComp.props.addResourceToDiagramEditor({
            resourceType: resourceType,
            x: x,
            y: y
          });
      }
    });
    
  }
}