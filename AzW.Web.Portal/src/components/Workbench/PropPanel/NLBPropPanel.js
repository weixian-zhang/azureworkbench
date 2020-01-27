import React, { Component } from "react";
import NLB from '../../../models/NLB';
import { FormGroup, InputGroup, Drawer, Tooltip, Intent, Button } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";

export default class NLBPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new NLB(),
        saveCallback: function () {},
      }
  }

  render = () => {
    return (
      <Drawer
          title="Load Balancer Properties"
          autoFocus= {true}
          canEscapeKeyClose= {true}
          canOutsideClickClose= {true}
          enforceFocus= {true}
          hasBackdrop= {true}
          onClose={() => this.drawerClose()} 
          isOpen= {this.state.isOpen}
          position= {POSITION_RIGHT}
          usePortal= {true}
          size= {Drawer.SIZE_SMALL}>

          <h3>Diagram</h3>
          <FormGroup
              label="Icon Display Name"
              labelFor="text-input"
              labelInfo="(required)"
              inline={false}
              intent={Intent.PRIMARY}>

              <div class="bp3-input-group .modifier">
                <span class="bp3-icon bp3-icon-filter"></span>
                <input type="text" class="bp3-input .modifier" placeholder="Display name"
                 prop='DisplayName'
                 value={this.state.userObject.GraphModel.DisplayName}
                 onChange={this.onValueChange}
                 />
              </div>
          </FormGroup>
          <h3>Calculator</h3>
          <h3>Deployment (in roadmap)</h3>
                  
          <a class="bp3-button Alignment.CENTER" role="button" onClick={this.saveForm}>Save</a>

      </Drawer>
    );
  }

  show = (userObject, saveCallback) => {
    this.setState({ isOpen: true, userObject: userObject, saveCallback: saveCallback });
  }
  onValueChange = (e) => {
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
      this.state.saveCallback(this.state.userObject);
      this.drawerClose();
  }
  drawerClose = () => {
      this.setState({ isOpen: false});
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
}