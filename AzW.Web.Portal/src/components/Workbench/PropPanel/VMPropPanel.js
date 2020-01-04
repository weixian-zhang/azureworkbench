import React, { Component } from "react";
import PropTypes from 'prop-types';
import VM from '../../../models/VM';
import { FormGroup, InputGroup, Switch, Drawer, Tooltip, Intent, Button } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";

export default class VMPropPanel extends Component {
  constructor(props) {
      super(props);
      this.state ={
        isOpen: false,
        showPassword: false,
        vmModel: new VM()
      }
  }

  
  lockButton() {
    return (
    <Tooltip content={`${this.state.showPassword ? "Hide" : "Show"} Password`}>
        <Button
            icon={this.state.showPassword ? "unlock" : "lock"}
            intent={Intent.WARNING}
            minimal={true}
            onClick={this.handleLockClick}
        />
    </Tooltip>
  );}

  render = () => {
    return (
      <Drawer
          title="Properties"
          autoFocus= {true}
          canEscapeKeyClose= {true}
          canOutsideClickClose= {true}
          enforceFocus= {true}
          hasBackdrop= {true}
          onClose={() => this.handleClose()} 
          isOpen= {this.state.isOpen}
          position= {POSITION_RIGHT}
          usePortal= {true}
          size= {Drawer.SIZE_SMALL}
      >
          <FormGroup
              label="Name"
              labelFor="text-input"
              labelInfo="(required)">
              <InputGroup id="text-input" disabled={false} placeholder="virtual machine name" value={this.state.vmModel.ProvisionContext.Name} />
          </FormGroup>
          <FormGroup
              label="Username"
              labelFor="text-input"
              labelInfo="(required)">
              <InputGroup id="text-input" placeholder="Root Username" value={this.state.vmModel.ProvisionContext.RootUsername} />
          </FormGroup>
          <FormGroup
              label="Password"
              labelFor="text-input"
              labelInfo="(required)">
               <InputGroup
                    placeholder="Root Password"
                    rightElement={this.lockButton()}
                    small={true}
                    type={this.state.showPassword ? "text" : "password"}
                    value={this.state.vmModel.ProvisionContext.RootUsername}
                />
          </FormGroup>
          <Switch checked={this.state.vmModel.ProvisionContext.PublicIP} label="Public IP"  />
          <a class="bp3-button Alignment.CENTER" role="button" onClick={this.saveVMModelToDiagramEditor} tabIndex={0}>Save</a>
    
      </Drawer>
    );
  }
  setResourceModelFromDiagramEditor = (vmModel) => {
      this.setState({vmModel: vmModel});
  }
  saveVMModelToDiagramEditor = () => {
      this.props.saveVMModelToDiagramEditor(this.state.vmModel);
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  }
  handleClose = () => 
  {
    this.setState({ isOpen: false });
  }
  show = (open) => {
    if(open == true)
      this.handleOpen();
  }
  handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });
}