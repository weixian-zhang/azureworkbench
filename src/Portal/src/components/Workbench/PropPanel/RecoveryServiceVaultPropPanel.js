import React, { Component } from "react";
import RecoveryServiceVault from '../../../models/RecoveryServiceVault';
import { MenuItem, Drawer, Intent, Button, Switch } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Grid from "@material-ui/core/Grid";
import SelectLocation from '../SelectLocation';
import SelectResourceGroup from '../SelectResourceGroup';
import Utils from '../Helpers/Utils';
import { Select } from "@blueprintjs/select";
import Typography from '@material-ui/core/Typography';

export default class RecoveryServiceVaultPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new RecoveryServiceVault(),
        vmContexts: [],
        saveCallback: function () {},
      }
  }

  render = () => {
    return (
      <Drawer
          title="Recovery Services Vault Properties"
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
              <Grid container item direction="row" xs="12" spacing="1" 
               justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
                <Grid item sm={4}>
                    <strong>Backup VMs</strong>
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item sm={4}>
                    <label>Select VMs on canvas</label>
                </Grid>
                <Grid item>
                    <Select
                      items={this.state.vmContexts}
                      itemRenderer={ (vm) => {
                        return (
                          <MenuItem
                              icon={vm.isSelected ? "tick" : "blank"}
                              text={vm.vmName}
                              shouldDismissPopover={false} 
                              onClick={() => {
                                this.onVMSelect(vm)
                              }}/>
                        );
                      }}
                      escape
                      noResults={<MenuItem disabled={true} text="No VM on canvas" />}
                      closeOnSelect={true}
                      fill={false}
                      filterable= {false}
                      popoverProps={true}>
                      <Button text='VM on canvas'
                          alignText='left'
                          rightIcon="double-caret-vertical" />
                    </Select>
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                {
                  <div>
                    {
                      this.state.vmContexts.map(vm => {
                          if(vm.isSelected)
                            return <Typography variant="body1">{vm.vmName}</Typography>
                          else
                            return ''
                      })
                    }
                  </div>
                }
              </Grid>
          </Grid>
      </div>
    );
  }

  getVMsOnCanvas() {
      var vms = Utils.getVMProContextsOnCanvas(this.diagram);
      var vmsForSelect= [];

      var preVMs = this.state.userObject.ProvisionContext.VMNamesToBackup;

      for(var v of vms) {
        
        var selected = false;
        var prev = preVMs.find(x => x == v.Name);

        if(prev != null)
          v.isSelected = true;
        else
          v.isSelected = false;

        vmsForSelect.push({
            vmName: v.Name == '' ? 'VM need not set' : v.Name,
            isSelected: v.isSelected      

        });
      }

      this.setState({vmContexts: vmsForSelect}); 
  }

  //reset values VMNamesToBackup in ProvisionContext
  onVMSelect(vm) {
    
      var vms = this.state.vmContexts;

       for(var v of vms) {
          if(vm.vmName == v.vmName) {
            if(v.isSelected)
            v.isSelected = false;
            else
              v.isSelected = true;
          }
       }

       var azcontext = this.state.userObject;
       var temp = [];
       for(var v of vms) {
         if(v.isSelected)
          temp.push(v.vmName);
       }

       azcontext.ProvisionContext.VMNamesToBackup = temp;

       this.setState({
         vmContexts: vms, //for display
         userObject: azcontext //for deployment
       });
  }

  show = (diagram, userObject, saveCallback) => {
    this.diagram = diagram;
    this.getVMsOnCanvas();
    this.setState({ isOpen: true, userObject: userObject, saveCallback: saveCallback });
  }

  // onDiagramIconNameChange = (e) => {
  //   var propName = e.target.getAttribute('prop');
  //   var userObj = this.state.userObject;
  //   var value = e.target.value;
  //   switch (propName) {
  //     case 'DisplayName':
  //       userObj.GraphModel.DisplayName = value;
  //       break;
    
  //     default:
  //       break;
  //   }
  //   this.setState({userObject: userObj});
  // }

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