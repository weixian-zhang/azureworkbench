import React, { Component } from "react";
import Function from '../../../models/Function';
import {  Drawer, MenuItem, Button, Switch } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Grid from "@material-ui/core/Grid";
import {Select } from "@blueprintjs/select";
import SelectLocation from '../SelectLocation';
import SelectResourceGroup from '../SelectResourceGroup';
import Utils from '../Helpers/Utils';

export default class NatGatewayPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state = this.initialState();
  }

  initialState() {
    return {
      isOpen: false,
        userObject: new Function(),
        pricingTier: ['FreeF1','BasicB1','BasicB2','BasicB3',
        'StandardS1','StandardS2','StandardS3','PremiumP1','PremiumP1v2',
        'PremiumP2','PremiumP2v2','PremiumP3','PremiumP3v2'],
        saveCallback: function () {},
    }
  }

  render = () => {
    return (
      <Drawer
          title="Function Properties"
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
              <Grid container item direction="row" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item>
                  <Switch checked={this.state.userObject.ProvisionContext.IsConsumptionPlan} label="Is Consumption Plan"
                    onChange={(e) => {
                        var uo = this.state.userObject;
                        uo.ProvisionContext.IsConsumptionPlan = e.target.checked
                        this.setState({userObject:uo});
                    }} />
                </Grid>
              </Grid>
              {
              (!this.state.userObject.ProvisionContext.IsConsumptionPlan)
              ? <Grid container item direction="row" xs="12"  justify="flex-start"
              alignItems="center">
                <Grid item sm={4}>
                    <label>Tier</label>
                </Grid>
                <Grid item>
                  <Select
                    closeOnSelect={true}
                    filterable={false}
                    items={this.state.pricingTier}
                    itemRenderer={
                      (tier, { handleClick, modifiers }) => {
                        return (<MenuItem
                          text={tier}
                          onClick={
                            (e) => {
                              this.setState({selectedPricingTier:tier});
                              var uo = this.state.userObject;
                              uo.ProvisionContext.PricingTier = tier;//e.target.value
                              this.setState({userObject:uo});
                            }
                          } />);
                      }
                      
                    }>
                    <Button text={this.state.userObject.ProvisionContext.PricingTier == '' ? 'Pricing Tier' : Utils.limitTextLength(this.state.userObject.ProvisionContext.PricingTier,15)}
                        alignText='left'
                        rightIcon="double-caret-vertical" style={{width: '170px', maxWidth: '170px'}}/>
                  </Select>
                </Grid>
            </Grid>
              : ''
              }
              <Grid container item direction="row" xs="12"  justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                  <Grid item sm={3}>
                    <Switch checked={this.state.userObject.ProvisionContext.IsLinux} label="Is Linux"
                      onChange={(e) => {
                          var uo = this.state.userObject;
                          uo.ProvisionContext.IsLinux = e.target.checked
                          this.setState({userObject:uo});
                      }} />
                  </Grid>
                </Grid>
          </Grid>
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
      this.setState(this.initialState());
  }

  handleChange = (event, newVal) => {
    this.setState({value: newVal});
  }
}