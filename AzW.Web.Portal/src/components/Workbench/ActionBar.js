import React, { Component } from "react";
import { MenuItem, Menu, Toaster, Position, Intent } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

export default class ActionBar extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
            <nav className="bp3-navbar bp3-light">
                <div style={{margin: "0 auto", width: "100%"}}>
                    <div className="bp3-navbar-group bp3-align-left">
                        <button className="bp3-button" onClick={this.deploy}>Deploy</button>
                        
                        <span className="bp3-navbar-divider"></span>
                        <Menu>
                            <MenuItem text="File">
                                <MenuItem text="Save Draft In-Browser" onClick={this.shareDiagram}/>
                                <MenuItem text="Share" onClick={this.shareDiagram}/>
                                <MenuItem text="Export as SVG" onClick={this.saveToWorkspace} />
                                <MenuItem text="Export as PNG" onClick={this.saveToWorkspace} />
                            </MenuItem>
                        </Menu>
                        <span className="bp3-navbar-divider"></span>
                        <button className="bp3-button bp3-intent-success" onClick={this.calculate}>$USD 0.00</button>
                    </div>
                    <div className="bp3-navbar-group bp3-align-right">
                        <span className="bp3-navbar-divider"></span>
                        <span>Subscriptions</span>
                        <span className="bp3-navbar-divider"></span>
                        <span>Resource Groups</span>
                    </div>
                </div>
            </nav>
        );
    };

    shareDiagram = () => {
        this.props.shareDiagram();
    }

    calculate(){
        Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.SUCCESS, timeout: 3000, message: 'Coming Soon..only Share is released'});
          return;
    }

    deploy(){
        Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.SUCCESS, timeout: 3000, message: 'Coming Soon..only Share is released'});
          return;
    }

    saveToWorkspace(){
        Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.SUCCESS, timeout: 3000, message: 'Coming Soon..only Share is released'});
          return;
    }
}