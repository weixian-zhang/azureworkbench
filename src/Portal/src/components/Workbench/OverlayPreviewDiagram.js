import React, { Component } from "react";
import {Card,Elevation, Overlay} from "@blueprintjs/core";
import Typography from '@material-ui/core/Typography';

export default class OverlayPreviewDiagram extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      }

      this.previewCanvas = React.createRef();
    }

    // componentDidMount() {
        
    // }

    render() {
        return (
            <Overlay  isOpen={this.state.isOpen} onClose={this.handleClose}>
                <Card  className='overlay-preview' interactive={false} elevation={Elevation.ONE}>
                    <div ref={this.previewCanvas}></div>
                </Card>
            </Overlay>
        )
    }

    show = () => {
        this.setState({ isOpen: true });
        return this.previewCanvas.current;
    }

    handleClose = () => this.setState({ isOpen: false });
}