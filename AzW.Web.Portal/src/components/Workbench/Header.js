import React, { Component } from "react";
import { Navbar, Button, Alignment, AnchorButton } from "@blueprintjs/core";
import { connect } from "react-redux";

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
          <Button
            className="bp3-minimal"
            icon="person"
            text={this.props.account != null ? this.props.account.account.userName : null}
          />
        </Navbar.Group>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state);
  const { account } = state.msal;
  return { account };
}

// function mapDispatchToProps (dispatch) {}

export default connect(mapStateToProps)(Header);