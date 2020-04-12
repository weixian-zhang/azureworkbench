import React, { Component } from "reactn";
import {useGlobal} from 'reactn';
import {  PopoverInteractionKind, Popover, Menu, Position, MenuItem,MenuDivider, Classes, Icon, Utils } from "@blueprintjs/core";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloudIcon from '@material-ui/icons/Cloud';
import FolderIcon from '@material-ui/icons/Folder';
import ShareIcon from '@material-ui/icons/Share';
import HelpIcon from '@material-ui/icons/Help';

import OverlayTutorial from './OverlayTutorial';
import OverlayAbout from './OverlayAbout';
import OverlayProvision from './OverlayProvision';

import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

import AuthService from '../../services/AuthService';


export default class Header extends Component {

  constructor(props) {

    super(props);

    this.authService = new AuthService();

    this.state = {
        isLogin: this.authService.isUserLogin(),
        userProfile: this.authService.getUserProfile(),
        isTutorialOpen: false,
        isFeedbackOpen: false,
        isAboutOpen: false,

        acctMenuAnchor: null,
        acctMenuOpen: false
    }

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

  componentDidMount() { 
    
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

              <IconButton color="inherit" aria-label="Edit" onClick={this.showWorkspace}>
                <Tippy content="My Space" followCursor={true} placement="bottom">
                  <CloudIcon  />
                </Tippy>
              </IconButton>

              <Popover content=
               { 
                   <Menu className={Classes.ELEVATION_1}>
                     <MenuItem  text="Save to Browser" onClick={this.saveToLocal} />
                     <MenuItem  text="Save to Workspace" onClick={this.savetoWorkspace} />
                     <MenuDivider />
                     <MenuItem  text="Export as SVG" onClick={this.exportDiagramAsSVG} />
                     <MenuItem  text="Export as PDF" onClick={this.exportDiagramAsPDF} />
                   </Menu>
               } position={Position.BOTTOM} interactionKind={PopoverInteractionKind.HOVER}>
                <IconButton color="inherit" aria-label="Edit">
                  <FolderIcon  />
                </IconButton>
              </Popover>
              
              <IconButton color="inherit" aria-label="Save">
                <Tippy content="Share" followCursor={true} placement="bottom">
                  <ShareIcon onClick={this.shareDiagram} />
                </Tippy>
              </IconButton>
        
              <IconButton color="inherit" aria-label="Save">
                <Tippy content="Help" followCursor={true} placement="bottom">
                  <HelpIcon onClick={this.showTutorial} />
                </Tippy>
              </IconButton>
            
                <Popover content=
               { 
                   <Menu className={Classes.ELEVATION_1}>
                     {this.state.isLogin == true ? <MenuItem labelElement={<Icon icon="log-out" />} text="Logout" onClick={this.logout} /> : ''}
                     {this.state.isLogin == false ? <MenuItem labelElement={<Icon icon="log-in" />} text="Login" onClick={this.login} /> : '' }
                     <MenuItem  text="About Azure Workbench" onClick={this.showAboutOverlay} />
                   </Menu>
               } position={Position.BOTTOM}>

                <IconButton color="inherit">
                  {
                    this.state.userProfile == null ?
                      <AccountCircle onClick={this.handleAcctMenu}/>
                    :
                      <Tippy content={this.state.userProfile == null ? 'Not logged in' :
                        'welcome, ' + this.state.userProfile.UserName}
                        followCursor={false} placement="bottom">
                        <AccountCircle onClick={this.handleAcctMenu}/>
                      </Tippy>
                  }
                </IconButton>
             </Popover>
            </section>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  login = () => {
    var thisComp = this;
    this.authService.login(function (userProfile){
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

 exportDiagramAsPDF = () => {
    var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
    diagramEditor.exportDiagramAsPDF();
 }

 exportDiagramAsSVG = () => {
  var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
  diagramEditor.exportAsSvg();
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