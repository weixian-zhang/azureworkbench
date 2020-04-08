import React, { Component } from "reactn";
import {Button, MenuItem, MenuDivider} from "@blueprintjs/core";
import ComputeService from '../../services/ComputeService';

import { Typography } from "@material-ui/core";
import VM from '../../models/VM';

import Toast from './Helpers/Toast';
import Messages from './Helpers/Messages';
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
                fill={true} >
    
            </Suggest>
                //query={this.state.searchQuery}
            // <Grid container>
            //     <Grid item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="flex-start"
            //         style={{width: '270px', marginBottom:'10px'}}>
            //         <Grid item sm={3}>
            //             <Autocomplete
            //                 options={ this.state.vmImages.map(option => option) }
            //                 getOptionLabel={option => option.Sku}
            //                 style={{width: '280px', overflowY: 'auto', overflowX: 'hidden'}}
            //                 onInputChange={this.onSearchTextChange}
            //                 onChange={this.onImageSelected}
            //                 renderInput={(params) =>
            //                 <TextField {...params} label="VM Images" margin="normal"
            //                     // InputProps={{
            //                     //     ...params.InputProps,
            //                     //     endAdornment: (
            //                     //     <React.Fragment>
            //                     //         {this.state.isLoading ? <CircularProgress color="inherit" size={20} /> : null}
            //                     //         {params.InputProps.endAdornment}
            //                     //     </React.Fragment>
            //                     //     ),
            //                     // }} 
            //                 />}
            //                 renderOption={
            //                     (vmimage, { selected }) => (
            //                         <div style={{width: '100%'}}>
            //                             <div style={{background:'#e8f4f8'}}>
            //                                 <Typography fontSize={10} variant="body2">
            //                                     Sku: {vmimage.Sku}
            //                                 </Typography>
            //                                 <Typography fontSize={10} variant="body2">
            //                                     Offer: {vmimage.Offer}
            //                                 </Typography>
            //                                 <Typography fontSize={10} variant="body2">
            //                                     Publisher: {vmimage.Publisher}
            //                                 </Typography>
            //                             </div>
            //                         </div>
            //                     )
            //                 }
            //             />
            //         </Grid>
            //     </Grid>
            // </Grid>
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

        var vmImg = new VMimage

        var displayName = item.currentTarget.dataset.displayname;
        vmImg.Publisher = item.currentTarget.dataset.publisher;
        vmImg.Offer = item.currentTarget.dataset.offer;
        vmImg.Sku = item.currentTarget.dataset.sku;
        vmImg.Version = item.currentTarget.dataset.version;
        
        this.setState({searchQuery: displayName});

        this.props.onValueChange(vmImg);
    }
}