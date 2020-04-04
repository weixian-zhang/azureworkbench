import React, { Component } from "reactn";
import {MenuItem, Card,Elevation,Position, FormGroup, InputGroup, Button, Overlay, Intent} from "@blueprintjs/core";
import AuthService from '../../services/AuthService';
import ARMService from '../../services/ARMService';

import Toast from './Helpers/Toast';
import Messages from './Helpers/Messages';
import Utils from './Helpers/Utils';
import {Select } from "@blueprintjs/select";

export default class SelectVMImage extends Component {
    constructor(props) {
        super(props);

        this.setState({
            vmImages: [],
            searchQuery: ''
        });
    }

    render = () => {
        return (
            <Select
                items={this.state.vmImages}
                itemRenderer={this.renderRGs}
                filterable={true}
                query={this.state.searchQuery}
                onQueryChange={this.searchQueryChange}
                popoverProps={true}
                noResults={<MenuItem disabled={true} text="No Resource Group" />}>
                <Button text={this.state.selectedValue == '' ? 'Resource Group' : Utils.limitTextLength(this.state.selectedValue, 15)}
                    rightIcon="double-caret-vertical" style={{maxWidth: '180px', maxHeight: '50px'}}/>
            </Select>
        );
}