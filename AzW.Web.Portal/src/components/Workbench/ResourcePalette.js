import React, { Component } from "react";
//import { Tree } from "@blueprintjs/core";
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import { ReactComponent as CosmosDB } from "../../assets/azure_icons/Databases Service Color/Azure Cosmos DB.svg";
import { ReactComponent as PostgreSQL } from "../../assets/azure_icons/Databases Service Color/Azure Database for PostgreSQL servers.svg";
import { ReactComponent as VirtualMachine } from "../../assets/azure_icons/ComputeServiceColor/VM/VM.svg";
import { ReactComponent as VMSS } from "../../assets/azure_icons/ComputeServiceColor/VM/VM Scale Sets.svg";
import { ReactComponent as FunctionApp } from "../../assets/azure_icons/ComputeServiceColor/Function Apps.svg";
import { ReactComponent as VirtualNetwork } from "../../assets/azure_icons/Networking Service Color/Virtual Networks.svg";
import {
  mxGraph,
  Drawer,
  Switch,
  FormGroup, InputGroup,
  mxRectangle,
  mxParallelEdgeLayout,
  mxConstants,
  mxEdgeStyle,
  mxLayoutManager,
  mxCell,
  mxGeometry,
  mxRubberband,
  mxDragSource,
  mxKeyHandler,
  mxCodec,
  mxClient,
  mxConnectionHandler,
  mxUtils,
  mxToolbar,
  mxEvent,
  mxCellTracker,
  mxImage,
  mxFastOrganicLayout
} from "mxgraph-js";

export default class ResourcePalette extends Component {

  constructor(props) {
    super(props);
    // this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
    // this.handleNodeExpand = this.handleNodeExpand.bind(this);
    // this.state = {
    //   nodes: [
    //     {
    //       id: 0,
    //       isExpanded: true,
    //       label: "Compute",
    //       childNodes: [
    //         {
    //           id: 1,
    //           icon: null,
    //           label: <div id="azpanel-icon-vm" class="inline" resourcecategory='compute'  resourcetype='vm'><span className="bp3-icon bp3-icon-document bp3-tree-node-icon azurepanel-icon"><VirtualMachine /></span>VM</div>
    //         },
    //         {
    //           id: 2,
    //           icon: <span icon="document" className="bp3-icon bp3-icon-document bp3-tree-node-icon azurepanel-icon">
    //             <FunctionApp resource="function-app" />
    //         </span>,
    //           label: "Function App"
    //         }
    //       ]
    //     },
    //     {
    //       id: 1,
    //       isExpanded: true,
    //       label: "Networking",
    //       childNodes: [
    //         {
    //           id: 1,
    //           icon: null,
    //           label: <div id="azpanel-icon-vnet" resourcecategory='network' resourcetype='vnet'><span className="bp3-icon bp3-icon-document bp3-tree-node-icon azurepanel-icon"><VirtualNetwork /></span>Virtual machines</div>
    //         }
    //       ]
    //     },
    //     {
    //       id: 2,
    //       isExpanded: true,
    //       label: "Databases",
    //       childNodes: [
    //         {
    //           id: 4,
    //           icon: <span icon="document" className="bp3-icon bp3-icon-document bp3-tree-node-icon azurepanel-icon">
    //             <CosmosDB />
    //           </span>,
    //           label: "Azure Cosmos DB"
    //         },
    //         {
    //           id: 5,
    //           icon: <span icon="document" className="bp3-icon bp3-icon-document bp3-tree-node-icon azurepanel-icon">
    //             <PostgreSQL />
    //         </span>,
    //           label: "Azure Database for PostgreSQL servers"
    //         }
    //       ]
    //     },
    //   ]
    // }
  }

  // handleNodeCollapse(nodeData) {
  //   nodeData.isExpanded = false;
  //   this.setState(this.state);
  // };

  // handleNodeExpand(nodeData) {
  //   nodeData.isExpanded = true;
  //   this.setState(this.state);
  // };


