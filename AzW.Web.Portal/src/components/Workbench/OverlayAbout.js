import React, { Component } from "react";
import {Card,Elevation, Overlay} from "@blueprintjs/core";
import Typography from '@material-ui/core/Typography';

export default class OverlayAbout extends Component {
    constructor(props) {
      super(props);
        
      this.state = {
        isOpen: false,
      }
    }

    render = () => {
        return (
            <Overlay isOpen={this.state.isOpen} onClose={this.handleClose}>
                <Card className='workspace-overlay-about' interactive={false} elevation={Elevation.ONE}>
                    <Typography color="inherit" variant="h6" align="center">
                        <img src ={require('../../assets/azure_icons/azworkbench-logo.png')} alt="" style={{width : 25, height : 25, marginRight: 3}} />
                        <b>Azure Workbench</b>
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                        Azure Workbench is not related to Microsoft or Azure.
                        It's a hobby project hope you enjoy using.
                    </Typography>
                    <br />
                    <Typography variant="body1" align="left" gutterBottom>
                        I am constantly working on bug fixes and new features. 
                        Your feedback is important 
                        please let me know at: <b>weixzha@microsoft.com</b>
                    </Typography>
                </Card>
            </Overlay>
        )
    }

    show = () => this.setState({ isOpen: true });

    handleClose = () => this.setState({ isOpen: false });
}