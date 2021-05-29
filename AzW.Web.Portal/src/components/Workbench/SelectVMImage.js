import React, { Component } from "reactn";
import {MenuItem, MenuDivider} from "@blueprintjs/core";
import ComputeService from '../../services/ComputeService';
import LocalStorage from '../../services/LocalStorage';
import Utils from './Helpers/Utils';
import {Suggest} from "@blueprintjs/select";
import VMimage from "../../models/services/VMimage";

export default class SelectVMImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredImages: [],
            searchQuery: '',
            inputValue: '',
            isLoading: false,
            selectedImage: ''
        };

        this.computeSvc = new ComputeService();
    }

    componentDidMount() {
        this.getVMImages();
        this.initPreviouslySelectedValue();
    }

    render = () => {
        return (
            <Suggest
                items={this.state.filteredImages}
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
        if(searchText === "") {
            this.setState({filteredImages: this.global.cacheVMImages});
        }
        else
        {
            this.setState({filteredImages: this.global.cacheVMImages.filter(x => String(x.DisplayName).toLowerCase().indexOf(searchText.toLowerCase()) !== -1)}); //.includes(String(searchText).toLowerCase()))});
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

    getVMImages = () => {

        //broswer cache 1st tier
        //global cache is 2nd tier cache
        if(this.global.cacheVMImages.length == 0) {

            var vmimageinBrowser = LocalStorage.getWithExpiry(LocalStorage.KeyNames.VMImage);

            if(vmimageinBrowser != null) {
                this.setGlobal({cacheVMImages: vmimageinBrowser});
                this.setState({filteredImages: vmimageinBrowser});

                this.setState({isLoading: true});
            } else {
                var thisComp = this;
                //browser cache empty, get from API Redis
                this.computeSvc.getAllVMImages(
                    function onSuccess(images) {
                        thisComp.setState({isLoading: false});
                        thisComp.setGlobal({cacheVMImages: images});
                        thisComp.setState({filteredImages: images});
                        thisComp.setState({isLoading: true});

                        LocalStorage.setWithExpiry(LocalStorage.KeyNames.VMImage, images, 3);
                    },
                    function onFailure() {
                        thisComp.setState({isLoading: false});
                    }
                );
            }

        } else {
            this.setState({filteredImages: this.global.cacheVMImages});
        }
    }

    initPreviouslySelectedValue = () =>{
        var previouslySelectedValue = this.props.SelectedImage;

        var imageDisplayName =
            previouslySelectedValue.VMOffer + ', ' + previouslySelectedValue.VMSKU;

        if(!Utils.IsNullOrUndefine(previouslySelectedValue))
            this.setState({searchQuery: imageDisplayName});
    }
}