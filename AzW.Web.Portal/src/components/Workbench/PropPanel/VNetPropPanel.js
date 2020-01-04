import React, { Component } from "react";
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, Switch, Drawer, DrawerLayout } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";

export default class VNetPropPanel extends Component {
  constructor(props) {
      super(props);
      this.state ={
        isOpen: false
      }
  }


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
              
              <a class="bp3-button Alignment.CENTER" role="button" tabIndex={0}>Click</a>
    
      </Drawer>
    );
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
}