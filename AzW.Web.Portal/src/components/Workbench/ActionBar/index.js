import React, { Component } from "react";
import { Navbar, Button, Alignment, Tooltip, Position } from "@blueprintjs/core";
import "./actionbar.css";

export default class ActionBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar className="actionbar">
        <Navbar.Group align={Alignment.LEFT}>
          <Tooltip popoverClassName="actionbar-tooltip" content="Subscriptions" position={Position.BOTTOM}>
            <Button className="bp3-minimal actionbar-btn" text="Subscriptions" small={true} />
          </Tooltip>
          <Navbar.Divider className="actionbar-divider" />
          <Tooltip popoverClassName="actionbar-tooltip" content="Resource Groups" position={Position.BOTTOM}>
            <Button className="bp3-minimal actionbar-btn" text="Resource Groups" small={true} />
          </Tooltip>
          <Navbar.Divider className="actionbar-divider" />
          <Tooltip popoverClassName="actionbar-tooltip" content="Calculate" position={Position.BOTTOM}>
            <Button className="bp3-minimal actionbar-btn" text="Calculate" small={true} />
          </Tooltip>
          <Tooltip popoverClassName="actionbar-tooltip" content="Deploy" position={Position.BOTTOM}>
            <Button className="bp3-minimal actionbar-btn" text="Deploy" small={true} />
          </Tooltip>
        </Navbar.Group>
      </Navbar>
    );
  };
}