import React, { Component } from "react";
import {Card,Elevation, Overlay} from "@blueprintjs/core";
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';

export default class OverlayTutorial extends Component {
    constructor(props) {
      super(props);
        
      this.state = {
        isOpen: false,
        value: 'diagram', //tabs
      }
    }

    render = () => {
        return (
            <Overlay isOpen={this.state.isOpen} onClose={this.handleClose}>
                <Card className='workspace-overlay-box' interactive={false} elevation={Elevation.ONE}>
                    <Typography variant="h5" style={{marginBottom:'4px'}}>
                        Tutorial
                    </Typography>
                    <Tabs value={this.state.value} onChange={this.handleTabChange} style={{marginBottom:'6px'}}>
                        <Tab label="Diagram" value="diagram" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'diagram' ? "bold" : "" }}/>
                        <Tab label="Deploy Diagram on Azure" value="provision" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'provision' ? "bold" : "" }}/>
                    </Tabs>
                    <div hidden={this.state.value !== 'diagram'} style={{overflow: 'auto'}}>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Add Subnet
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            Right-click on Virtual Network (drag from Resource Palette) and
                            select "Add Subnet"
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Add NSG, UDR and NAT Gateway
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            To add Network Security Group and User-Defined Route, right-click any Subnet
                            and click on "Add Network Security Group" or "Add Route Table.
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            To add NAT Gateway, right-click on any Virtual Network and click "Add NAT Gateway"
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Add Azure services into Subnet
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            Certain services like Firewall, App Service Environment, Bastion to name a few
                            must reside in a dedicated subnet. I like to call these services "PaaS-in-VNet"
                            and Azure workbench validates this.
                            To add these services to Subnet, click on Subnet, then drag the service onto canvas
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Copy & Paste
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            "Ctrl C" on one or multi-selected Icons and "Ctrl V" duplicate Icons .
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            You can copy stencils from Microsoft Visio and do <b>"Ctrl V"</b> to paste on Canvas
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            You can copy any images from other websites and do <b>"Ctrl V"</b> to paste on Canvas, in cases when you can't find an Icon that suits your need
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Panning
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            Hold on to the "Right mouse button" and drag canvas tp drag Icons into view.
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            Canvas has unlimited amount of space to work with.
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Zoom
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            Hold "Shift" key and mouse wheel up/down to zoom in/out
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Grouping Stencils
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            When you group (right-click context menu) stencils, a hidden group cell is created to wrap your selected stencils.
                            *Just a note, to move stencils as a group, in a group, you have to select the "hidden" cell wrapping your grouped stencils
                            by clicking slightly outside the edge of outer-most stencil. You should then see a selected hidden cell, move this hidden cell to move grouped stencils.
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            *Caution: Delete a group will delete all child stencils, 
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
                        <Typography variant="body1" align="left">
                            Without login, you can generate a link to share your diagram. 
                        </Typography>
                        <Typography variant="h6" align="left" color="primary">
                            Save to browser
                        </Typography>
                        <Typography variant="body1" align="left" >
                            By performing Control+S diagram can be saved to Browser localstorage.
                            You can only save 1 copy, subsequent saving of diagram overrides the previous copy.
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" >
                        My Space
                        </Typography>
                        <Typography variant="body1" align="left" >
                            By logging in using your Azure AD work account,
                            You can catogorize and save your diagrams to Azure Workbench and load your saved diagrams anytime.
                        </Typography>
                    </div>
                    <div hidden={this.state.value !== 'provision'} style={{overflowY: 'auto'}}>
                        <Typography variant="h6" align="left" color="primary" >
                            Deploy Resources
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            In Resource Palette, any Stencil marked with a <Badge color="secondary" variant="dot">red-dotted badge</Badge>, 
                            these stencil can be deployed to your Azure subscription
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" >
                            How to deploy?
                        </Typography>
                        <Typography variant="body1" align="left" >
                            <ul>
                                <li>For each deployable stencil, double-click to open the Property panel</li>
                                <li>Switch to 'Provision' tab and fill in all Azure properties</li>
                                <li>At Toolbar, click on Azure menu, select Subscription and click Deploy</li>
                            </ul>
                            <Typography variant="body1" align="left" >*Note: NSG is deployable</Typography>
                        </Typography>
                        <Typography variant="body1" align="left" color="secondary" style={{marginTop:'30px'}}>
                            Azure Workbench must have Admin Consent granted by your Azure AD Global Admin before it can retrieve any Subscription and
                             Resource Group to perform any deploy
                        </Typography>
                    </div>
                </Card>
            </Overlay>
        )
    }

    show = () => this.setState({ isOpen: true });
    handleTabChange = (event, newVal) => { this.setState({value: newVal}); }
    handleClose = () => this.setState({ isOpen: false });
}