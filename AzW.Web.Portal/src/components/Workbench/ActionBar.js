import React, { Component } from "react";
import { Classes, Popover,Button, MenuItem, Menu, Toaster, Position, Intent } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import {Select } from "@blueprintjs/select";
import Subscription from "../../models/services/Subscription";
import SessionStorage from '../../services/SessionStorage';
import ARMService from '../../services/ARMService';
import AuthService from '../../services/AuthService';

export default class ActionBar extends Component {

    constructor(props) {

      this.state = {
        subscriptions: [],
        resourceGroups: []
      };

      this.authService = AuthService;

      this.getSubscriptions();

      this.diagramEditor = this.props.Workbench.current;
    }

    render() {
        return (
            <nav className="bp3-navbar bp3-light">
                <div style={{margin: "0 auto", width: "100%"}}>
                    <div className="bp3-navbar-group bp3-align-left">
                        <Button className="bp3-button" icon='draw' onClick={this.showWorkspace}>My Workspace</Button>
                        <span className="bp3-navbar-divider"></span>
                        <Button className="bp3-button" icon='document-share' onClick={this.shareDiagram}>Share</Button>
                        <span className="bp3-navbar-divider"></span>
                        <Popover content=
                            {
                                <Menu>
                                    {/* <button className="bp3-button bp3-intent-success" onClick={this.calculate}>$USD 0.00</button> */}
                                    <MenuItem icon="saved" text="Save Draft in Browser" onClick={this.saveToLocal} />
                                    <MenuItem icon="history" text="Save to Workspace" onClick={this.savetoWorkspace} />
                                    <MenuItem icon="export" text="Export as PDF" />
                                    <MenuItem icon="image-rotate-left" text="Export as PNG" />
                                    <MenuItem icon="new-drawing" text="New Diagram" onClick={this.clearGraph} />
                                </Menu>
                            } position={Position.RIGHT}>
                            <Button icon="share" text="File" />
                        </Popover>
                    </div>
                </div>
            </nav>
        );
    };

}