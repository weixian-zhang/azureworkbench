import React, { Component } from "reactn";
import VNet from '../../../models/VNet';
import { Card, Label, FormGroup, Drawer, Tooltip, Intent, Button } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from "@material-ui/core/Grid";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import SelectLocation from '../SelectLocation';
import SelectResourceGroup from '../SelectResourceGroup';

export default class VNetPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new VNet(),
        
        value: 'diagram', //tabs

        saveCallback: function () {},
      }
  }

  render = () => {
    return (
      <Drawer
          title="Virtual Network Properties"
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
                    <Tabs onChange={this.handleChange} >
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
                            
                    
                    <div
                        className = "propPanelTabContent"
                        hidden={this.state.value !== 'calculator'}>
                    Calculator Properties, coming soon...
                    </div>
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
          <FormGroup
                label="Name"
                inline={false} intent={Intent.PRIMARY}>
            <input id="icon-display-name" type="text" class="bp3-input .modifier"
            value={this.state.userObject.ProvisionContext.Name} 
            onChange={(e) => {
              var uo = this.state.userObject;
              uo.ProvisionContext.Name = e.target.value
              this.setState({userObject:uo});
            }} />
          </FormGroup>

          <FormGroup
                label="Resource Group"
                inline={false} intent={Intent.PRIMARY}>
            <SelectResourceGroup onValueChange={
              (rg) => {
                var uo = this.state.userObject;
                uo.ProvisionContext.ResourceGroupName = rg
                this.setState({userObject:uo});
              }
            }/>
          </FormGroup>

          <FormGroup
                label="Location"
                inline={false} intent={Intent.PRIMARY}>
            <SelectLocation onValueChange={
              (location) => {
                var uo = this.state.userObject;
                uo.ProvisionContext.Location = location
                this.setState({userObject:uo});
              }
            }/>
          </FormGroup>

          <FormGroup
                label="Address Space"
                inline={false} intent={Intent.PRIMARY}>
            <input id="icon-display-name" type="text" class="bp3-input .modifier"
            value={this.state.userObject.ProvisionContext.AddressSpace} 
            onChange={(e) => {
              var uo = this.state.userObject;
              uo.ProvisionContext.AddressSpace = e.target.value
              this.setState({userObject:uo});
            }} />
          </FormGroup>
      </div>
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