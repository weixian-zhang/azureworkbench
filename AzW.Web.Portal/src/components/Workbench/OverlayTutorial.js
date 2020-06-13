import React, { Component } from "react";
import {Card,Elevation, Overlay} from "@blueprintjs/core";
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import { InteractionRequiredAuthError } from "msal";

export default class OverlayTutorial extends Component {
    constructor(props) {
      super(props);
        
      this.state = {
        isOpen: false,
        value: 'drawing', //tabs
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
                        <Tab label="Drawing a Diagram" value="drawing" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'drawing' ? "bold" : "" }}/>
                        <Tab label="Diagram In General" value="diagram" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'diagram' ? "bold" : "" }}/>
                        <Tab label="Deploy to Azure" value="provision" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'provision' ? "bold" : "" }}/>
                    </Tabs>
                    <div hidden={this.state.value !== 'drawing'} style={{overflow: 'auto'}}>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Resource Palette
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            The Resource Palette contains Connectors, Shapes, Picture Shapes and Azure Nodes that you can drag onto canvas to start drawing a diagram.
                            "Non-Azure" nodes do not represent an Azure resource and therefore are not deployable to Azure.
                            For "Azure" nodes that are deployable to Azure, it is marked with a red badge. I strive to make all Azure nodes deployable in near future. 
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Draw a link from Node
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            Straight, Bezier(curved) and Orthogonal(segmented) connector line are known as Link.
                            In addition to dragging links onto canvas from Resource Palette, you can directly drag link from any node
                            by mouse-over North South East West bounds of a node, you will see a grey box apprearing.
                            Grey box is known as a Port to any node, mouse-down on the Port and drag the Link to any node's Port.
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Copy & Paste
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            You can copy any image from other websites and do <b>"Ctrl V"</b> to paste on Canvas, in cases when you can't find an Icon that suits your need
                        </Typography>
                        <img src={require("../../assets/azure_icons/tutorial-copyimageotherwebsite.png")} width="500px" height="250px" /> 
                        <Typography variant="body1" align="left" gutterBottom>
                            "Ctrl C" on one or multi-selected nodes and "Ctrl V" to duplicate selected nodes.
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            You can copy nodes from Microsoft Visio and do <b>"Ctrl V"</b> to paste on Canvas
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Panning (move canvas view)
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            Hold on to Right-mouse button and move mouse to shift canvas view. Canvas has unlimited space for drawing
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Zoom
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            Hold "Control" key and Mouse Wheel Up/Down to zoom in/out
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Group & Ungroup
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            To group nodes, select 1 or more nodes and right-click on canvas or on any nodes and click "Group"
                            You can also hit "Ctrl+G" to group nodes.
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            *Caution: Delete a group will delete all child nodes, 
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Rename nodes
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            Single click on the bottom "edge" of any Picture node will set focus to a textbox for you to rename node.
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Add Subnet or Nat Gateway
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            Right-click on Virtual Network (drag from Resource Palette "Networking") and
                            select "Add/Remove Subnet" or "Add/Remove NAT Gateway"
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Add Network Security Group or User-Defined Route
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            To add Network Security Group and User-Defined Route, right-click any Subnet
                            and click on "Add/Remove NSG" or "Add/Remove Route Table.
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Add VNet-Injectable Services onto Subnet
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            <a href="https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-for-azure-services#services-that-can-be-deployed-into-a-virtual-network" target="_blank">
                            Certain services</a> like Kubernetes Service, Firewall, App Service Environment or API Management Premium
                            must either resides in a shared or dedicated subnet. I like to call these services "VIR" or VNet-Injectable Services,
                            Workbench validates them to make sure these VIR are in subnets.
                            To add these services to Subnet, click on Subnet, then drag the service onto canvas.
                        </Typography>
                    </div>
                    <div hidden={this.state.value !== 'diagram'} style={{overflow: 'auto'}}>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Save Diagram as PDF
                        </Typography>
                        <Typography variant="body2" align="left" gutterBottom>
                            There are 2 ways to save diagram as PDF
                            <ul>
                                <li>
                                    Use the native Workbench "Export as PDF"
                                </li>
                                <li>
                                    Use Browser PDF feature.
                                    First "Export diagram as SVG", then open "diagram.svg" in browser and leverage browser's Save-PDF by initiating a Browser Print.
                                </li>
                            </ul>
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Drag files onto Canvas
                        </Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            You can drag any PNG, SVG or .azwb files onto canvas.
                            *Note: Image file cannot be larger than 400Kb.
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" gutterBottom>
                            Generate Share Link
                        </Typography>
                        <Typography variant="body1" align="left">
                            Without login, you can still generate a link to share your diagram with ypur friends
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
                            In Resource Palette, any node marked with a <Badge color="secondary" variant="dot">red-dotted badge</Badge>, 
                            these node can be deployed to your Azure subscription
                        </Typography>
                        <Typography variant="h6" align="left" color="primary" >
                            How to deploy?
                        </Typography>
                        <Typography variant="body1" align="left" >
                            <ul>
                                <li>For each deployable node, double-click to open the Property panel</li>
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