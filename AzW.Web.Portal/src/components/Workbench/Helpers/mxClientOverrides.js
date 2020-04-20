import {
    mxGraph,
    mxRectangle,
    mxEdgeHandler,
    mxGraphHandler,
    mxConstants,
    mxEdgeStyle,
    mxRubberband,
    mxUtils,
    mxEvent,
    mxImage,
    mxVertexHandler,
    mxPoint,
    mxConnectionConstraint,
    mxConstraintHandler,
    mxConnectionHandler,
    mxCodecRegistry,
    mxCell,
    mxObjectCodec,
    mxGeometry,
    mxEventObject
  } from "mxgraph-js";

  export default class mxClientOverrides{
      constructor(graph){
            this.graph = graph;
      }

      //override groupcells
    groupCells = function(group, border, cells)
    {
        if (cells == null)
        {
            cells = mxUtils.sortCells(this.graph.getSelectionCells(), true);
        }

        cells = this.graph.getCellsForGroup(cells);

        if (group == null)
        {
            group = this.graph.createGroupCell(cells);
            group.style = 'fillColor=none;strokeColor=none;'
        }

        var bounds = this.graph.getBoundsForGroup(group, cells, border);

        if (cells.length > 0 && bounds != null)
        {
            // Uses parent of group or previous parent of first child
            var parent = this.graph.model.getParent(group);
            
            if (parent == null)
            {
                parent = this.graph.model.getParent(cells[0]);
            }

            this.graph.model.beginUpdate();
            try
            {
                // Checks if the group has a geometry and
                // creates one if one does not exist
                if (this.graph.getCellGeometry(group) == null)
                {
                    this.graph.model.setGeometry(group, new mxGeometry());
                }

                // Adds the group into the parent
                var index = this.graph.model.getChildCount(parent);
                this.graph.cellsAdded([group], parent, index, null, null, false, false, false);

                // Adds the children into the group and moves
                index = this.graph.model.getChildCount(group);
                this.graph.cellsAdded(cells, group, index, null, null, false, false, false);
                this.graph.cellsMoved(cells, -bounds.x + 7, -bounds.y + 7, false, false, false);

                // Resizes the group
                bounds.width += 14;
                bounds.height += 14;
                this.graph.cellsResized([group], [bounds], false);

                // this.graph.fireEvent(new mxEventObject(mxEvent.GROUP_CELLS,
                //         'group', group, 'border', border, 'cells', cells));
            }
            finally
            {
                this.graph.model.endUpdate();
            }
        }

        return group;
    };
  }
