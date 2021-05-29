import React, { Component } from "react";
import AzureFirewall from '../../../models/AzureFirewall';
import { InputGroup, Drawer } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import SelectLocation from '../SelectLocation';

export default class FirewallPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new AzureFirewall(),

        value: 'diagram', //tabs

        saveCallback: function () {},
      }
  }

  render = () => {
    return (
      <Drawer
          title="Azure Firewall Properties"
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
                <Grid item sm={3}>
                    <label>Public IP Name</label>
                </Grid>
                <Grid item>
                  <InputGroup
                  value={this.state.userObject.ProvisionContext.PublicIPName}
                  onChange={(e) => {
                    var uo = this.state.userObject;
                    uo.ProvisionContext.PublicIPName = e.target.value
                    this.setState({userObject:uo});
                  }}
                  placeholder="Public IP name"
                  />
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