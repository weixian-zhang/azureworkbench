import React, { Component } from "react";
import BlobStorage from '../../../models/BlobStorage';
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

export default class AzStoragePropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new BlobStorage(), //default to blob, but can be Table,Queue,AzFile
        storageSku: [],
        value: 'diagram', //tabs

        saveCallback: function () {},
      }
  }

  componentDidMount () {
    this.setState({storageSku: ['Premium_LRS','Standard_GRS','Standard_LRS',
        'Standard_RAGRS', 'Standard_ZRS']});
  }

  render = () => {
    return (
      <Drawer
          title="Storage Properties"
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
                    <label>Sku Name</label>
                </Grid>
                <Grid item>
                  <Select
                    closeOnSelect={true}
                    filterable={false}
                    items={this.state.storageSku}
                    itemRenderer={
                      (sku, { handleClick, modifiers }) => {
                        return (<MenuItem
                          text={sku}
                          onClick={
                            (e) => {
                              var uo = this.state.userObject;
                              uo.ProvisionContext.SkuName = sku;//e.target.value
                              this.setState({userObject:uo});
                            }
                          } />);
                      }
                      
                    }>
                    <Button text={this.state.userObject.ProvisionContext.SkuName == '' ? 'Sku' :
                        Utils.limitTextLength(this.state.userObject.ProvisionContext.SkuName ,15)}
                        alignText='left'
                        rightIcon="double-caret-vertical" style={{width: '170px', maxWidth: '170px'}}/>
                  </Select>
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