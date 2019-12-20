import React, { Component } from "react";
import Draggable from "react-draggable";
import { Tooltip, Position } from "@blueprintjs/core";
import "./resourcepalette.css";

export default class ResourcePalette extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rpWidth: 230
    };
  }

  handleDrag = (e, ui) => {
    console.log(ui.deltaX);
    this.setState({
      rpWidth: this.state.rpWidth + ui.deltaX
    });
  };

  render() {
    return (
      <div className="rp" style={{ width: this.state.rpWidth }}>
        <div className="rp-main">
          render items here
        </div>
        <Draggable axis="x" bounds={{left: -222, right: 230}} onDrag={this.handleDrag}>
          <div className="rp-collapse" style={{ transform: "none" }}></div>
        </Draggable>
      </div>
    );
  }
}