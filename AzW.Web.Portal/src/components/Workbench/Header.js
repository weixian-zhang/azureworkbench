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
import MenuIcon from '@material-ui/icons/Menu';
import QuickStart from '@material-ui/icons/FlashOn';
import OverlayTutorial from './OverlayTutorial';
import OverlayAbout from './OverlayAbout';
import OverlayProvision from './OverlayProvision';
import OverlaySharedDiagramPrompt from './OverlaySharedDiagramPrompt';
import DiagramService from '../../services/DiagramService';
import LoginState from '../../services/LoginState';
import fileDialog from 'file-dialog'
import 'react-tippy/dist/tippy.css'
import { Tooltip} from 'react-tippy';
import moment from 'moment';
import Toast from './Helpers/Toast';
import AuthService from '../../services/AuthService';
import UserProfile from "../../models/UserProfile";


export default class Header extends Component {

  constructor(props) {

    super(props);

    this.authService = AuthService;
    this.diagService = new DiagramService();

    this.setGlobal({showSaveBadge:false});

    this.state = {
        isLogin: false,
        userProfile: new UserProfile(),
        isTutorialOpen: false,
        isFeedbackOpen: false,
        isAboutOpen: false,
        quickstart: {category:'', name:''},
        acctMenuAnchor: null,
        acctMenuOpen: false,
        isDeleteConfirmationDialogOpen: false,
        loginOptionPopup: false
    }

    LoginState.initLoginStateChangeCallback((isLogin) => {
      this.setState({isLogin: isLogin});
      if(isLogin) {
        this.setState({userProfile: this.authService.getUserProfile()});
      }
    });

    this.fileInput = React.createRef();
    this.acctIconRef = React.createRef();
    this.overlayTutorial = React.createRef();
    this.overlayAbout = React.createRef();
    this.overlayProvision = React.createRef();
    this.overlaySharedDiagramPrompt = React.createRef();
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
      <div style={{width:'100%'}}>
        <OverlayTutorial ref={this.overlayTutorial}  />
        <OverlayAbout ref={this.overlayAbout} />
        <OverlaySharedDiagramPrompt ref={this.overlaySharedDiagramPrompt} />
        <OverlayProvision ref={this.overlayProvision} OnOverlayProvisionClose={this.onOverlayProvisionClose}/>
        <AppBar position="static" style={{overflow:'hidden', height:'40px',margin:0,padding:0, background: '#2E3B55' }}>
          <Toolbar variant='dense' disableGutters={true}>
              <IconButton
                color="inherit"
                onClick={this.handleDrawerOpen}
                edge="start"
                style={{marginRight:3}}>
                <MenuIcon />
              </IconButton>
            <Typography color="inherit">
              <img src ={require('../../assets/azure_icons/azworkbench-logo.png')} alt="" style={{width : 25, height : 25, marginRight: 3}} />
              Azure Workbench
            </Typography>
            <section style={this.style.rightToolbar}>

              <Popover content=
               { 
                   <Menu className={Classes.ELEVATION_1}>
                     <MenuItem  text="Share" onClick={this.shareDiagram} />
                     <MenuDivider />
                      <Badge color="secondary" badgeContent='unsave changes' invisible={(!this.global.showSaveBadge) ? true : false}>
                        <MenuItem  text="Save to Browser" onClick={this.saveToLocal} />
                        <MenuItem  text="Save to My Space" onClick={this.savetoWorkspace} />
                      </Badge>
                     <MenuDivider />
                     <MenuItem  text="Load Draft from Browser" onClick={this.loadDiagramFromrBrowser} />
                     <MenuItem  text="Delete Draft from Browser" onClick={this.openDeleteConfirmDialog} />
                     <MenuDivider />
                     <MenuItem  text="Load Auto-Saved Recovery Point" onClick={this.loadAutoSaveRecoveryPoint} />
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
                  <Badge color="secondary" variant="dot" overlap='circle' invisible={(!this.global.showSaveBadge) ? true : false}>
                    <FolderIcon  />
                  </Badge>
                </IconButton>
              </Popover>
              
              <IconButton color="inherit" aria-label="Edit" onClick={this.showWorkspace}>
                <Tooltip title="My Space" position="bottom">
                  <LocalMall  />
                </Tooltip>
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

              <Tooltip
                title= {(this.global.currentSubscription == null) ? 'No Subscription Selected' : 'Selected subscription: ' + this.global.currentSubscription.Name}
                placement="bottom">
                <IconButton color="inherit" aria-label="Edit" onClick={this.showProvisionOverlay}> 
                    <Icon icon="delta"  />  
                </IconButton>
              </Tooltip>

              <IconButton color="inherit" aria-label="Edit">
                <Tooltip title="Tutorial" position="bottom">
                  <HelpIcon onClick= {() => {
                      window.open("https://github.com/weixian-zhang/Azure-Workbench",'_blank');
                    }} />
                </Tooltip>
              </IconButton>
                <Popover content=
               { 
                   <Menu className={Classes.ELEVATION_1}>
                     {this.state.isLogin== true ? <MenuItem labelElement={<PowerSettingsNewIcon />} text="Logout" onClick={this.logout} /> : ''}
                     {this.state.isLogin  == false ? <MenuItem labelElement={<Icon icon="log-in" />} text="Login" onClick={this.login} /> : '' }
                     <MenuItem  text="About Azure Workbench" onClick={this.showAboutOverlay} />
                   </Menu>
               } position={Position.BOTTOM} interactionKind={PopoverInteractionKind.CLICK}>

                <IconButton color="inherit">
                  <Tooltip title={this.state.isLogin == false ? 'Not logged in' : `welcome, ${this.state.userProfile.Name}<br /> (${this.state.userProfile.UserName})` }
                          position="bottom">
                    <AccountCircle onClick={this.handleAcctMenu}/>
                  </Tooltip>
                </IconButton>
             </Popover>
            </section>
          </Toolbar>
        </AppBar>

        {/* delete browser storage */}
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

        {/* login */}
        <Overlay isOpen={this.state.loginOptionPopup}  onClose={() => {this.closeLoginOptionPrompt(); }}>
          <Card className='workspace-loginoptionprompt-overlay-box'  elevation={Elevation.TWO}>
            <Button text="Local or Social Account Login and SignUp" icon="social-media"
              onClick={() => {
                this.authService.initB2CMsalApp();
                this.authService.login();
                this.closeLoginOptionPrompt();
              } } />
            <span className="bp3-navbar-divider"></span>
            <Button text="Azure AD Work Account Login" icon="user"
              onClick={() => {
                this.authService.initAADWorkAccountMsalApp();
                this.authService.login();
                this.closeLoginOptionPrompt();
              } } />
            <Label style={{color: "darkblue", marginTop: "8px"}}>
              *Workbench can only deploy to Azure Subscriptions with consent granted Azure AD Work account. 
            </Label>
          </Card>
        </Overlay>
      </div>
    );
  }

