import React, { Component } from "react";
import {Toaster, Card,Elevation,Position, FormGroup, InputGroup, Button, Overlay, Intent} from "@blueprintjs/core";
import AuthService from '../../services/AuthService';
import Messages from './Helpers/Messages';
import Utils from './Helpers/Utils';
import { Typography } from "@material-ui/core";

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
                         onChange={this.collNameOnChange}
                         maxlength="50"/>
                    </FormGroup>
                    <FormGroup
                        label="Diagram Name"
                        labelFor="input-diagramname"
                        labelInfo="(required)">
                        <InputGroup id="input-diagramname" placeholder=""
                         value={this.state.diagramName}
                         onChange={this.diagramNameOnChange}
                         maxlength="60"/>
                    </FormGroup>
                    <Button intent={Intent.PRIMARY} text="Save" icon="saved"
                     onClick={this.saveToWorkspace}/>
                    <Typography variant="body2">
                        *Note: Same Collection and Diagram name will override your saved diagram
                    </Typography>
                    <Typography variant="body2">
                        You can also use "save current diagram to Space" feature in 'My Space' to override existing diagrams
                    </Typography>
                </Card>
            </Overlay>
        )
    }

    show = () => {
        this.setState({ isOpen: true });
    }

    saveToWorkspace = () => {
        if(Utils.IsNullOrUndefine(this.state.collectionName) ||
        Utils.IsNullOrUndefine(this.state.diagramName))
            {
                Toaster.create({
                    position: Position.TOP,
                    autoFocus: false,
                    canEscapeKeyClear: true
                  }).show({intent: Intent.DANGER, timeout: 3000, message: Messages.SaveWorkspaceFieldNotEmpty()});
                  return;
            }

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

