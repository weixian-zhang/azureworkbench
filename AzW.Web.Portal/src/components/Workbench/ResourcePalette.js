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
      filteredResources: this.initPaletteResources()
    }

    this.styles = {
      visible: {
        visibility: "visible"
      },
      hidden: {
        visibility: "hidden"
      }
    }

    this.setGlobal({drawResourcePaletteOpen:true});

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
                 Image: require('../../assets/IconCloud/fluent/shape/shape-arrowforward.svg'),
                 IsPng: true,
                 IsVisible:true,
                 ref: this.straightArrow
             },
             {
                 Name: 'Orthognal Arrow',
                 Tooltip: 'Orthognal Arrow',
                 Image: require('../../assets/IconCloud/fluent/shape/shape-orthogonalarrow.svg'),
                 IsPng: true,
                 IsVisible:true,
                 ref: this.elbowArrow
             },
            {
              Name: 'curve bezier arrow',
              Tooltip: 'Bezier Curve Arrow',
              Image:require('../../assets/IconCloud/fluent/shape/shape-curvearrow.svg'),
              IsPng: true,
              IsVisible:true
            },
            {
              Name: 'double ended arrow',
              Tooltip: 'Double Ended Arrow',
              Image:require('../../assets/IconCloud/fluent/shape/shape-doubleendarrow.svg'),
              IsPng: true,
              IsVisible:true
            },
             {
                Name: 'text label',
                Tooltip: 'Text',
                Image: require('../../assets/IconCloud/fluent/shape/shape-text.svg'),
                IsPng: true,
                IsVisible:true,
                ref: this.label
             },
             {
              Name: 'rectangle rect',
              Tooltip: 'Rectangle',
              Image: require('../../assets/IconCloud/fluent/shape/shape-rect.svg'),
              IsPng: true,
              IsVisible:true,
              ref: this.rectangle
            },
            {
              Name: 'rounded rectangle rect',
              Tooltip: 'Rectangle Rounded',
              Image: require('../../assets/IconCloud/fluent/shape/shape-roundedrect.svg'),
              IsPng: true,
              IsVisible:true,
              ref: this.roundedrectangle
            },
            {
              Name: 'triangle tri',
              Tooltip: 'Triangle',
              Image: require('../../assets/IconCloud/fluent/shape/shape-triangle.svg'),
              IsPng: true,
              IsVisible:true,
              ref: this.triangle
            },
            {
              Name: 'circle',
              Tooltip: 'Circle',
              Image: require('../../assets/IconCloud/fluent/shape/shape-circle.svg'),
              IsPng: true,
              IsVisible:true,
              ref: this.circle
            },
            {
              Name: 'cylinder',
              Tooltip: 'Cylinder',
              Image: require('../../assets/IconCloud/fluent/shape/shape-cylinder.svg'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'hexagon',
              Tooltip: 'Hexagon',
              Image:require('../../assets/IconCloud/fluent/shape/shape-hexagon.svg'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'nonagon',
              Tooltip: 'Nonagon',
              Image:require('../../assets/IconCloud/fluent/shape/shape-nonagon.svg'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'box cube',
              Tooltip: 'Cube',
              Image:require('../../assets/IconCloud/fluent/shape/shape-cube.svg'),
              IsPng: true,
              IsVisible:true,
              ref: this.threedbox
            },
            {
              Name: 'arrow',
              Tooltip: 'Arrow',
              Image:require('../../assets/IconCloud/fluent/shape/shape-rightarrow.svg'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'lightning',
              Tooltip: 'Lightning',
              Image:require('../../assets/IconCloud/fluent/shape/shape-lightning.svg'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'x cross',
              Tooltip: 'Thin X',
              Image:require('../../assets/IconCloud/fluent/shape/shape-cross.svg'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'chevron arrow',
              Tooltip: 'Chevron',
              Image:require('../../assets/IconCloud/fluent/shape/shape-chevron.svg'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'decision',
              Tooltip: 'Decision',
              Image:require('../../assets/IconCloud/fluent/shape/shape-decision.svg'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'component',
              Tooltip: 'Component',
              Image:require('../../assets/IconCloud/fluent/shape/shape-component.svg'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'location pin',
              Tooltip: 'Location 1',
              Image: require('../../assets/IconCloud/fluent/shape/shape-location-1.svg'),
              IsPng: true,
              IsVisible:true,
            },
            {
              Name: 'location pin',
              Tooltip: 'Location 2',
              Image:require('../../assets/IconCloud/fluent/shape/shape-location-2.svg'),
              IsPng: true,
              IsVisible:true,
            }
           ]
         }
      },
      {
        resourceGroup: {
          groupName: 'People',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
              Name: 'user person',
              Tooltip: 'User 1',
              Image: require('../../assets/IconCloud/fluent/people/ic_fluent_person-1.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'user person',
              Tooltip: 'User 2',
              Image: require('../../assets/IconCloud/fluent/people/user-2.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'user account acct',
              Tooltip: 'User Account',
              Image: require('../../assets/IconCloud/fluent/people/ic_fluent_person_accounts_24_filled.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'user support',
              Tooltip: 'User Support',
              Image: require('../../assets/IconCloud/fluent/people/ic_fluent_person_support_24_filled.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'user team',
              Tooltip: 'Team 1',
              Image: require('../../assets/IconCloud/fluent/people/ic_fluent_people_team-1.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'user team',
              Tooltip: 'Team 2',
              Image: require('../../assets/IconCloud/fluent/people/people-team-2.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'user team',
              Tooltip: 'Team 3',
              Image: require('../../assets/IconCloud/fluent/people/team-3.svg'),
              IsPng: false,
              IsVisible:true,
            },
          ]
        }
      },
      {
       resourceGroup: {
         groupName: 'Devices',
         groupExpanded: false,
         groupSearchVisible: true,
         resources: [
            {
              Name: 'server farm',
              Tooltip: 'Server Farm',
              Image: require('../../assets/IconCloud/fluent/devices/10835-icon-Server Farm-General.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'server',
              Tooltip: 'Server',
              Image: require('../../assets/IconCloud/fluent/devices/00060-icon-Servers-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'web server',
              Tooltip: 'Web Server',
              Image: require('../../assets/IconCloud/fluent/devices/IconLightWebServer.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'firewall',
              Tooltip: 'Firewall',
              Image: require('../../assets/IconCloud/fluent/devices/00059-icon-Firewall-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'mac',
              Tooltip: 'MacOS',
              Image: require('../../assets/IconCloud/fluent/devices/00593-icon-macOS-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'windows wsus',
              Tooltip: 'Windows WSUS',
              Image: require('../../assets/IconCloud/fluent/devices/02212-icon-WSUS-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'baremetal server',
              Tooltip: 'BareMetal Server',
              Image: require('../../assets/IconCloud/fluent/devices/02561-icon-Bare Metal Infrastructure-New Icons.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'vm',
              Tooltip: 'VM',
              Image: require('../../assets/IconCloud/fluent/devices/10021-icon-Virtual Machine-Compute.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'sql vm',
              Tooltip: 'SQL VM',
              Image: require('../../assets/IconCloud/fluent/devices/10124-icon-Azure SQL VM-Databases.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'devices',
              Tooltip: 'Devices',
              Image: require('../../assets/IconCloud/fluent/devices/10332-icon-Devices-family.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'camera',
              Tooltip: 'Camera',
              Image: require('../../assets/IconCloud/fluent/devices/device-camera.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'mobile',
              Tooltip: 'Mobile',
              Image: require('../../assets/IconCloud/fluent/devices/device-mobile.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'tablet',
              Tooltip: 'Tablet',
              Image: require('../../assets/IconCloud/fluent/devices/tablet.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'tape',
              Tooltip: 'Tape',
              Image: require('../../assets/IconCloud/fluent/devices/tape.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'printer',
              Tooltip: 'Printer',
              Image: require('../../assets/IconCloud/fluent/devices/device-printer.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'storage device',
              Tooltip: 'Storage Device',
              Image: require('../../assets/IconCloud/fluent/devices/device-storage.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'storage device',
              Tooltip: 'Storage Device 2',
              Image: require('../../assets/IconCloud/fluent/devices/device-storage-2.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'cloud server',
              Tooltip: 'Cloud Server',
              Image: require('../../assets/IconCloud/fluent/devices/IconLightCloudServer.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'database db',
              Tooltip: 'Database',
              Image: require('../../assets/IconCloud/fluent/devices/IconLightDatabase.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'database db server',
              Tooltip: 'Database Server',
              Image: require('../../assets/IconCloud/fluent/devices/IconLightServerDatabase.svg'),
              IsPng: false,
              IsVisible:true,
            },
         ]
       }
      },
      {
        resourceGroup: {
          groupName: 'Software & Tools',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'file',
                Tooltip: 'File',
                Image: require('../../assets/IconCloud/fluent/software/00058-icon-Files-menu.svg'),
                IsPng: false,
                IsVisible:true,
            },
            {
              Name: 'file',
              Tooltip: 'Files',
              Image: require('../../assets/IconCloud/fluent/software/files.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'folder',
              Tooltip: 'Folder',
              Image: require('../../assets/IconCloud/fluent/software/10802-icon-Folder Blank-General.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'directory dir',
              Tooltip: 'Directory Structure',
              Image: require('../../assets/IconCloud/fluent/software/02270-icon-Directory-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'folder sync',
              Tooltip: 'Folder Sync',
              Image: require('../../assets/IconCloud/fluent/software/sync-folder.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'sync',
              Tooltip: 'Sync',
              Image: require('../../assets/IconCloud/fluent/software/sync.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'search',
              Tooltip: 'Search',
              Image: require('../../assets/IconCloud/fluent/software/search.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'filter',
              Tooltip: 'Filter',
              Image: require('../../assets/IconCloud/fluent/software/filter.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'ssh key',
              Tooltip: 'SSH Key',
              Image: require('../../assets/IconCloud/fluent/software/00412-icon-SSH Keys-Other.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'rsa key',
              Tooltip: 'RSA Key',
              Image: require('../../assets/IconCloud/fluent/software/00787-icon-Keys-Other.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'anti virus',
              Tooltip: 'Antivirus',
              Image: require('../../assets/IconCloud/fluent/software/00555-icon-Antivirus-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'diagnostic tool',
              Tooltip: 'Diagnostic Tool',
              Image: require('../../assets/IconCloud/fluent/software/00689-icon-Diagnostic Tools B-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'data warehouse',
              Tooltip: 'Data Warehouse',
              Image: require('../../assets/IconCloud/fluent/software/00760-icon-Data Warehouse-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'invoice',
              Tooltip: 'Invoice',
              Image: require('../../assets/IconCloud/fluent/software/00916-Icon-Invoice-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'qr code',
              Tooltip: 'QR Code',
              Image: require('../../assets/IconCloud/fluent/software/QRCode.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'drive',
              Tooltip: 'Drive',
              Image: require('../../assets/IconCloud/fluent/software/01026-icon-Drives-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'email',
              Tooltip: 'Email',
              Image: require('../../assets/IconCloud/fluent/software/02271-icon-Email Message-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'process',
              Tooltip: 'Process 1',
              Image: require('../../assets/IconCloud/fluent/software/02275-icon-Process-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'process',
              Tooltip: 'Process 2',
              Image: require('../../assets/IconCloud/fluent/software/process-2.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'windows registry',
              Tooltip: 'Windows Registry',
              Image: require('../../assets/IconCloud/fluent/software/02279-icon-Windows Registry Key-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'gpu',
              Tooltip: 'GPU',
              Image: require('../../assets/IconCloud/fluent/software/02492-icon-GPU-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'saas software as a service',
              Tooltip: 'Software-as-a-Service',
              Image: require('../../assets/IconCloud/fluent/software/10213-icon-Software as a Service-Integration.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'browser web',
              Tooltip: 'Browser',
              Image: require('../../assets/IconCloud/fluent/software/10783-icon-Browser-General.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'scheduler cron',
              Tooltip: 'Scheduler',
              Image: require('../../assets/IconCloud/fluent/software/10833-icon-Scheduler-General.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'table',
              Tooltip: 'Table',
              Image: require('../../assets/IconCloud/fluent/software/10841-icon-Table-General.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'workflow',
              Tooltip: 'Workflow',
              Image: require('../../assets/IconCloud/fluent/software/10852-icon-Workflow-General.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'data copy',
              Tooltip: 'Data Copy',
              Image: require('../../assets/IconCloud/fluent/software/data-copy.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'data movement',
              Tooltip: 'Data Movement',
              Image: require('../../assets/IconCloud/fluent/software/data-movement.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'pipeline',
              Tooltip: 'Pipeline',
              Image: require('../../assets/IconCloud/fluent/software/pipeline.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'docker container',
              Tooltip: 'Docker',
              Image: require('../../assets/IconCloud/fluent/software/docker.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'container',
              Tooltip: 'Container 1',
              Image: require('../../assets/IconCloud/fluent/software/container-1.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'container',
              Tooltip: 'Container 2',
              Image: require('../../assets/IconCloud/fluent/software/container-2.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'git github',
              Tooltip: 'GitHub',
              Image: require('../../assets/IconCloud/fluent/software/Github.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'git github action',
              Tooltip: 'GitHub Actions',
              Image: require('../../assets/IconCloud/fluent/software/github-actions.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'git',
              Tooltip: 'Git',
              Image: require('../../assets/IconCloud/fluent/software/IconLightBrandGit.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'holo hololens',
              Tooltip: 'Hololens',
              Image: require('../../assets/IconCloud/fluent/software/hololens.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'internet',
              Tooltip: 'Internet',
              Image: require('../../assets/IconCloud/fluent/software/internet.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'chrome',
              Tooltip: 'Chrome',
              Image: require('../../assets/IconCloud/fluent/software/IconLightBrandChrome.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'google drive',
              Tooltip: 'Google Drive',
              Image: require('../../assets/IconCloud/fluent/software/google-drive.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'edge',
              Tooltip: 'Edge',
              Image: require('../../assets/IconCloud/fluent/software/IconLightBrandEdge.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'func function',
              Tooltip: 'Function',
              Image: require('../../assets/IconCloud/fluent/software/function.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'ps ps1 powershell',
              Tooltip: 'Powershell',
              Image: require('../../assets/IconCloud/fluent/software/10825-icon-Powershell-General.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'c# .net dotnet',
              Tooltip: 'C#',
              Image: require('../../assets/IconCloud/fluent/software/IconLightCSFileNode.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: '',
              Tooltip: '.Net',
              Image: require('../../assets/IconCloud/fluent/software/IconLightDotNET.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'bug',
              Tooltip: 'Bug',
              Image: require('../../assets/IconCloud/fluent/software/10784-icon-Bug-General.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'code',
              Tooltip: 'Code 1',
              Image: require('../../assets/IconCloud/fluent/software/10787-icon-Code-General.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'code',
              Tooltip: 'Code 2',
              Image: require('../../assets/IconCloud/fluent/software/code-2.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'file binaries code',
              Tooltip: 'File Binaries',
              Image: require('../../assets/IconCloud/fluent/software/file-binaries.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'js javascript',
              Tooltip: 'Javascript',
              Image: require('../../assets/IconCloud/fluent/software/ic_fluent_javascript_24_regular.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'nuget',
              Tooltip: 'Nuget',
              Image: require('../../assets/IconCloud/fluent/software/IconLightBrandNuget.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'f#',
              Tooltip: 'F#',
              Image: require('../../assets/IconCloud/fluent/software/IconLightFSFileNode.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'py python',
              Tooltip: 'Python',
              Image: require('../../assets/IconCloud/fluent/software/IconLightPYProjectNode.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'ts typescript',
              Tooltip: 'TypeScript',
              Image: require('../../assets/IconCloud/fluent/software/IconLightTSFileNode.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'vb visual basic',
              Tooltip: 'Visual Basic',
              Image: require('../../assets/IconCloud/fluent/software/IconLightVBFileNode.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'java',
              Tooltip: 'Java',
              Image: require('../../assets/IconCloud/fluent/software/java.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'cpp c++',
              Tooltip: 'C++',
              Image: require('../../assets/IconCloud/fluent/software/IconLightCPPProjectNode.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'vs visual studio',
              Tooltip: 'Visual Studio',
              Image: require('../../assets/IconCloud/fluent/software/IconLightBrandVisualStudio.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'web api',
              Tooltip: 'Web Api',
              Image: require('../../assets/IconCloud/fluent/software/IconLightWebAPI.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'web service',
              Tooltip: 'Web Service',
              Image: require('../../assets/IconCloud/fluent/software/IconLightWebService.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'webhook web',
              Tooltip: 'Webhook',
              Image: require('../../assets/IconCloud/fluent/software/web-02437-icon-Webhook-menu.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'event trigger',
              Tooltip: 'Event',
              Image: require('../../assets/IconCloud/fluent/software/web-event.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'execute run',
              Tooltip: 'Execute',
              Image: require('../../assets/IconCloud/fluent/software/IconLightExecute.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'message',
              Tooltip: 'Message',
              Image: require('../../assets/IconCloud/fluent/software/message.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'queue',
              Tooltip: 'Queue',
              Image: require('../../assets/IconCloud/fluent/software/60049-Icon-Queued-command.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'publish pub',
              Tooltip: 'Publish',
              Image: require('../../assets/IconCloud/fluent/software/publish.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'subscribe sub',
              Tooltip: 'Subscribe',
              Image: require('../../assets/IconCloud/fluent/software/subscribe.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'report',
              Tooltip: 'Report',
              Image: require('../../assets/IconCloud/fluent/software/report.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'biztalk',
              Tooltip: 'BizTalk',
              Image: require('../../assets/IconCloud/fluent/software/10779-icon-Biz Talk-General.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'd365',
              Tooltip: 'D365',
              Image: require('../../assets/IconCloud/fluent/software/D365.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'o365 office',
              Tooltip: 'office',
              Image: require('../../assets/IconCloud/fluent/software/IconLightBrandOffice.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'o365 outlook',
              Tooltip: 'Outlook',
              Image: require('../../assets/IconCloud/fluent/software/IconLightBrandOutlook.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'o365 ppt powerpoint',
              Tooltip: 'PowerPoint',
              Image: require('../../assets/IconCloud/fluent/software/IconLightBrandPowerPoint.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'o365 project',
              Tooltip: 'Project',
              Image: require('../../assets/IconCloud/fluent/software/IconLightBrandProject.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'o365 word',
              Tooltip: 'Words',
              Image: require('../../assets/IconCloud/fluent/software/IconLightBrandWord.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'o365 cms sharepoint',
              Tooltip: 'SharePoint',
              Image: require('../../assets/IconCloud/fluent/software/sharepoint.svg'),
              IsPng: false,
              IsVisible:true,
            },

            {
              Name: 'ci cd jenkins',
              Tooltip: 'Jenkins',
              Image: require('../../assets/IconCloud/fluent/software/jenkins.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'linux',
              Tooltip: 'Linux',
              Image: require('../../assets/IconCloud/fluent/software/linux.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'win windows',
              Tooltip: 'Windows',
              Image: require('../../assets/IconCloud/fluent/software/windows-logo.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'microsoft',
              Tooltip: 'Microsoft',
              Image: require('../../assets/IconCloud/fluent/software/microsoft-logo.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'pdf',
              Tooltip: 'PDf',
              Image: require('../../assets/IconCloud/fluent/software/pdf.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'image',
              Tooltip: 'Image',
              Image: require('../../assets/IconCloud/fluent/software/10812-icon-Image-General.svg'),
              IsPng: false,
              IsVisible:true,
            },
            {
              Name: 'power bi',
              Tooltip: 'Power BI',
              Image: require('../../assets/IconCloud/fluent/software/powerbi.svg'),
              IsPng: false,
              IsVisible:true,
            },

          ]
        }
      },
      {
        resourceGroup: {
          groupName: 'Azure - Not Deployable',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [

            {
              Name: 'azure',
              Tooltip: 'Azure',
              Image: require('../../assets/IconCloud/azure/nondeployable/60115-Icon-Azure.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },


            {
              Name: 'devops',
              Tooltip: 'Azure DevOps',
              Image: require('../../assets/IconCloud/azure/nondeployable/10261-icon-Azure DevOps-DevOps.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'arm template',
              Tooltip: 'ARM Template',
              Image: require('../../assets/IconCloud/azure/nondeployable/10009-icon-Templates-General.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'wvd windows virtual desktop',
              Tooltip: 'Windows Virtual Desktop',
              Image: require('../../assets/IconCloud/azure/nondeployable/00327-icon-Windows Virtual Desktop-Other.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'lighthouse light house',
              Tooltip: 'Azure LightHouse',
              Image: require('../../assets/IconCloud/azure/nondeployable/00471-icon-Azure Lighthouse-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'monitor',
              Tooltip: 'Azure Monitor',
              Image: require('../../assets/IconCloud/azure/nondeployable/00001-icon-Monitor-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'alert',
              Tooltip: 'Alert',
              Image: require('../../assets/IconCloud/azure/nondeployable/00002-icon-Alerts-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'advisor',
              Tooltip: 'Advisor',
              Image: require('../../assets/IconCloud/azure/nondeployable/00003-icon-Advisor-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'cost bill',
              Tooltip: 'Cost Management',
              Image: require('../../assets/IconCloud/azure/nondeployable/00004-icon-Cost Management and Billing-Migrate.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'blueprint arm',
              Tooltip: 'Blueprint',
              Image: require('../../assets/IconCloud/azure/nondeployable/00006-icon-Blueprints-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'policy',
              Tooltip: 'Policy',
              Image: require('../../assets/IconCloud/azure/nondeployable/10316-icon-Policy-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'activity log',
              Tooltip: 'Activity Log',
              Image: require('../../assets/IconCloud/azure/nondeployable/00007-icon-Activity Log-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'metrics monitor',
              Tooltip: 'Metrics',
              Image: require('../../assets/IconCloud/azure/nondeployable/00020-icon-Metrics-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'solution monitor',
              Tooltip: 'Monitoring Solution',
              Image: require('../../assets/IconCloud/azure/nondeployable/00021-icon-Solutions-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'peering service',
              Tooltip: 'Peering Service',
              Image: require('../../assets/IconCloud/azure/nondeployable/00973-icon-Peering Service prefix-menu.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'universal print',
              Tooltip: 'Universal Print',
              Image: require('../../assets/IconCloud/azure/nondeployable/00631-icon-Universal Print Connectors-menu.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'workbook monitor',
              Tooltip: 'Workbook',
              Image: require('../../assets/IconCloud/azure/nondeployable/02189-icon-Azure Workbooks-Preview.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'defender security',
              Tooltip: 'Azure Defender',
              Image: require('../../assets/IconCloud/azure/nondeployable/02247-icon-Azure Defender-Security.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'backup center',
              Tooltip: 'Backup Center',
              Image: require('../../assets/IconCloud/azure/nondeployable/02360-icon-Azure Backup Center-Other.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'dashboard portal',
              Tooltip: 'Azure Dashboard',
              Image: require('../../assets/IconCloud/azure/nondeployable/10015-icon-Dashboard-General.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'data studio',
              Tooltip: 'Azure Data Studio',
              Image: require('../../assets/IconCloud/azure/nondeployable/02558-icon-Azure Data Studio-menu.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'storage explorer',
              Tooltip: 'Storage Explorer',
              Image: require('../../assets/IconCloud/azure/nondeployable/10091-icon-Storage Explorer-Storage.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'resource graph explorer',
              Tooltip: 'Resource Graph Explorer',
              Image: require('../../assets/IconCloud/azure/nondeployable/10318-icon-Resource Graph Explorer-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'resource explorer',
              Tooltip: 'Resource Explorer',
              Image: require('../../assets/IconCloud/azure/nondeployable/10349-icon-Resource Explorer-General.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'cloud shell',
              Tooltip: 'Cloud Shell',
              Image: require('../../assets/IconCloud/azure/nondeployable/cloudshell.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'block blob',
              Tooltip: 'Storage Block Blob',
              Image: require('../../assets/IconCloud/azure/nondeployable/10780-icon-Blob Block-General.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'page blob',
              Tooltip: 'Storage Page Blob',
              Image: require('../../assets/IconCloud/azure/nondeployable/10781-icon-Blob Page-General.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'azure stack',
              Tooltip: 'Azure Stack',
              Image: require('../../assets/IconCloud/azure/nondeployable/10114-icon-Azure Stack-Azure Stack.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'azure sql stretch db',
              Tooltip: 'Azure SQL Stretch DB',
              Image: require('../../assets/IconCloud/azure/nondeployable/10137-icon-Azure SQL Server Stretch Databases-Databases.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'azure sphere',
              Tooltip: 'Azure Sphere',
              Image: require('../../assets/IconCloud/azure/nondeployable/10190-icon-Azure Sphere-Preview.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'vm health',
              Tooltip: 'VM Health',
              Image: require('../../assets/IconCloud/azure/nondeployable/02648-icon-VM Health-menu.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'service health',
              Tooltip: 'Azure Service Health',
              Image: require('../../assets/IconCloud/azure/nondeployable/10004-icon-Service Health-General.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'orbital',
              Tooltip: 'Azure Orbital',
              Image: require('../../assets/IconCloud/azure/nondeployable/02697-icon-Azure Orbital-Preview.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'management group',
              Tooltip: 'Management Group',
              Image: require('../../assets/IconCloud/azure/nondeployable/10011-icon-Management Groups-General.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'subscription',
              Tooltip: 'Subscription',
              Image: require('../../assets/IconCloud/azure/nondeployable/10002-icon-Subscriptions-General.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'resource group rg',
              Tooltip: 'Resource Group',
              Image: require('../../assets/IconCloud/azure/nondeployable/10007-icon-Resource Groups-General.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'kubernetes kube',
              Tooltip: 'Azure Kubernetes',
              Image: require('../../assets/IconCloud/azure/nondeployable/10023-icon-Kubernetes Services-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'cloud service',
              Tooltip: 'Cloud Service(classic)',
              Image: require('../../assets/IconCloud/azure/nondeployable/10030-icon-Cloud Services (Classic)-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'network watcher',
              Tooltip: 'Network Watcher',
              Image: require('../../assets/IconCloud/azure/nondeployable/10066-icon-Network Watcher-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'subnet',
              Tooltip: 'Subnet',
              Image: require('../../assets/IconCloud/azure/nondeployable/02742-icon-Subnet-menu.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'vnet peering',
              Tooltip: 'VNet Peering',
              Image: require('../../assets/IconCloud/azure/nondeployable/02743-icon-Peerings-menu.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'nat gateway',
              Tooltip: 'Nat Gateway',
              Image: require('../../assets/IconCloud/azure/nondeployable/10310-icon-NAT-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'service endpoint',
              Tooltip: 'Service Endpoint',
              Image: require('../../assets/IconCloud/azure/nondeployable/02578-icon-Service Endpoints-menu.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'nsg network security group',
              Tooltip: 'Network Security Group',
              Image: require('../../assets/IconCloud/azure/nondeployable/10067-icon-Network Security Groups-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'route table udr',
              Tooltip: 'Route Table',
              Image: require('../../assets/IconCloud/azure/nondeployable/10082-icon-Route Tables-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'integration account',
              Tooltip: 'Integration Account',
              Image: require('../../assets/IconCloud/azure/nondeployable/10218-icon-Integration Accounts-Integration.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'kusto kql',
              Tooltip: 'Kusto',
              Image: require('../../assets/IconCloud/azure/nondeployable/Kusto.png'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'arc',
              Tooltip: 'Azure Arc',
              Image: require('../../assets/IconCloud/azure/nondeployable/00756-icon-Azure Arc-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'ad aad active directory oauth oidc openid login',
              Tooltip: 'Azure AD',
              Image: require('../../assets/IconCloud/azure/nondeployable/identity/10221-icon-Azure Active Directory-Identity.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'ad b2c active directory oauth oidc openid social login',
              Tooltip: 'Azure AD B2C',
              Image: require('../../assets/IconCloud/azure/nondeployable/identity/10228-icon-Azure AD B2C-Identity.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'rbac custom role aad',
              Tooltip: 'Custom Role',
              Image: require('../../assets/IconCloud/azure/nondeployable/identity/02680-icon-Custom Azure AD Roles-Identity.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'license aad',
              Tooltip: 'Azure AD User License',
              Image: require('../../assets/IconCloud/azure/nondeployable/identity/02681-icon-AAD Licenses-Identity.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'group aad',
              Tooltip: 'Group',
              Image: require('../../assets/IconCloud/azure/nondeployable/identity/10223-icon-Groups-Identity.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'enterprise app aad',
              Tooltip: 'Enterprise App',
              Image: require('../../assets/IconCloud/azure/nondeployable/identity/10225-icon-Enterprise Applications-Identity.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'information protection aad',
              Tooltip: 'Information Protection',
              Image: require('../../assets/IconCloud/azure/nondeployable/identity/10229-icon-Azure Information Protection-Identity.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'app registration aad',
              Tooltip: 'App Registration',
              Image: require('../../assets/IconCloud/azure/nondeployable/identity/10232-icon-App Registrations-Identity.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },

            {
              Name: 'conditional access aad',
              Tooltip: 'Conditional Access',
              Image: require('../../assets/IconCloud/azure/nondeployable/identity/10233-icon-Conditional Access-Security.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'privilege pim aad',
              Tooltip: 'PIM',
              Image: require('../../assets/IconCloud/azure/nondeployable/identity/10234-icon-Azure AD Privilege Identity Management-Identity.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },
          ]
        }
     },
      {
        resourceGroup: {
          groupName: 'Azure App Services',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'app service',
                Tooltip: 'App Service',
                azInfo: ['Private Link supported','Service Endpoint supported'],
                Image: require('../../assets/IconCloud/azure/appservices/10035-icon-App Services-App Services.svg'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.AppService()
            },
            {
              Name: 'app service environment',
              Tooltip: 'App Service Environment',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/appservices/10047-icon-App Service Environments-App Services.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ASE()
            },
            {
              Name: 'azure function',
              Tooltip: 'Function',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/appservices/10029-icon-Function Apps-IoT.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Function()
            },
            {
              Name: 'azure search',
              Tooltip: 'Azure Search',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/IconCloud/azure/appservices/10044-icon-Search Services-App Services.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AzureSearch()
            },
            {
              Name: 'azure signalr websocket',
              Tooltip: 'Azure SignalR',
              Image: require('../../assets/IconCloud/azure/appservices/10052-icon-SignalR-Web.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SignalR()
            },
            {
              Name: 'app service certificate',
              Tooltip: 'App Service Certificate',
              Image: require('../../assets/IconCloud/azure/appservices/00049-icon-App Service Certificates-App Services.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AppServiceCert()
            },
            {
              Name: 'app service plan',
              Tooltip: 'App Service Plan',
              Image: require('../../assets/IconCloud/azure/appservices/00046-icon-App Service Plans-App Services.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AppServicePlan()
            },
            {
              Name: 'app service domain',
              Tooltip: 'App Service Domain',
              Image: require('../../assets/IconCloud/azure/appservices/00050-icon-App Service Domains-App Services.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AppServiceDomain()
            },
            {
              Name: 'notification hub',
              Tooltip: 'Notification Hub',
              Image: require('../../assets/IconCloud/azure/appservices/10045-icon-Notification Hubs-App Services.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.NotificationHub()
            },
            {
              Name: 'static app web',
              Tooltip: 'Static App',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/appservices/01007-icon-Static Apps-Preview.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.StaticApp()
            },
            {
              Name: 'media service video stream content',
              Tooltip: 'Azure Media Service',
              Image: require('../../assets/IconCloud/azure/appservices/10309-icon-Azure Media Service-Web.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.MediaService()
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Azure Compute',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'vm virtual machine',
                Tooltip: 'VM',
                azInfo: [],
                Image: require('../../assets/IconCloud/azure/compute/10021-icon-Virtual Machine-Compute.svg'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.VM()
            },
            {
              Name: 'vm scale sets vmss',
              Tooltip: 'VM Scale Sets',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/compute/10034-icon-VM Scale Sets-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.VMSS()
            },
            {
              Name: 'batch account',
              Tooltip: 'Batch Account',
              Image: require('../../assets/IconCloud/azure/compute/10031-icon-Batch Accounts-Containers.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Batch()
            },
            {
              Name: 'vm devtest lab',
              Tooltip: 'DevTest Labs',
              Image: require('../../assets/IconCloud/azure/compute/10264-icon-DevTest Labs-DevOps.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DevTestLab()
            },
            {
              Name: 'lab service',
              Tooltip: 'Lab Service',
              Image: require('../../assets/IconCloud/azure/compute/10265-icon-Lab Services-DevOps.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.LabService()
            },
            {
              Name: 'shared image gallery sig',
              Tooltip: 'Shared Image Gallery',
              Image: require('../../assets/IconCloud/azure/compute/10039-icon-Shared Image Galleries-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SharedImageGallery()
            },
            {
              Name: 'kubernetes kube k8s microservice',
              Tooltip: 'Azure Kubernetes',
              Image: require('../../assets/IconCloud/azure/compute/10023-icon-Kubernetes Services-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Kubernetes()
            },
            {
              Name: 'service fabric cluster',
              Tooltip: 'Service Fabric Cluster',
              Image: require('../../assets/IconCloud/azure/compute/10036-icon-Service Fabric Clusters-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ServiceFabricCluster()
            },
            {
              Name: 'service fabric managed cluster',
              Tooltip: 'Service Fabric Managed Cluster',
              Image: require('../../assets/IconCloud/azure/compute/02370-icon-Managed Service Fabric-New Icons.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ServiceFabricManagedCluster()
            },
            {
              Name: 'automanage auto vm',
              Tooltip: 'Automanage',
              Image: require('../../assets/IconCloud/azure/compute/02112-icon-Automanaged VM-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Automanage()
            },
            {
              Name: 'image builder image template',
              Tooltip: 'Image Template',
              Image: require('../../assets/IconCloud/azure/compute/02634-icon-Image Templates-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ImageTemplate()
            },
            {
              Name: 'disk snapshot',
              Tooltip: 'Disk Snapshot',
              Image: require('../../assets/IconCloud/azure/compute/10026-icon-Disks Snapshots-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DiskSnapshot()
            },
            {
              Name: 'image',
              Tooltip: 'Image',
              Image: require('../../assets/IconCloud/azure/compute/10033-icon-Images-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.VMImage()
            },
            {
              Name: 'disk encryption set',
              Tooltip: 'Disk Encryption Set',
              Image: require('../../assets/IconCloud/azure/compute/00398-icon-Disk Encryption Sets-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DiskEncryptionSet()
            },
            {
              Name: 'wvd workspace',
              Tooltip: 'Workspace(WVD)',
              Image: require('../../assets/IconCloud/azure/compute/00400-icon-Workspaces-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.WorkspaceWVD()
            },
            {
              Name: 'vmware solution',
              Tooltip: 'VMware Solution',
              Image: require('../../assets/IconCloud/azure/compute/00524-icon-AVS-Azure VMware Solution.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.VMWareSolution()
            },
            {
              Name: 'hostgroup dedicated',
              Tooltip: 'Host group (dedicated host)',
              Image: require('../../assets/IconCloud/azure/compute/10346-icon-Host Groups-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Hostgroup()
            },
            {
              Name: 'host dedicated',
              Tooltip: 'Host (dedicated host)',
              Image: require('../../assets/IconCloud/azure/compute/10347-icon-Hosts-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Host()
            },
            {
              Name: 'spring cloud',
              Tooltip: 'Spring Cloud',
              Image: require('../../assets/IconCloud/azure/compute/10370-icon-Azure Spring Cloud-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SpringCloud()
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Azure Networking',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'virtual network vnet',
                Tooltip: 'Virtual Network',
                azInfo: ['Bicep support'],
                Image: require('../../assets/IconCloud/azure/network/10061-icon-Virtual Networks-Networking.svg'),
                Provisionable: true,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.VNet()
            },
            {
              Name: 'load balancer nlb slb alb route',
              Tooltip: 'Load Balancer',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/network/10062-icon-Load Balancers-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.NLB()
            },
            {
              Name: 'application gatway appgw waf route',
              Tooltip: 'Application Gateway',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/network/10076-icon-Application Gateways-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AppGw()
            },
            {
              Name: 'dns zone',
              Tooltip: 'Azure DNS',
              Image: require('../../assets/IconCloud/azure/network/10064-icon-DNS Zones-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DNS()
            },
            {
              Name: 'dns private zone',
              Tooltip: 'DNS Private Zone',
              Image: require('../../assets/IconCloud/azure/network/10064-icon-DNS Zones-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DNSPrivateZone()
            },
            {
              Name: 'front door load balancer waf nlb',
              Tooltip: 'Front Door',
              Image: require('../../assets/IconCloud/azure/network/10073-icon-Front Doors-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.FrontDoor()
            },
            {
              Name: 'public ip address pip',
              Tooltip: 'Public IP',
              Image: require('../../assets/IconCloud/azure/network/10069-icon-Public IP Addresses-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.PublicIp()
            },
            {
              Name: 'public ip prefixes ',
              Tooltip: 'Public IP Prefixes',
              Image: require('../../assets/IconCloud/azure/network/10372-icon-Public IP Prefixes-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.PublicIpPrefixes()
            },
            {
              Name: 'express route mpls wan',
              Tooltip: 'ExpressRoute',
              Image: require('../../assets/IconCloud/azure/network/10079-icon-ExpressRoute Circuits-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ExpressRouteCircuit()
            },
            {
              Name: 'traffic manager gtm route',
              Tooltip: 'Traffic Manager',
              Image: require('../../assets/IconCloud/azure/network/10065-icon-Traffic Manager Profiles-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.TrafficManager()
            },
            {
              Name: 'virtual network gateway vnet',
              Tooltip: 'Virtual Network Gateway',
              Image: require('../../assets/IconCloud/azure/network/10063-icon-Virtual Network Gateways-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.VirtualNetworkGateway()
            },
            {
              Name: 'local network gateway',
              Tooltip: 'Local Network Gateway',
              Image: require('../../assets/IconCloud/azure/network/10077-icon-Local Network Gateways-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.LocalNetworkGateway()
            },
            {
              Name: 'cdn',
              Tooltip: 'Azure CDN',
              Image: require('../../assets/IconCloud/azure/network/00056-icon-CDN Profiles-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.CDN()
            },
            {
              Name: 'network interface nic',
              Tooltip: 'Network Interface',
              Image: require('../../assets/IconCloud/azure/network/10080-icon-Network Interfaces-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.NIC()
            },
            {
              Name: 'virtual wan',
              Tooltip: 'Virtual WAN',
              Image: require('../../assets/IconCloud/azure/network/10353-icon-Virtual WANs-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.VirtualWAN()
            },
            {
              Name: 'firewall azfw',
              Tooltip: 'Azure Firewall',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/network/10084-icon-Firewalls-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Firewall()
            },
            {
              Name: 'firewall manager azfw',
              Tooltip: 'Firewall Manager',
              azInfo: [''],
              Image: require('../../assets/IconCloud/azure/network/00271-icon-Azure Firewall Manager-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.FirewallManager()
            },
            {
              Name: 'private endpoint',
              Tooltip: 'Private Endpoint',
              Image: require('../../assets/IconCloud/azure/network/02579-icon-Private Endpoints-menu.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.PrivateEndpoint()
            },
            {
              Name: 'private link',
              Tooltip: 'Private Link (S-NLB)',
              Image: require('../../assets/IconCloud/azure/network/00427-icon-Private Link-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.PrivateLink()
            },
            {
              Name: 'ip group',
              Tooltip: 'IP Groups',
              Image: require('../../assets/IconCloud/azure/network/00701-icon-IP Groups-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.IPGroup()
            },
            {
              Name: 'monitor private link scope',
              Tooltip: 'Monitor Private Link Scope',
              Image: require('../../assets/IconCloud/azure/network/01036-icon-Azure Monitor Private Link Scope-menu.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AMPLS()
            },
            {
              Name: 'network manager',
              Tooltip: 'Network Manager',
              Image: require('../../assets/IconCloud/azure/network/02237-icon-Azure Network Manager-Preview.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.NetworkManager()
            },
            {
              Name: 'route filters',
              Tooltip: 'Route Filters',
              Image: require('../../assets/IconCloud/azure/network/10071-icon-Route Filters-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.RouteFilters()
            },
            {
              Name: 'ddos protection standard',
              Tooltip: 'DDoS Protection Standard',
              Image: require('../../assets/IconCloud/azure/network/10072-icon-DDoS Protection Plans-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DDoSStandard()
            },
            {
              Name: 'web application firewall waf',
              Tooltip: 'Web Application Firewall',
              Image: require('../../assets/IconCloud/azure/network/10362-icon-Web Application Firewall Policies(WAF)-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.WAF()
            },
            {
              Name: 'availability set avai',
              Tooltip: 'Availability Set',
              Image: require('../../assets/IconCloud/azure/network/10025-icon-Availability Sets-Compute.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AvailabilitySet()
            },
            {
              Name: 'proximity placement group',
              Tooltip: 'Proximity Placement Group',
              Image: require('../../assets/IconCloud/azure/network/10365-icon-Proximity Placement Groups-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ProximityPlacementGroup()
            }
          ]
        }
       },

       {
        resourceGroup: {
          groupName: 'Azure Database',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'postgresql db',
                Tooltip: 'Azure Database for PostgreSQL',
                azInfo: ['Private Link supported','Service Endpoint supported'],
                Image: require('../../assets/IconCloud/azure/databases/10131-icon-Azure Database PostgreSQL Server-Databases.svg'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.PostgreSQL()
            },
            {
              Name: 'maria db',
              Tooltip: 'Azure Database for MariaDB',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/IconCloud/azure/databases/10123-icon-Azure Database MariaDB Server-Databases.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.MariaDB()
            },
            {
              Name: 'sql db',
              Tooltip: 'Azure SQL',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/IconCloud/azure/databases/10130-icon-SQL Database-Databases.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SQLDB()
            },
            {
              Name: 'elastic job agent',
              Tooltip: 'Elastic Job Agent',
              Image: require('../../assets/IconCloud/azure/databases/10128-icon-Elastic Job Agents-Databases.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ElasticJobAgent()
            },
            {
              Name: 'cosmos mongo cassandra graph documentdb db',
              Tooltip: 'CosmosDB',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/IconCloud/azure/databases/10121-icon-Azure Cosmos DB-Databases.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.CosmosDB()
            },
            {
              Name: 'mysql',
              Tooltip: 'Azure Database for MySQL',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/IconCloud/azure/databases/10122-icon-Azure Database MySQL Server-Databases.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.MySQL()
            },
            {
              Name: 'sql elastic pool',
              Tooltip: ' SQL Elastic Database Pool',
              Image: require('../../assets/IconCloud/azure/databases/10134-icon-SQL Elastic Pools-Databases.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SQLElasticPool()
            },
            {
              Name: 'sql managed instance mi',
              Tooltip: 'Azure SQL Managed Instance',
              Image: require('../../assets/IconCloud/azure/databases/10136-icon-SQL Managed Instance-Databases.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SQLMI()
            },
            {
              Name: 'redis',
              Tooltip: 'Azure Cache for Redis',
              Image: require('../../assets/IconCloud/azure/databases/10137-icon-Cache Redis-Databases.svg'),
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
          groupName: 'Azure Storage & Migrate',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'blob table queue file storage',
                Tooltip: 'Azure Storage Account',
                azInfo: ['Private Link supported','Service Endpoint supported, Bicep support'],
                Image: require('../../assets/IconCloud/azure/data_storage/10086-icon-Storage Accounts-Storage.svg'),
                Provisionable: true,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.StorageAccount()
            },
            {
              Name: 'storage sync service',
              Tooltip: 'Storage Sync Service',
              Image: require('../../assets/IconCloud/azure/data_storage/10093-icon-Storage Sync Services-Storage.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AzFileSync()
            },
            {
              Name: 'netapp files',
              Tooltip: 'Azure NetApp Files',
              Image: require('../../assets/IconCloud/azure/data_storage/10096-icon-Azure NetApp Files-Storage.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.NetAppFile()
            },
            {
              Name: 'data factory',
              Tooltip: 'Data Factory',
              Image: require('../../assets/IconCloud/azure/data_storage/10126-icon-Data Factory-Databases.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DataFactory()
            },
            {
              Name: 'data explorer',
              Tooltip: 'Data Explorer',
              Image: require('../../assets/IconCloud/azure/data_storage/10145-icon-Azure Data Explorer Clusters-Databases.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DataExplorer()
            },
            {
              Name: 'data catalog',
              Tooltip: 'Data Catalog',
              Image: require('../../assets/IconCloud/azure/data_storage/10216-icon-Azure Data Catalog-Integration.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DataCatalog()
            },
            {
              Name: 'data share datashare',
              Tooltip: 'Data Share',
              Image: require('../../assets/IconCloud/azure/data_storage/10098-icon-Data Shares-Storage.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DataShare()
            },
            {
              Name: 'site recovery backup dr',
              Tooltip: 'Site Recovery',
              azInfo: ['-Purpose: Backup & DR','-Private Link supported'],
              Image: require('../../assets/IconCloud/azure/data_storage/00017-icon-Recovery Services Vaults-Storage.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.RecoveryServiceVault()
            },
            {
              Name: 'backup vault up',
              Tooltip: 'Backup Vault',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/data_storage/02361-icon-Backup Vault-menu.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.BackupVault()
            },
            {
              Name: 'azure stack edge',
              Tooltip: 'Azure Stack Edge',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/data_storage/00691-icon-Azure Stack Edge-Storage.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AzureStackEdge()
            },
            {
              Name: 'hpc cache',
              Tooltip: 'HPC Cache',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/data_storage/00776-icon-Azure HCP Cache-Storage.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.HPCCache()
            },
            {
              Name: 'purview',
              Tooltip: 'Purview Account',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/data_storage/02517-icon-Azure Purview Accounts-other.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.PurviewAccount()
            },
            {
              Name: 'on-premise data gateway onprem',
              Tooltip: 'On-Premise Data Gateway',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/data_storage/10070-icon-On Premises Data Gateways-Networking.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.OnPremDataGateway()
            },
            {
              Name: 'storsimple data manager',
              Tooltip: 'StorSimple Data Manager',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/data_storage/10092-icon-StorSimple Data Managers-Storage.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.StorSimpleDataManager()
            },
            {
              Name: 'data box',
              Tooltip: 'Data Box',
              Image: require('../../assets/IconCloud/azure/data_storage/10094-icon-Data Box-Migrate.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Databox()
            },
            {
              Name: 'import export job',
              Tooltip: 'Import/Export Job',
              Image: require('../../assets/IconCloud/azure/data_storage/10100-icon-Import Export Jobs-Storage.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true
            },
            {
              Name: 'data box edge',
              Tooltip: 'Data Box Edge',
              Image: require('../../assets/IconCloud/azure/data_storage/10095-icon-Data Box Edge-Migrate.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DataboxEdge()
            }
          ]
        }
       },

       {
        resourceGroup: {
          groupName: 'Azure Analytics',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
              Name: 'log analytics monitor',
              Tooltip: 'Log Analytics',
              Image: require('../../assets/IconCloud/azure/data_analytics/00009-icon-Log Analytics Workspaces-Analytics.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.LogAnalytics()
            },
            {
              Name: 'analysis service sql',
              Tooltip: 'Analysis Service',
              azInfo: [''],
              Image: require('../../assets/IconCloud/azure/data_analytics/10148-icon-Analysis Services-Analytics.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AnalysisService()
            },
            {
                Name: 'synapse analytics',
                Tooltip: 'Synapse Analytics',
                azInfo: ['Private Link supported','Service Endpoint supported'],
                Image: require('../../assets/IconCloud/azure/data_analytics/00606-icon-Azure Synapse Analytics-Analytics.svg'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.Synapse()
            },
            {
              Name: 'data lake analytics',
              Tooltip: 'Data Lake Analytics',
              Image: require('../../assets/IconCloud/azure/data_analytics/10143-icon-Data Lake Analytics-Analytics.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DataLakeAnalytics()
            },
            {
              Name: 'databricks data bricks',
              Tooltip: 'Databricks',
              Image: require('../../assets/IconCloud/azure/data_analytics/10787-icon-Azure Databricks-Analytics.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Databricks()
            },
            {
              Name: 'hdinsight hd insight',
              Tooltip: 'HDInsight',
              Image: require('../../assets/IconCloud/azure/data_analytics/10142-icon-HD Insight Clusters-Analytics.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.HdInsight()
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Azure AI & ML',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'cognitive',
                Tooltip: 'Cognitive Service',
                Image: require('../../assets/IconCloud/azure/ai_ml/10162-icon-Cognitive Services-AI-Machine Learning.svg'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.Cognitive()
            },
            {
              Name: 'bots service bot',
              Tooltip: 'Bots Service',
              Image: require('../../assets/IconCloud/azure/ai_ml/10165-icon-Bot Services-AI-Machine Learning.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.BotsService()
            },
            {
              Name: 'genomics',
              Tooltip: 'Genomics Accounts',
              Image: require('../../assets/IconCloud/azure/ai_ml/10164-icon-Genomics Accounts-AI-Machine Learning.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Genomics()
            },
            {
              Name: 'machine learning service workspace',
              Tooltip: 'Machine Learning Service Workspaces',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/IconCloud/azure/ai_ml/10166-icon-Machine Learning-AI-Machine Learning.svg'),
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
          groupName: 'Azure Containers',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'container instance',
                Tooltip: 'Container Instance',
                Image: require('../../assets/IconCloud/azure/container/10104-icon-Container Instances-Containers.svg'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.ContainerInstance()
            },
            {
              Name: 'container registry',
              Tooltip: 'Container Registry',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/IconCloud/azure/container/10105-icon-Container Registries-Containers.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ContainerRegistry()
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Azure Integration',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'api management apim',
                Tooltip: 'API Management',
                Image: require('../../assets/IconCloud/azure/integration/10042-icon-API Management Services-Integration.svg'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.APIM()
            },
            {
              Name: 'service bus asb',
              Tooltip: 'Azure Service Bus',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/IconCloud/azure/integration/10836-icon-Service Bus-General.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ASB()
            },
            {
              Name: 'relays',
              Tooltip: 'Azure Relays',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/IconCloud/azure/integration/10209-icon-Relays-Integration.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Relay()
            },
            {
              Name: 'logic app',
              Tooltip: 'Logic App',
              Image: require('../../assets/IconCloud/azure/integration/10201-icon-Logic Apps-IoT.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.LogicApp()
            },
            {
              Name: 'logic app custom connector',
              Tooltip: 'Logic App Custom Connector',
              Image: require('../../assets/IconCloud/azure/integration/10363-icon-Logic Apps Custom Connector-Integration.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.LogicAppCustomConnector()
            },
            {
              Name: 'integration service environment ise logic app',
              Tooltip: 'Integration Service Environment',
              Image: require('../../assets/IconCloud/azure/integration/00555-icon-Integration Service Environments-Integration.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ISE()
            },
            {
              Name: 'event grid topic',
              Tooltip: 'Event Grid Topic',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/IconCloud/azure/integration/10206-icon-Event Grid Topics-Integration.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.EventGridTopic()
            },
            {
              Name: 'event grid subscription',
              Tooltip: 'Event Grid Subscription',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/IconCloud/azure/integration/10221-icon-Event Grid Subscriptions-Integration.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.EventGridSubscription()
            },
            {
              Name: 'event grid domain',
              Tooltip: 'Event Grid Domain',
              azInfo: ['Private Link supported'],
              Image: require('../../assets/IconCloud/azure/integration/10215-icon-Event Grid Domains-Integration.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.EventGridDomain()
            },
            {
              Name: 'app config',
              Tooltip: 'App Configuration',
              azInfo: [''],
              Image: require('../../assets/IconCloud/azure/integration/10219-icon-App Configuration-Integration.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AppConfig()
            },
            {
              Name: 'communication service email sms',
              Tooltip: 'Communication Service',
              azInfo: [''],
              Image: require('../../assets/IconCloud/azure/integration/00968-icon-Azure Communication Services-Other.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.CommunicationService()
            },
            {
              Name: 'sendgrid email',
              Tooltip: 'SendGrid',
              Image: require('../../assets/IconCloud/azure/integration/10220-icon-SendGrid Accounts-Integration.svg'),
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
          groupName: 'Azure Security & Identity',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
              Name: 'application security group asg',
              Tooltip: 'Application Security Group',
              Image: require('../../assets/IconCloud/azure/security_identity/10244-icon-Application Security Groups-Security.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.ASG()
            },

            {
              Name: 'sentinel',
              Tooltip: 'Azure Sentinel',
              Image: require('../../assets/IconCloud/azure/security_identity/10248-icon-Azure Sentinel-Security.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Sentinel()
            },
            {
              Name: 'key vault akv',
              Tooltip: 'Key Vault',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/IconCloud/azure/security_identity/10245-icon-Key Vaults-Security.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.KeyVault()
            },
            {
              Name: 'security center asc',
              Tooltip: 'Security Center',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/security_identity/10241-icon-Security Center-Security.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.SecurityCenter()
            },
            {
              Name: 'bastion jumphost jh',
              Tooltip: 'Bastion',
              Image: require('../../assets/IconCloud/azure/security_identity/02422-icon-Bastions-Preview.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Bastion()
            },
            {
              Name: 'ad ad domain service',
              Tooltip: 'Azure AD Domain Service',
              Image: require('../../assets/IconCloud/azure/security_identity/10222-icon-Azure AD Domain Services-Identity.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AADDomainService()
            },
            {
              Name: 'managed identity user assigned',
              Tooltip: 'Managed Identity',
              Image: require('../../assets/IconCloud/azure/security_identity/10227-icon-Managed Identities-Identity.svg'),
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
          groupName: 'Azure Management',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
              Name: 'app insights apm',
              Tooltip: 'Application Insights',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/management/00012-icon-Application Insights-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AppInsights()
            },
            {
              Name: 'automation update',
              Tooltip: 'Automation',
              Image: require('../../assets/IconCloud/azure/management/00022-icon-Automation Accounts-Management-Governance.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.Automation()
            },
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
                Image: require('../../assets/IconCloud/azure/iot/10182-icon-IoT Hub-IoT.svg'),
                Provisionable: false,
                IsPng: false,
                IsVisible:true,
                resourceType: ResourceType.IoTHub()
            },
            {
              Name: 'device provisioning service',
              Tooltip: 'Device Provisioning Service',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/iot/10369-icon-Device Provisioning Services-IoT.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DeviceProvisioningService()
            },
            {
              Name: 'device update for iot hub',
              Tooltip: 'Device Update For IoT Hub',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/iot/02475-icon-Device Update IoT Hub-IoT.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DeviceUpdateForIoTHub()
            },
            {
              Name: 'digital twins',
              Tooltip: 'Digital Twins',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/iot/01030-icon-Digital Twins-IoT.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.DigitalTwins()
            },
            {
              Name: 'stream analytics',
              Tooltip: 'Stream Analytics',
              Image: require('../../assets/IconCloud/azure/iot/00042-icon-Stream Analytics Jobs-IoT.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.StreamAnalytics()
            },
            {
              Name: 'event hub',
              Tooltip: 'Event Hub',
              azInfo: ['Private Link supported','Service Endpoint supported'],
              Image: require('../../assets/IconCloud/azure/iot/00039-icon-Event Hubs-IoT.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.EventHub()
            },
            {
              Name: 'event hub cluster',
              Tooltip: 'Event Hub Cluster',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/iot/10149-icon-Event Hub Clusters-Analytics.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.EventHubCluster()
            },
            {
              Name: 'iot central app applications',
              Tooltip: 'IoT Central Applications',
              Image: require('../../assets/IconCloud/azure/iot/10184-icon-IoT Central Applications-IoT.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.IoTCentral()
            },
            {
              Name: 'map',
              Tooltip: 'Azure Map',
              Image: require('../../assets/IconCloud/azure/iot/10185-icon-Azure Maps Accounts-IoT.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.AzureMaps()
            },
            {
              Name: 'time series insights environment',
              Tooltip: 'Time Series Insights Environment',
              Image: require('../../assets/IconCloud/azure/iot/10181-icon-Time Series Insights Environments-IoT.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.TimeSeriesInsights()
            },
            {
              Name: 'time series insights event source',
              Tooltip: 'Time Series Insights Event Source',
              azInfo: [],
              Image: require('../../assets/IconCloud/azure/iot/10188-icon-Time Series Insights Event Sources-IoT.svg'),
              Provisionable: false,
              IsPng: false,
              IsVisible:true,
              resourceType: ResourceType.TimeSeriesInsightsEventSource()
            }
          ]
        }
       },
       {
        resourceGroup: {
          groupName: 'Azure Blockchain',
          groupExpanded: false,
          groupSearchVisible: true,
          resources: [
            {
                Name: 'blockchain block',
                Tooltip: 'Azure Blockchain Service',
                Image: require('../../assets/IconCloud/azure/blockchain/10366-icon-Azure Blockchain Service-Blockchain.svg'),
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