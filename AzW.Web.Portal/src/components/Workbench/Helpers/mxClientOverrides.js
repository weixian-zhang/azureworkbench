import {
    mxUtils,
    mxGeometry
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
                
                //shift the group parent cell to move the children center
                this.graph.cellsMoved(cells, -bounds.x + 15, -bounds.y + 15, false, false, false);

                //expands the group cell to make it easier to select and move the group
                bounds.width += 28;
                bounds.height += 28;
                this.graph.cellsResized([group], [bounds], false);
            }
            finally
            {
                this.graph.model.endUpdate();
            }
        }

        return group;
    };
  }
