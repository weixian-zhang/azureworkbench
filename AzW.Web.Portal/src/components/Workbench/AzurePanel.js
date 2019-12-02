import React, { Component } from "react";
import { Tree } from "@blueprintjs/core";
import { ReactComponent as CosmosDB } from "../../assets/azure_icons/Databases Service Color/Azure Cosmos DB.svg";
import { ReactComponent as PostgreSQL } from "../../assets/azure_icons/Databases Service Color/Azure Database for PostgreSQL servers.svg";
import { ReactComponent as VirtualMachines } from "../../assets/azure_icons/Compute Service Color/VM/VM.svg";
import { ReactComponent as FunctionApp } from "../../assets/azure_icons/Compute Service Color/Function Apps.svg";
export default class AzurePanel extends Component {

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
              icon: <span icon="document" className="bp3-icon bp3-icon-document bp3-tree-node-icon azurepanel-icon">
                <VirtualMachines />
              </span>,
              label: "Virtual machines"
            },
            {
              id: 2,
              icon: <span icon="document" className="bp3-icon bp3-icon-document bp3-tree-node-icon azurepanel-icon">
                <FunctionApp />
            </span>,
              label: "Function App"
            }
          ]
        },
        {
          id: 3,
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