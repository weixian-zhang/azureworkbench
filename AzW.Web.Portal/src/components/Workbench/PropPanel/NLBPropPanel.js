import React, { Component } from "react";
import NLB from '../../../models/NLB';
import { FormGroup, Drawer, Tooltip, Intent, Button, Switch, InputGroup } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from "@material-ui/core/Grid";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import SelectLocation from '../SelectLocation';
import SelectResourceGroup from '../SelectResourceGroup';

export default class NLBPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new NLB(),
        
        value: 'diagram', //tabs

        saveCallback: function () {},
      }
  }

  render = () => {
    return (
      <Drawer
          title="Load Balancer Properties"
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
                    <Tabs  value={this.state.value}  onChange={this.handleChange} >
                      <Tab label="Diagram" value="diagram" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'diagram' ? "bold" : "" }}/>
                      <Tab label="Provision" value="provision" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'provision' ? "bold" : "" }}/>
                      <Tab label="Calculator" value="calculator" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'calculator' ? "bold" : "" }}/>
                    </Tabs>
                  </AppBar>
                  <div
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
                                autoFocus ={true}
                                />
                              </div>
                        </FormGroup>
                  </div>

                    {this.renderProvisionTab()}

                    {this.renderCalculatorTab()}
                </Grid>
              </Grid>
        
      </Drawer>
    );
  }

  renderProvisionTab() {
    if(this.state.value != 'provision')
      return null;
    
    return (
        <div className="propPanelTabContent">
           <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1} style={{marginTop: '15px', width: '100%'}}>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
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
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item sm={3}>
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
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item sm={3}>
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
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item>
                  <label style={{fontWeight:'bold'}}>
                    {(this.state.userObject.ProvisionContext.IsInternalNLB) ? 'Internal Load Balancer' : 'External Load Balancer'}
                  </label>
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item sm={3}>
                    <label>Public IP Name</label>
                </Grid>
                <Grid item>
                  <input id="icon-display-name" type="text" class="bp3-input .modifier"
                    disabled={this.state.userObject.ProvisionContext.IsInternalNLB}
                    value={this.state.userObject.ProvisionContext.PublicIPName} 
                    onChange={(e) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.PublicIPName = e.target.value
                      this.setState({userObject:uo});
                    }} />
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item>
                  <Switch checked={this.state.userObject.ProvisionContext.IsStandardSku} label=" Is Standard Sku"
                    onChange={(e) => {
                        var uo = this.state.userObject;
                        uo.ProvisionContext.IsStandardSku = e.target.checked
                        this.setState({userObject:uo});
                    }} />
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item sm={3}>
                  <label>Frontend Port</label>
                </Grid>
                <Grid item >
                  <input id="icon-display-name" type="text" class="bp3-input .modifier"
                    value={this.state.userObject.ProvisionContext.FrontendPort} 
                    onChange={(e) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.FrontendPort = e.target.value
                      this.setState({userObject:uo});
                    }} />
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item sm={3}>
                    <label>Backendpool Name</label>
                </Grid>
                <Grid item>
                  <input id="icon-display-name" type="text" class="bp3-input .modifier"
                    value={this.state.userObject.ProvisionContext.BackendpoolName} 
                    onChange={(e) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.BackendpoolName = e.target.value
                      this.setState({userObject:uo});
                    }} />
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item sm={3}>
                    <label>Load Balancing Rule Name</label>
                </Grid>
                <Grid item>
                  <InputGroup
                      value={this.state.userObject.ProvisionContext.LoadBalancingRuleName}
                      onChange={(e) => {
                        var uo = this.state.userObject;
                        uo.ProvisionContext.LoadBalancingRuleName = e.target.value
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