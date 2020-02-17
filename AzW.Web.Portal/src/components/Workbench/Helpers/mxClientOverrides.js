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

    //   initStyle(){
    //     style = new Object();
    //     //style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
    //     style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    //     style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
    //     style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
    //     style[mxConstants.STYLE_FILLCOLOR] = 'none';
    //     style[mxConstants.STYLE_GRADIENTCOLOR] = '#F8C48B';
    //     style[mxConstants.STYLE_STROKECOLOR] = 'none';
    //     style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    //     style[mxConstants.STYLE_ROUNDED] = false;
    //     style[mxConstants.STYLE_OPACITY] = '80';
    //     style[mxConstants.STYLE_STARTSIZE] = '30';
    //     style[mxConstants.STYLE_FONTSIZE] = '16';
    //     style[mxConstants.STYLE_FONTSTYLE] = 1;
    //     graph.getStylesheet().putCellStyle('group', style);
    //   }

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
                this.graph.cellsMoved(cells, -bounds.x, -bounds.y, false, false, false);

                // Resizes the group
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

// ungroupCells = function(cells)
// {
// 	var result = [];
	
// 	if (cells == null)
// 	{
// 		cells = this.getSelectionCells();

// 		// Finds the cells with children
// 		var tmp = [];
		
// 		for (var i = 0; i < cells.length; i++)
// 		{
// 			if (this.model.getChildCount(cells[i]) > 0)
// 			{
// 				tmp.push(cells[i]);
// 			}
// 		}

// 		cells = tmp;
// 	}
	
// 	if (cells != null && cells.length > 0)
// 	{
// 		this.model.beginUpdate();
// 		try
// 		{
// 			for (var i = 0; i < cells.length; i++)
// 			{
// 				var children = this.model.getChildren(cells[i]);
				
// 				if (children != null && children.length > 0)
// 				{
// 					children = children.slice();
// 					var parent = this.model.getParent(cells[i]);
// 					var index = this.model.getChildCount(parent);

// 					this.cellsAdded(children, parent, index, null, null, true);
// 					result = result.concat(children);
// 				}
// 			}

// 			this.removeCellsAfterUngroup(cells);
// 			this.fireEvent(new mxEventObject(mxEvent.UNGROUP_CELLS, 'cells', cells));
// 		}
// 		finally
// 		{
// 			this.model.endUpdate();
// 		}
// 	}
	
// 	return result;
// };
  }
