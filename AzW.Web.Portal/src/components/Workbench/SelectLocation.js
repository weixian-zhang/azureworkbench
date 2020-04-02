import React, { Component } from "react";
import {Toaster, MenuItem, Card,Elevation,Position, FormGroup, InputGroup, Button, Overlay, Intent} from "@blueprintjs/core";
import AuthService from '../../services/AuthService';
import ARMService from '../../services/ARMService';

import Messages from './Helpers/Messages';
import Utils from './Helpers/Utils';
import {Select } from "@blueprintjs/select";

export default class SelectLocation extends Component {
    constructor(props) {
        super(props);

        this.authService = new AuthService();
        this.armService = new ARMService();

        this.state = {
            searchQuery: '',
            filteredLocations: [],
            locations: [],
            selectedValue: ''
        }
    }

    componentDidMount(){
        this.getLocations();
    }

    render = () => {
        return (
            <Select
                items={this.state.filteredLocations}
                itemRenderer={this.renderLocation}
                filterable={true}
                query={this.state.searchQuery}
                onQueryChange={this.searchQueryChange}
                popoverProps={true}
                noResults={<MenuItem disabled={true} text="No Locations" />}>
                <Button text={this.state.selectedValue == '' ? 'southeastasia' : this.state.selectedValue}
                    rightIcon="double-caret-vertical"/>
            </Select>
        );
    }

    getLocations() {
        var thisComp = this;
        if(this.state.locations.length == 0)
            this.armService.getRegions(
                function onSuccess(regions){
                    thisComp.setState({locations: regions, filteredLocations: regions});
                },
                function onFailure(error) {
                   Toaster.create({
                        position: Position.TOP,
                        autoFocus: false,
                        canEscapeKeyClear: true
                      }).show({intent: Intent.DANGER, timeout: 6000, message: error});
                }
            );
    }

    renderLocation = (location, { handleClick, modifiers }) => {
        return (
            <MenuItem
                text={location.Name}
                data-location={location.Name}
                onClick={this.onLocationSelect}
            />
        );
    }

    searchQueryChange = (newQuery) => {
        if(newQuery === "")
            this.setState({filteredLocations: this.state.locations});
        else
        {
            this.setState({filteredLocations: this.state.locations.filter(x => String(x.Name).startsWith(newQuery))});
        }
    }

    filterLocation(query, location, index) {
        var a;
    }

    onLocationSelect = (sender) => {
        var location = sender.currentTarget.dataset.location;
        this.setState({selectedValue:location});
        this.props.onValueChange(location);
    }

    getCurrentValue() {
        return this.state.currentLocation;
    }
}