  render() {
    return (
      <div className="azurepanel-container">
        <Collapse accordion={true}>
          <Panel header="Compute" headerClass="my-header-class">
            <div class="tile-panel">
                <VirtualMachine class="azure-rsc-icon" />
                <span class="tile-text">VM</span>
            </div>
            <div class="tile-panel">
                <VMSS class="azure-rsc-icon" />
                <span class="tile-text">VMSS</span>
            </div>
          </Panel>
          <Panel header="Networking">
            <div class="tile-panel">
                <VirtualNetwork class="azure-rsc-icon" />
                <span class="tile-text">VNet</span>
            </div>
          </Panel>
          <Panel header="Storage">this is panel content2 or other</Panel>
          <Panel header="Database">
            <div class="tile-panel">
                <CosmosDB class="azure-rsc-icon" />
                <span class="tile-text">Cosmos</span>
            </div>
            <div class="tile-panel">
                <PostgreSQL class="azure-rsc-icon" />
                <span class="tile-text">PostgreSQL</span>
            </div>
          </Panel>
          <Panel header="Containers & Serverless">this is panel content2 or other</Panel>
          <Panel header="IoT">this is panel content2 or other</Panel>
        </Collapse>
      </div>
    );
  };

  state = {
    
    accordion: false,
    activeKey: ['4'],
  }

  onChange = (activeKey) => {
    this.setState({
      activeKey,
    });
  }

  componentDidMount() {
    // var vmNode = document.getElementById("azpanel-icon-vm");

    // var graphs = [];

    // // Helper function to check if DOM node is inside graph container.
    // function containsElt(graph, elt)
    // {
    //   while (elt != null)
    //   {
    //     if (elt == graph.container)
    //     {
    //       return true;
    //     }
        
    //     elt = elt.parentNode;
    //   }
      
    //   return false;
    // };

    // // Returns the graph under the mouse
    // var graphF = function(evt)
    // {
    //   var x = mxEvent.getClientX(evt);
    //   var y = mxEvent.getClientY(evt);
    //   var elt = document.elementFromPoint(x, y);
      
    //   for (var i = 0; i < graphs.length; i++)
    //   {
    //     if (containsElt(graphs[i], elt))
    //     {
    //       return graphs[i];
    //     }
    //   }
      
    //   return null;
    // };

    // // Inserts a cell at the given location
    // var funct = function(graph, evt, target, x, y)
    // {
    //   var cell = new mxCell('Test', new mxGeometry(0, 0, 120, 40));
    //   cell.vertex = true;
    //   var cells = graph.importCells([cell], x, y, target);

    //   if (cells != null && cells > 0)
    //   {
    //     graph.scrollCellToVisible(cells[0]);
    //     graph.setSelectionCells(cells);
    //   }
    // };

    // mxEvent.addListener(vmNode, 'dragstart', function(evt)
		// 			{
		// 				evt.returnValue = false;
    //       });
          
    //       // Creates the element that is being for the actual preview.
		// 		var dragElt = document.createElement('div');
		// 		dragElt.style.border = 'dashed black 1px';
		// 		dragElt.style.width = '120px';
		// 		dragElt.style.height = '40px';
				
		// 		// Drag source is configured to use dragElt for preview and as drag icon
		// 		// if scalePreview (last) argument is true. Dx and dy are null to force
		// 		// the use of the defaults. Note that dx and dy are only used for the
		// 		// drag icon but not for the preview.
		// 		var ds = mxUtils.makeDraggable(vmNode, graphF, funct, dragElt, null, null, this.props.graph.autoscroll, true);
				
		// 		// Redirects feature to global switch. Note that this feature should only be used
		// 		// if the the x and y arguments are used in funct to insert the cell.
		// 		ds.isGuidesEnabled = function()
		// 		{
		// 			return this.props.graph.graphHandler.guidesEnabled;
		// 		};
				
		// 		// Restores original drag icon while outside of graph
		// 		ds.createDragElement = mxDragSource.prototype.createDragElement;
  }
}