import React, { Component } from "reactn";
import {useGlobal} from 'reactn';
import { Button, Label, Elevation, Card, Overlay, PopoverInteractionKind, Popover, Menu, Position, MenuItem,MenuDivider, Classes, Icon, Utils } from "@blueprintjs/core";
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LocalMall from '@material-ui/icons/LocalMall';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import FolderIcon from '@material-ui/icons/Folder';
import HelpIcon from '@material-ui/icons/Help';
import QuickStart from '@material-ui/icons/FlashOn';
import OverlayTutorial from './OverlayTutorial';
import OverlayAbout from './OverlayAbout';
import OverlayProvision from './OverlayProvision';
import DiagramService from '../../services/DiagramService';
import fileDialog from 'file-dialog'
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import moment from 'moment';

import AuthService from '../../services/AuthService';


export default class Header extends Component {

  constructor(props) {

    super(props);

    this.authService = new AuthService();
    this.diagService = new DiagramService();

    this.setGlobal({saveBadgeInvisible:true});

    this.state = {
        isLogin: this.authService.isUserLogin(),
        userProfile: this.authService.getUserProfile(),
        isTutorialOpen: false,
        isFeedbackOpen: false,
        isAboutOpen: false,
        quickstart: {category:'', name:''},
        acctMenuAnchor: null,
        acctMenuOpen: false,
        isDeleteConfirmationDialogOpen: false
    }

    this.fileInput = React.createRef();
    this.acctIconRef = React.createRef();
    this.overlayTutorial = React.createRef();
    this.overlayAbout = React.createRef();
    this.overlayProvision = React.createRef();
  }

  componentWillMount() {
      //app bar style
      this.style ={
        root: {
          width: '100%'
        },
        rightToolbar: {
          marginLeft: 'auto',
          marginRight: -12
        }
    };

  }

