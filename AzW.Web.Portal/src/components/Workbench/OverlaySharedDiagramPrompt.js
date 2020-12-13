import React, { Component } from "react";
import {Card,Elevation,Position, FormGroup, InputGroup, Button, Overlay, Intent} from "@blueprintjs/core";
import AuthService from '../../services/AuthService';
import Toast from './Helpers/Toast';
import Utils from './Helpers/Utils';
import { Typography } from "@material-ui/core";

export default class OverlaySharedDiagramPrompt extends Component {
    constructor(props) {
      super(props);
        
      this.authService = new AuthService();

      this.state = {
        isOpen: false,
        onPromptCloseFunc: null,
        diagramName: ''
      }
    }

    render = () => {
        return (
            <Overlay isOpen={this.state.isOpen} onClose={this.handleClose}>
                <Card className='sharedDiagram-MySpace-overlay-box' interactive={false} elevation={Elevation.ONE}>
                    <FormGroup
                        label="Diagram Name"
                        labelFor="input-diagramname"
                        labelInfo="E.g: share/project/team (friendly diagram name, required)">
                        <InputGroup id="input-diagramname" placeholder=""
                         value = {this.state.diagramName}
                         onChange={this.diagramNameOnChange}
                         maxlength="40"/>
                    </FormGroup>
                    <Typography variant="body2">
                        *Signed-in users can manage Share-Diagrams in MySpace
                    </Typography>
                    <div style={{textAlign: "right"}}>
                        <Button intent={Intent.PRIMARY} text="Save" icon="saved"
                        onClick={this.saveDiagramName} />
                    </div>
                </Card>
            </Overlay>
        )
    }

    show = (onPromptCloseFunc) => {
        this.setState({ 
            onPromptCloseFunc: onPromptCloseFunc,
            isOpen: true });
    }

    saveDiagramName = () => {
        if(Utils.IsEmptyString(this.state.diagramName))
        {
            Toast.show("warning", 3000, "Diagram name cannot be empty");
            return;
        } else {
            this.state.onPromptCloseFunc(this.state.diagramName);

            //this.props.DiagramEditor.shareDiagram(this.state.diagramName)
            this.setState({ isOpen: false });
        }
    }
    
    diagramNameOnChange = (e) => {
        this.setState({ diagramName: e.target.value });
    }

    handleClose = () => this.setState({ isOpen: false });
}

