import React, { Component } from "reactn";
import {Toaster, MenuItem, Position, Button, Intent, Alignment} from "@blueprintjs/core";
import "../../assets/css/blueprint-override.css";
import AuthService from '../../services/AuthService';
import ARMService from '../../services/ARMService';

import Messages from './Helpers/Messages';
import Utils from './Helpers/Utils';
import {Select } from "@blueprintjs/select";
import { Typography } from "@material-ui/core";

export default class SelectLocation extends Component {
    constructor(props) {
        super(props);

        this.authService = new AuthService();
        this.armService = new ARMService();

        this.state = {
            searchQuery: '',
            selectedValue: '',
            loading: false
        }

        if(Utils.IsNullOrUndefine(this.global.locations) ||
            Utils.IsNullOrUndefine(this.global.filteredLocations))
            this.setGlobal({locations: [], filteredLocations: []});

    }

    componentDidMount(){
        this.getLocations();

        this.initPreviouslySelectedValue();
    }

    render = () => {
        return (
            <Select
                closeOnSelect={true}
                items={this.global.filteredLocations}
                itemRenderer={this.renderLocation}
                filterable={true}
                query={this.state.searchQuery}
                onQueryChange={this.searchQueryChange}
                noResults={<MenuItem disabled={true} text="No Locations" />}>
                <Button text={this.state.selectedValue == '' ? 'Location' : Utils.limitTextLength(this.state.selectedValue,15)}
                    alignText='left' loading={this.state.loading}
                    rightIcon="double-caret-vertical" style={{width: '170px', maxWidth: '170px'}}/>
            </Select>
        );
    }

    getLocations() {
    
        var thisComp = this;

        if(Utils.IsNullOrUndefine(this.global.locations))

            this.setState({loading:true});

            this.armService.getRegions(
                function onSuccess(regions){
                    thisComp.setState({loading:false});
                    thisComp.setGlobal({locations: regions, filteredLocations: regions});
                },
                function onFailure(error) {
                   thisComp.setState({loading:false});
                //    Toaster.create({
                //         position: Position.TOP,
                //         autoFocus: false,
                //         canEscapeKeyClear: true
                //       }).show({intent: Intent.DANGER, timeout: 6000, message: error});
                }
            );
    }

    renderLocation = (location, { handleClick, modifiers }) => {
        return (
            <MenuItem
                text={location.DisplayName}
                data-location={location.ProvisionName}
                onClick={this.onLocationSelect}
            />
        );
    }

    searchQueryChange = (newQuery) => {
        if(newQuery === "")
            this.setGlobal({filteredLocations: this.global.locations});
        else
        {
            this.setGlobal({filteredLocations: this.global.locations.filter(x => String(x.DisplayName).toLowerCase().startsWith(newQuery))});
        }
    }

    onLocationSelect = (sender) => {
        var location = sender.currentTarget.dataset.location;
        this.setState({selectedValue:location});
        this.props.onValueChange(location);

        //reset filteredLocations,
        //if not, other components using SelectLocations will see filtered query
        this.setGlobal({filteredLocations: this.global.locations}); 
    }

    initPreviouslySelectedValue = () =>{
        var previouslySelectedValue = this.props.SelectedLocation;

        if(!Utils.IsNullOrUndefine(previouslySelectedValue))
            this.setState({selectedValue:previouslySelectedValue});
    }
}