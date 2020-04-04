import React, { Component } from "reactn";
import {MenuItem, Card,Elevation,Position, FormGroup, InputGroup, Button, Overlay, Intent} from "@blueprintjs/core";
import AuthService from '../../services/AuthService';
import ARMService from '../../services/ARMService';

import Toast from './Helpers/Toast';
import Messages from './Helpers/Messages';
import Utils from './Helpers/Utils';
import {Select } from "@blueprintjs/select";

export default class SelectResourceGroup extends Component {
    constructor(props) {
        super(props);

        this.authService = new AuthService();
        this.armService = new ARMService();

        this.state = {
            searchQuery: '',
            filteredRGs: [],
            rgs: [],
            selectedValue: ''
        }
    }

    componentDidMount(){
        this.getRGs();
    }

    render = () => {
        return (
            <Select
                items={this.state.filteredRGs}
                itemRenderer={this.renderRGs}
                filterable={true}
                query={this.state.searchQuery}
                onQueryChange={this.searchQueryChange}
                popoverProps={true}
                noResults={<MenuItem disabled={true} text="No Resource Group" />}>
                <Button text={this.state.selectedValue == '' ? 'Resource Group' : Utils.limitTextLength(this.state.selectedValue, 15)}
                    rightIcon="double-caret-vertical" style={{width: '170px', maxWidth: '170px'}}/>
            </Select>
        );
    }

    getRGs() {
        if(!this.IsSubscriptionSelected())
            return;

        var thisComp = this;
        var subscriptionId = this.global.currentSubscription.SubscriptionId;
        
        if(this.state.rgs.length == 0)
            this.armService.getResourceGroups(
                subscriptionId,
                function onSuccess(rscGroups){
                    thisComp.setState({rgs: rscGroups, filteredRGs: rscGroups});
                },
                function onFailure(error) {
                    Toast.show(Intent.DANGER, 6000, error)
                }
            );
    }

    renderRGs = (location, { handleClick, modifiers }) => {
        return (
            <MenuItem
                text={location.Name}
                data-rg={location.Name}
                onClick={this.onRGSelect}
            />
        );
    }

    searchQueryChange = (newQuery) => {
        if(newQuery === "")
            this.setState({filteredRGs: this.state.rgs});
        else
        {
            this.setState({filteredRGs: this.state.rgs.filter(x => String(x.Name).toLowerCase().startsWith(newQuery))});
        }
    }

    onRGSelect = (sender) => {
        var selectedRG = sender.currentTarget.dataset.rg;
        this.setState({selectedValue:selectedRG});
        this.props.onValueChange(selectedRG);
    }

    getCurrentValue() {
        return this.state.currentLocation;
    }

    IsSubscriptionSelected() {
        if(this.global.currentSubscription == null)
        {
            Toast.show(Intent.WARNING, 3000, Messages.SubscriptionNotSelectedError());
            return false;
        }
        else
            return true;
    }
}