  login = async () => {

    this.setState({loginOptionPopup: true});
    
    // var userProfile = await this.authService.login();
    // this.setState({isLogin: true, userProfile:  userProfile});
  }

  logout = () => {
    this.authService.logout();
    this.setState({isLogin: false, userProfile: null})
  }

  handleDrawerOpen = () => {
    if(this.global.drawResourcePaletteOpen)
      this.setGlobal({drawResourcePaletteOpen: false});
    else
      this.setGlobal({drawResourcePaletteOpen: true});
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

loadAutoSaveRecoveryPoint = () => {
  var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
  diagramEditor.loadAutoSavedRecoveryPoint();
}

 shareDiagram = async () => {

      var thisComp = this;
     if(await this.authService.isUserLogin()) {
       var diagramName = '';
       this.overlaySharedDiagramPrompt.current.show(function(diagramName) {
            if (diagramName == '') {
              Toast.show('primary', 3000, 'No diagram no, Share-Link is not generated');
              return;
            }
            var diagramEditor =  thisComp.props.Workbench.current.getDiagramEditor();
            diagramEditor.shareDiagram(diagramName);
       });
       
     } else {
        var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
        diagramEditor.shareDiagram();
     }
     
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

 closeLoginOptionPrompt(){
    this.setState({loginOptionPopup: false});
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

loginStateCallback(isLogin) {
  this.setState({ isLogin: isLogin });
}

handleTutorialClose = () => this.setState({ isTutorialOpen: false });
handleFeedbackClose = () => this.setState({ isFeedbackOpen: false });
handleAboutClose = () => this.setState({ isAboutOpen: false });
}