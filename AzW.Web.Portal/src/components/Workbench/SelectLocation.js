import React, { Component } from "reactn";
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
            selectedValue: ''
        }

        if(Utils.IsNullOrUndefine(this.global.locations) ||
            Utils.IsNullOrUndefine(this.global.filteredLocations))
            this.setGlobal({locations: [], filteredLocations: []});
    }

    componentDidMount(){
        this.getLocations();
    }

    render = () => {
        return (
            <Select
                items={this.global.filteredLocations}
                itemRenderer={this.renderLocation}
                filterable={true}
                query={this.state.searchQuery}
                onQueryChange={this.searchQueryChange}
                popoverProps={true}
                noResults={<MenuItem disabled={true} text="No Locations" />}>
                <Button text={this.state.selectedValue == '' ? 'Location' : this.state.selectedValue}
                    rightIcon="double-caret-vertical" style={{width: '110px', maxWidth: '110px'}}/>
            </Select>
        );
    }

    getLocations() {
        var thisComp = this;
        if(Utils.IsNullOrUndefine(this.global.locations))
            this.armService.getRegions(
                function onSuccess(regions){
                    thisComp.setGlobal({locations: regions, filteredLocations: regions});
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
            this.setGlobal({filteredLocations: this.global.locations});
        else
        {
            this.setGlobal({filteredLocations: this.global.locations.filter(x => String(x.Name).startsWith(newQuery))});
        }
    }

    onLocationSelect = (sender) => {
        var location = sender.currentTarget.dataset.location;
        this.setState({selectedValue:location});
        this.props.onValueChange(location);

        //reset filteredLocations, if not, other components using SelectLocations will see
        //filtered query
        this.setGlobal({filteredLocations: this.global.locations}); 
    }

    getCurrentValue() {
        return this.state.currentLocation;
    }
}