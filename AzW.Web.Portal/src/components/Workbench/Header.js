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
        isLogin: false
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
          <Popover content={ this.props.account != null ?
            (
              <Menu className={Classes.ELEVATION_1}>
                {this.state.isLogin == true ? <MenuItem labelElement={<Icon icon="log-out" />} text="Logout" onClick={this.logout} /> : ''}
              </Menu>
            ) : (
              <Menu className={Classes.ELEVATION_1}>
                 {this.state.isLogin == false ? <MenuItem labelElement={<Icon icon="log-in" />} text="Login" onClick={this.login} /> : '' }
              </Menu>
            )
          } position={Position.BOTTOM}>
            <Button
              className="bp3-minimal"
              icon="person"
              text={this.props.account != null ? this.props.account.account.userName : null}
            />
          </Popover>
        </Navbar.Group>
      </Navbar>
    );
  }

  login = () => {
    this.authService.Login(function (loginResponse){
      this.setState({isLogin: true})
    });
    
  }

  logout = () => {
    this.authService.Login();
    this.setState({isLogin: false})
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