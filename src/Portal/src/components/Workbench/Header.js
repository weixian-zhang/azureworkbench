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
import ShopIcon from '@material-ui/icons/Shop';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import FolderIcon from '@material-ui/icons/Folder';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';
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
        <AppBar position="static" style={{overflow:'hidden', height:'40px',margin:0,padding:0, background: '#000000' }}>
          <Toolbar variant='dense' disableGutters={true}>
              <IconButton
                color="inherit"
                onClick={this.handleDrawerOpen}
                edge="start"
                style={{marginRight:3}}>
                <MenuIcon />
              </IconButton>
            <Typography color="inherit">
              <img src ={require('../../assets/IconCloud/azworkbench/azworkbench-logo.png')} alt="" style={{width : 25, height : 25, marginRight: 3}} />
              Azure Workbench
            </Typography>

            <section style={this.style.rightToolbar}>

              <Tooltip
                title= ""
                placement="bottom"
                html={(
                  <div>
                    <strong>Generate Bicep</strong>
                  </div>
                )}>
                <IconButton color="inherit" aria-label="Edit" onClick={this.generateBicep}>
                    <img src={require('../../assets/IconCloud/azure/nondeployable/azure-bicep.png')} width="25px" height="25px" alt="" />
                </IconButton>
              </Tooltip>

              <Tooltip
                title= "Browser Save"
                placement="bottom"
                html={(
                  <div>
                    <strong>Browser Save</strong>
                    <div style={{fontSize: "10px", textAlign: "left"}}>
                      One copy only, new save overrides existing
                    </div>
                  </div>
                )}>
                  <IconButton color="inherit" aria-label="Edit" onClick={this.saveToLocal}>
                    <Badge color="secondary" variant="dot" invisible={(!this.global.showSaveBadge) ? true : false}>
                      <SaveIcon />
                    </Badge>
                  </IconButton>
              </Tooltip>

              <Tooltip
                title= "Browser Load"
                placement="bottom"
                html={(
                  <div>
                    <strong>Browser Load</strong>
                  </div>
                )}>
                <IconButton color="inherit" aria-label="Edit" onClick={this.loadDiagramFromrBrowser}>
                    <GetAppIcon />
                </IconButton>
              </Tooltip>

              <Tooltip
                title= "Save to MySpace"
                placement="bottom"
                html={(
                  <div>
                    <strong>Save to My Space</strong>
                  </div>
                )}>
                  <IconButton color="inherit" aria-label="Edit" onClick={this.savetoWorkspace}>
                    <Badge color="secondary" variant="dot" invisible={(!this.global.showSaveBadge) ? true : false}>
                      <ShopIcon />
                    </Badge>
                  </IconButton>
              </Tooltip>

              <IconButton color="inherit" aria-label="Edit" onClick={this.showWorkspace}>
                <Tooltip title="My Space" position="bottom"
                html={(
                  <div>
                    <strong>My Space</strong>
                  </div>
                )}>
                  <BusinessCenterIcon />
                </Tooltip>
              </IconButton>

              <Popover content=
               {
                   <Menu className={Classes.ELEVATION_1}>
                     <MenuItem  text="Share" onClick={this.shareDiagram} />
                     <MenuDivider />
                     <MenuItem  text="Delete Draft from Browser" onClick={this.openDeleteConfirmDialog} />
                     <MenuDivider />
                     <MenuItem  text="Load Auto-Saved Recovery Point" onClick={this.loadAutoSaveRecoveryPoint} />
                     <MenuDivider />
                     <MenuItem  text="Import Workbench file(.azwb)" onClick={this.importWorkbenchFormat} />
                     <MenuDivider />
                     <MenuItem  text="Export as PNG"  onClick={this.exportDiagramAsPNG}/>
                     <MenuItem  text="Export as PDF" onClick={this.exportDiagramAsPDF} />
                     <MenuItem  text="Export as Workbench file(.azwb)" onClick={this.exportWorkbenchFormat} />
                   </Menu>
               } position={Position.BOTTOM} interactionKind={PopoverInteractionKind.HOVER}>
                <IconButton color="inherit" aria-label="Edit">
                  <FolderIcon  />
                </IconButton>
              </Popover>

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

              {/* <Popover content=
               {
                   <Menu>
                     <MenuItem  text="Tutorial" onClick= {() => {
                      window.open("https://github.com/weixian-zhang/Azure-Workbench",'_blank');
                      }} />
                     <MenuDivider />
                     <MenuItem  text="Shortcut Keys" onClick= {() => {
                      window.open("https://github.com/weixian-zhang/Azure-Workbench/blob/master/tutorials/ShortcutKeys.md",'_blank');
                      }} />
                   </Menu>
               } position={Position.BOTTOM} interactionKind={PopoverInteractionKind.HOVER}>
                <HelpIcon />
              </Popover> */}
              <Popover content=
               {
                   <Menu>
                     <MenuItem  text="Tutorial" onClick= {() => {
                      window.open("https://github.com/weixian-zhang/Azure-Workbench",'_blank');
                      }} />
                     <MenuDivider />
                     <MenuItem  text="Shortcut Keys" onClick= {() => {
                      window.open("https://github.com/weixian-zhang/Azure-Workbench/blob/master/tutorials/ShortcutKeys.md",'_blank');
                      }} />
                   </Menu>
               } position={Position.BOTTOM} interactionKind={PopoverInteractionKind.HOVER}>
              <IconButton color="inherit" aria-label="Edit">
                <HelpIcon />
              </IconButton>
              </Popover>

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
            <Button text="Azure AD Work Account Login" icon="user"
              onClick={() => {
                this.authService.initAADWorkAccountMsalApp();
                this.authService.login();
                this.closeLoginOptionPrompt();
              } } />
            <Button text="Local or Social Account Login and SignUp" icon="social-media"  style={{marginTop:"10px"}}
              onClick={() => {
                this.authService.initB2CMsalApp();
                this.authService.login();
                this.closeLoginOptionPrompt();
              } } />
          </Card>
        </Overlay>
      </div>
    );
  }

  login = async () => {

    this.setState({loginOptionPopup: true});
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

//  clearGraph = () => {
//      var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
//     diagramEditor.clearGraph();
//  }

showTutorial = () => {
  this.overlayTutorial.current.show();
}

generateBicep = () => {
  var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
  diagramEditor.generateBicep();
}

//showProvisionOverlay = () => {
    //this.overlayProvision.current.show(this);
//}

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