import React, { Component } from "reactn";
import {Toaster, MenuItem, Position, Button, Intent, Alignment} from "@blueprintjs/core";
import "../../assets/css/blueprint-override.css";
import Utils from './Helpers/Utils';
import {Select } from "@blueprintjs/select";
import { Typography } from "@material-ui/core";

export default class SelectVNet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedValue: '',
            vnetNames: [],
            loading: false,
            errorOnGetTag: false
        }
    }

    componentDidMount(){
        this.loadVNets();
        this.initPreviouslySelectedValue();
    }

    render = () => {
        return (
            <Select
                closeOnSelect={true}
                items={this.state.vnetNames}
                itemRenderer={this.renderVNets}
                filterable={true}
                noResults={<MenuItem disabled={true} text="No VNets detected" />}>
                <Button text={this.state.selectedValue == '' ? 'VNet' : Utils.limitTextLength(this.state.selectedValue,12)}
                    alignText='left' loading={this.state.loading}
                    rightIcon="double-caret-vertical" style={{width: '135px', maxWidth: '135px'}}/>
                                {
                (this.state.errorOnGetTag) ?
                        <Typography style={{fontSize:10,color:'red',display:'block', marginTop:'3px'}} variant="body2">
                            A server-side error occured when getting service tags
                        </Typography>
                    :   null
                }
            </Select>
        );
    }

    loadVNets = () => {
        var vnetNames = [];
        var vnetAzContexts = Utils.GetVNetNames(this.props.Diagram);
        for(var vnet of vnetAzContexts)
        {
            if(vnet.Name != '')
            vnetNames.push(vnet.Name);
        }

        this.setState({vnetNames: vnetNames});
    }

    renderVNets = (vnetName, { handleClick, modifiers }) => {
        return (
            <MenuItem
                text={vnetName}
                data-tag={vnetName}
                onClick={this.onVNetNameSelect}
            />
        );
    }

    searchQueryChange = (newQuery) => {
        if(newQuery === "")
            this.setGlobal({filteredSvcTags: this.global.svcTags});
        else
            this.setGlobal({filteredSvcTags: this.global.svcTags.filter(x => String(x.Name).toLowerCase().includes(newQuery))});
    }

    onVNetNameSelect = (sender) => {
        var vnetName = sender.currentTarget.dataset.tag;
        this.setState({selectedValue:vnetName});
        this.props.onValueChange(vnetName);
    }

    initPreviouslySelectedValue = () =>{
        var previouslySelectedValue = this.props.SelectedValue;

        if(!Utils.IsNullOrUndefine(previouslySelectedValue))
            this.setState({selectedValue:previouslySelectedValue});
    }
}