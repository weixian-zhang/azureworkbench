import React, { Component } from "react";
import { FormGroup, InputGroup, Drawer, Tooltip, Intent, Button } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import { SketchPicker } from 'react-color';

export default class StylePropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        cell: null,
        strokeColor: '',
        fillColor: '',
        saveCallback: null
      }
  }

  render = () => {
    return (
      <Drawer
          title="Style"
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
          
        {
            (this.state.cell != null && this.state.cell.isEdge()) ?
                <div>
                    <h3>Stroke Color</h3>
                    <SketchPicker onChangeComplete={this.onstrokeColorChange} />
                </div>
            :
                <div>
                    <h3>Stroke Color</h3>
                    <SketchPicker onChangeComplete={this.onstrokeColorChange} />
                    <h3>Background Color</h3>
                    <SketchPicker onChangeComplete={this.onfillColorChange} />
                </div>
        }
          
          <a class="bp3-button Alignment.CENTER" role="button" onClick={this.saveStyle}>Save</a>

      </Drawer>
    );
  }

  show = (cell, saveCallback) => {
    this.setState({ isOpen: true, cell: cell, saveCallback: saveCallback });
  }

  onstrokeColorChange = (color, event) => {
    this.setState({ strokeColor: color.hex });
  }

  onfillColorChange = (color, event) => {
    this.setState({ fillColor: color.hex });
  }

  saveStyle = () => {
      var style = {
          strokeColor: this.state.strokeColor,
          fillColor: this.state.fillColor
      }
      this.state.saveCallback(style);
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