  render() {
    return (
      <div style={this.style.root}>
        <OverlayTutorial ref={this.overlayTutorial}  />
        <OverlayAbout ref={this.overlayAbout} />
        <OverlayProvision ref={this.overlayProvision} OnOverlayProvisionClose={this.onOverlayProvisionClose}/>
        <AppBar position="static" style={{ background: '#2E3B55' }}>
          <Toolbar variant='dense'>
            <Typography color="inherit">
              <img src ={require('../../assets/azure_icons/azworkbench-logo.png')} alt="" style={{width : 25, height : 25, marginRight: 3}} />
              Azure Workbench
            </Typography>
            <section style={this.style.rightToolbar}>
              <Tippy content={(this.global.currentSubscription == null) ? 'No Subscription Selected' : 'Selected subscription: ' + this.global.currentSubscription.Name} followCursor={true} placement="bottom">
                <IconButton color="inherit" aria-label="Edit" onClick={this.showProvisionOverlay}> 
                    <Icon icon="delta"  />  
                </IconButton>
              </Tippy>

              {/* //file */}
              <Popover content=
               { 
                   <Menu className={Classes.ELEVATION_1}>
                     <MenuItem  text="Share" onClick={this.shareDiagram} />
                     <MenuDivider />
                      <Badge color="secondary" badgeContent='unsave changes' invisible={this.global.saveBadgeInvisible}>
                        <MenuItem  text="Save to Browser" onClick={this.saveToLocal} />
                        <MenuItem  text="Save to My Space" onClick={this.savetoWorkspace} />
                      </Badge>
                     <MenuDivider />
                     <MenuItem  text="Load Draft from Browser" onClick={this.loadDiagramFromrBrowser} />
                     <MenuItem  text="Delete Draft from Browser" onClick={this.openDeleteConfirmDialog} />
                     <MenuDivider />
                     <MenuItem  text="Import Workbench file(.azwb)" onClick={this.importWorkbenchFormat} />
                     <MenuDivider />
                     <MenuItem  text="Export as SVG" onClick={this.exportDiagramAsSVG} />
                     <MenuItem  text="Export as PNG"  onClick={this.exportDiagramAsPNG}/>
                     <MenuItem  text="Export as PDF" onClick={this.exportDiagramAsPDF} />
                     <MenuItem  text="Export as Workbench file(.azwb)" onClick={this.exportWorkbenchFormat} />
                   </Menu>
               } position={Position.BOTTOM} interactionKind={PopoverInteractionKind.HOVER}>
                <IconButton color="inherit" aria-label="Edit">
                  <Badge color="secondary" variant="dot" overlap='circle' invisible={this.global.saveBadgeInvisible}>
                    <FolderIcon  />
                  </Badge>
                </IconButton>
              </Popover>
              
              <IconButton color="inherit" aria-label="Edit" onClick={this.showWorkspace}>
                <Tippy content="My Space" followCursor={true} placement="bottom">
                  <LocalMall  />
                </Tippy>
              </IconButton>

              {/* quickstart */}
              <Popover content=
               { 
                   <Menu className={Classes.ELEVATION_1}>
                     <Typography variant="button" style={{fontSize:11,textAlign:'center'}}>
                       Quickstart Template
                     </Typography>
                     <MenuDivider />
                     <MenuItem  text="WebApp">
                        <MenuItem text="N-Tier App Service Environment"
                          onClick={
                            () => {
                              var qs = this.state.quickstart;
                              qs.category = 'WebApp';
                              qs.name = 'NTier-ASE';
                              this.setState({quickstart:qs});
                              this.loadQuickstartDiagram();
                            }
                          }/>
                          <MenuItem text="App Service Environment with API Management"
                          onClick={
                            () => {
                              var qs = this.state.quickstart;
                              qs.category = 'WebApp';
                              qs.name = 'ASE-APIM';
                              this.setState({quickstart:qs});
                              this.loadQuickstartDiagram();
                            }
                          }/>
                     </MenuItem>
                     <MenuItem  text="Kubernetes">
                      <MenuItem text="Private Cluster"
                            onClick={
                              () => {
                                var qs = this.state.quickstart;
                                qs.category = 'Kube';
                                qs.name = 'PrivateCluster';
                                this.setState({quickstart:qs});
                                this.loadQuickstartDiagram();
                              }
                            }/>
                     </MenuItem>
                     <MenuItem  text="More templates coming..."></MenuItem>
                   </Menu>
               } position={Position.BOTTOM} interactionKind={PopoverInteractionKind.HOVER}>
                <IconButton color="inherit" aria-label="Edit">
                  <QuickStart  />
                </IconButton>
              </Popover>

              <IconButton color="inherit" aria-label="Edit" onClick={this.showTutorial}>
                <Tippy content="Tutorial" followCursor={true} placement="bottom">
                  <HelpIcon  />
                </Tippy>
              </IconButton>
                <Popover content=
               { 
                   <Menu className={Classes.ELEVATION_1}>
                     {this.state.isLogin == true ? <MenuItem labelElement={<PowerSettingsNewIcon />} text="Logout" onClick={this.logout} /> : ''}
                     {this.state.isLogin == false ? <MenuItem labelElement={<Icon icon="log-in" />} text="Login" onClick={this.login} /> : '' }
                     <MenuItem  text="About Azure Workbench" onClick={this.showAboutOverlay} />
                   </Menu>
               } position={Position.BOTTOM} interactionKind={PopoverInteractionKind.CLICK}>

                <IconButton color="inherit">
                  {
                    this.state.userProfile == null ?
                      <AccountCircle onClick={this.handleAcctMenu}/>
                    :
                      <Tippy content={
                        this.state.userProfile == null ? 'Not logged in' :
                        'welcome, ' + this.state.userProfile.UserName
                      }
                        followCursor={false} placement="bottom">
                        <AccountCircle onClick={this.handleAcctMenu}/>
                      </Tippy>
                  }
                </IconButton>
             </Popover>
            </section>
          </Toolbar>
        </AppBar>
        <Overlay isOpen={this.state.isDeleteConfirmationDialogOpen}  onClose={this.handleDeletConfirmClose}>
          <Card className='workspace-deletediagramdialog-overlay-box'  elevation={Elevation.TWO}>
            <Label>
              Are you sure you want to delete diagram from browser storage?
            </Label>
            <Button text="Confirm" icon="delete" onClick={this.deleteDiagramFromrBrowser } />
            <span className="bp3-navbar-divider"></span>
            <Button text="Cancel" onClick={() => 
                this.setState({ isDeleteConfirmationDialogOpen: false})} />
          </Card>
        </Overlay>
      </div>
    );
  }

