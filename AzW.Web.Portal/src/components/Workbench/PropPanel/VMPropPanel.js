import React, { Component } from "react";
import VM from '../../../models/VM';
import { FormGroup, Drawer, Switch, Intent, InputGroup } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from "@material-ui/core/Grid";

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import SelectLocation from '../SelectLocation';
import SelectResourceGroup from '../SelectResourceGroup';
import SelectVMImage from '../SelectVMImage';

export default class VMPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new VM(),
        withPublicIP: false,
        value: 'diagram', //tabs

        saveCallback: function () {},
      }
  }

  render = () => {
    return (
      <Drawer
          title="Virtual Machine Properties"
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
                  <AppBar position="static" color = "transparent">
                    <Tabs value={this.state.value} onChange={this.handleChange} >
                      <Tab label="Diagram" value="diagram" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'diagram' ? "bold" : "" }}/>
                      <Tab label="Provision" value="provision" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'provision' ? "bold" : "" }}/>
                      <Tab label="Calculator" value="calculator" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'calculator' ? "bold" : "" }}/>
                    </Tabs>
                  </AppBar>
                  <Typography
                      className = "propPanelTabContent"
                      hidden={this.state.value !== 'diagram'}>
                        <FormGroup
                              label="Icon Display Name"
                              labelFor="icon-display-name"
                              inline={true}
                              intent={Intent.PRIMARY}>
                              <div class="bp3-input-group .modifier">
                                <input id="icon-display-name" type="text" class="bp3-input .modifier" placeholder="Display name"
                                prop='DisplayName'
                                value={this.state.userObject.GraphModel.DisplayName}
                                onChange={this.onDiagramIconNameChange}
                                autoFocus ={true} />
                              </div>
                        </FormGroup>
                    </Typography>

                    {this.renderProvisionTab()}
                            
                    {this.renderCalculatorTab()}

                </Grid>
              </Grid>
      </Drawer>
    );
  }

  show = (userObject, saveCallback) => {
    this.setState({ isOpen: true, userObject: userObject, saveCallback: saveCallback });
  }

  renderProvisionTab() {
    if(this.state.value != 'provision')
      return null;
    
    return (
        <div className = "propPanelTabContent">
           <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1} style={{marginTop: '15px', width: '100%'}}>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item sm={3}>
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
                <Grid item sm={3}>
                    <label>Resource Group</label>
                </Grid>
                <Grid item>
                  <SelectResourceGroup onValueChange={
                    (rg) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.ResourceGroupName = rg
                      this.setState({userObject:uo});
                    }
                  }/>
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item sm={3}>
                    <label>Location</label>
                </Grid>
                <Grid item>
                  <SelectLocation onValueChange={
                    (location) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.Location = location
                      this.setState({userObject:uo});
                    }
                  }/>
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item sm={3}>
                <Switch checked={this.state.userObject.ProvisionContext.HasPublicIP} label="Public"
                  onChange={(e) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.HasPublicIP = e.target.checked
                      this.setState({userObject:uo});
                  }} />
                </Grid>
                <Grid item>
                  <InputGroup
                  disabled={!this.state.userObject.ProvisionContext.HasPublicIP}
                  leftIcon="cloud"
                  onChange={(e) => {
                    var uo = this.state.userObject;
                    uo.ProvisionContext.PublicIPName = e.target.value
                    this.setState({userObject:uo});
                  }}
                  placeholder="Public IP name"
                  />
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="flex-start">
                <Grid item sm={3}>
                  <SelectVMImage onValueChange={
                      (vm) => {
                        var uo = this.state.userObject;
                        uo.ProvisionContext.VMPublisher = vm.Publisher;
                        uo.ProvisionContext.VMOffer = vm.Offer;
                        uo.ProvisionContext.VMSKU = vm.Sku;
                        uo.ProvisionContext.VMVersion = vm.Version;
                        this.setState({userObject:uo});
                      }
                    }/>
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item sm={3}>
                    <label>Admin Username</label>
                </Grid>
                <Grid item>
                  <input id="icon-display-name" type="text" class="bp3-input .modifier"
                    value={this.state.userObject.ProvisionContext.AdminUsername} 
                    onChange={(e) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.AdminUsername = e.target.value
                      this.setState({userObject:uo});
                    }} />
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item sm={3}>
                    <label>Admin Password</label>
                </Grid>
                <Grid item>
                  <input id="icon-display-name" type="text" class="bp3-input .modifier"
                    value={this.state.userObject.ProvisionContext.AdminPassword} 
                    onChange={(e) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.AdminPassword = e.target.value
                      this.setState({userObject:uo});
                    }} />
                </Grid>
              </Grid>
            </Grid>
      </div>
    );
  }

  renderCalculatorTab() {
    return (
      <Typography
        className = "propPanelTabContent"
        hidden={this.state.value !== 'calculator'}>
        Calculator Properties, coming soon...
      </Typography>
    );
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