import React, { Component } from "react";
import {Card,Elevation, FormGroup, InputGroup, Button, Overlay, Intent} from "@blueprintjs/core";
import AuthService from '../../services/AuthService';

export default class OverlaySaveToWorkspace extends Component {
    constructor(props) {
      super(props);
        
      this.authService = new AuthService();

      this.state = {
        isOpen: false,
        collectionName: '',
        diagramName: ''
      }
    }

    render = () => {
        return (
            <Overlay isOpen={this.state.isOpen} onClose={this.handleClose}>
                <Card className='saveto-workspace-overlay-box' interactive={false} elevation={Elevation.ONE}>
                    <FormGroup
                        label="Collection Name"
                        labelFor="input-collectionname"
                        labelInfo="(required)">
                        <InputGroup id="input-collectionname" placeholder=""
                         value = {this.state.collectionName}
                         onChange={this.collNameOnChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Diagram Name"
                        labelFor="input-diagramname"
                        labelInfo="(required)">
                        <InputGroup id="input-diagramname" placeholder=""
                         value={this.state.diagramName}
                         onChange={this.diagramNameOnChange}/>
                    </FormGroup>
                    <Button intent={Intent.PRIMARY} alignText='center' text="Save" icon="saved"
                     onClick={this.saveToWorkspace}/>
                </Card>
            </Overlay>
        )
    }

    show = () => {
        this.setState({ isOpen: true });
    }

    saveToWorkspace = () => {
        this.props.DiagramEditor
            .saveDiagramToWorkspace(this.state.collectionName, this.state.diagramName)
        this.setState({ isOpen: false });
    }
    
    collNameOnChange = (e) => {
        this.setState({ collectionName: e.target.value });
    }
    diagramNameOnChange = (e) => {
        this.setState({ diagramName: e.target.value });
    }

    handleClose = () => this.setState({ isOpen: false });
}

