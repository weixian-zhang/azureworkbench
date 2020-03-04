import React, { Component } from "react";
import { PopoverInteractionKind,Intent, Popover, Menu, Position, MenuItem,MenuDivider, Classes, Icon } from "@blueprintjs/core";

import { makeStyles } from '@material-ui/core/styles';
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

    this.diagramEditor = this.props.Workbench.current;
  }

  componentWillMount() {
      //app bar style
      this.style ={
        root: {
          width: '100%'
        },
        rightToolbar: {
          marginLeft: 'auto',
          marginRight: -12,
        }
    };

  }

  componentDidMount() { 
    
  }

  render() {
    return (
      <div style={this.style.root}>
        <OverlayTutorial ref={this.overlayTutorial} />
        <AppBar position="static" style={{ background: '#2E3B55' }}>
          <Toolbar variant='dense'>
            <Typography color="inherit">
              <img src ={require('../../assets/azure_icons/azworkbench-logo.png')} alt="" style={{width : 25, height : 25, marginRight: 3}} />
              Azure Workbench
            </Typography>
            <section style={this.style.rightToolbar}>
              <IconButton color="inherit" aria-label="Edit">
                <Tippy content="My Space" followCursor={true} placement="bottom">
                  <CloudIcon onClick={this.showWorkspace} />
                </Tippy>
              </IconButton>

              <Popover content=
               { 
                   <Menu className={Classes.ELEVATION_1}>
                     <MenuItem  text="Save to Browser" onClick={this.saveToLocal} />
                     <MenuItem  text="Save to Workspace" onClick={this.savetoWorkspace} />
                     <MenuDivider />
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
                      <Tippy content={this.state.userProfile != null ? 'Logged in as: ' + this.state.userProfile.UserName : ''} followCursor={false} placement="bottom">
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

 clearGraph = () => {
     var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
    diagramEditor.clearGraph();
 }

showTutorial = () => {
  this.overlayTutorial.current.show();
}



//  deploy(){
//      Toaster.create({
//          position: Position.TOP,
//          autoFocus: false,
//          canEscapeKeyClear: true
//        }).show({intent: Intent.SUCCESS, timeout: 3000, message: 'In the roadmap...'});
//        return;
//  }

//  setCurrentSubscription(item, event) {
//      SessionStorage.set(SessionStorage.KeyNames.CurrentSubscription, item);
//  }

//  renderSubscription({ handleClick, isActive, item: sub }) {
//      return (
//          <MenuItem
//              className={classes}
//              label={sub.Name}
//              key={sub.SubscriptionId}
//              onClick={this.setCurrentSubscription}
//              text={sub.Name} //{`${film.rank}. ${film.title}`}
//          />
//      );
//  }

//  getSubscriptions(){
//      if(this.authService.isUserLogin())
//      {
//          var userProfile = this.authService.getUserProfile();
//          ARMService.getSubscriptions(userProfile.AccessToken, function(subscriptions){
//              this.setState({subscriptions: subscriptions});
//          });
//      }
     
//  }

  showTutorialOverlay = () => {
    this.setState({ isTutorialOpen: true });
  }

  showAboutOverlay = () => {
    this.setState({ isAboutOpen: true });
  }

  showFeedbackOverlay = () => {
    this.setState({ isFeedbackOpen: true });
  }

  handleTutorialClose = () => this.setState({ isTutorialOpen: false });
  handleFeedbackClose = () => this.setState({ isFeedbackOpen: false });
  handleAboutClose = () => this.setState({ isAboutOpen: false });
}