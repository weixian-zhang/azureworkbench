import React, { Component } from "react";
import {Toaster, Position } from "@blueprintjs/core";


export const AppToaster = Toaster.create({
    autoFocus: false,
    canEscapeKeyClear: true,
    position: Position.TOP,
    enableHtml: false
});


export default class Toast extends Component {
    constructor(props) {
    }
  
    static show = (intent, duration, message) => {
      if(!intent || !duration)
        AppToaster.show({intent: 'primary', timeout: 2000, message: message});
      else
        AppToaster.show({intent: intent,timeout: duration, message: message});
    }

    static warn = (duration, message) => {
        AppToaster.show({intent: 'warning', timeout: duration, message: message});
    }
  }