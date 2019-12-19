import React, { Component } from "react";
import { FormGroup, InputGroup } from "@blueprintjs/core";

export default class PropertiesPanel extends Component {
  render() {
    return (
      <div className="propertiespanel-container">
        <div className="bp3-ui-text propertiespanel-header">Properties Panel</div>
        <FormGroup
          label="Resource Name"
          labelFor="text-input"
          labelInfo="(required)"
        >
          <InputGroup id="text-input" placeholder="Alabama" />
        </FormGroup>
      </div>
    );
  }
}