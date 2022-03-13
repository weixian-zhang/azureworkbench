import React, { Component } from "react";
import AppService from '../../../models/AppService';
import {  MenuItem, Drawer, NumericInput, Button, Switch } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Grid from "@material-ui/core/Grid";
import SelectLocation from '../SelectLocation';
import SelectResourceGroup from '../SelectResourceGroup';
import {Select } from "@blueprintjs/select";
import Utils from '../Helpers/Utils';

export default class AppServicePropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new AppService(),
        pricingTier: [],
        runtimeStack: [],
        linuxFrameworkVersion: [],
        selectedPricingTier: '',
        selectedRuntime: '',
        selectedLinuxFrameworkVersion: '',
        value: 'diagram', //tabs

        saveCallback: function () {},
      }
  }

  componentDidMount () {
      this.initPricingTierRuntimeStack();
  }

  render = () => {
    return (
      <Drawer
          title="App Service Azure Properties"
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
              <Grid container item direction="row" xs="12" justify="flex-start" alignItems="center">
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
              {/* <Grid container item direction="row" xs="12" justify="flex-start" alignItems="center">
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
              </Grid> */}
              <Grid container item direction="row" xs="12"  justify="flex-start" alignItems="center">
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
              <Grid container item direction="row" xs="12"  justify="flex-start" alignItems="center">
                <Grid item sm={4}>
                    <label>App Service Plan Name</label>
                </Grid>
                <Grid item>
                  <input id="icon-display-name" type="text" class="bp3-input .modifier"
                    value={this.state.userObject.ProvisionContext.PlanName}
                    onChange={(e) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.PlanName = e.target.value
                      this.setState({userObject:uo});
                    }} />
                </Grid>
              </Grid>
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
              {
                  (this.state.userObject.ProvisionContext.IsLinux)
                  ?
                    <Grid container item direction="row" xs="12"  justify="flex-start" alignItems="center">
                      <Grid item sm={4}>
                          <label>Linux Framework Version</label>
                      </Grid>
                      <Grid item>
                        <Select
                          closeOnSelect={true}
                          filterable={false}
                          items={this.state.linuxFrameworkVersion}
                          itemRenderer={
                            (linuxFx, { handleClick, modifiers }) => {
                              return (<MenuItem
                                text={linuxFx}
                                onClick={
                                  (e) => {
                                    this.setState({ selectedLinuxFrameworkVersion: linuxFx });
                                    var uo = this.state.userObject;
                                    uo.ProvisionContext.LinuxFrameworkVersion = linuxFx;
                                    this.setState({userObject:uo});
                                  }
                                } />);
                            }
    
                          }>
                          <Button text={this.state.selectedLinuxFrameworkVersion == '' ? 'Linux Framework Version' : this.state.selectedLinuxFrameworkVersion }
                              alignText='left'
                              rightIcon="double-caret-vertical" style={{width: '170px', maxWidth: '170px'}}/>
                        </Select>
                      </Grid>
                      <Grid container item direction="row" xs="12"  justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                        <Grid item sm={3} />
                      </Grid>
                    </Grid>
                    
                  : ''
              }

              <Grid container item direction="row" xs="12"  justify="flex-start" alignItems="center">
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
                    <Button text={this.state.selectedPricingTier == '' ? 'Pricing Tier' : Utils.limitTextLength(this.state.selectedPricingTier,15)}
                        alignText='left'
                        rightIcon="double-caret-vertical" style={{width: '170px', maxWidth: '170px'}}/>
                  </Select>
              </Grid>

              <Grid container item direction="row" xs="12" style={{marginTop: '15px', width: '100%'}} justify="flex-start" alignItems="center">
                <Grid item sm={4}>
                    <label>Number of Instances</label>
                </Grid>
                <Grid item>
                  <NumericInput placeholder="Stroke Width"
                        max={100}
                        allowNumericCharactersOnly ={true}
                        clampValueOnBlur={true}
                        value={this.state.userObject.ProvisionContext.NumberOfInstance}
                        onValueChange={
                          (value) => {
                              var uo = this.state.userObject;
                              uo.ProvisionContext.NumberOfInstance = value;
                              this.setState({userObject:uo});
                          }
                        } />
                </Grid>
              </Grid>

              <Grid container item direction="row" xs="12" style={{marginTop: '15px', width: '100%'}} justify="flex-start" alignItems="center">
                <Grid item sm={4}>
                    <label>Application Insights Name</label>
                </Grid>
                <Grid item>
                <input id="icon-display-name" type="text" class="bp3-input .modifier"
                    value={this.state.userObject.ProvisionContext.AppInsightsName}
                    onChange={(e) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.AppInsightsName = e.target.value
                      this.setState({userObject:uo});
                    }} />
                </Grid>
                <Grid item>
                  <label class="az-proppanel-label-info">*Not included in Bicep template if name is empty</label>
                </Grid>
              </Grid>

              <Grid container item direction="row" xs="12" style={{marginTop: '15px', width: '100%'}} justify="flex-start" alignItems="center">
                <Grid item sm={4}>
                    <label>Log Analytics Workspace Name</label>
                </Grid>
                <Grid item>
                <input id="icon-display-name" type="text" class="bp3-input .modifier"
                    value={this.state.userObject.ProvisionContext.LogAnalyticsWorkspaceName}
                    onChange={(e) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.LogAnalyticsWorkspaceName = e.target.value
                      this.setState({userObject:uo});
                    }} />
                </Grid>
                <Grid item>
                  <label class="az-proppanel-label-info">App Insights 'linked' workspace, if App Insights name is empty workspace will be ignored</label>
                </Grid>
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

  initPricingTierRuntimeStack() {
     this.setState({pricingTier: ['F1','D1','B1','B2','B3',
      'S1','S2','S3','P1','P1v2','P2v2','P3v2','P1v3','P2v3', 'P3v3']});

     this.setState({workerSize: ['Small', 'Medium']});

     this.setState({ linuxFrameworkVersion: ['DOTNETCORE|3.0', 'PHP|7.4', 'NODE|10.15', 'JAVA|1.8 |TOMCAT|9.0', 'PYTHON|3.7', 'RUBY|2.6'] });
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