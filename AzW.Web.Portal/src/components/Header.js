import React, { Component } from "react";
import { Navbar, Button, Alignment } from "@blueprintjs/core";

export default class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Azure Workbench</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button className="bp3-minimal" icon="git-repo" text="Contribute on Github" />
        </Navbar.Group>
      </Navbar>
    );
  }
}