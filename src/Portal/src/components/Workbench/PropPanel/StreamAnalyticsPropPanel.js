import React, { Component } from "react";
import StreamAnalytics from '../../../models/StreamAnalytics';
import { FormGroup, Drawer, Intent, Button, Switch } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from "@material-ui/core/Grid";
import AppBar from '@material-ui/core/AppBar';
import SelectLocation from '../SelectLocation';
import SelectResourceGroup from '../SelectResourceGroup';
import Utils from '../Helpers/Utils';

export default class StreamAnalyticsPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new StreamAnalytics(),

        saveCallback: function () {},
      }
  }

  componentDidMount () {
  }

  render = () => {
    return (
      <Drawer
          title="Stream Analytics Properties"
          autoFocus= {true}
          canEscapeKeyClose= {true}
          canOutsideClickClose= {true}
          enforceFocus= {true}
          hasBackdrop= {true}
          onClose={() => this.drawerClose()} 
          isOpen= {this.state.isOpen}
          position= {POSITION_RIGHT}
          usePortal= {true}
          size= {'560px'}
          className="propPanelDrawer">
              <Grid container spacing={12} className="propPanelGrid">
                <Grid item xs={12}>
                  
                  {this.renderProvisionTab()}

                </Grid>
              </Grid>
      </Drawer>
    );
  }

  renderProvisionTab() {
   
    return (
        <div className = "propPanelTabContent">
           <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1} style={{marginTop: '15px', width: '100%'}}>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item sm={4}>
                    <label>Name</label>
                </Grid>
                <Grid item>
                  <input id="icon-display-name" type="text" class="bp3-input .modifier"
                    value={this.state.userObject.ProvisionContext.Name} 
                    onChange={(e) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.Name = e.target.value
                      this.setState({userObject:uo});
                    }} />
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item sm={4}>
                    <label>Resource Group</label>
                </Grid>
                <Grid item>
                  <SelectResourceGroup
                   SelectedResourceGroup={this.state.userObject.ProvisionContext.ResourceGroupName}
                   onValueChange={
                    (rg) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.ResourceGroupName = rg
                      this.setState({userObject:uo});
                    }
                  }/>
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item sm={4}>
                    <label>Location</label>
                </Grid>
                <Grid item>
                  <SelectLocation
                  SelectedLocation={this.state.userObject.ProvisionContext.Location}
                  onValueChange={
                    (location) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.Location = location
                      this.setState({userObject:uo});
                    }
                  }/>
                </Grid>
              </Grid>
          </Grid>
      </div>
    );
  }

  renderCalculatorTab() {
    return (
      <div
      className = "propPanelTabContent"
      hidden={this.state.value !== 'calculator'}>
        Calculator Properties, coming soon...
      </div>
    );
  }

  show = (userObject, saveCallback) => {
    this.setState({ isOpen: true, userObject: userObject, saveCallback: saveCallback });
  }

  onDiagramIconNameChange = (e) => {
    var propName = e.target.getAttribute('prop');
    var userObj = this.state.userObject;
    var value = e.target.value;
    switch (propName) {
      case 'DisplayName':
        userObj.GraphModel.DisplayName = value;
        break;
    
      default:
        break;
    }
    this.setState({userObject: userObj});
  }

  saveForm = () => {
      this.drawerClose();
  }
  drawerClose = () => {
    this.state.saveCallback(this.state.userObject);
      this.setState({ isOpen: false});
  }

  handleChange = (event, newVal) => {
    this.setState({value: newVal});
  }
}