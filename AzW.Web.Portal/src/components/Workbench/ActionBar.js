import React, { Component } from "react";
import { Navbar, FilmSuggest } from "@blueprintjs/core";

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
                        <button className="bp3-button">Deploy</button>
                        <span className="bp3-navbar-divider"></span>
                        <button className="bp3-button">Save</button>
                        <span className="bp3-navbar-divider"></span>
                        <button className="bp3-button" onClick={this.shareDiagram}>Share</button>
                    </div>
                </div>
            </nav>
        );
    };

    shareDiagram = () => {
        this.props.shareDiagram();
    }
}