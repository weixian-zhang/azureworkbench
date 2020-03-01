import React, { Component } from "react";
import DataFactory from '../../../models/DataFactory';
import { FormGroup, Drawer, Tooltip, Intent, Button } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from "@material-ui/core/Grid";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

export default class DataFactoryPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new DataFactory(),
        
        value: 'diagram', //tabs

        saveCallback: function () {},
      }
  }

  render = () => {
    return (
      <Drawer
          title="Data Factory Properties"
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
                                />
                              </div>
                        </FormGroup>
                    </Typography>
                    <Typography
                        className = "propPanelTabContent"
                        hidden={this.state.value !== 'provision'}>
                    Provisioning Properties, coming soon...
                    </Typography>
                    <Typography
                        className = "propPanelTabContent"
                        hidden={this.state.value !== 'calculator'}>
                    Calculator Properties, coming soon...
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                  
                </Grid>
              </Grid>
              {/* <Button alignText="center" className="buttonStretch" text="Save" onClick={this.saveForm} /> */}
      </Drawer>
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