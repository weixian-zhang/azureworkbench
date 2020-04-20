import React, { Component } from "reactn";
import {Toaster, MenuItem, Position, Button, Intent, Alignment} from "@blueprintjs/core";
import "../../assets/css/blueprint-override.css";
import ComputeService from '../../services/ComputeService';
import Utils from './Helpers/Utils';
import {Select } from "@blueprintjs/select";
import { Typography } from "@material-ui/core";

export default class SelectServiceTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            selectedValue: '',
            loading: false,
            errorOnGetTag: false
        }

        this.computeSvc = new ComputeService();

        if(Utils.IsNullOrUndefine(this.global.svcTags) ||
            Utils.IsNullOrUndefine(this.global.filteredSvcTags))
            this.setGlobal({svcTags: [], filteredSvcTags: []});
    }

    componentDidMount(){
        this.getServiceTags();

        this.initPreviouslySelectedValue();
    }

    render = () => {
        return (
            <Select
                closeOnSelect={true}
                items={this.global.filteredSvcTags}
                itemRenderer={this.renderSvcTags}
                filterable={true}
                query={this.state.searchQuery}
                onQueryChange={this.searchQueryChange}
                noResults={<MenuItem disabled={true} text="No Service Tags" />}>
                <Button text={this.state.selectedValue == '' ? 'Service Tags' : Utils.limitTextLength(this.state.selectedValue,12)}
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

    getServiceTags = () => {
    
        var thisComp = this;

        if(Utils.IsNullOrUndefine(this.global.svcTags))

            this.setState({loading:true});

            this.computeSvc.getServiceTags(
                function onSuccess(tags){
                    thisComp.setState({loading:false});
                    thisComp.setGlobal({svcTags: tags, filteredSvcTags: tags});
                },
                function onFailure(error) {
                    thisComp.setState({loading:false,errorOnGetTag:true});
                }
            );
    }

    renderSvcTags = (svcTag, { handleClick, modifiers }) => {
        return (
            <MenuItem
                text={svcTag.Name}
                data-tag={svcTag.Name}
                onClick={this.onSvcTagSelect}
            />
        );
    }

    searchQueryChange = (newQuery) => {
        if(newQuery === "")
            this.setGlobal({filteredSvcTags: this.global.svcTags});
        else
            this.setGlobal({filteredSvcTags: this.global.svcTags.filter(x => String(x.Name).toLowerCase().includes(newQuery))});
    }

    onSvcTagSelect = (sender) => {
        var svcTagNAme = sender.currentTarget.dataset.tag;
        this.setState({selectedValue:svcTagNAme});
        this.props.onValueChange(svcTagNAme);

        //reset filteredLocations, if not, other components using SelectLocations will see
        //filtered query
        this.setGlobal({filteredLocations: this.global.svcTags}); 
    }

    initPreviouslySelectedValue = () =>{
        var previouslySelectedValue = this.props.SelectedServiceTag;

        if(!Utils.IsNullOrUndefine(previouslySelectedValue))
            this.setState({selectedValue:previouslySelectedValue});
    }
}