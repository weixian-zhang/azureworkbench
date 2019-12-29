import React, { Component } from "react";
import { Navbar, FilmSuggest } from "@blueprintjs/core";

export default class ActionBar extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
            <nav class="bp3-navbar bp3-light">
                <div style={{margin: "0 auto", width: "100%"}}>
                    <div class="bp3-navbar-group bp3-align-center">
                        <span>Subscriptions</span>
                        <span class="bp3-navbar-divider"></span>
                        <span>Resource Groups</span>
                        <span class="bp3-navbar-divider"></span>
                        <button class="bp3-button">Calculate</button>
                        <span class="bp3-navbar-divider"></span>
                        <button class="bp3-button">Deploy</button>
                        <span class="bp3-navbar-divider"></span>
                        <button class="bp3-button">Save Draft</button>
                        <span class="bp3-navbar-divider"></span>
                        <button class="bp3-button">Generate Link</button>
                    </div>
                </div>
            </nav>
        );
    };
}