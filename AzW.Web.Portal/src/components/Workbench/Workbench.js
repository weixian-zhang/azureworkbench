import React, { Component } from "react";


import ResourcePalette from "./ResourcePalette";
import DiagramEditor from "./DiagramEditor";

import "../../assets/css/Panel.css";
import "../../assets/css/Workbench.css";
import "../../assets/css/WorkbenchGrid.css";

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
import MxGraphManager from "../../services/MxGraphManager";

export default class Workbench extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderResourcePalette: false
    }
    
    this.DiagramEditor = React.createRef();
    this.graphContainer = null;
    this.dropContext = null;
  }

  componentDidMount() {
    
  }

  addResourceToDiagramEditor = (dropContext) => {
      this.DiagramEditor.current.addResourceToEditorFromPalette(dropContext);
  }

  mxgraphManagerReadyCallback = (mxgraphManager) => {
      this.graphManager = mxgraphManager;

      this.setState({
        renderResourcePalette: true
      })
  }

  render = () => {
    const { renderResourcePalette } = this.state
    return (
      
      <div className="workbench-container">
        { renderResourcePalette ? <ResourcePalette mxgraphManager={this.graphManager}  addResourceToDiagramEditor={this.addResourceToDiagramEditor} /> : '' }
        <DiagramEditor ref={this.DiagramEditor} mxgraphManagerReadyCallback={this.mxgraphManagerReadyCallback} />
      </div>
    );
  }

  

  // makeResourceIconDraggable(){
  //     var _ = this;

  //     $('#azpanel-icon-vm').draggable({
  //       cancel: "a.ui-icon", // clicking an icon won't initiate dragging
  //       //revert: "invalid", // when not dropped, the item will revert back to its initial position
  //       revert: true, // bounce back when dropped
  //       helper: "clone", // create "copy" with original properties, but not a true clone
  //       cursor: "move",
  //       revertDuration: 0 // immediate snap
  //     });

  //     $('#diagramEditor').droppable({
  //       drop: function( event, ui ) {
  //         // clone item to retain in original "list"
  //         var $item = ui.draggable.clone();

  //         _.addResourceToDiagramEditor($item);
  //       }
  //     });
  // }
}