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
                <Card className='workspace-overlay-box' interactive={false} elevation={Elevation.ONE}>
                    <Typography variant="body1" align="center" gutterBottom>
                        Right-click on Virtual Network (drag from Resource Palette) and
                        select "Add Subnet"
                    </Typography>
                    <Typography variant="h6" align="left" color="primary" gutterBottom>
                        Add Azure services into Subnet
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                        Certain services like Firewall, App Service Environment, Bastion to name a Firewall
                        must reside in a dedicated subnet. I like to call these services "PaaS-in-VNet"
                        and Azure workbench validates this.
                        To add these services to Subnet, click on Subnet, then drag the service onto canvas
                    </Typography>
                    <Typography variant="h6" align="left" color="primary" gutterBottom>
                        Panning
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                        Hold on to the "Right mouse button" and drag canvas.
                        Canvas has unlimited amount of space to work with.
                    </Typography>
                    <Typography variant="h6" align="left" color="primary" gutterBottom>
                        Zoom
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                        Hold "Shift" key and mouse wheel up/down to zoom in/out
                    </Typography>
                    <Typography variant="h6" align="left" color="primary" gutterBottom>
                        Rename Icons and Azure services
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                        Double-click on icons to rename.
                        For Azure service icons, double-clicking them will show a Property Panel that includes features in the roapmap for directly deploying 
                        diagram to your Azure Subscription.
                        And on-the-fly calculate Azure costing base on icons on canvas
                    </Typography>
                    <Typography variant="h6" align="left" color="primary" gutterBottom>
                       Generate Share Link
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                        Without login, you can generate a link to share your diagram. 
                    </Typography>
                    <Typography variant="h6" align="left" color="primary" gutterBottom>
                        Save to browser
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                        By performing Control+S diagram can be saved to Browser localstorage.
                        You can only save 1 copy, subsequent saving of diagram overrides the previous copy.
                    </Typography>
                    <Typography variant="h6" align="left" color="primary" gutterBottom>
                       My Space
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                        By loggin using your Azure AD work account,
                        You can catogorize and save your diagrams to Azure Workbench and load your saved diagrams anytime.
                    </Typography>
                </Card>
            </Overlay>
        )
    }

    show = () => this.setState({ isOpen: true });

    handleClose = () => this.setState({ isOpen: false });
}