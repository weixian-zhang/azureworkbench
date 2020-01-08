import React, { Component } from "react";
import { Navbar, FilmSuggest, Toaster, Position, Intent } from "@blueprintjs/core";

export default class ActionBar extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
            <nav className="bp3-navbar bp3-light">
                <div style={{margin: "0 auto", width: "100%"}}>
                    <div className="bp3-navbar-group bp3-align-center">
                        <span>Subscriptions</span>
                        <span className="bp3-navbar-divider"></span>
                        <span>Resource Groups</span>
                        <span className="bp3-navbar-divider"></span>
                        <button className="bp3-button" onClick={this.calculate}>Calculate</button>
                        <span className="bp3-navbar-divider"></span>
                        <button className="bp3-button" onClick={this.deploy}>Deploy</button>
                        <span className="bp3-navbar-divider"></span>
                        <button className="bp3-button" onClick={this.saveToWorkspace}>Save to workspace</button>
                        <span className="bp3-navbar-divider"></span>
                        <button className="bp3-button" onClick={this.shareDiagram}>Share</button>
                        <span className="bp3-navbar-divider"></span>
                        <button className="bp3-button" intent="success">$USD 0.00</button>
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