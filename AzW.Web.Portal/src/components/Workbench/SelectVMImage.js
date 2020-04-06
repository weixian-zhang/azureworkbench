import React, { Component } from "reactn";
import {Button} from "@blueprintjs/core";
import ComputeService from '../../services/ComputeService';

import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";

import Toast from './Helpers/Toast';
import Messages from './Helpers/Messages';
import Utils from './Helpers/Utils';
import {Select } from "@blueprintjs/select";

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
        this.autocomTextInput = null;
    }

    render = () => {
        return (
            <Grid container>
                <Grid item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center"
                    style={{width: '280px', marginBottom:'10px'}}>
                    <Grid item sm={3}>
                        <Autocomplete
                        defaultValue={null}
                        clearOnEscape={true}
                        ClearIndicator={true}
                        autoComplete={true}
                        options={this.state.vmImages.map(option => option)}
                        getOptionLabel={(option) => option.Offer + ', ' + option.Sku}
                        style={{width: '350px', overflow: 'auto'}}
                        inputValue = {this.state.inputValue}
                        onInputChange={this.onSearchTextChange}
                        onChange={this.onImageSelected}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Search VM images" margin="normal" />} />
                    </Grid>
                </Grid>
                {/* <Grid container xs="12" spacing="1" justify="flex-start" alignItems="flex-start" style={{width: '100%'}}>
                   <Grid item sm={4}>
                        <Button small={true} text="Windows" onClick={this.searchWindowsServerImage} />
                   </Grid>
                   <Grid item sm={4}>
                        <Button small={true} text="Ubuntu" onClick={this.searchUbuntuImage} />
                   </Grid>
                   <Grid item sm={4}>
                        <Button small={true} text="Debian" onClick={this.searchDebianImage} />
                   </Grid>
                </Grid>
                <Grid container xs="12" spacing="1" justify="flex-start" alignItems="flex-start" style={{width: '100%'}}>
                    <Grid item sm={6}>
                        <Button small={true} text="SUSE" onClick={this.searchSUSEImage} />
                    </Grid>
                    <Grid item sm={6}>
                        <Button small={true} text="RedHat" onClick={this.searchRedHatImage} />
                    </Grid>
                </Grid> */}
            </Grid>
        );
    }

    onSearchTextChange = (event, inputValue) => {
        var thisComp = this;
        this.setState({inputValue: inputValue});

        if(!Utils.IsNullOrUndefine(inputValue) && String(inputValue).length >= 3)
        {
            thisComp.setState({vmImages: []});

            this.computeSvc.searchVMImages
                (inputValue,
                    function onSuccess(vmImages){
                        thisComp.setState({vmImages: vmImages});
                    },
                    function onFailure(error) {
                        Toast.show('warning', 4000, error);
                    })
        }
    }

    onImageSelected = (event, value, reason) => {
        this.props.onValueChange(value);
    }

    // searchWindowsServerImage = () => {
    //     this.setState({inputValue: 'MicrosoftWindowsServer'});
    //     //this.onSearchTextChange(null, 'MicrosoftWindowsServer');
    // }

    // searchUbuntuImage = () => {
    //     this.onSearchTextChange(null, 'UbuntuServer');
    // }

    // searchSUSEImage = () => {
    //     this.onSearchTextChange(null, 'SUSE');
    // }
    
    // searchRedHatImage = () => {
    //     this.onSearchTextChange(null, 'RedHat');
    // }

    // searchDebianImage = () => {
    //     this.onSearchTextChange(null, 'Debian');
    // }
}