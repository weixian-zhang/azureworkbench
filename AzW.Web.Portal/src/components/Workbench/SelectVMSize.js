import React, { Component } from "reactn";
import { MenuItem, MenuDivider, Card, Button} from "@blueprintjs/core";
import Typography from '@material-ui/core/Typography';
import ComputeService from '../../services/ComputeService';

import Utils from './Helpers/Utils';
import {Select} from "@blueprintjs/select";
import VMimage from "../../models/services/VMimage";

export default class SelectVMSize extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vmSizes: [],
            filteredVMSizes: [],
            //searchQuery: '',
            inputValue: '',
            isLoading: false,
            selectedValue: '',
            isSelectPopoverOpen: false
        };

        this.computeSvc = new ComputeService();
    }

    componentDidMount() {
        this.getVMSizes();
        this.initPreviouslySelectedValue();
    }

    render = () => {
        return (
            <Select
                items={this.state.filteredVMSizes}
                itemRenderer={this.renderSizes}
                filterable={true}
                escape
                noResults={<MenuItem disabled={true} text="No images" />}
                //query={this.state.searchQuery}
                onQueryChange={this.searchQueryChange}
                onItemSelect={this.onImageSelected}
                closeOnSelect={true}
                fill={true}
                popoverProps={{isOpen:this.state.isSelectPopoverOpen,canEscapeKeyClose:true}}>
                <Button text={this.state.selectedValue == '' ? 'VM Size' : Utils.limitTextLength(this.state.selectedValue,15)}
                    onClick={this.vmSizeSelectBtnClock}
                    alignText='left' loading={this.state.isLoading}
                    rightIcon="double-caret-vertical" style={{width: '170px', maxWidth: '170px'} }/>
            </Select>
        );
    }

    searchQueryChange = (newQuery) => {
        if(newQuery === "")
            this.setState({filteredVMSizes: this.state.vmSizes});
        else
        {
            this.setState({filteredVMSizes: this.state.vmSizes.filter(x => String(x.Name).toLowerCase().includes(newQuery))});
        }
    }

    vmSizeSelectBtnClock = () => {
        if(!this.state.isSelectPopoverOpen)
            this.setState({isSelectPopoverOpen:true});
        else
            this.setState({isSelectPopoverOpen:false});
    }

    getVMSizes = () => {

        this.setState({isLoading: true});
        var thisComp = this;

        this.computeSvc.getVMSizes(
            function onSuccess(vmSizes) {
                thisComp.setState({isLoading: false});

                thisComp.setState({vmSizes: vmSizes, filteredVMSizes: vmSizes});
            },
            function onFailure() {
                thisComp.setState({isLoading: false});
            }
        );
    }

    renderSizes = (size, {handleClick}) => {
        return (
            <div data-sizename={size.Name} onClick={this.onSizeSelected} style={{marginBottom:'5px'}}>
                <Typography variant='button' style={{fontWeight:'bold'}}>
                    {size.Name}
                </Typography>
                <Typography style={{fontSize:11}}>
                    MemoryInGB: { Math.ceil(size.MemoryInMB / 1000) }                
                </Typography>
                <Typography style={{fontSize:11}}>
                    NoOfCores: {size.NumberOfCores}                
                </Typography>
                <Typography style={{fontSize:11}}>
                    MaxNoOfDataDisks: {size.MaxNoOfDataDisks}                
                </Typography>
                <MenuDivider />
            </div>
            
        );
    }

    onSizeSelected = (item, event) => {

        var sizeName = item.currentTarget.dataset.sizename;
        
        this.setState({selectedValue: sizeName});

        this.props.onValueChange(sizeName);

        this.setState({isSelectPopoverOpen: false});
    }

    initPreviouslySelectedValue = () =>{
        var previouslySelectedValue = this.props.SelectedSizeName;

        if(!Utils.IsNullOrUndefine(previouslySelectedValue))
            this.setState({selectedValue:previouslySelectedValue});
    }
}