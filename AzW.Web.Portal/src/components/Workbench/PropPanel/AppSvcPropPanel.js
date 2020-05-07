import React, { Component } from "react";
import AppService from '../../../models/AppService';
import { FormGroup, MenuItem, Drawer, Intent, Button, Switch } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from "@material-ui/core/Grid";
import AppBar from '@material-ui/core/AppBar';
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
        selectedPricingTier: '',
        selectedRuntime: '',
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
          title="App Service Properties"
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
                              <textarea class="bp3-input .modifier bp3-large bp3-fill"
                                style={{'max-width':'250px', 'max-height':'200px'}}
                                maxlength="80"
                                dir="auto"
                                prop='DisplayName'
                                value={this.state.userObject.GraphModel.DisplayName}
                                onChange={this.onDiagramIconNameChange}
                                autoFocus ={true}
                              />
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
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
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
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item sm={3}>
                  <Switch checked={this.state.userObject.ProvisionContext.IsLinux} label="Is Linux"
                    onChange={(e) => {
                        var uo = this.state.userObject;
                        uo.ProvisionContext.IsLinux = e.target.checked
                        this.setState({userObject:uo});
                    }} />
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
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
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item sm={4}>
                    <label>Runtime Stack</label>
                </Grid>
                <Grid item>
                  <Select
                    closeOnSelect={true}
                    filterable={false}
                    items={this.state.runtimeStack}
                    itemRenderer={
                      (runtime, { handleClick, modifiers }) => {
                        return (<MenuItem
                          text={runtime}
                          onClick={
                            (e) => {
                              this.setState({selectedRuntime:runtime});
                              var uo = this.state.userObject;
                              uo.ProvisionContext.RuntimeStack = runtime; //e.target.value
                              this.setState({userObject:uo});
                            }
                          } />);
                      }
                    }>
                    <Button text={this.state.selectedRuntime == '' ? 'Runtime' : Utils.limitTextLength(this.state.selectedRuntime,15)}
                        alignText='left'
                        rightIcon="double-caret-vertical" style={{width: '170px', maxWidth: '170px'}}/>
                  </Select>
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
     this.setState({pricingTier: ['FreeF1','BasicB1','BasicB2','BasicB3',
      'StandardS1','StandardS2','StandardS3','PremiumP1','PremiumP1v2',
      'PremiumP2','PremiumP2v2','PremiumP3','PremiumP3v2']});

      this.setState({runtimeStack: ['Java_11_Java11','Java_8_Jre8','NETCore_V1_0','NETCore_V1_1',
      'NETCore_V2_0','NETCore_V2_1','NETCore_V2_2','NodeJS_10_1','NodeJS_10_12',
      'NodeJS_10_14','NodeJS_10_LTS','NodeJS_4_4','NodeJS_4_5',
      'NodeJS_6_10','NodeJS_6_11','NodeJS_6_2','NodeJS_6_6',
      'NodeJS_6_9','NodeJS_6_LTS','NodeJS_8_0','NodeJS_8_1',
      'NodeJS_8_11','NodeJS_8_12','NodeJS_8_2','NodeJS_8_8',
      'NodeJS_8_9','NodeJS_8_LTS','NodeJS_9_4','NodeJS_LTS',
      'PHP_5_6','PHP_7_0','PHP_7_2','PHP_7_3',
      'Python_2_7','Python_3_6','Python_3_7','Ruby_2_3',
      'Ruby_2_4','Ruby_2_5','Ruby_2_6','Tomcat_8_5_JAVA11',
      'Tomcat_8_5_JRE8','Tomcat_9_0_JAVA11','Tomcat_9_0_JRE8']});
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