import React, { Component } from "react";
import ServiceEndpoint from '../../../models/ServiceEndpoint';
import { Drawer, MenuItem, Button, Alignment } from "@blueprintjs/core";
import { ItemRenderer, MultiSelect, Select } from "@blueprintjs/select";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

export default class ServiceEndpointPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        isSelectPopoverOpen: false,
        userObject: new ServiceEndpoint(),
        saveCallback: function () {},
      }
  }

  componentDidMount () {
  }

  render = () => {
    return (
      <Drawer
          title="Service Endpoint Properties"
          autoFocus= {true}
          canEscapeKeyClose= {true}
          canOutsideClickClose= {true}
          enforceFocus= {true}
          hasBackdrop= {true}
          onClose={() => this.drawerClose()} 
          isOpen= {this.state.isOpen}
          position= {POSITION_RIGHT}
          usePortal= {true}
          size= {'560px'}
          className="propPanelDrawer">
              <Grid container spacing={12} className="propPanelGrid">
                <Grid item xs={12}>
                  
                  {this.renderProvisionTab()}

                </Grid>
              </Grid>
      </Drawer>
    );
  }

  renderProvisionTab() {
   
    return (
        <div className = "propPanelTabContent">
           <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1} style={{marginTop: '15px', width: '100%'}}>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item>
                    <label>PaaS Services allowed by this subnet</label>
                </Grid>
                <Grid item>
                <Select
                  items={this.state.userObject.ProvisionContext.ServiceEndpointTargetServices}
                  itemRenderer={ (service) => {
                    return (
                      <MenuItem
                          icon={service.isSelected ? "tick" : "blank"}
                          text={service.displayName}
                          shouldDismissPopover={false} 
                          onClick={() => {
                            this.onServiceSelect(service)
                          }}/>
                    );
                  }}
                  escape
                  noResults={<MenuItem disabled={true} text="No images" />}
                  closeOnSelect={true}
                  fill={false}
                  filterable= {false}
                  popoverProps={true}>
                  <Button text='Services'
                      alignText='left'
                      rightIcon="double-caret-vertical" />
                </Select>
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                <Grid item>
                    {
                      this.renderSelectedServices()
                    }
                </Grid>
              </Grid>
          </Grid>
      </div>
    );
  }

  renderSelectedServices() {
    var selectedServices =
      this.state.userObject.ProvisionContext.ServiceEndpointTargetServices;
    
    if(selectedServices.filter(x => x.isSelected))
        return (
          <div>
            {
              selectedServices.map(svcend => {
                if(svcend.isSelected)
                  return <Typography variant="body1">{svcend.displayName}</Typography>
              })
            }
          </div>
        );
    else
        return '';
  }

  onServiceSelect(service) {
    var azcontext = this.state.userObject;
    
    for(var svc of azcontext.ProvisionContext.ServiceEndpointTargetServices) {
        if(svc.resourceName == service.resourceName){
            if(svc.isSelected)
                svc.isSelected = false;
            else
                svc.isSelected = true;

            break;
        }
    }
    this.setState({userObject:azcontext});
  }

  show = (userObject, saveCallback) => {
    this.setState({ isOpen: true, userObject: userObject, saveCallback: saveCallback });
  }

  onDiagramIconNameChange = (e) => {
    var propName = e.target.getAttribute('prop');
    var userObj = this.state.userObject;
    var value = e.target.value;
    switch (propName) {
      case 'DisplayName':
        userObj.GraphModel.DisplayName = value;
        break;
    
      default:
        break;
    }
    this.setState({userObject: userObj});
  }

  saveForm = () => {
      this.drawerClose();
  }
  drawerClose = () => {
    this.state.saveCallback(this.state.userObject);
      this.setState({ isOpen: false});
  }

  handleChange = (event, newVal) => {
    this.setState({value: newVal});
  }
}