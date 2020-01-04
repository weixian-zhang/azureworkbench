import React, { Component, useRef } from "react";
import { Collapse } from "@blueprintjs/core";
import { ReactComponent as CosmosDB } from "../../assets/azure_icons/Databases Service Color/Azure Cosmos DB.svg";
import { ReactComponent as PostgreSQL } from "../../assets/azure_icons/Databases Service Color/Azure Database for PostgreSQL servers.svg";
import { ReactComponent as VirtualMachine } from "../../assets/azure_icons/ComputeServiceColor/VM/VM.svg";
import { ReactComponent as VMSS } from "../../assets/azure_icons/ComputeServiceColor/VM/VM Scale Sets.svg";
import { ReactComponent as FunctionApp } from "../../assets/azure_icons/ComputeServiceColor/Function Apps.svg";
import { ReactComponent as VirtualNetwork } from "../../assets/azure_icons/Networking Service Color/Virtual Networks.svg";
import { ReactComponent as AppGateway } from "../../assets/azure_icons/Networking Service Color/Application Gateway.svg";
import { ReactComponent as LoadBalancer } from "../../assets/azure_icons/Networking Service Color/Load Balancers.svg";
import { ReactComponent as AzFirewall } from "../../assets/azure_icons/Networking Service Color/Azure Firewall.svg";
import { ReactComponent as ContainerInstance } from "../../assets/azure_icons/Container Service Color/Container Instances.svg";
import { ReactComponent as ContainerRegistry } from "../../assets/azure_icons/Container Service Color/Container Registries.svg";
import { ReactComponent as Kubernetes } from "../../assets/azure_icons/Container Service Color/Kubernetes Services.svg";
import { ReactComponent as ASE } from "../../assets/azure_icons/Web Service Color/App Service Environments.svg";
import { ReactComponent as AppService } from "../../assets/azure_icons/Web Service Color/App Services.svg";
import { ReactComponent as APIM } from "../../assets/azure_icons/Integration Service Color/API Management Services.svg";

export default class ResourcePalette extends Component {

  constructor(props) {
    super(props);

    this.graphManager = this.props.mxgraphManager;

    this.straightArrow = React.createRef();
    this.curveArrow = React.createRef();
    this.label = React.createRef();
    this.vmIcon = React.createRef();
    this.vmssIcon =  React.createRef();
    this.funcIcon = React.createRef();
    this.vnetIcon = React.createRef();
    this.nlbIcon = React.createRef();
    this.appgwIcon = React.createRef();
    this.containerInstanceIcon = React.createRef();
    this.containerRegistryIcon = React.createRef();
    this.kubeIcon = React.createRef();

    this.state = {
      isShapeOpen: false,
      isComputeOpen: false,
      isNetworkingOpen: false,
      isContainerOpen: false,
      isIntegrationOpen: false,
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

  containerPanelHeaderClick = () => {
    this.setState(
      { 
        isContainerOpen: !this.state.isContainerOpen
      })
  }

  integrationPanelHeaderClick = () => {
    this.setState(
      { 
        isIntegrationOpen: !this.state.isIntegrationOpen
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
          <div class="tile-panel" ref={this.straightArrow}>
            <img src={require('../../assets/azure_icons/straight-connector.png')} width="25" height="25" />
            <div class="tile-text">Straight Connector</div>
          </div>
          <div class="tile-panel" ref={this.curveArrow}>
            <img src={require('../../assets/azure_icons/round-connector.png')} width="25" height="25" />
            <div class="tile-text">Curve Connector</div>
          </div>
          <div class="tile-panel" ref={this.label}>
          <img src={require('../../assets/azure_icons/text.png')} width="25" height="25" />
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
          <div class="tile-panel" ref={this.vmssIcon}>
            <AppService class="azure-rsc-icon" />
            <div class="tile-text">App Service</div>
          </div>
          <div class="tile-panel" ref={this.vmssIcon}>
            <ASE class="azure-rsc-icon" />
            <div class="tile-text">App Service Environment</div>
          </div>
          <div class="tile-panel" ref={this.funcIcon}>
            <FunctionApp class="azure-rsc-icon" />
            <div class="tile-text">Function</div>
          </div>
        </Collapse>

        <h3 class="collapse-header" onClick={this.networkingPanelHeaderClick}>Networking</h3>
        <Collapse isOpen={this.state.isNetworkingOpen} accordion={true} keepChildrenMounted={true} >
          <div class="tile-panel" ref={this.vnetIcon}>
            <VirtualNetwork class="azure-rsc-icon" />
            <div class="tile-text">Virtual Network</div>
          </div>
          <div class="tile-panel" ref={this.nlbIcon}>
            <LoadBalancer class="azure-rsc-icon" />
            <div class="tile-text">Load Balancer</div>
          </div>
          <div class="tile-panel" ref={this.appgwIcon}>
            <AppGateway class="azure-rsc-icon" />
            <div class="tile-text">Application Gateway</div>
          </div>
          <div class="tile-panel" ref={this.azfwIcon}>
            <AzFirewall class="azure-rsc-icon" />
            <div class="tile-text">Firewall</div>
          </div>
        </Collapse>
     
      <h3 class="collapse-header" onClick={this.containerPanelHeaderClick}>Container</h3>
      <Collapse isOpen={this.state.isContainerOpen} accordion={true} keepChildrenMounted={true} >
        <div class="tile-panel" ref={this.containerInstanceIcon}>
          <ContainerInstance class="azure-rsc-icon" />
          <div class="tile-text">Container Instance</div>
        </div>
        <div class="tile-panel" ref={this.containerRegistryIcon}>
          <ContainerRegistry class="azure-rsc-icon" />
          <div class="tile-text">Container Registry</div>
        </div>
        <div class="tile-panel" ref={this.kubeIcon}>
          <Kubernetes class="azure-rsc-icon" />
          <div class="tile-text">Kubernetes</div>
        </div>
      </Collapse>

      <h3 class="collapse-header" onClick={this.integrationPanelHeaderClick}>Integration</h3>
      <Collapse isOpen={this.state.isIntegrationOpen} accordion={true} keepChildrenMounted={true} >
        <div class="tile-panel" ref={this.apimIcon}>
          <APIM class="azure-rsc-icon" />
          <div class="tile-text">API Management</div>
        </div>
      </Collapse>

      </div>

    );
  };

  makeIconsDraggable = () => {

    var thisComponent = this;

    this.graphManager.makeIconDraggable(this.straightArrow.current, "straightarrow", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.curveArrow.current, "curvearrow", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.label.current, "label", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vmIcon.current, "vm", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vmssIcon.current, "vmss", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.vnetIcon.current, "vnet", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.nlbIcon.current, "nlb", thisComponent.props.addResourceToDiagramEditor);
    this.graphManager.makeIconDraggable(this.appgwIcon.current, "appgw", thisComponent.props.addResourceToDiagramEditor);
  }

 
}