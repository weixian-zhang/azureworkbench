import React, { Component } from "react";
import VNetPeering from '../../../models/VNetPeering';
import { FormGroup, Drawer, Intent, Button, Switch } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Grid from "@material-ui/core/Grid";
import SelectVNet from '../SelectVNet';
import Utils from '../Helpers/Utils';

export default class VNetPeeringPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new VNetPeering(),
        diagram: null,
        vnetAzContexts: [],
        saveCallback: function () {},
      }
  }

  componentDidMount () {
  }

  render = () => {
    return (
      <Drawer
          title="VNet Peering Properties"
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
                    <label>Local VNet Name</label>
                </Grid>
                <Grid item>
                  <SelectVNet
                  Diagram= {this.state.diagram}
                  SelectedValue={this.state.userObject.ProvisionContext.LocalVNetName}
                  onValueChange={
                    (vnetName) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.LocalVNetName = vnetName
                      this.setState({userObject:uo});
                    }
                  }/>
                </Grid>
              </Grid>

              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item sm={4}>
                    <label>Remote VNet Name</label>
                </Grid>
                <Grid item>
                  <SelectVNet
                  Diagram= {this.state.diagram}
                  SelectedValue={this.state.userObject.ProvisionContext.RemoteVNetName}
                  onValueChange={
                    (vnetName) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.RemoteVNetName = vnetName
                      this.setState({userObject:uo});
                    }
                  }/>
                </Grid>
              </Grid>

              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item sm={6}>
                    <label>Remote VNet Resource Group Name</label>
                </Grid>
                <Grid item>
                  <input id="icon-display-name" type="text" class="bp3-input .modifier"
                    value={this.state.userObject.ProvisionContext.RemoteVnetRGName}
                    onChange={(e) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.RemoteVnetRGName = e.target.value
                      this.setState({userObject:uo});
                    }} />
                </Grid>
              </Grid>

              <Grid container item style={{marginTop: "15px"}} direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                  <label style={{color: "blue"}}>
                    *VNet Azure property name has to be set for VNet names to appear here
                  </label>
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

  show = (userObject, diagram, saveCallback) => {
    this.setState({ isOpen: true, diagram: diagram,
        userObject: userObject, saveCallback: saveCallback });
  }

  loadVNetAzContexts(diagram) {
      var vnetAzContexts = Utils.GetVNetNames(diagram);
      this.setState({vnetAzContexts: vnetAzContexts});
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