import React, { Component } from "react";
import { Overlay,Card, Navbar, Button, Alignment, AnchorButton, Popover, Menu, Position, MenuItem, Classes, Icon } from "@blueprintjs/core";
import { connect } from "react-redux";
import { msalLoginAsync, msalLogout } from "../../redux/actions";
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
        isAboutOpen: false
    }
  }
  
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>
              <div style={{display: 'inline'}}><img src ={require('../../assets/azure_icons/azure-logo.svg')} alt="" style={{width : 25, height : 25, marginRight: 3}} /></div>
              <div style={{display: 'inline'}}>Azure Workbench</div>
            </Navbar.Heading>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
              <Popover content=
              { 
                  <Menu className={Classes.ELEVATION_1}>
                    {this.state.isLogin == true ? <MenuItem labelElement={<Icon icon="log-out" />} text="Logout" onClick={this.logout} /> : ''}
                    {this.state.isLogin == false ? <MenuItem labelElement={<Icon icon="log-in" />} text="Login" onClick={this.login} /> : '' }
                    <MenuItem  text="Quick Tutorial" onClick={this.showFeedbackOverlay} />
                    <MenuItem  text="Feedback" onClick={this.showFeedbackOverlay} />
                    <MenuItem  text="About Azure Workbench" onClick={this.showAboutOverlay} />
                  </Menu>
              } position={Position.BOTTOM}>
              
              <Button
                className="bp3-minimal"
                icon="person"
                text={this.state.userProfile != null ? this.state.userProfile.UserName : ''}/>
            </Popover>
          </Navbar.Group>
        </Navbar>
        <Overlay isOpen={this.state.isTutorialOpen} onClose={this.handleTutorialClose}>
          <Card>
              
          </Card>
        </Overlay>
        <Overlay isOpen={this.state.isFeedbackOpen} onClose={this.handleFeedbackClose}>
          <Card>
              
          </Card>
        </Overlay>
        <Overlay isOpen={this.state.isAboutOpen} onClose={this.handleAboutClose}>
          <Card>
              
          </Card>
        </Overlay>
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



// function mapStateToProps(state) {
//   const { account } = state.msal;
//   return { account };
// }

// function mapDispatchToProps (dispatch) {
//   return {
//     login: () => dispatch(msalLoginAsync()),
//     logout: () => dispatch(msalLogout())
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Header);