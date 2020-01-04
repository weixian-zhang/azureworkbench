import React, { Component, useRef } from "react";
import { Collapse } from "@blueprintjs/core";
import { ReactComponent as CosmosDB } from "../../assets/azure_icons/Databases Service Color/Azure Cosmos DB.svg";
import { ReactComponent as PostgreSQL } from "../../assets/azure_icons/Databases Service Color/Azure Database for PostgreSQL servers.svg";
import { ReactComponent as VirtualMachine } from "../../assets/azure_icons/ComputeServiceColor/VM/VM.svg";
import { ReactComponent as VMSS } from "../../assets/azure_icons/ComputeServiceColor/VM/VM Scale Sets.svg";
import { ReactComponent as FunctionApp } from "../../assets/azure_icons/ComputeServiceColor/Function Apps.svg";
import { ReactComponent as VirtualNetwork } from "../../assets/azure_icons/Networking Service Color/Virtual Networks.svg";


export default class ResourcePalette extends Component {

  constructor(props) {
    super(props);

    this.graphManager = this.props.mxgraphManager;

    this.vmIcon = React.createRef();
    this.vmssIcon =  React.createRef();
    this.vnetIcon = React.createRef();

    this.state = {
      isShapeOpen: false,
      isComputeOpen: false,
      isNetworkingOpen: false,
      graphContainer: null
    }
  }

  shapePanelHeaderClick = () => { 
    this.setState(
      { 
        isShapeOpen: !this.state.isComputeOpen
      }) 
  }

  computePanelHeaderClick = () => { 
    this.setState(
      { 
        isComputeOpen: !this.state.isComputeOpen
      }) 
  }

  networkingPanelHeaderClick = () => { 
    this.setState(
      { 
        isNetworkingOpen: !this.state.isNetworkingOpen
      }) 
  }

  componentDidMount = () =>  
  {
      this.makeIconsDraggable();
  }

  render(){
    return (
      <div className="azurepanel-container" >
        <h3 class="collapse-header" onClick={this.shapePanelHeaderClick}>Shapes</h3>
        <Collapse isOpen={this.state.isShapeOpen} accordion={true} keepChildrenMounted={true} >
          <div class="tile-panel">
            
            <div class="tile-text">Straight Connector</div>
          </div>
          <div class="tile-panel">
            
            <div class="tile-text">Rounded Connector</div>
          </div>
          <div class="tile-panel">

            <div class="tile-text">Label</div>
          </div>
        </Collapse>

        <h3 class="collapse-header" onClick={this.computePanelHeaderClick}>Compute</h3>
        <Collapse isOpen={this.state.isComputeOpen} accordion={true} keepChildrenMounted={true} >
          <div class="tile-panel" ref={this.vmIcon}>
            <VirtualMachine class="azure-rsc-icon" />
            <div class="tile-text">VM</div>
          </div>
          <div class="tile-panel" ref={this.vmssIcon}>
            <VMSS class="azure-rsc-icon" />
            <div class="tile-text">VM Scale Sets</div>
          </div>
        </Collapse>

        <h3 class="collapse-header" onClick={this.networkingPanelHeaderClick}>Networking</h3>
        <Collapse isOpen={this.state.isNetworkingOpen} accordion={true} keepChildrenMounted={true} >
          <div class="tile-panel" ref={this.vnetIcon}>
            <VirtualNetwork class="azure-rsc-icon" />
            <div class="tile-text">Virtual Network</div>
          </div>
        </Collapse>
      </div>
    );
  };

  makeIconsDraggable = () => {

    var thisComponent = this;

    this.graphManager.makeIconDraggable(this.vmIcon.current, "vm", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vmssIcon.current, "vmss", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vnetIcon.current, "vnet", thisComponent.props.addResourceToDiagramEditor);
    
   }

 
}