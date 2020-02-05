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
      super(props);

      this.state = {
        subscriptions: [],
        resourceGroups: []
      };

      this.authService = new AuthService();

      this.getSubscriptions();

      this.diagramEditor = this.props.Workbench.current;
    }

    componentWillMount() {
        this.diagramEditor = this.props.Workbench.current;
    }

    render() {
        return (
            <nav className="bp3-navbar bp3-light">
                <div style={{margin: "0 auto", width: "100%"}}>
                    <div className="bp3-navbar-group bp3-align-left">
                        <Button className="bp3-button" icon="delta" onClick={this.deploy}>Deploy</Button>
                        <span className="bp3-navbar-divider"></span>
                        <Button className="bp3-button" icon='document-share' onClick={this.shareDiagram}>Share</Button>
                        <span className="bp3-navbar-divider"></span>
                        <Button className="bp3-button" icon='draw' onClick={this.showWorkspace}>My Workspace</Button>
                        <span className="bp3-navbar-divider"></span>
                        <Popover content=
                            {
                                <Menu>
                                    <MenuItem icon="saved" text="Save Draft in Browser" onClick={this.saveToLocal} />
                                    <MenuItem icon="history" text="Save to Workspace" onClick={this.savetoWorkspace} />
                                    <MenuItem icon="export" text="Export as PDF" />
                                    <MenuItem icon="image-rotate-left" text="Export as PNG" />
                                </Menu>
                            } position={Position.RIGHT}>
                            <Button icon="share" text="File" />
                        </Popover>                     
                    </div>
                    <div className="bp3-navbar-group bp3-align-right">
                        <span>
                            <button className="bp3-button bp3-intent-success" onClick={this.calculate}>$USD 0.00</button>
                            <span className="bp3-navbar-divider"></span>
                            <Select
                                items={this.state.subscriptions}
                                itemRenderer={this.renderSubscription}
                                noResults={<MenuItem disabled={true}
                                text={this.authService.isUserLogin() ? "Can't find any subscriptions" : "Login first..."} />}
                                onItemSelect={this.setCurrentSubscription}
                                filterable={false}
                            >
                                {/* children become the popover target; render value here */}
                                <Button text='Subscriptions' rightIcon="double-caret-vertical" />
                            </Select>
                        </span>
                        
                        <span>Resource Groups</span>
                    </div>
                </div>
            </nav>
        );
    };

    showWorkspace = () => {
       var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
       diagramEditor.showWorkspace();
    }

    shareDiagram = () => {
        var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
        diagramEditor.shareDiagram();
    }

    savetoWorkspace = () => {
        var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
        diagramEditor.showOverlaySavetoWorkspace();
    }

    saveToLocal = () => {
       var diagramEditor =  this.props.Workbench.current.getDiagramEditor();
       diagramEditor.saveDiagramToBrowser();
    }

    calculate(){
        Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.SUCCESS, timeout: 3000, message: 'In the roadmap...'});
          return;
    }

    deploy(){
        Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.SUCCESS, timeout: 3000, message: 'In the roadmap...'});
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

    setCurrentSubscription(item, event) {
        SessionStorage.set(SessionStorage.KeyNames.CurrentSubscription, item);
    }

    renderSubscription({ handleClick, isActive, item: sub }) {
        return (
            <MenuItem
                //className={classes}
                label={sub.Name}
                key={sub.SubscriptionId}
                onClick={this.setCurrentSubscription}
                text={sub.Name} //{`${film.rank}. ${film.title}`}
            />
        );
    }

    getSubscriptions(){
        if(this.authService.isUserLogin())
        {
            var userProfile = this.authService.getUserProfile();
            ARMService.getSubscriptions(userProfile.AccessToken, function(subscriptions){
                this.setState({subscriptions: subscriptions});
            });
        }
        
    }
}