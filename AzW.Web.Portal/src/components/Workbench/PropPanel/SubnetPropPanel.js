import React, { Component } from "react";
import Subnet from '../../../models/Subnet';
import { FormGroup, Drawer, Tooltip, Intent, Button } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from "@material-ui/core/Grid";
import AppBar from '@material-ui/core/AppBar';
import IPCIDR  from 'ip-cidr';
import { Cidr } from 'cidr-lib';
import { Typography } from "@material-ui/core";
import Utils from "../Helpers/Utils";

export default class SubnetPropPanel extends Component {

  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        userObject: new Subnet(),
        cidrInvalid: true,
        isWithinVNetRange: true,
        value: 'diagram', //tabs

        saveCallback: function () {},
      }

      this.cidrRanger = new Cidr();
  }

  render = () => {
    return (
      <Drawer
          title="Subnet Properties"
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
                  {/* <AppBar position="static" color = "transparent">
                    <Tabs value={this.state.value}  onChange={this.handleChange} >
                      <Tab label="Diagram" value="diagram" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'diagram' ? "bold" : "" }}/>
                      <Tab label="Provision" value="provision" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'provision' ? "bold" : "" }}/>
                      <Tab label="Calculator" value="calculator" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'calculator' ? "bold" : "" }}/>
                    </Tabs>
                  </AppBar>
                  <div
                      className = "propPanelTabContent"
                      hidden={this.state.value !== 'diagram'}>
                        <FormGroup
                              label="Icon Display Name"
                              labelFor="icon-display-name"
                              inline={true}
                              intent={Intent.PRIMARY}>
                              <div class="bp3-input-group .modifier">
                                  <textarea class="bp3-input .modifier bp3-large bp3-fill"
                                        style={{'max-width':'250px', 'max-height':'200px'}}
                                        maxlength="80"
                                        dir="auto"
                                        prop='DisplayName'
                                        value={this.state.userObject.GraphModel.DisplayName}
                                        onChange={this.onDiagramIconNameChange}
                                        autoFocus ={true}
                                        />
                              </div>
                        </FormGroup>
                    </div> */}
                    
                    {this.renderProvisionTab()}

                    {/* {this.renderCalculatorTab()} */}
                </Grid>
                <Grid item xs={12}>
                  
                </Grid>
              </Grid>
      </Drawer>
    );
  }

  show = (userObject, saveCallback) => {
    this.setState({ isOpen: true, userObject: userObject, saveCallback: saveCallback });
  }

  renderProvisionTab() {
    // if(this.state.value != 'provision')
    //   return null;

      return (
        <div className = "propPanelTabContent">
          <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1} style={{marginTop: '15px', width: '100%'}}>
              <Grid container item direction="row" xs="12" justify="flex-start" alignItems="center">
                <Grid item sm={3}>
                    <label>Subnet Name</label>
                </Grid>
                <Grid item>
                  <input id="icon-display-name" type="text" class="bp3-input .modifier"
                    value={this.state.userObject.ProvisionContext.Name} 
                    onChange={(e) => {
                      var uo = this.state.userObject;
                      uo.ProvisionContext.Name = e.target.value
                      this.setState({userObject:uo});
                    }} />
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" justify="flex-start" alignItems="center"
               style={{marginBottom: '18px'}}>
                <Grid item sm={3}>
                    <label>Address Space</label>
                </Grid>
                <Grid item>
                  <input id="icon-display-name" type="text" class="bp3-input .modifier" style={{marginRight: '5px'}}
                    value={this.state.userObject.ProvisionContext.AddressSpace} 
                    onChange={(e) => {
                      
                      if(!this.isAddressValidAndInRange(e.target.value))
                          this.setState({cidrInvalid: false});
                      else {
                          this.setState({cidrInvalid: true});
                      }

                      var uo = this.state.userObject;
                      uo.ProvisionContext.AddressSpace = e.target.value
                      this.setState({userObject:uo});
                    }} />
                    <label>
                      {Utils.getIPCountFromCidr(this.state.userObject.ProvisionContext.AddressSpace)} addresses
                    </label>
                    {
                      (!this.state.cidrInvalid) ?
                        <Typography style={{fontSize:10,color:'red',display:'block', marginTop:'3px'}} variant="body2">
                          Invalid address, overlaps subnets or not within VNet range
                        </Typography>
                      :   null
                    }
                </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" justify="flex-start" alignItems="center">
                <Grid item>
                  <label>VNet Address: </label>
                  <label>
                    {
                      (this.state.userObject.GraphModel.VNetAddressSpace == "")
                      ? "Not specified"
                      : this.state.userObject.GraphModel.VNetAddressSpace
                    }
                    </label>
                </Grid>
              </Grid>
              
                  {
                    (this.state.userObject.GraphModel.SubnetsAndCidrs.length == 0)
                    ? null
                    : this.state.userObject.GraphModel.SubnetsAndCidrs.map(x => {
                        if(x.subnetName == '' )
                          return null;
                        else
                          return <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center">
                          <Grid item>
                          {x.subnetName} : {x.cidr} (Total {x.addressCount} addresses, {x.usableAddress} usable), Last IP: {x.lastIP}
                          </Grid>
                        </Grid>
                      })
                  }
                
            </Grid>
      </div>
    );
  }

  renderCalculatorTab() {
    return (
      <div
      className = "propPanelTabContent"
      hidden={this.state.value !== 'calculator'}>
        Calculator Properties, coming soon...
      </div>
    );
  }

  isAddressValidAndInRange(subnetAddr) {
      var subnetCidr = new IPCIDR(subnetAddr);
      
      var valid = true;

      if(Utils.isCidr(subnetAddr) && subnetCidr.isValid())
      {
          //within vnet range
          if(this.cidrRanger.doSubnetsOverlap
              (subnetAddr, this.state.userObject.GraphModel.VNetAddressSpace))
          {
              if(Utils.getCidrPrefix(subnetAddr) >= 
                Utils.getCidrPrefix(this.state.userObject.GraphModel.VNetAddressSpace))
                this.setState({isAddressWithinVNetRange: true});
              else
              {
                this.setState({isAddressWithinVNetRange: false});
                return;
              }
              
          }
          else
              this.setState({isAddressWithinVNetRange: true});
          
          //check subnets
          var existingSubnets = this.state.userObject.GraphModel.SubnetsAndCidrs;
          
          if(existingSubnets.length <= 1)
            return true;

          for(var item of existingSubnets)
          {
              if(item.cidr == undefined)
                  continue;

              //prevent validate its ownself
              if(item.subnetName != this.state.userObject.ProvisionContext.Name)
              {
                var isOverlap =
                  this.cidrRanger.doSubnetsOverlap(subnetAddr, item.cidr);
              }
              
              if(isOverlap)
                  return false;
          }
      }
      else
        valid = false;
      
      return valid;
  }

  //to achieve an updated view for this prop panel
  //at diagrameditor, subnet & cidrs is retrieved again
  // updateSubnetsAndCidrsOfDiagramEditor() {
  //    var sncs = this.state.userObject.GraphModel.SubnetsAndCidrs;

  //    sncs.forEach((snc, index) => {
  //     if(snc.subnetName === this.state.userObject.ProvisionContext.Name) {
  //       var sncItem = sncs[index];
  //       sncItem.cidr = this.state.userObject.ProvisionContext.AddressSpace;
  //       sncItem.addressCount = ;
  //       sncs[index] = sncItem;
  //     }
  //   });
  // }
  
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