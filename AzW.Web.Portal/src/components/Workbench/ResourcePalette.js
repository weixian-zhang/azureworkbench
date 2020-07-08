import React, { Component } from "reactn";
import {InputGroup, Button} from "@blueprintjs/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppBar from '@material-ui/core/AppBar';
import Utils from './Helpers/Utils';
import AzureIcons from './Helpers/AzureIcons';

import Container from '@material-ui/core/Container';

import 'react-tippy/dist/tippy.css'
import { Tooltip} from 'react-tippy';

import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';

import ResourceType from '../../models/ResourceType';


export default class ResourcePalette extends Component {
 
  constructor(props) {
    super(props);
    
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

    this.setGlobal({drawResourcePaletteOpen:false});

  }
  

  componentDidMount = () =>  
  {
      this.makeIconsDraggable();
  }
  
  initPaletteResources() {
    var paletteRscs = [
      {
         resourceGroup: {
           groupName: 'Shapes',
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
            },
            {
              Name: 'arrow',
              Tooltip: 'Arrow',
              Image:require('../../assets/azure_icons/shape-arrow.png'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'x cross',
              Tooltip: 'ThinX',
              Image:require('../../assets/azure_icons/shape-thinx.png'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'lightning light',
              Tooltip: 'Lightning',
              Image:require('../../assets/azure_icons/shape-lightning.png'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'chevron arrow',
              Tooltip: 'Chevron',
              Image:require('../../assets/azure_icons/shape-chevron.png'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'pyramid',
              Tooltip: 'Pyramid',
              Image:require('../../assets/azure_icons/shape-pyramid.png'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'decision',
              Tooltip: 'Decision',
              Image:require('../../assets/azure_icons/shape-decision.png'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'component',
              Tooltip: 'Component',
              Image:require('../../assets/azure_icons/shape-component.png'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'package',
              Tooltip: 'Package',
              Image:require('../../assets/azure_icons/shape-package.png'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'location pin',
              Tooltip: 'Location',
              Image:require('../../assets/azure_icons/shape-location.png'),
              IsPng: true,
              IsVisible:true,
            }
           ]
         }
      },
      {
       resourceGroup: {
         groupName: 'Device / User',
         groupExpanded: false,
         groupSearchVisible: true,
         resources: [
           {
               Name: 'client laptop com',
               Tooltip: 'Client Machine',
               Image: require('../../assets/azure_icons/shape-computer.png'),
               IsPng: false,
               IsVisible:true,
           },
           {
            Name: 'tv television tele',
            Tooltip: 'TV',
            Image: require('../../assets/azure_icons/shape-tv.png'),
            IsPng: false,
            IsVisible:true,
            },
            {
              Name: 'kiosk',
              Tooltip: 'Kiosk',
              Image: require('../../assets/azure_icons/shape-kiosk.png'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'tablet apple andriod',
              Tooltip: 'Tablet',
              Image: require('../../assets/azure_icons/shape-tablet.png'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'switch network',
              Tooltip: 'Switch',
              Image: require('../../assets/azure_icons/shape-switch.png'),
              IsPng: false,
              IsVisible:true,
            },
           {
               Name: 'ADFS active directory federation service',
               Tooltip: 'ADFS',
               Image: require('../../assets/azure_icons/ADFS.png'),
               IsPng: false,
               IsVisible:true,
           },
           {
            Name: 'adfs proxy active directory federation service',
            Tooltip: 'ADFS Proxy',
            Image: require('../../assets/azure_icons/ADFS Proxy.png'),
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
            Tooltip: 'User Lady 1',
            Image:require('../../assets/azure_icons/shape-user-lady-1.png'),
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
            Name: 'user group',
            Tooltip: 'User Group 1',
            Image:require('../../assets/azure_icons/shape-usergroup-1.png'),
            IsPng: true,
            IsVisible:true,
          },
          {
            Name: 'user group',
            Tooltip: 'User Group 2',
            Image:require('../../assets/azure_icons/shape-usergroup-2.png'),
            IsPng: true,
            IsVisible:true,
          },
         ]
       }
      },
      {
        resourceGroup: {
          groupName: 'Software',
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
              Name: 'c# csharp',
              Tooltip: 'C#',
              Image: require('../../assets/azure_icons/software/software-c#.png'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'dapr framework microservice',
              Tooltip: 'Dapr',
              Image: require('../../assets/azure_icons/software/software-dapr.png'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'docker container',
              Tooltip: 'Docker',
              Image: require('../../assets/azure_icons/software/software-docker.png'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'elastic search elk',
              Tooltip: 'ElasticSearch',
              Image: require('../../assets/azure_icons/software/software-elasticsearch.png'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'enterprise service bus esb middleware',
              Tooltip: 'Enterprise Service Bus',
              Image: require('../../assets/azure_icons/software/software-esbmiddleware.png'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'github git',
              Tooltip: 'GitHub',
              Image: require('../../assets/azure_icons/software/software-github.png'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'github actions git',
              Tooltip: 'GitHub Actions',
              Image: require('../../assets/azure_icons/software/software-githubactions.png'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'go lang',
              Tooltip: 'Go',
              Image: require('../../assets/azure_icons/software/software-golang.png'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'jenkins',
              Tooltip: 'Jenkins',
              Image: require('../../assets/azure_icons/software/software-jenkins.png'),
              IsPng: false,
              IsVisible:true,
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
              azInfo: ['Private Link supported as Private Cluster'],
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
              IsVisible:true
            },
            {
              Name: 'jaeger microservice',
              Tooltip: 'Jaeger',
              Image: require('../../assets/azure_icons/software/software-jaeger.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'calico microservice',
              Tooltip: 'Calico',
              Image: require('../../assets/azure_icons/software/software-calico.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'cmd cli command exe',
              Tooltip: 'CLI',
              Image: require('../../assets/azure_icons/software/software-cli.png'),
              IsPng: false,
              IsVisible:true
            }
          ]
        }
      },
      {
        resourceGroup: {
          groupName: 'Azure (non-deployable)',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
              Name: 'resource group',
              Tooltip: 'Azure Resource Group',
              Image: require('../../assets/azure_icons/azure non-deployable/software-resourcegroup.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'azure',
              Tooltip: 'Azure',
              Image: require('../../assets/azure_icons/azure non-deployable/software-azure.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'activity log',
              Tooltip: 'Activity Log',
              Image: require('../../assets/azure_icons/azure non-deployable/Activity Log.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'azure devops',
              Tooltip: 'Azure DevOps',
              Image: require('../../assets/azure_icons/azure non-deployable/Azure DevOps.png'),
              IsPng: false,
              IsVisible:true,
              ref: this.shapeazuredevops
            },
            {
              Name: 'azure artifact',
              Tooltip: 'Azure Artifact',
              Image: require('../../assets/azure_icons/azure non-deployable/Azure Artifact.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'azure board',
              Tooltip: 'Azure Board',
              Image: require('../../assets/azure_icons/azure non-deployable/Azure Board.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'azure repo',
              Tooltip: 'Azure Repo',
              Image: require('../../assets/azure_icons/azure non-deployable/Azure Repo.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'azure test plan',
              Tooltip: 'Azure Test Plan',
              Image: require('../../assets/azure_icons/azure non-deployable/Azure Test Plan.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'blueprint',
              Tooltip: 'Azure Blueprint',
              Image: require('../../assets/azure_icons/azure non-deployable/Azure Blueprint.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'stack',
              Tooltip: 'Azure Stack',
              Image: require('../../assets/azure_icons/azure non-deployable/Azure Stack.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'cost billing',
              Tooltip: 'Azure Cost Management',
              Image: require('../../assets/azure_icons/azure non-deployable/Cost Management And Billing.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'disk encryption',
              Tooltip: 'Disk Encryption',
              Image: require('../../assets/azure_icons/azure non-deployable/Disk Encryption Set.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'premium disk ssd',
              Tooltip: 'Premium Disk SSD',
              Image: require('../../assets/azure_icons/azure non-deployable/Managed Disk Premium SSD.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'managed disk snapshot',
              Tooltip: 'Managed Disk Snapshot',
              Image: require('../../assets/azure_icons/azure non-deployable/Managed Disk Snapshot.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'management group mg',
              Tooltip: 'Management Group',
              Image: require('../../assets/azure_icons/azure non-deployable/Management Group.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'reservation reserved instance',
              Tooltip: 'Reservations',
              Image: require('../../assets/azure_icons/azure non-deployable/Reservation.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'subscription',
              Tooltip: 'Azure Subscription',
              Image: require('../../assets/azure_icons/azure non-deployable/Subscription.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'arm template',
              Tooltip: 'ARM Template',
              Image: require('../../assets/azure_icons/azure non-deployable/Template.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'monitor workbook',
              Tooltip: 'Workbook',
              azInfo: ["Azure Monitor"],
              Image: require('../../assets/azure_icons/azure non-deployable/Workbook.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'monitor workbook',
              Tooltip: 'Azure Monitor',
              Image: require('../../assets/azure_icons/azure non-deployable/AzureMonitor.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'private link',
              Tooltip: 'Private Link',
              azInfo:['Private Endpoint deployable soon...'],
              Image: require('../../assets/azure_icons/azure non-deployable/Private Link.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'import export job',
              Tooltip: 'Import/Export Job',
              Image: require('../../assets/azure_icons/azure non-deployable/Import Export Job.png'),
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'network watcher',
              Tooltip: 'Network Watcher',
              Image: require('../../assets/azure_icons/Networking Service Color/NetworkWatcher.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.NetworkWatcher()
            }
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
                azInfo: ['Private Link supported','Service Endpoint supported','deployable'],
                Image: require('../../assets/azure_icons/Web Service Color/App Services.png'),
                Provisionable: true,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.AppService()
            },
            {
              Name: 'app service environment',
              Tooltip: 'App Service Environment',
              azInfo: ['deployable'],
              Image: require('../../assets/azure_icons/Web Service Color/App Service Environments.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ASE()
            },
            {
              Name: 'azure function',
              Tooltip: 'Function',
              azInfo: ['deployable'],
              Image: require('../../assets/azure_icons/Web Service Color/Function Apps.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Function()
            },
            {
              Name: 'azure search',
              Tooltip: 'Azure Search',
              azInfo: ['Private Link supported'],
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
              azInfo: ['Private Link supported'],
              Image: require('../../assets/azure_icons/Web Service Color/App Configuration.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AppConfig()
            },
            {
              Name: 'media service video stream content',
              Tooltip: 'Azure Media Service',
              Image: Utils.pngDataUrl(AzureIcons.MediaService()),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.MediaService()
            },
            {
              Name: 'spring cloud microservice',
              Tooltip: 'Azure Spring Cloud',
              Image: Utils.pngDataUrl(AzureIcons.SpringCloud()),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SpringCloud()
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
                azInfo: ['deployable'],
                Image: require('../../assets/azure_icons/ComputeServiceColor/VM/VM-windows.png'),
                Provisionable: true,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.WindowsVM()
            },
            {
              Name: 'linux vm',
              Tooltip: 'Linux VM',
              azInfo: ['deployable'],
              Image: require('../../assets/azure_icons/ComputeServiceColor/VM/VM-Linux.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.LinuxVM()
            },
            {
              Name: 'vm scale sets vmss',
              Tooltip: 'VM Scale Sets',
              azInfo: ['deployable'],
              Image: require('../../assets/azure_icons/ComputeServiceColor/VM/VM Scale Sets.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.VMSS()
            },
            {
              Name: 'batch',
              Tooltip: 'Azure Batch',
              Image: require('../../assets/azure_icons/ComputeServiceColor/Batch Accounts.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Batch()
            },
            {
              Name: 'vm dedicated host',
              Tooltip: 'Dedicated Host',
              Image: require('../../assets/azure_icons/ComputeServiceColor/azure-dedicatedhost.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DedicatedHost()
            },
            {
              Name: 'vm devtest lab',
              Tooltip: 'DevTest Labs',
              Image: require('../../assets/azure_icons/ComputeServiceColor/Azure DevTest Labs.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DevTestLab()
            },
            {
              Name: 'shared image gallery sig',
              Tooltip: 'Shared Image Gallery',
              Image: require('../../assets/azure_icons/ComputeServiceColor/Shared Image Galleries.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SharedImageGallery()
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
                azInfo: ['deployable'],
                Image: require('../../assets/azure_icons/Networking Service Color/Virtual Networks.png'),
                Provisionable: true,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.VNet()
            },
            {
              Name: 'load balancer nlb slb alb route',
              Tooltip: 'Load Balancer',
              azInfo: ['deployable'],
              Image: require('../../assets/azure_icons/Networking Service Color/Load Balancers.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.NLB()
            },
            {
              Name: 'application gatway appgw waf route',
              Tooltip: 'Application Gateway',
              azInfo: ['deployable'],
              Image: require('../../assets/azure_icons/Networking Service Color/Application Gateway.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AppGw()
            },
            {
              Name: 'dns zone',
              Tooltip: 'Azure DNS',
              Image: require('../../assets/azure_icons/Networking Service Color/azure-dns.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DNS()
            },
            {
              Name: 'dns private zone',
              Tooltip: 'DNS Private Zone',
              Image: require('../../assets/azure_icons/Networking Service Color/DNS Private Zones.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DNSPrivateZone()
            },
            {
              Name: 'front door waf load balancer route',
              Tooltip: 'Front Door',
              Image: require('../../assets/azure_icons/Networking Service Color/Front Doors.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.FrontDoor()
            },
            {
              Name: 'public ip address pip',
              Tooltip: 'Public IP',
              Image: require('../../assets/azure_icons/Networking Service Color/Public IP Addresses.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.PublicIp()
            },
            {
              Name: 'express route mpls wan',
              Tooltip: 'ExpressRoute',
              Image: require('../../assets/azure_icons/Networking Service Color/ExpressRoute Circuits.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ExpressRouteCircuit()
            },
            {
              Name: 'traffic manager gtm route',
              Tooltip: 'Traffic Manager',
              Image: require('../../assets/azure_icons/Networking Service Color/Traffic Manager Profiles.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.TrafficManager()
            },
            {
              Name: 'virtual network gateway vnet',
              Tooltip: 'Virtual Network Gateway',
              Image: require('../../assets/azure_icons/Networking Service Color/Virtual Network Gateways.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.VirtualNetworkGateway()
            },
            {
              Name: 'cdn',
              Tooltip: 'Azure CDN',
              Image: require('../../assets/azure_icons/Networking Service Color/CDN Profiles.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.CDN()
            },
            {
              Name: 'application security group asg',
              Tooltip: 'Application Security Group',
              Image: require('../../assets/azure_icons/Networking Service Color/Application Security Groups.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ASG()
            },
            {
              Name: 'network interface nic',
              Tooltip: 'Network Interface',
              Image: require('../../assets/azure_icons/Networking Service Color/Network Interfaces.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.NIC()
            },
            {
              Name: 'private endpoint',
              Tooltip: 'Private Endpoint',
              Image: require('../../assets/azure_icons/Networking Service Color/private-endpoint.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.PrivateEndpoint()
            },
            {
              Name: 'virtual wan',
              Tooltip: 'Virtual WAN',
              Image: Utils.pngDataUrl(AzureIcons.VirtualWAN()),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.VirtualWAN()
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
                Name: 'blob table queue file storage',
                Tooltip: 'Azure Storage Account',
                azInfo: ['Private Link supported','Service Endpoint supported', 'deployable'],
                Image: require('../../assets/azure_icons/Storage Service Color/Blob Storage.png'),
                Provisionable: true,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.StorageAccount()
            },
            {
              Name: 'file sync',
              Tooltip: 'Azure File Sync',
              Image: require('../../assets/azure_icons/Storage Service Color/Storage Sync Services.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AzFileSync()
            },
            {
              Name: 'netapp files',
              Tooltip: 'Azure NetApp Files',
              Image: require('../../assets/azure_icons/Storage Service Color/Azure NetApp files.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.NetAppFile()
            },
            {
              Name: 'data box',
              Tooltip: 'Data Box',
              Image: require('../../assets/azure_icons/Storage Service Color/Data Box.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Databox()
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
                azInfo: ['Private Link supported','Service Endpoint supported'],
                Image: require('../../assets/azure_icons/Databases Service Color/Azure Database for PostgreSQL servers.png'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.PostgreSQL()
            },
            {
              Name: 'maria',
              Tooltip: 'Azure Database for MariaDB',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/azure_icons/Databases Service Color/Azure Database for MariaDB servers.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.MariaDB()
            },
            {
              Name: 'sql tsql',
              Tooltip: 'Azure SQL',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/azure_icons/Databases Service Color/SQL Databases.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SQLDB()
            },
            {
              Name: 'elastic job agent tsql script',
              Tooltip: 'Elastic Job Agent',
              Image: require('../../assets/azure_icons/Databases Service Color/azure-sqlelasticjobagent.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ElasticJobAgent()
            },
            {
              Name: 'cosmos mongo cassandra graph documentdb',
              Tooltip: 'CosmosDB',
              azInfo: ['Private Link supported','Service Endpoint supported','deployable'],
              Image: require('../../assets/azure_icons/Databases Service Color/azure-cosmos-db.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.CosmosDB()
            },
            {
              Name: 'mysql',
              Tooltip: 'Azure Database for MySQL',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/azure_icons/Databases Service Color/Azure Database for MySQL servers.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.MySQL()
            },
            {
              Name: 'sql elastic pool',
              Tooltip: ' SQL Elastic Database Pool',
              Image: require('../../assets/azure_icons/Databases Service Color/Elastic Database Pools.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SQLElasticPool()
            },
            {
              Name: 'sql managed instance mi',
              Tooltip: 'Azure SQL Managed Instance',
              Image: require('../../assets/azure_icons/Databases Service Color/SQL Managed Instances.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SQLMI()
            },
            {
              Name: 'redis',
              Tooltip: 'Azure Cache for Redis',
              Image: require('../../assets/azure_icons/Databases Service Color/Azure Cache for Redis.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Redis()
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
                azInfo: ['Private Link supported','Service Endpoint supported'],
                Image: require('../../assets/azure_icons/Databases Service Color/synapseanalytics.png'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.Synapse()
            },
            {
              Name: 'data lake analytics',
              Tooltip: 'Data Lake Analytics',
              Image: require('../../assets/azure_icons/Analytics Service Color/Data Lake Analytics.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DataLakeAnalytics()
            },
            {
              Name: 'databricks data bricks',
              Tooltip: 'Databricks',
              Image: require('../../assets/azure_icons/Analytics Service Color/Azure Databricks.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Databricks()
            },
            {
              Name: 'data factory',
              Tooltip: 'Data Factory',
              Image: require('../../assets/azure_icons/Analytics Service Color/Data Factories.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DataFactory()
            },
            {
              Name: 'hdinsight hd insight',
              Tooltip: 'HDInsight',
              Image: require('../../assets/azure_icons/Analytics Service Color/HDInsightClusters.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.HdInsight()
            },
            {
              Name: 'data explorer',
              Tooltip: 'Data Explorer',
              Image: require('../../assets/azure_icons/Analytics Service Color/Azure Data Explorer Clusters.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DataExplorer()
            },
            {
              Name: 'data catalog',
              Tooltip: 'Data Catalog',
              Image: Utils.pngDataUrl(AzureIcons.DataCatalog()),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DataCatalog()
            },
            {
              Name: 'data share datashare',
              Tooltip: 'Data Share',
              Image: Utils.pngDataUrl(AzureIcons.DataShare()),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DataShare()
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
                resourceType: ResourceType.Cognitive()
            },
            {
              Name: 'bots service bot',
              Tooltip: 'Bots Service',
              Image: require('../../assets/azure_icons/AI and ML Service Color/Bot Services.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.BotsService()
            },
            {
              Name: 'genomics',
              Tooltip: 'Genomics Accounts',
              Image: require('../../assets/azure_icons/AI and ML Service Color/Genomics Accounts.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Genomics()
            },
            {
              Name: 'machine learning service workspace',
              Tooltip: 'Machine Learning Service Workspaces',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/azure_icons/AI and ML Service Color/Machine Learning Service Workspaces.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.MLServiceWorkspace()
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
                resourceType: ResourceType.ContainerInstance()
            },
            {
              Name: 'container registry',
              Tooltip: 'Container Registry',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/azure_icons/Container Service Color/Container Registries.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ContainerRegistry()
            },
            {
              Name: 'kubernetes kube k8s microservice',
              Tooltip: 'Azure Kubernetes',
              Image: require('../../assets/azure_icons/Container Service Color/Kubernetes Services.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Kubernetes()
            },
            {
              Name: 'mesh service fabric',
              Tooltip: 'Mesh Application',
              Image: Utils.pngDataUrl(AzureIcons.MeshApplication()),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.MeshApplication()
            }
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
                resourceType: ResourceType.APIM()
            },
            {
              Name: 'service bus asb',
              Tooltip: 'Azure Service Bus',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/azure_icons/Integration Service Color/Azure Service Bus.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ASB()
            },
            {
              Name: 'relays',
              Tooltip: 'Azure Relays',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/azure_icons/Integration Service Color/Relay.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Relay()
            },
            {
              Name: 'logic app',
              Tooltip: 'Logic App',
              Image: require('../../assets/azure_icons/Integration Service Color/Logic Apps.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.LogicApp()
            },
            {
              Name: 'integration service environment ise',
              Tooltip: 'Integration Service Environment for Logic App',
              Image: require('../../assets/azure_icons/Integration Service Color/Integration Service Environments.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ISE()
            },
            {
              Name: 'event grid topic',
              Tooltip: 'Event Grid Topic',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/azure_icons/Integration Service Color/Event Grid Topics.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.EventGridTopic()
            },
            {
              Name: 'event grid subscription',
              Tooltip: 'Event Grid Subscription',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/azure_icons/Integration Service Color/Event Grid Subscriptions.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.EventGridSubscription()
            },
            {
              Name: 'event grid domain',
              Tooltip: 'Event Grid Domain',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/azure_icons/Integration Service Color/Event Grid Domain.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.EventGridDomain()
            },
            {
              Name: 'stream analytics',
              Tooltip: 'Stream Analytics',
              Image: require('../../assets/azure_icons/Integration Service Color/Stream-Analytics.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.StreamAnalytics()
            },
            {
              Name: 'event hub',
              Tooltip: 'Event Hub',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/azure_icons/Integration Service Color/event hub.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.EventHub()
            },
            {
              Name: 'sendgrid email',
              Tooltip: 'SendGrid',
              Image: require('../../assets/azure_icons/Integration Service Color/SendGrid Accounts.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SendGrid()
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
                Name: 'firewall azfw',
                Tooltip: 'Azure Firewall',
                azInfo: ['deployable'],
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
              resourceType: ResourceType.Sentinel()
            },
            {
              Name: 'key vault akv',
              Tooltip: 'Key Vault',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/azure_icons/Security Service Color/Key Vaults.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.KeyVault()
            },
            {
              Name: 'security center asc',
              Tooltip: 'Security Center',
              azInfo: ['deployable'],
              Image: require('../../assets/azure_icons/Security Service Color/Security Center.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SecurityCenter()
            },
            {
              Name: 'ddos protection standard',
              Tooltip: 'DDoS Protection Standard',
              Image: require('../../assets/azure_icons/Security Service Color/DDOS Protection Plans.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DDoSStandard()
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
              Name: 'migrate',
              Tooltip: 'Azure Migrate',
              Image: require('../../assets/azure_icons/Management and Governance Service Color/Azure Migrate.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.RecoveryServiceVault()
            },
            {
                Name: 'site recovery backup dr',
                Tooltip: 'Site Recovery',
                azInfo: ['-Purpose: Backup & DR','-Private Link supported','deployable'],
                Image: require('../../assets/azure_icons/Management and Governance Service Color/SiteRecovery.png'),
                Provisionable: true,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.RecoveryServiceVault()
            },
            {
              Name: 'app insights apm',
              Tooltip: 'Application Insights',
              azInfo: ['deployable'],
              Image: require('../../assets/azure_icons/Management and Governance Service Color/AppInsights.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AppInsights()
            },
            {
              Name: 'log analytics monitor',
              Tooltip: 'Log Analytics',
              Image: require('../../assets/azure_icons/Management and Governance Service Color/Log Analytics Workspaces.png'),
              Provisionable: true,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.LogAnalytics()
            },
            {
              Name: 'automation update',
              Tooltip: 'Automation',
              Image: require('../../assets/azure_icons/Management and Governance Service Color/Automation Accounts.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Automation()
            },
            {
              Name: 'arc',
              Tooltip: 'Azure Arc',
              Image: require('../../assets/azure_icons/Management and Governance Service Color/azure-arc.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Arc()
            },
            {
              Name: 'ad aad oauth oidc openid',
              Tooltip: 'Azure AD',
              Image: require('../../assets/azure_icons/Identity Service Color/Azure AD.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AAD()
            },
            {
              Name: 'ad b2c oauth oidc openid',
              Tooltip: 'Azure AD B2C',
              Image: require('../../assets/azure_icons/Identity Service Color/Azure AD B2C.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AADB2C()
            },
            {
              Name: 'ad ad domain service',
              Tooltip: 'Azure AD Domain Service',
              Image: require('../../assets/azure_icons/Identity Service Color/azuread-domainservice.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AADDomainService()
            },
            {
              Name: 'managed identity',
              Tooltip: 'Managed Identity',
              Image: Utils.pngDataUrl(AzureIcons.ManagedIdentity()),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ManagedIdentity()
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
                azInfo: ['Private Link supported'],
                Image: require('../../assets/azure_icons/Internet of Things Service Color/Azure IoT Hub.png'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.IoTHub()
            },
            {
              Name: 'iot central app applications',
              Tooltip: 'IoT Central Applications',
              Image: require('../../assets/azure_icons/Internet of Things Service Color/IoT Central Applications.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.IoTCentral()
            },
            {
              Name: 'map',
              Tooltip: 'Azure Map',
              Image: require('../../assets/azure_icons/Internet of Things Service Color/Azure Maps.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AzureMaps()
            },
            {
              Name: 'time series insights environment',
              Tooltip: 'Time Series Insights Environment',
              Image: require('../../assets/azure_icons/Internet of Things Service Color/Time Series Insights environments.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.TimeSeriesInsights()
            },
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Blockchain',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'blockchain block',
                Tooltip: 'Azure Blockchain Service',
                Image: Utils.pngDataUrl(AzureIcons.Blockchain()),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.Blockchain()
            }
          ]
        }
       },
    ]

    return paletteRscs;
 }

  render() {
    
    return(
        <div className="sidebar"
          style={{display: this.global.drawResourcePaletteOpen ? 'block': 'none' }}>
          <AppBar position="sticky" style={{"z-index": "10"}}>
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
          <Container disableGutters="true">
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
                                <Tooltip
                                position="bottom"
                                html={(
                                  <div>
                                    <strong>{r.Tooltip}</strong>
                                    {
                                      (r.azInfo == undefined)
                                      ? ''
                                      : <div style={{textAlign:'left'}}>
                                        {
                                          r.azInfo.map(i => {
                                            return <div style={{fontSize:10}}>{i}</div>
                                          })
                                        }
                                        </div>
                                    }
                                  </div>
                                )}>
                                  {
                                    (r.Provisionable != undefined && r.Provisionable == true)
                                        ? <Badge color="secondary" variant="dot">
                                            <img src={r.Image} width="30" height="30" />
                                          </Badge>
                                        : <img src={r.Image} width="30" height="30" />
                                  }
                              </Tooltip>
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
          </Container>
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
    });    

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
          thisComp.props.DiagramEditor.current.addResourceToEditorFromPalette({
            resourceType: resourceType,
            x: x,
            y: y
          });
      }
    });
    
  }
}