  login = () => {
    var thisComp = this;
    this.authService.login(
      function (userProfile) {

        window.setTimeout(function() { 
          thisComp.authService.refreshAccessToken(function(userProfile) {
            console.log('token refreshed: ' + userProfile);
          });
        }, 
        60000 * 45); //45mins

        thisComp.setState({isLogin: true, userProfile:  userProfile});
        thisComp.props.ActionBar.current.getSubscriptions();
    });
   
  }

  logout = () => {
    this.authService.logout();
    this.setState({isLogin: false, userProfile: null})
  }

  showWorkspace = () => {
    var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
    diagramEditor.showWorkspace();
 }

 openDeleteConfirmDialog = (diagramContext) => {
  this.setState({
    isDeleteConfirmationDialogOpen: true
  });
}

 shareDiagram = () => {
     var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
     diagramEditor.shareDiagram();
 }

 savetoWorkspace = () => {
     var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
     diagramEditor.showOverlaySavetoWorkspace();
 }

 saveToLocal = () => {
    var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
    diagramEditor.saveDiagramToBrowser();
 }

 loadDiagramFromrBrowser = () => {
  var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
  diagramEditor.loadDraftDiagramFromBrowser();
 }

 deleteDiagramFromrBrowser = () => {
  var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
  diagramEditor.deleteDraftDiagramFromBrowser();
  this.setState({isDeleteConfirmationDialogOpen: false});
}

 exportDiagramAsPDF = () => {
    var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
    diagramEditor.exportDiagramAsPDF();
 }

 exportDiagramAsPNG = () => {
  var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
  diagramEditor.exportAsPng();
 }

 exportDiagramAsSVG = () => {
  var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
  diagramEditor.exportAsSvg();
}

importWorkbenchFormat = (e) => {
  fileDialog({ accept: 'azwb/*' })
    .then(file => {
        var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
        diagramEditor.importWorkbenchFormat(file[0]);
    })
}

exportWorkbenchFormat = () => {
  var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
  diagramEditor.exportWorkbenchFormat();
}

loadQuickstartDiagram = () => {
  var category = this.state.quickstart.category;
  var name = this.state.quickstart.name;
  var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
  diagramEditor.loadQuickstartDiagram(category, name);
}

deployDiagramToAzure(subscription) {
  var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
  diagramEditor.deployDiagramToAzure(subscription);
}

 clearGraph = () => {
     var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
    diagramEditor.clearGraph();
 }

showTutorial = () => {
  this.overlayTutorial.current.show();
}

showProvisionOverlay = () => {
    this.overlayProvision.current.show(this);
}

onOverlayProvisionClose = () => {
  if(this.global.currentSubscription != null)
    this.forceUpdate();
}

showAboutOverlay = () => {
  this.overlayAbout.current.show();
}

showFeedbackOverlay = () => {
  this.setState({ isFeedbackOpen: true });
}

handleTutorialClose = () => this.setState({ isTutorialOpen: false });
handleFeedbackClose = () => this.setState({ isFeedbackOpen: false });
handleAboutClose = () => this.setState({ isAboutOpen: false });
}