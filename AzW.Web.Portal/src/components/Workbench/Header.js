import React, { Component } from "react";
import { Navbar, Button, Alignment, AnchorButton, Popover, Menu, Position, MenuItem, Classes, Icon } from "@blueprintjs/core";
import { connect } from "react-redux";
import { msalLoginAsync, msalLogout } from "../../redux/actions";
import AuthService from '../../services/AuthService';

class Header extends Component {

  constructor(props) {

    super(props);

    this.authService = new AuthService();

    this.state = {
        isLogin: this.authService.isUserLogin(),
        userProfile: this.authService.getUserProfile()
    }


  }
  
  render() {
    return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <div style={{display: 'inline'}}><img src ={require('../../assets/azure_icons/azure-logo.svg')} alt="" style={{width : 25, height : 25, marginRight: 3}} /></div>
            <div style={{display: 'inline'}}>Azure Workbench</div>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {/* <AnchorButton 
            className="bp3-minimal"
            icon="git-new-branch"
            href="https://github.com/Code-Norris/azureworkbench"
            target="_blank"
          /> */}
            <Popover content=
            { 
                <Menu className={Classes.ELEVATION_1}>
                  {this.state.isLogin == true ? <MenuItem labelElement={<Icon icon="log-out" />} text="Logout" onClick={this.logout} /> : ''}
                  {this.state.isLogin == false ? <MenuItem labelElement={<Icon icon="log-in" />} text="Login" onClick={this.login} /> : '' }
                </Menu>
            }
            position={Position.BOTTOM}>
            <Button
              className="bp3-minimal"
              icon="person"
              text={this.state.userProfile != null ? this.state.userProfile.UserName : ''}
            />
          </Popover>
        </Navbar.Group>
      </Navbar>
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

}

function mapStateToProps(state) {
  const { account } = state.msal;
  return { account };
}

function mapDispatchToProps (dispatch) {
  return {
    login: () => dispatch(msalLoginAsync()),
    logout: () => dispatch(msalLogout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);