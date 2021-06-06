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
            filteredPublishers: [],
            filteredImages: [],
            publisherSearchableName: '',
            searchQuery: '',
            inputValue: '',
            isLoading: false,
            selectedImage: ''
        };

        this.computeSvc = new ComputeService();
    }

    componentDidMount() {
        this.getVMImagePublisher();
        this.initPreviouslySelectedValue();
    }

    render = () => {
        return (
            <div>
                <div>
                    <Suggest
                        items={this.state.filteredPublishers}
                        itemRenderer={this.renderPublishers}
                        inputValueRenderer={this.publisherSearchboxValueRenderer}
                        noResults={<MenuItem disabled={true} text="No publishers" />}
                        query={this.state.publisherSearchableName}
                        onQueryChange={this.onPublisherTextChange}
                        onItemSelect={this.onPublisherSelected}
                        closeOnSelect={true}
                        fill={true}
                        inputProps={{type:"search", placeholder:"images publishers...", leftIcon:'search'}}>
                    </Suggest>
                </div>
                <div style={{marginTop:'5px'}}>
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
                        inputProps={{type:"search", placeholder:"VM images...", leftIcon:'search'}}>
                    </Suggest>
                </div>
            </div>
        );
    }

    onPublisherTextChange = (searchText, event) => {

        if(searchText.length < 3)
            return;

        if(searchText === "") {
            this.setState({filteredPublishers: this.global.cacheVMImagePublishers});
        }
        else {
            this.setState({filteredPublishers: this.global.cacheVMImagePublishers.filter(x => String(x.SearchableName).toLowerCase().includes(String(searchText).toLowerCase()))});
        }
    }

    onSearchTextChange = (searchText, event) => {

        if(searchText.length < 3)
            return;

        if(searchText === "") {
            this.setState({filteredImages: this.global.cacheVMImages});
        }
        else
        {
            var regex = '/' + String(searchText).toLowerCase() + '/';
            this.setState({
                filteredImages: this.global.cacheVMImages.filter(x => {
                    return String(x.SearcheableName).toLowerCase().includes(String(searchText).toLowerCase())
                })
            });
            //this.setState({filteredImages: this.global.cacheVMImages.filter(x => String(x.DisplayName).toLowerCase().indexOf(searchText.toLowerCase()) !== -1)}); //.includes(String(searchText).toLowerCase()))});
        }
    }

    publisherSearchboxValueRenderer = (publisher) => {
        return publisher.SearchableName;
    }

    searchboxValueRenderer = (vmImg) => {
        return vmImg.Sku;
    }

    renderPublishers = (pub, {handleClick}) => {
        return (
            <div>
                <MenuItem
                    text={pub.SearchableName}
                    data-searchableName={pub.SearchableName}
                    data-publisher={pub.Publisher}
                    onClick={this.onPublisherSelected}>
                </MenuItem>
                <MenuDivider />
            </div>

        );
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

    onPublisherSelected = (item, event) => {
        var thisComp = this;

        var searchableName = item.currentTarget.dataset.searchablename;
        var publisher = item.currentTarget.dataset.publisher;

        this.setState({publisherSearchableName: searchableName});
        thisComp.setState({
            filteredImages: [],
            searchQuery: ''
        });

        this.computeSvc.getAllVMImages(publisher,
            function onSuccess(images) {
                thisComp.setState({isLoading: false});

                thisComp.setState({filteredImages: images});

                thisComp.setState({isLoading: true});
            },
            function onFailure() {
                thisComp.setState({isLoading: false});
            }
        );
    }

    onImageSelected = (item, event) => {

        var vmImg = new VMimage()

        var displayName = item.currentTarget.dataset.displayname;
        vmImg.Publisher = item.currentTarget.dataset.publisher;
        vmImg.Offer = item.currentTarget.dataset.offer;
        vmImg.Sku = item.currentTarget.dataset.sku;
        vmImg.Version = item.currentTarget.dataset.version;
        vmImg.PublisherSearchableName = this.state.publisherSearchableName;

        this.setState({
            searchQuery: displayName});

        this.props.onValueChange(vmImg);
    }

    getVMImagePublisher = () => {

        var thisComp = this;

        if(this.global.cacheVMImagePublishers.length == 0) {

            var publishersInBrowser = LocalStorage.getWithExpiry(LocalStorage.KeyNames.VMImagePublishers);
            if(publishersInBrowser != null) {
                this.setGlobal({cacheVMImagePublishers: publishersInBrowser});
                this.setState({filteredPublishers: publishersInBrowser});
                this.setState({isLoading: false});
                return;
            }

            this.computeSvc.getAllVMImagePublishers(
                function onSuccess(publishers) {
                    thisComp.setState({isLoading: false});
                    thisComp.setGlobal({cacheVMImagePublishers: publishers});
                    thisComp.setState({filteredPublishers: publishers});
                    thisComp.setState({isLoading: true});

                    LocalStorage.setWithExpiry(LocalStorage.KeyNames.VMImagePublishers, publishers, 3);
                },
                function onFailure() {
                    thisComp.setState({isLoading: false});
                }
            );

        }
    }


    initPreviouslySelectedValue = () =>{
        var previouslySelectedValue = this.props.SelectedImage;

        var imageDisplayName =
            previouslySelectedValue.VMOffer + ', ' + previouslySelectedValue.VMSKU;

        if(!Utils.IsNullOrUndefine(previouslySelectedValue))
            this.setState({
                searchQuery: imageDisplayName,
                publisherSearchableName: previouslySelectedValue.VMPublisherSearchableName
            });
    }
}