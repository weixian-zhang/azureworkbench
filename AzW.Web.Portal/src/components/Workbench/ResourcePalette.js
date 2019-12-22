import React, { Component } from "react";
import { Tree } from "@blueprintjs/core";

import { ReactComponent as CosmosDB } from "../../assets/azure_icons/Databases Service Color/Azure Cosmos DB.svg";
import { ReactComponent as PostgreSQL } from "../../assets/azure_icons/Databases Service Color/Azure Database for PostgreSQL servers.svg";
import { ReactComponent as VirtualMachine } from "../../assets/azure_icons/ComputeServiceColor/VM/VM.svg";
import { ReactComponent as FunctionApp } from "../../assets/azure_icons/ComputeServiceColor/Function Apps.svg";

import { ReactComponent as VirtualNetwork } from "../../assets/azure_icons/Networking Service Color/Virtual Networks.svg";


export default class ResourcePalette extends Component {

  constructor(props) {
    super(props);
    this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
    this.handleNodeExpand = this.handleNodeExpand.bind(this);
    this.state = {
      nodes: [
        {
          id: 0,
          isExpanded: true,
          label: "Compute",
          childNodes: [
            {
              id: 1,
              icon: null,
              label: <div id="azpanel-icon-vm" resourcecategory='compute'  resourcetype='vm'><span className="bp3-icon bp3-icon-document bp3-tree-node-icon azurepanel-icon"><VirtualMachine /></span>Virtual machines</div>
            },
            {
              id: 2,
              icon: <span icon="document" className="bp3-icon bp3-icon-document bp3-tree-node-icon azurepanel-icon">
                <FunctionApp resource="function-app" />
            </span>,
              label: "Function App"
            }
          ]
        },
        {
          id: 1,
          isExpanded: true,
          label: "Networking",
          childNodes: [
            {
              id: 1,
              icon: null,
              label: <div id="azpanel-icon-vnet" resourcecategory='network' resourcetype='vnet'><span className="bp3-icon bp3-icon-document bp3-tree-node-icon azurepanel-icon"><VirtualNetwork /></span>Virtual machines</div>
            }
          ]
        },
        {
          id: 2,
          isExpanded: true,
          label: "Databases",
          childNodes: [
            {
              id: 4,
              icon: <span icon="document" className="bp3-icon bp3-icon-document bp3-tree-node-icon azurepanel-icon">
                <CosmosDB />
              </span>,
              label: "Azure Cosmos DB"
            },
            {
              id: 5,
              icon: <span icon="document" className="bp3-icon bp3-icon-document bp3-tree-node-icon azurepanel-icon">
                <PostgreSQL />
            </span>,
              label: "Azure Database for PostgreSQL servers"
            }
          ]
        },
      ]
    }
  }

  handleNodeCollapse(nodeData) {
    nodeData.isExpanded = false;
    this.setState(this.state);
  };

  handleNodeExpand(nodeData) {
    nodeData.isExpanded = true;
    this.setState(this.state);
  };


  render() {
    return (
      <div className="azurepanel-container">
        <Tree
          contents={this.state.nodes}
          onNodeClick={this.handleNodeClick}
          onNodeCollapse={this.handleNodeCollapse}
          onNodeExpand={this.handleNodeExpand}
        />
      </div>


      
    );
  };
}