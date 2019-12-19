import React, { Component } from "react";

import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

import ResourcePalette from "./ResourcePalette";
import DiagramEditor from "./DiagramEditor";
import PropertiesPanel from "./PropertiesPanel";
import "../../assets/css/Panel.css";
import "../../assets/css/Workbench.css";
import "../../assets/css/WorkbenchGrid.css";

import {VM} from "../../models/VM";

export default class Workbench extends Component {
  constructor(props) {
    super(props);
    this.diagram = {
      
    };
  }

  addResourceToDiagramEditor(item) 
  {
      var resourceCategory = item.attr('resourcecategory');
      var resourceType = item.attr('resourcetype');

      this.refs.diagramEditor.addResourceToEditorFromPalette(resourceCategory, resourceType);
  }


  componentDidMount() {
      this.makeResourceIconDraggable();
  }

  render() {
    return (
      <div className="workbench-container">
        <ResourcePalette/>
        <DiagramEditor ref="diagramEditor"/>
        <PropertiesPanel/>
      </div>
    );
  }

  makeResourceIconDraggable(){
      var _ = this;

      $('#azpanel-icon-vm').draggable({
        cancel: "a.ui-icon", // clicking an icon won't initiate dragging
        //revert: "invalid", // when not dropped, the item will revert back to its initial position
        revert: true, // bounce back when dropped
        helper: "clone", // create "copy" with original properties, but not a true clone
        cursor: "move",
        revertDuration: 0 // immediate snap
      });

      $('#diagramEditor').droppable({
        drop: function( event, ui ) {
          // clone item to retain in original "list"
          var $item = ui.draggable.clone();

          _.addResourceToDiagramEditor($item);
        }
      });
  }
}