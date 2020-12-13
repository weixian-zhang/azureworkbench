import React, { Component } from "reactn";
import {MenuItem, MenuDivider} from "@blueprintjs/core";
import ComputeService from '../../services/ComputeService';

import Utils from './Helpers/Utils';
import {Suggest} from "@blueprintjs/select";
import VMimage from "../../models/services/VMimage";

export default class SelectVMImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vmImages: [],
            searchQuery: '',
            inputValue: '',
            isLoading: false,
            selectedImage: ''
        };

        this.computeSvc = new ComputeService();
    }

    componentDidMount() {
        this.initPreviouslySelectedValue();
    }

    render = () => {
        return (
            <Suggest
                items={this.state.vmImages}
                itemRenderer={this.renderImages}
                inputValueRenderer={this.searchboxValueRenderer}
                noResults={<MenuItem disabled={true} text="No images" />}
                query={this.state.searchQuery}
                onQueryChange={this.onSearchTextChange}
                onItemSelect={this.onImageSelected}
                closeOnSelect={true}
                fill={true}
                inputProps={{type:"search", placeholder:"Search VM images...", leftIcon:'search'}}>
    
            </Suggest>
        );
    }

    onSearchTextChange = (searchText, event) => {

        var thisComp = this;

        if(!Utils.IsNullOrUndefine(searchText) && String(searchText).length >= 3)
            {
                this.setState({isLoading: true});

                this.setState({vmImages: []}, () => { //get new images after setstate takes effect
                    this.computeSvc.searchVMImages(searchText,
                        function onSuccess(vmImgs){
                            //thisComp.setState({isLoading: false});
                            thisComp.setState({vmImages: vmImgs});
                        },
                        function onFailure(error) {
                            //thisComp.setState({isLoading: false});
                        })
                });
            }
    }

    searchboxValueRenderer = (vmImg) => {
        return vmImg.Sku;
    }

    renderImages = (img, {handleClick}) => {
        return (
            <div>
                <MenuItem 
                    text={img.DisplayName }
                    data-displayname={img.DisplayName}
                    data-publisher={img.Publisher}
                    data-offer={img.Offer}
                    data-sku={img.Sku}
                    data-version={img.Version}
                    onClick={this.onImageSelected}>
                </MenuItem>
                <MenuDivider />
            </div>
            
        );
    }

    onImageSelected = (item, event) => {

        var vmImg = new VMimage()

        var displayName = item.currentTarget.dataset.displayname;
        vmImg.Publisher = item.currentTarget.dataset.publisher;
        vmImg.Offer = item.currentTarget.dataset.offer;
        vmImg.Sku = item.currentTarget.dataset.sku;
        vmImg.Version = item.currentTarget.dataset.version;
        
        this.setState({
            searchQuery: displayName});

        this.props.onValueChange(vmImg);
    }

    initPreviouslySelectedValue = () =>{
        var previouslySelectedValue = this.props.SelectedImage;

        var imageDisplayName =
            previouslySelectedValue.VMOffer + ', ' + previouslySelectedValue.VMSKU;

        if(!Utils.IsNullOrUndefine(previouslySelectedValue))
            this.setState({searchQuery: imageDisplayName});
    }
}