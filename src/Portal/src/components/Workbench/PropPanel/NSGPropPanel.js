import React, { Component } from "react";
import NSG from '../../../models/NSG';
import NSGRule from '../../../models/NSGRule';
import SelectLocation from '../SelectLocation';
import SelectServiceTag from '../SelectServiceTag';
import Utils from '../Helpers/Utils';
import ShortUniqueId from 'short-unique-id';
import {Select } from "@blueprintjs/select";
import { Drawer, NumericInput, InputGroup, Button, MenuItem, Icon } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from "@material-ui/core/Grid";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class NSGPropPanel extends Component {
  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        toggleFromAddrInboundRows: [],
        toggleToAddrInboundRows: [],
        toggleFromAddrOutboundRows: [],
        toggleToAddrOutboundRows: [],
        userObject: new NSG(),
        protocols: ["*", "Ah","Esp", "Icmp","Tcp","Udp"],
        allowDeny: ["Allow", "Deny"],
        value: 'provision', //tabs

        saveCallback: function () {},
      };

      this.shortUID = new ShortUniqueId();
  }


  render = () => {
    return (
      <Drawer
          title="Network Security Group Properties"
          autoFocus= {true}
          canEscapeKeyClose= {true}
          canOutsideClickClose= {true}
          enforceFocus= {true}
          hasBackdrop= {true}
          onClose={() => this.drawerClose()}
          isOpen= {this.state.isOpen}
          position= {POSITION_RIGHT}
          usePortal= {true}
          size= {'1200px'}
          className="propPanelDrawer">
              <Grid container spacing={12} className="propPanelGrid">
                <Grid item xs={12}>
                  <AppBar position="static" color = "transparent">
                    <Tabs  value={this.state.value}  onChange={this.handleChange} >
                      <Tab label="Provision" value="provision" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'provision' ? "bold" : "" }}/>
                    </Tabs>
                  </AppBar>
                    {this.renderNSGNameLocationRG()}
                    {this.renderProvisionTab()}

                </Grid>
              </Grid>
      </Drawer>
    );
  }

  renderNSGNameLocationRG() {
      return(
        <div>
            <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginTop: '10px'}}>
              <Grid item sm={3}>
                  <label>Name</label>
                  <Typography variant='body2' style={{fontSize:9,color:'blue'}}>
                      *To reuse NSG, just enter same NSG name and rules can be empty
                  </Typography>
              </Grid>
              <Grid item sm={3}>
                <input id="icon-display-name" type="text" class="bp3-input .modifier"
                  value={this.state.userObject.ProvisionContext.Name}
                  onChange={(e) => {
                    var uo = this.state.userObject;
                    uo.ProvisionContext.Name = e.target.value
                    this.setState({userObject:uo});
                  }} />
              </Grid>
            </Grid>
            <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '5px'}}>
              <Grid item sm={3}>
                  <label>Location</label>
              </Grid>
              <Grid item>
                <SelectLocation
                SelectedLocation={this.state.userObject.ProvisionContext.Location}
                onValueChange={
                  (location) => {
                    var uo = this.state.userObject;
                    uo.ProvisionContext.Location = location
                    this.setState({userObject:uo});
                  }
                }/>
              </Grid>
            </Grid>
            <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '5px'}}>
              <label style={{color: "blue"}}>*Rule names has to be unique in both Inbound and Outbound</label>
            </Grid>
        </div>
      );
  }

  renderProvisionTab() {
    if(this.state.value != 'provision')
      return null;

    return (
        <div className = "propPanelTabContent">
           <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1} style={{marginTop: '3px', width: '100%'}}>

              <Grid container item direction="row" spacing={1}  style={{marginBottom: '5px'}}>
                  <Grid item justify="flex-start" sm={3}>
                    <Typography variant='body1'>Inbound security rules</Typography>
                  </Grid>
                  <Grid item sm={8} justify="center"></Grid>
                  <Grid item justify="flex-end"  sm={1}>
                    <Button icon="plus" onClick={this.addInboundNewRule} />
                  </Grid>
              </Grid>
              <Grid container item direction="row"justify="flex-start" alignItems="center" style={{marginBottom: '15px'}}>
                <TableContainer  component={Paper}  style={{maxHeight: '350px'}}>
                    <Table stickyHeader size="small">
                        <TableHead>
                          <TableRow>
                              <TableCell size='large'>
                                Name
                              </TableCell>
                              <TableCell size='medium'>
                                Priority
                              </TableCell>
                              <TableCell size='small'>Protocol</TableCell>
                              <TableCell size='medium'>
                                Src Port(s)
                              </TableCell>
                              <TableCell size='medium'>Src IPs/Tags</TableCell>
                              <TableCell size='medium'>Dest Port(s)</TableCell>
                              <TableCell size='medium'>Dest IPs/Tags</TableCell>
                              <TableCell size='small'>Allow/Deny</TableCell>
                              <TableCell size='small'></TableCell>
                              <TableCell size='small'></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.userObject.ProvisionContext.InboundRules.map(rule =>
                            (
                                <TableRow>
                                  <TableCell>
                                    <InputGroup
                                      value={rule.Name}
                                      onChange={(e) => {
                                        rule.Name = e.target.value;
                                        this.forceUpdate();
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <NumericInput value={rule.Priority} fill={true} min={100} max={4096} placeholder="100-4096"
                                     onValueChange={(val, value) =>
                                     {
                                        rule.Priority = val
                                     }} />
                                  </TableCell>
                                  <TableCell>
                                    <Select
                                        filterable={false}
                                        closeOnSelect={true}
                                        items={this.state.protocols}
                                        itemRenderer={(protocol, { handleClick, modifiers }) => {
                                            return (
                                              <MenuItem
                                                text={protocol}
                                                onClick={
                                                    () =>
                                                    {
                                                      rule.Protocol = protocol
                                                      this.forceUpdate();
                                                    }
                                                } />
                                            );
                                          }
                                        }>
                                        <Button text={rule.Protocol == '' ? '*' : rule.Protocol}
                                            alignText='left'
                                            rightIcon="double-caret-vertical"
                                            fill={true} />
                                    </Select>
                                  </TableCell>

                                  <TableCell>
                                    <InputGroup
                                      value={rule.FromPorts}
                                      onChange={(e) => {
                                        rule.FromPorts = e.target.value;
                                        this.forceUpdate();
                                      }} />
                                  </TableCell>

                                  <TableCell>
                                    <TableCell padding='none'>
                                      {

                                          (!rule.FromAddressIsTag)
                                          ?
                                            <InputGroup
                                              value={rule.FromAddresses}
                                              onChange={(e) => {
                                                rule.FromAddresses = e.target.value;
                                                this.forceUpdate();
                                              }} />
                                          :
                                            <SelectServiceTag
                                                SelectedServiceTag={rule.FromAddresses}
                                                onValueChange={
                                                  (svcTagName) => {
                                                    rule.FromAddresses = svcTagName;
                                                    this.forceUpdate();
                                                  }
                                                }/>

                                      }
                                    </TableCell>
                                    <TableCell padding='none'>
                                      <Badge variant="dot" color="primary"
                                        data-rowid={rule.UITableRowID}
                                        style={{marginLeft: '7px',cursor:'pointer'}}
                                        onClick={this.badgeToggleFromAddressInbound}>
                                      </Badge>
                                    </TableCell>
                                  </TableCell>

                                  <TableCell>
                                    <InputGroup
                                      value={rule.ToPorts}
                                      onChange={(e) => {
                                        rule.ToPorts = e.target.value;
                                        this.forceUpdate();
                                      }} />
                                  </TableCell>

                                  <TableCell>
                                    <TableCell padding='none'>
                                      {
                                          (!rule.ToAddressIsTag)
                                          ?
                                            <InputGroup
                                            fill={true}
                                            value={rule.ToAddresses}
                                            onChange={(e) => {
                                              rule.ToAddresses = e.target.value;
                                              this.forceUpdate();
                                            }} />
                                          :
                                          <SelectServiceTag
                                            SelectedServiceTag={rule.ToAddresses}
                                            onValueChange={
                                              (svcTagName) => {
                                                rule.ToAddresses = svcTagName;
                                                this.forceUpdate();
                                              }
                                            }/>
                                      }
                                    </TableCell>
                                    <TableCell padding='none'>
                                      <Badge variant="dot" color="primary"
                                        data-rowid={rule.UITableRowID}
                                        style={{marginLeft: '7px',cursor:'pointer'}}
                                        onClick={this.badgeToggleToAddressInbound}>
                                      </Badge>
                                    </TableCell>
                                  </TableCell>

                                  <TableCell>
                                    <Select
                                        filterable={false}
                                        closeOnSelect={true}
                                        items={this.state.allowDeny}
                                        itemRenderer={(allowdeny, { handleClick, modifiers }) => {
                                            return (
                                              <MenuItem
                                                text={allowdeny}
                                                onClick={
                                                    () => {
                                                      rule.Allow = allowdeny == 'Allow' ? true : false
                                                      this.forceUpdate();
                                                    }
                                                } />
                                            );
                                          }
                                        }>
                                        <Button text={rule.Allow ? "Allow" : "Deny"}
                                            alignText='left'
                                            rightIcon="double-caret-vertical"
                                            fill={true} />
                                    </Select>
                                  </TableCell>
                                  <TableCell>
                                    <Icon icon='duplicate' data-rowid={rule.UITableRowID}
                                      onClick={this.copyInboundRuleClick}
                                      style={{cursor:'pointer'}}/>
                                  </TableCell>
                                  <TableCell>
                                    <Icon icon='delete' data-rowid={rule.UITableRowID}
                                      onClick={this.deleteInboundRuleClick}
                                      style={{cursor:'pointer'}}/>
                                  </TableCell>
                                </TableRow>
                          ))}
                        </TableBody>
                    </Table>
                </TableContainer>
              </Grid>
              <Grid container item direction="row" spacing={1}  style={{marginBottom: '5px'}}>
                  <Grid item justify="flex-start" sm={3}>
                  <Typography variant='body1'>Outbound security rules</Typography>
                  </Grid>
                  <Grid item sm={8} justify="center"></Grid>
                  <Grid item justify="flex-end"  sm={1}>
                    <Button icon="plus" onClick={this.addOutboundNewRule}/>
                  </Grid>
              </Grid>
              <Grid container item direction="row" xs="12" spacing="1" justify="flex-start" alignItems="center" style={{marginBottom: '5px'}}>
                  <TableContainer  component={Paper}  style={{maxHeight: '350px'}}>
                        <Table stickyHeader size="small">
                            <TableHead>
                              <TableRow>
                                  <TableCell size='large'>
                                    Name
                                  </TableCell>
                                  <TableCell size='medium'>
                                    Priority
                                    {/* <Tooltip content="100-4096. Try leaving 'gaps' between priority and not consecutive numbers"
                                      hoverOpenDelay={200} position={Position.BOTTOM}
                                      disabled={Utils.IsNullOrUndefine(this.state.userObject.InboundRules) ? false : true}>
                                      <Icon icon="info-sign" style={{marginLeft: '5px'}}/>
                                    </Tooltip> */}
                                  </TableCell>
                                  <TableCell size='small'>Protocol</TableCell>
                                  <TableCell size='large'>
                                    Src Port(s)
                                    {/* <Tooltip content="e.g: Single port: 443 | Range: 454-460 | Multi+Range: 454-46-,80,443"
                                      position={Position.BOTTOM} hoverOpenDelay={200}
                                      disabled={this.state.userObject.InboundRules > 0 ? false : true}>
                                      <Icon icon="info-sign" style={{marginLeft: '5px'}}/>
                                    </Tooltip> */}
                                  </TableCell>
                                  <TableCell size='large'>Src IPs/Tags</TableCell>
                                  <TableCell size='large'>Dest Port(s)</TableCell>
                                  <TableCell size='large'>Dest IPs/Tags</TableCell>
                                  <TableCell size='small'>Allow/Deny</TableCell>
                                  <TableCell size='small'></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.state.userObject.ProvisionContext.OutboundRules.map(rule =>
                                (
                                    <TableRow>
                                      <TableCell>
                                        <InputGroup
                                          value={rule.Name}
                                          onChange={(e) => {
                                            rule.Name = e.target.value;
                                            this.forceUpdate();
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <NumericInput value={rule.Priority} fill={true} min={100} max={4096} placeholder="100-4096"
                                        onValueChange={(val, value) =>
                                        {
                                            rule.Priority = val
                                        }} />
                                      </TableCell>
                                      <TableCell>
                                        <Select
                                            filterable={false}
                                            closeOnSelect={true}
                                            items={this.state.protocols}
                                            itemRenderer={(protocol, { handleClick, modifiers }) => {
                                                return (
                                                  <MenuItem
                                                    text={protocol}
                                                    onClick={
                                                        () =>
                                                        {
                                                          rule.Protocol = protocol
                                                          this.forceUpdate();
                                                        }
                                                    } />
                                                );
                                              }
                                            }>
                                            <Button text={rule.Protocol == '' ? '*' : rule.Protocol}
                                                alignText='left'
                                                rightIcon="double-caret-vertical"
                                                fill={true} />
                                        </Select>
                                      </TableCell>

                                      <TableCell>
                                        <InputGroup
                                          value={rule.FromPorts}
                                          onChange={(e) => {
                                            rule.FromPorts = e.target.value;
                                            this.forceUpdate();
                                          }} />
                                      </TableCell>

                                      <TableCell>
                                        <TableCell padding='none'>
                                          {
                                              (!rule.FromAddressIsTag)
                                              ?
                                                <InputGroup
                                                value={rule.FromAddresses}
                                                onChange={(e) => {
                                                  rule.FromAddresses = e.target.value;
                                                  this.forceUpdate();
                                                }} />
                                              :
                                                <SelectServiceTag
                                                  SelectedServiceTag={rule.FromAddresses}
                                                  onValueChange={
                                                    (svcTagName) => {
                                                      rule.FromAddresses = svcTagName;
                                                      this.forceUpdate();
                                                    }
                                                  }/>
                                          }
                                        </TableCell>
                                        <TableCell padding='none'>
                                          <Badge variant="dot" color="primary"
                                            data-rowid={rule.UITableRowID}
                                            style={{marginLeft: '7px',cursor:'pointer'}}
                                            onClick={this.badgeToggleFromAddressOutbound}>
                                          </Badge>
                                        </TableCell>
                                      </TableCell>

                                      <TableCell>
                                        <InputGroup
                                          value={rule.ToPorts}
                                          onChange={(e) => {
                                            rule.ToPorts = e.target.value;
                                            this.forceUpdate();
                                          }} />
                                      </TableCell>

                                      <TableCell>
                                        <TableCell padding='none'>
                                          {
                                              (!rule.ToAddressIsTag)
                                              ?
                                                <InputGroup
                                                value={rule.ToAddresses}
                                                onChange={(e) => {
                                                  rule.ToAddresses = e.target.value;
                                                  this.forceUpdate();
                                                }} />
                                              :
                                              <SelectServiceTag
                                                SelectedServiceTag={rule.ToAddresses}
                                                onValueChange={
                                                  (svcTagName) => {
                                                    rule.ToAddresses = svcTagName;
                                                    this.forceUpdate();
                                                  }
                                                }/>
                                          }
                                        </TableCell>
                                        <TableCell padding='none'>
                                          <Badge variant="dot" color="primary"
                                            data-rowid={rule.UITableRowID}
                                            style={{marginLeft: '7px',cursor:'pointer'}}
                                            onClick={this.badgeToggleToAddressOutbound}>
                                          </Badge>
                                        </TableCell>
                                      </TableCell>

                                      <TableCell>
                                        <Select
                                            filterable={false}
                                            closeOnSelect={true}
                                            items={this.state.allowDeny}
                                            itemRenderer={(allowdeny, { handleClick, modifiers }) => {
                                                return (
                                                  <MenuItem
                                                    text={allowdeny}
                                                    onClick={
                                                        () => {
                                                          rule.Allow = allowdeny == 'Allow' ? true : false
                                                          this.forceUpdate();
                                                        }
                                                    } />
                                                );
                                              }
                                            }>
                                            <Button text={rule.Allow ? "Allow" : "Deny"}
                                                alignText='left'
                                                rightIcon="double-caret-vertical"
                                                fill={true} />
                                        </Select>
                                      </TableCell>
                                      <TableCell>
                                        <Icon icon='duplicate' data-rowid={rule.UITableRowID}
                                          onClick={this.copyOutboundRuleClick}
                                          style={{cursor:'pointer'}}/>
                                      </TableCell>
                                      <TableCell>
                                        <Icon icon='delete' data-rowid={rule.UITableRowID}
                                          onClick={this.deleteOutboundRuleClick}
                                          style={{cursor:'pointer'}}/>
                                      </TableCell>
                                    </TableRow>
                              ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
              </Grid>
            </Grid>
      </div>
    );
  }


  badgeToggleFromAddressInbound = (sender) => {
    var tableRowID = sender.currentTarget.dataset.rowid;

    var rules = this.state.userObject.ProvisionContext.InboundRules;
    var inbrIndex = rules.findIndex(x => x.UITableRowID == tableRowID);
    var rule = rules[inbrIndex];
    if(rule.FromAddressIsTag == false)
     rule.FromAddressIsTag = true;
    else
      rule.FromAddressIsTag = false;

    this.forceUpdate();
  }

  badgeToggleToAddressInbound = (sender) => {
    var tableRowID = sender.currentTarget.dataset.rowid;

    //save toggle state
    var rules = this.state.userObject.ProvisionContext.InboundRules;
    var inbrIndex = rules.findIndex(x => x.UITableRowID == tableRowID);
    var rule = rules[inbrIndex];
    if(rule.ToAddressIsTag == false)
      rule.ToAddressIsTag = true;
    else
      rule.ToAddressIsTag = false;

    this.forceUpdate();
  }

  badgeToggleFromAddressOutbound = (sender) => {
    var tableRowID = sender.currentTarget.dataset.rowid;

    //save toggle state
    var rules = this.state.userObject.ProvisionContext.OutboundRules;
    var inbrIndex = rules.findIndex(x => x.UITableRowID == tableRowID);
    var rule = rules[inbrIndex];
    if(rule.FromAddressIsTag == false)
    {
      rule.FromAddressIsTag = true;
    }
    else
    {
      rule.FromAddressIsTag = false;
    }

    this.forceUpdate();
  }

  badgeToggleToAddressOutbound = (sender) => {
    var tableRowID = sender.currentTarget.dataset.rowid;

    //save toggle state
    var rules = this.state.userObject.ProvisionContext.OutboundRules;
    var inbrIndex = rules.findIndex(x => x.UITableRowID == tableRowID);
    var rule = rules[inbrIndex];
    if(rule.ToAddressIsTag == false)
      rule.ToAddressIsTag = true;
    else
      rule.ToAddressIsTag = false;

    this.forceUpdate();
  }

  addInboundNewRule = () => {

      var ruleRowId = this.shortUID.randomUUID(6);

      var inbRule = new NSGRule();
      inbRule.UITableRowID = ruleRowId;

      var userObj = this.state.userObject;
      userObj.ProvisionContext.InboundRules.push(inbRule);
      this.setState({userObject: userObj});

      this.addInboundFromAddrTogglingState(ruleRowId, false);
      this.addInboundToAddrTogglingState(ruleRowId, false);
  }

  addInboundFromAddrTogglingState = (rowId, value) => {
      //track toggle from/to addr state
      var inbrFromRowToggle = this.state.toggleFromAddrInboundRows;
      inbrFromRowToggle.push({rowId: rowId, val:value});
      this.setState({toggleFromAddrInboundRows: inbrFromRowToggle});
  }

  addInboundToAddrTogglingState = (rowId, value) => {
      var inbrToRowToggle = this.state.toggleToAddrInboundRows;
      inbrToRowToggle.push({rowId: rowId, val:value});
      this.setState({toggleToAddrInboundRows: inbrToRowToggle});
  }

  addOutboundNewRule = () => {
    var ruleRowId = this.shortUID.randomUUID(6);

    var inbRule = new NSGRule();
    inbRule.UITableRowID = ruleRowId;

    var userObj = this.state.userObject;

    userObj.ProvisionContext.OutboundRules.push(inbRule);
    this.setState({userObject: userObj});

    this.addOutboundFromAddrTogglingState(ruleRowId, false);
    this.addOutboundToAddrTogglingState(ruleRowId, false);
}

addOutboundFromAddrTogglingState = (rowId, value) => {
  //track toggle from/to addr state
  var outbrFromRowToggle = this.state.toggleFromAddrOutboundRows;
  outbrFromRowToggle.push({rowId: rowId, val:value});
  this.setState({toggleFromAddrOutboundRows: outbrFromRowToggle});
}

addOutboundToAddrTogglingState = (rowId, value) => {
    var outbrToRowToggle = this.state.toggleToAddrOutboundRows;
    outbrToRowToggle.push({rowId: rowId, val:value});
    this.setState({toggleToAddrOutboundRows: outbrToRowToggle});
}

copyInboundRuleClick = (sender) => {
  var tableRowID = sender.currentTarget.dataset.rowid;

  var userObj = this.state.userObject;

  var rule = null;

  for (var i = 0; i < userObj.ProvisionContext.InboundRules.length; i++) {
    var r = userObj.ProvisionContext.InboundRules[i];
    if(r.UITableRowID == tableRowID) {
      rule = Utils.deepClone(r);
      break;
    }
  }

  //set new prop values
  rule.UITableRowID = this.shortUID.randomUUID(6);
  rule.Priority += 20;

  if(rule != null) {
      var lastIndex = userObj.ProvisionContext.InboundRules.length - 1;

      userObj.ProvisionContext.InboundRules.splice(lastIndex + 1, 0, rule);

      this.setState({userObject: userObj});
  }
}

copyOutboundRuleClick = (sender) => {
  var tableRowID = sender.currentTarget.dataset.rowid;

  var userObj = this.state.userObject;

  var rule = null;

  for (var i = 0; i < userObj.ProvisionContext.OutboundRules.length; i++) {
    var r = userObj.ProvisionContext.OutboundRules[i];
    if(r.UITableRowID == tableRowID) {
      rule = Utils.deepClone(r);
      break;
    }
  }

  //set new prop values
  rule.UITableRowID = this.shortUID.randomUUID(6);
  rule.Priority += 20;

  if(rule != null) {
      var lastIndex = userObj.ProvisionContext.OutboundRules.length - 1;

      userObj.ProvisionContext.OutboundRules.splice(lastIndex + 1, 0, rule);

      this.setState({userObject: userObj});
  }
}

  deleteInboundRuleClick = (sender) => {
    var tableRowID = sender.currentTarget.dataset.rowid;

    var userObj = this.state.userObject;

    var ruleToDelIndex =
      userObj.ProvisionContext.InboundRules.findIndex(x => x.UITableRowID == tableRowID);

    userObj.ProvisionContext.InboundRules.splice(ruleToDelIndex, 1);
    this.setState({userObject: userObj});

    var inbrFromRowToggle = this.state.toggleFromAddrInboundRows;
    var inbrFromRowIndex = inbrFromRowToggle.findIndex(x => x == tableRowID);
    inbrFromRowToggle.splice(inbrFromRowIndex, 1);
    this.setState({toggleFromAddrInboundRows: inbrFromRowToggle});

    var inbrToRowToggle = this.state.toggleToAddrInboundRows;
    var inbrToRowIndex = inbrToRowToggle.findIndex(x => x == tableRowID);
    inbrToRowToggle.splice(inbrToRowIndex, 1);
    this.setState({toggleFromAddrInboundRows: inbrToRowToggle});
  }

  deleteOutboundRuleClick = (sender) => {
    var tableRowID = sender.currentTarget.dataset.rowid;

    var userObj = this.state.userObject;

    var ruleToDelIndex =
      userObj.ProvisionContext.OutboundRules.findIndex(x => x.UITableRowID == tableRowID);
    userObj.ProvisionContext.OutboundRules.splice(ruleToDelIndex, 1);
    this.setState({userObject: userObj});

    var outbrFromRowToggle = this.state.toggleFromAddrOutboundRows;
    var outbrFromRowIndex = outbrFromRowToggle.findIndex(x => x == tableRowID);
    outbrFromRowToggle.splice(outbrFromRowIndex, 1);
    this.setState({toggleFromAddrOutboundRows: outbrFromRowToggle});

    var outbrToRowToggle = this.state.toggleToAddrOutboundRows;
    var outbrToRowIndex = outbrToRowToggle.findIndex(x => x == tableRowID);
    outbrToRowToggle.splice(outbrToRowIndex, 1);
    this.setState({toggleToAddrOutboundRows: outbrToRowToggle});

  }

  hydrateToggleState = () => {
      var inbounds = this.state.userObject.ProvisionContext.InboundRules;
      var outbounds = this.state.userObject.ProvisionContext.OutboundRules;

      inbounds.map(x => {
        this.addInboundFromAddrTogglingState(x.UITableRowID, x.FromAddressIsTag);
        this.addInboundToAddrTogglingState(x.UITableRowID, x.ToAddressIsTag);
      });

      outbounds.map(x => {
        this.addOutboundFromAddrTogglingState(x.UITableRowID, x.FromAddressIsTag);
        this.addOutboundToAddrTogglingState(x.UITableRowID, x.ToAddressIsTag);
      });
  }

  show = (userObject, saveCallback) => {
    this.setState({ isOpen: true, userObject: userObject, saveCallback: saveCallback });
    //this.hydrateToggleState();
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