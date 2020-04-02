import React, { Component  } from "reactn";
import {MenuItem, Card,Elevation,Position, FormGroup, InputGroup, Button, Overlay, Intent} from "@blueprintjs/core";
import AuthService from '../../services/AuthService';
import ARMService from '../../services/ARMService';
import Subscription from '../../models/services/Subscription';

import Toast from './Helpers/Toast';
import Messages from './Helpers/Messages';
import SelectLocation from './SelectLocation';
import Utils from './Helpers/Utils';
import {Select } from "@blueprintjs/select";
import { Typography } from "@material-ui/core";

export default class OverlayProvision extends Component {
    constructor(props) {
      super(props);
        
      this.authService = new AuthService();
      this.armService = new ARMService();

      this.state = {
        isOpen: false,
        currentSubscription: null,
        subscriptions: [],
        header: null,
        newRGName: '',
        location: ''
      }
    }

    render = () => {
        return (
            <Overlay isOpen={this.state.isOpen} onClose={this.handleClose}>
                <Card className='provision-overlay-box' interactive={false} elevation={Elevation.ONE}>
                    <Select
                        items={this.state.subscriptions}
                        itemRenderer={this.renderSubscriptions}
                        noResults={<MenuItem disabled={true}
                        text={this.authService.isUserLogin() ? "No Subscription" : "Login required..."} />}
                        
                        filterable={false}>
                        {/* children become the popover target; render value here */}
                        <Button text={this.global.currentSubscription == null ? 'Subscription' : Utils.limitTextLength(this.global.currentSubscription.Name, 15) }
                           style={{maxWidth:'180px'}} rightIcon="double-caret-vertical"/>
                    </Select>
                    <Button intent={Intent.NONE} text="" icon="refresh"
                            onClick={this.getSubscriptions} style={{marginLeft: '5px'}}/>

                    <Button intent={Intent.PRIMARY} text="Deploy" icon="delta"
                            onClick={this.provisionDiagram} style={{marginLeft: '20px'}}/>

                    <FormGroup
                            label="Resource Group Name"
                            inline={false} intent={Intent.PRIMARY}>
                        <input id="icon-display-name" type="text" class="bp3-input .modifier"
                        onChange={(e) => {
                            this.setState({newRGName: e.target.value})
                        }}/>
                        <SelectLocation onValueChange={(loc) => {this.setState({location: loc}); }} />
                        <Button intent={Intent.PRIMARY} text="Create New Resource Group" icon="new-layers"
                            onClick={this.createNewRG} style={{marginLeft: '20px'}}/>
                    </FormGroup>

                    <Typography variant="body2" style={{marginTop: '30px'}}>
                        *Azure Workbench can deploy your diagram to your Azure subscription, choose a subscription to deploy.
                    </Typography>
                </Card>
            </Overlay>
        )
    }

    renderSubscriptions = (subscription, { handleClick, modifiers }) => {
        return (
            <MenuItem
                text={subscription.Name}
                data-subscriptionname={subscription.Name}
                data-subscriptionid={subscription.SubscriptionId}
                onClick={this.onSubscriptionClick}
            />
        );
    }

    onSubscriptionClick = (sender) => {
        var subscriptionName = sender.currentTarget.dataset.subscriptionname;
        var subscriptionId = sender.currentTarget.dataset.subscriptionid;
        var sub = new Subscription();
        sub.Name = subscriptionName;
        sub.SubscriptionId = subscriptionId;

        this.setGlobal({
            currentSubscription: sub
        });

        this.forceUpdate();
    }

    getSubscriptions = () => {
        if(this.authService.isUserLogin())
        {
            var thisComp = this;

            this.armService.getSubscriptions(
                function onSuccess(subs) {
                    thisComp.setState({subscriptions: subs});
                },
                function onFailure(error) {
                    Toast.show(Intent.DANGER,8000, error);
                    return;
                }
            );
        }
    }

    provisionDiagram = () => {
        if(Utils.IsNullOrUndefine(this.global.currentSubscription))
            return;

        this.state.header.deployDiagramToAzure(this.global.currentSubscription);
    }

    createNewRG() {
        if(!this.state.newRGName)
        {
            Toast.show('warning', 2000, "Enter a new resource group name");
            return;
        }

        this.armService.createNewResourceGroup
            (
                this.global.currentSubscription.SubscriptionId,
                this.state.location,
                this.state.newRGName,
                function onSuccess(){},
                function onFailure(error){
                    Toast.show('danger', 8000, Messages.GeneralHttpError());
                }
             );
    }

    show = (header) => { 
        this.setState({ isOpen: true, header: header });
        this.getSubscriptions();
    }
    handleClose = () => { 
        this.setState({ isOpen: false });
        this.props.OnOverlayProvisionClose();
        
    }
}

