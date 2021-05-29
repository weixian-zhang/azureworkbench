import React, { Component } from "react";
import VM from '../../../models/VM';
import {  Drawer, Switch, Intent, InputGroup, Tooltip, Button } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SelectLocation from '../SelectLocation';
import SelectVMImage from '../SelectVMImage';
import SelectVMSize from '../SelectVMSize';

export default class VMPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new VM(),
        withPublicIP: false,
        value: 'diagram', //tabs

        showPassword: false,

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
              <Grid container  className="propPanelGrid">
                <Grid item xs={12}>

                    {this.renderProvisionTab()}

                </Grid>
              </Grid>
      </Drawer>
    );
  }

  show = (userObject, saveCallback) => {
    this.setState({ isOpen: true, userObject: userObject, saveCallback: saveCallback });
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
              <Grid container item direction="row" xs="12" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item sm={3}>
                  <label>VM Images</label>
                </Grid>
                <Grid item >
                  <SelectVMImage
                   SelectedImage = {this.state.userObject.ProvisionContext}
                   onValueChange={
                      (vm) => {
                        var uo = this.state.userObject;
                        if(vm != null) {
                          uo.ProvisionContext.VMPublisher = vm.Publisher;
                          uo.ProvisionContext.VMOffer = vm.Offer;
                          uo.ProvisionContext.VMSKU = vm.Sku;
                          uo.ProvisionContext.VMVersion = vm.Version;
                          this.setState({userObject:uo});
                        }
                        else {
                          uo.ProvisionContext.VMPublisher = '';
                          uo.ProvisionContext.VMOffer = '';
                          uo.ProvisionContext.VMSKU = '';
                          uo.ProvisionContext.VMVersion = '';
                          this.setState({userObject:uo});
                        }
                      }
                    }/>
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item sm={3}>
                  <label>VM Size</label>
                </Grid>
                <Grid item >
                  <SelectVMSize
                   SelectedSizeName = {this.state.userObject.ProvisionContext.SizeName}
                   onValueChange={
                      (sizeName) => {
                        var uo = this.state.userObject;
                        uo.ProvisionContext.SizeName = sizeName;
                        this.setState({userObject:uo});
                      }
                    }/>
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
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
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item sm={3}>
                    <label>Admin Password</label>
                </Grid>
                <Grid item>
                  <InputGroup
                      placeholder="Enter your password..."
                      value={this.state.userObject.ProvisionContext.AdminPassword}
                      onChange={(e) => {
                        var uo = this.state.userObject;
                        uo.ProvisionContext.AdminPassword = e.target.value
                        this.setState({userObject:uo});
                      }}
                      rightElement={
                        <Tooltip content={`${this.state.showPassword ? "Hide" : "Show"} Password`}>
                            <Button
                                icon={this.state.showPassword ? "unlock" : "lock"}
                                intent={Intent.WARNING}
                                minimal={true}
                                onClick={this.handleLockClick}
                            />
                        </Tooltip>
                      }
                      type={this.state.showPassword ? "text" : "password"} />
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                <Grid item>
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
                  <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '10px'}}>
                      <Grid item sm={3}>
                        <label>OpenSSH Public Key</label>
                    </Grid>
                      <Grid item>
                        <TextField multiline={true} variant='filled' size='medium' style={{width: 350}}
                        value={this.state.userObject.ProvisionContext.SSHPublicKey}
                        onChange={(event) => {
                          var uo = this.state.userObject;
                          uo.ProvisionContext.SSHPublicKey = event.target.value;
                          this.setState({userObject:uo});
                        }} />
                      </Grid>
                    </Grid>
                : ''
              }
              <Grid container item style={{marginTop: "20px"}} direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                  <Typography fontSize={6}>(Workbench will NOT persist your username and password,
                  only use them for provisioning)</Typography>
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

  lockButton = () => {
      return (
        <Tooltip content={`${this.state.showPassword ? "Hide" : "Show"} Password`}>
            <Button
                icon={this.state.showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal={true}
                onClick={this.handleLockClick}
            />
        </Tooltip>
      );
  }
  handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });


  drawerClose = () => {
    this.state.saveCallback(this.state.userObject);
    this.setState({ isOpen: false});
  }

  handleChange = (event, newVal) => {
    this.setState({value: newVal});
  }
}