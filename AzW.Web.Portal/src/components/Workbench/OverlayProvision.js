import React, { Component  } from "reactn";
import {MenuItem, Card,Elevation, Button, Overlay, Intent} from "@blueprintjs/core";
import AuthService from '../../services/AuthService';
import ARMService from '../../services/ARMService';
import Subscription from '../../models/services/Subscription';
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
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
        loading: false,
        provisionBtnLoading: false,
        currentSubscription: null,
        subscriptions: [],
        header: null,
        newRGName: '',
        location: ''
        
      }
    }

    componentDidMount(){
        this.rgNameInput = React.createRef();
    }

    render = () => {
        return (
            <Overlay isOpen={this.state.isOpen} onClose={this.handleClose}>
                <Card className='provision-overlay-box' interactive={false} elevation={Elevation.ONE}>
                    <Typography variant="button" style={{fontSize:16,textAlign:'left'}}>
                        Azure Tool Rack
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={1} style={{marginTop: '15px', width: '100%', textAlign:'center'}}>
                            <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                                <Grid item sm={3}>
                                    <label>Subscription</label>
                                </Grid>
                                <Grid item>
                                    <Select
                                            items={this.state.subscriptions}
                                            itemRenderer={this.renderSubscriptions}
                                            noResults={<MenuItem disabled={true}
                                            text={this.authService.isUserLogin() ? "No Subscription" : "Login required..."} />}
                                            filterable={false} >
                                            
                                            <Button text={this.global.currentSubscription == null ? 'Subscription' : Utils.limitTextLength(this.global.currentSubscription.Name, 15) }
                                                onClick={
                                                    (Utils.IsNullOrUndefine(this.state.subscriptions)) ?
                                                        this.getSubscriptions : null
                                                }
                                                loading={this.state.loading} alignText='left' style={{maxWidth:'180px'}} rightIcon="double-caret-vertical"/>
                                        </Select>
                                        
                                </Grid>
                                <Grid item>
                                    <Button intent={Intent.NONE} text="" icon="refresh"
                                                    onClick={this.getSubscriptions} style={{marginLeft: '5px'}}/>
                                </Grid>
                            </Grid>
                           
                            <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                                <Grid item sm={12}/>
                                <Grid item sm={12}/>
                                <Grid item sm={12}>
                                    <Button intent={Intent.PRIMARY} text="Deploy Diagram to Azure" icon="delta"
                                            loading={this.state.provisionBtnLoading} onClick={this.provisionDiagram} style={{marginLeft: '20px'}}/>
                                </Grid>
                                <Grid item sm={12}>
                                    <div className="bp3-running-text" variant="body1" style={{color: '#FF6347'}}>
                                        *Azure Workbench requires either your Azure AD Global Admin, App Admin or Cloud App Admin to grant <a target="_blank" href="https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent">Admin Consent </a>
                                         to Workbench, to be able to retrieve Subscriptions, Resource Groups and perform deployment.
                                        Workbench only creates and will NOT update/delete any resource in your subscription.
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                                <Grid item sm={12}/>
                                <Grid item sm={12}/>
                                <Grid item sm={12}/>
                                <Grid item sm={12}><Divider /></Grid>
                                <Grid item sm={12} />
                                <Grid item sm={3}>
                                    <label>Create new Resource Group</label>
                                </Grid>
                                <Grid item>
                                    <input ref={this.rgNameInput} type="text" placeholder="new resource group name"  class="bp3-input .modifier"
                                            onChange={(e) => {
                                                this.setState({newRGName: e.target.value})}}/>
                                </Grid>
                            </Grid>
                            <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                                <Grid item sm={3} />
                                <Grid item>
                                        <SelectLocation onValueChange={(loc) => {
                                            this.setState({location: loc})
                                        }} />
                                </Grid>
                                <Grid item>
                                    <Button intent={Intent.PRIMARY} text="Create" icon="new-layers"
                                    onClick={this.createNewRG} style={{marginLeft: '8px'}}/>
                                </Grid>
                                {/* <Grid item sm={12}>
                                    <div className="bp3-running-text" variant="body1">
                                        Create new Resource Group
                                    </div>
                                </Grid> */}
                            </Grid>
                        </Grid>
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
            this.setState({loading:true});

            var thisComp = this;

            this.armService.getSubscriptions(
                function onSuccess(subs) {
                    thisComp.setState({subscriptions: subs, loading: false});
                    thisComp.rgNameInput.current.value = '';
                },
                function onFailure(error) {
                    //it could fail if Overlay is closed while retrieving
                    //purposely removed Toast to avoid spamming error
                    thisComp.setState({loading: false});
                }
            );
        }
    }

    provisionDiagram = () => {

        if(Utils.IsNullOrUndefine(this.global.currentSubscription))
        {
            Toast.show('none', 2000, "Please select a subscription");
            return;
        }

        this.state.header.deployDiagramToAzure(this.global.currentSubscription);
        this.handleClose();
    }

    createNewRG = () => {
        if(!this.state.newRGName || !this.state.location || !this.global.currentSubscription)
        {
            Toast.show('warning', 4000, "Subscription, Resource group name and Location are needed to create resource group");
            return;
        }

        var thisComp = this;

        this.armService.createNewResourceGroup
            (
                this.global.currentSubscription.SubscriptionId,
                this.state.location,
                this.state.newRGName,
                function onSuccess(){
                    thisComp.rgNameInput.current.value = '';
                    thisComp.setState({newRGName: ''})
                    Toast.show('success', 2000, "Resource Group created successfully");
                },
                function onFailure(error){
                    Toast.show('danger', 8000, Messages.GeneralHttpError());
                }
             );
    }

    show = (header) => { 
        this.setState({ isOpen: true, header: header });
    }
    handleClose = () => { 
        this.setState({ isOpen: false });
        this.props.OnOverlayProvisionClose();
        
    }
}

