import React, { Component } from "reactn";
import {Toaster, MenuItem, Position, Button, Intent, Alignment} from "@blueprintjs/core";
import "../../assets/css/blueprint-override.css";

import Messages from './Helpers/Messages';
import Utils from './Helpers/Utils';
import {Select } from "@blueprintjs/select";
import { Typography } from "@material-ui/core";

export default class SelectLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            selectedValue: '',
            loading: false,
            locations: ['eastasia','southeastasia','centralus','eastus','eastus2',
            'westus','northcentralus','southcentralus','northeurope','westeurope',
            'japanwest','japaneast','brazilsouth','australiaeast','australiasoutheast',
            'southindia','centralindia','westindia','canadacentral','canadaeast','uksouth',
            'ukwest','westcentralus','westus2','koreacentral','koreasouth','francecentral',
            'francesouth','australiacentral','australiacentral2','uaecentral','uaenorth',
            'southafricanorth','southafricawest','switzerlandnorth','switzerlandwest',
            'germanynorth','germanywestcentral','norwaywest','norwayeast','brazilsoutheast','westus3']
        }

        if(Utils.IsNullOrUndefine(this.global.locations) ||
            Utils.IsNullOrUndefine(this.global.filteredLocations))
            this.setGlobal({locations: [], filteredLocations: []});

    }

    componentDidMount(){
        this.initPreviouslySelectedValue();
    }

    render = () => {
        return (
            <Select
                closeOnSelect={true}
                items={this.state.locations}
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

    renderLocation = (location, { handleClick, modifiers }) => {
        return (
            <MenuItem
                text={location}
                data-location={location}
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

        if(previouslySelectedValue != '') {
            this.setState({selectedValue:previouslySelectedValue});
            return;
        } else {
            this.setState({selectedValue: 'westus'});
        }
    }
}