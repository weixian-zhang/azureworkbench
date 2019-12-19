import React, { Component } from "react";
import { Navbar, Button, Alignment, AnchorButton, Popover, Menu, Position, MenuItem, Classes, Icon } from "@blueprintjs/core";
import { connect } from "react-redux";
import { msalLoginAsync, msalLogout } from "../../redux/actions";

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Azure Workbench</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <AnchorButton 
            className="bp3-minimal"
            icon="git-new-branch"
            href="https://github.com/Code-Norris/azureworkbench"
            target="_blank"
          />
          <Popover content={ this.props.account != null ?
            (
              <Menu className={Classes.ELEVATION_1}>
                <MenuItem labelElement={<Icon icon="log-out" />} text="Logout" onClick={this.props.logout} />
              </Menu>
            ) : (
              <Menu className={Classes.ELEVATION_1}>
                <MenuItem labelElement={<Icon icon="log-in" />} text="Login" onClick={this.props.login} />
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