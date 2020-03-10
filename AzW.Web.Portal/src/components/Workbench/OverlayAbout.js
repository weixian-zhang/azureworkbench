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
                    <Typography variant="body1" align="left" gutterBottom>
                        This site is not related to Microsoft or Azure
                        although I happen to work at Microsoft.
                        Hope this tool can effectively help you in your daily tasks.
                    </Typography>
                    <br />
                    <Typography variant="body1" align="left" gutterBottom>
                        Tons of features are lined in the roadmap,
                        next up, deploying diagram to your Azure subscription.
                        Follow by Azure cost calculation as you drag resource onto canvas and more...
                    </Typography>
                    <br />
                    <Typography variant="body1" align="left" gutterBottom>
                        Your feedback is upmost important for me to identify and fix bugs to stablize Workbench.
                        Please let me know through: <b>weixianzhang@outlook.com</b>
                    </Typography>
                </Card>
            </Overlay>
        )
    }

    show = () => this.setState({ isOpen: true });

    handleClose = () => this.setState({ isOpen: false });
}