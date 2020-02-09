import React, { Component } from "react";
import { NumericInput, InputGroup, Drawer, Tooltip, Intent, Button } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import { CirclePicker } from 'react-color';
import Grid from '@material-ui/core/Grid';
import { mxConstants } from "mxgraph-js";

export default class StylePropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        cell: null,
        stroke: {
          key: mxConstants.STYLE_STROKECOLOR,
          value: ''
        },
        fill: {
          key: mxConstants.STYLE_FILLCOLOR,
          value: ''
        },
        fillColor: '',
        saveCallback: null,

        colors: ["transparent", "#000000 ","#ffffff", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]
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
          size= {Drawer.SIZE_SMALL}
          className='proppanel'>
          <Grid
            container
            direction="row"
            justify="center"
            alignContent="center">
              {
                  
                   (this.state.cell != null && this.state.cell.isEdge()) ?
                    <div>
                      <h3>Stroke Color</h3>
                      <CirclePicker colors={this.state.colors} onChangeComplete={this.onstrokeColorChange} />
                      </div>
               :
                  <div>
                    <h3>Stroke Color</h3>
                    <CirclePicker colors={this.state.colors} onChangeComplete={this.onstrokeColorChange} />
                    <h3>Background Color</h3>
                    <CirclePicker colors={this.state.colors} onChangeComplete={this.onfillColorChange} />
                  </div>
              }
         </Grid>
         <Grid
          container
          direction="row"
          justify="center"
          alignContent="center">
            <Grid item md={12}>
              <br />
            </Grid>
            <Grid item md={12}>
              <Button alignText="center" className="buttonStretch" text="Save" onClick={this.saveStyle} />
            </Grid>
          </Grid>
      </Drawer>
    );
  }

  show = (cell, saveCallback) => {
    this.setState({ 
      isOpen: true, 
      cell: cell,
      saveCallback: saveCallback });
  }

  onstrokeColorChange = (color, event) => {
    var stroke = this.state.stroke;
    stroke.value = color.hex;
    this.setState({ stroke: stroke });
  }

  onfillColorChange = (color, event) => {
    var fill = this.state.fill;
    fill.value = color.hex;
    this.setState({ fill: fill });
  }

  saveStyle = () => {
      var style = {
          stroke: this.state.stroke,
          fill: this.state.fill
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