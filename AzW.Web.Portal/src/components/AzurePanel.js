import React, { Component } from "react";
import { Classes, Icon, Intent, ITreeNode, Position, Tooltip, Tree } from "@blueprintjs/core";

export default class AzurePanel extends Component {

  constructor(props) {
    super(props);
    this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
    this.handleNodeExpand = this.handleNodeExpand.bind(this);
    this.state = {
      nodes: [
        {
          id: 0,
          icon: "database",
          isExpanded: true,
          label: "Databases",
          childNodes: [
            {
              id: 1,
              icon: "document",
              label: "Cosmos DB"
            },
            {
              id: 2,
              icon: "document",
              label: "SQL databases"
            },
            {
              id: 3,
              icon: "document",
              label: "PostgreSQL"
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