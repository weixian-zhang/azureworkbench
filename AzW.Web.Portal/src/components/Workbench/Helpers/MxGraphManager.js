import {
    mxGraph,
    mxGeometry,
    mxEdgeHandler,
    mxGraphHandler,
    mxConstants,
    mxEdgeStyle,
    mxRubberband,
    mxUtils,
    mxEvent,
    mxImage,
    mxCodec,
    mxPoint,
    mxConnectionConstraint,
    mxConstraintHandler,
    mxCellEditor,
    mxConnectionHandler,
    mxCodecRegistry,
    mxCell,
    mxObjectCodec,
    mxEditor,
    mxDefaultKeyHandler,
    mxStylesheet,
    mxDefaultPopupMenu,
    mxDefaultToolbar,
    mxGraphModel,
    mxCellPath,
    mxCellOverlay
  } from "mxgraph-js";

export default class MxGraphManager
{
    constructor(container)
    {
        this.container = container;
        this.graph = null;
    }

    graph(){
        return this.graph;
    }

    container(){
        return this.container;
    }

    initGraph()
    {
        var graph = new mxGraph(this.container);
        this.graph = graph;
        
        this.initGraphBehavior();

        this.initGraphStyle();

        return this.graph;
    }

    initGraphBehavior(){

        // Enables rubberband selection
		new mxRubberband(this.graph);

        // Disables built-in context menu
        mxEvent.disableContextMenu(this.container);
        
        this.graph.setConnectable(true);

        this.graph.cellEditor.getEditorBounds = function(state)
        {
          var result = mxCellEditor.prototype.getEditorBounds.apply(this, arguments);
        
          if (this.graph.getModel().isEdge(state.cell))
          {
            result.x = state.getCenterX() - result.width / 2;
            result.y = state.getCenterY() - result.height / 2;
          }
        
          return result;
        };
        
        this.initLabelBehaviour();

        this.addConnectablePortsToAllAddedVertex();
         
        //contrain drag boundary of child within parent
        mxGraphHandler.prototype.removeCellsFromParent = false
        
        // // Enables guides
        mxGraphHandler.prototype.guidesEnabled = true;
    
        // Enables snapping waypoints to terminals
        //mxEdgeHandler.prototype.snapToTerminals = true;
    }

    initLabelBehaviour(){

        //this.graph.htmlLabels = true;
        this.graph.setHtmlLabels(false);
        this.graph.htmlLabels = false;
        this.graph.autoSizeCellsOnAdd = true;

        // remove overlays from exclude list for mxCellCodec so that overlays are encoded into XML
        var cellCodec = mxCodecRegistry.getCodec(mxCell);
        var excludes = cellCodec.exclude;
        excludes.splice(excludes.indexOf('overlays'), 1);
        excludes.splice(excludes.indexOf('children'), 1);
        excludes.splice(excludes.indexOf('parent'), 1);
        excludes.splice(excludes.indexOf('source'), 1);
        excludes.splice(excludes.indexOf('target'), 1);
        excludes.splice(excludes.indexOf('edges'), 1);
        excludes.splice(excludes.indexOf('mxTransient'), 1);
        // set flag to allow expressions (function) to be encoded
        cellCodec.allowEval = true;
        // set flag to allow expressions (function) to be decoded
        mxObjectCodec.allowEval = true;

        try {
        // Overrides method to provide ProvisionContext.Name as label to vertex
        this.graph.convertValueToString = function(cell)
        {
            if(cell.isEdge())
            return;
            
            if(cell.value != null)
            {
                //return cell.value.GraphModel.DisplayName;
                var usrObj = JSON.parse(cell.value);
                return  usrObj.ProvisionContext.Name; //cell.value.GraphModel.DisplayName;
            }
            else
                return cell.value;
        };
        }
        catch(error){
            
        }
    }

    initGraphStyle(){
        
        //rubberband selection style
        mxConstants.HANDLE_FILLCOLOR = '#99ccff';
        mxConstants.HANDLE_STROKECOLOR = '#0088cf';
        mxConstants.VERTEX_SELECTION_COLOR = '#00a8ff';
                
        //vnet style
        var vnetCellStyle  = new Object();
        vnetCellStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        vnetCellStyle[mxConstants.SHAPE_RECTANGLE] = 'rectangle';
        vnetCellStyle[mxConstants.RECTANGLE_ROUNDING_FACTOR] = '0.0';
        vnetCellStyle[mxConstants.STYLE_SHADOW] = false;
        vnetCellStyle[mxConstants.STYLE_FILLCOLOR] = 'white';
        vnetCellStyle[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
        vnetCellStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        vnetCellStyle[mxConstants.STYLE_FONTSIZE] = '12';
        vnetCellStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        // vnetCellStyle[mxConstants.STYLE_ROUNDED] = '1';
        // vnetCellStyle[mxConstants.RECTANGLE_ROUNDING_FACTOR] = '0.3';
        vnetCellStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "TOP";
        vnetCellStyle[mxConstants.STYLE_LABEL_POSITION] = "ALIGN_RIGHT";
        vnetCellStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "TOP";
        this.graph.getStylesheet().putCellStyle('vnetstyle', vnetCellStyle);

        var subnetCellStyle  = new Object();
        subnetCellStyle[mxConstants.STYLE_STROKECOLOR] = 'black';
        subnetCellStyle[mxConstants.SHAPE_RECTANGLE] = 'rectangle';
        subnetCellStyle[mxConstants.RECTANGLE_ROUNDING_FACTOR] = '0.0';
        subnetCellStyle[mxConstants.STYLE_SHADOW] = false;
        subnetCellStyle[mxConstants.STYLE_FILLCOLOR] = 'white';
        subnetCellStyle[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
        subnetCellStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        subnetCellStyle[mxConstants.STYLE_FONTSIZE] = '12';
        subnetCellStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        //subnetCellStyle[mxConstants.STYLE_ROUNDED] = '1';
        subnetCellStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "ALIGN_TOP,";
        subnetCellStyle[mxConstants.STYLE_LABEL_POSITION] = "ALIGN_RIGHT";
        subnetCellStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "TOP";
        this.graph.getStylesheet().putCellStyle('subnetstyle', subnetCellStyle);

        //elbow edge style
        var elbowEdgeStyle = new Object();
        elbowEdgeStyle[mxConstants.STYLE_ROUNDED] = true;
        elbowEdgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
        elbowEdgeStyle[mxConstants.CURSOR_MOVABLE_EDGE] = "move";
        this.graph.alternateEdgeStyle = 'elbow=vertical';
        this.graph.getStylesheet().putCellStyle('elbowedgestyle', elbowEdgeStyle);
            
        // Creates the default style for edges
        var straightEdgeStyle = new Object();
        straightEdgeStyle[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
        straightEdgeStyle[mxConstants.STYLE_STROKEWIDTH] = '1.5';
        straightEdgeStyle[mxConstants.STYLE_ROUNDED] = false;
        straightEdgeStyle[mxConstants.CURSOR_MOVABLE_EDGE] = "move";
        this.graph.getStylesheet().putCellStyle('straightedgestyle', straightEdgeStyle);

        // dashed edges
        var dashedEdgeStyle = new Object();
        dashedEdgeStyle[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
        dashedEdgeStyle[mxConstants.STYLE_STROKEWIDTH] = '1.5';
        dashedEdgeStyle[mxConstants.STYLE_ROUNDED] = false;
        dashedEdgeStyle[mxConstants.CURSOR_MOVABLE_EDGE] = "move";
        dashedEdgeStyle[mxConstants.STYLE_DASHED] = "1";
        this.graph.getStylesheet().putCellStyle('dashededgestyle', dashedEdgeStyle);
    }


    makeIconDraggable(htmlElement, resourceTypeName, onDropCallback) {
        var thisComp = this;

        var vmss = mxUtils.makeDraggable(htmlElement, this.graph,
            function(graph, evt, target, x, y,)
            {
                var dropContext = {
                    x: x,
                    y: y,
                    resourceType: resourceTypeName
                };
                onDropCallback(dropContext);
            }, null);        
    }

    addConnectablePortsToAllAddedVertex(){

        //http://jgraph.github.io/mxgraph/javascript/examples/portrefs.html
        //http://jgraph.github.io/mxgraph/javascript/examples/fixedpoints.html
        
        // Replaces the port image
        mxConstraintHandler.prototype.pointImage =
            new mxImage(require('../../../assets/azure_icons/vertex-port.png'), 20, 20);
        
        var graph = this.graph;
        graph.setConnectable(true);
        
        // Disables automatic handling of ports. This disables the reset of the
        // respective style in mxGraph.cellConnected. Note that this feature may
        // be useful if floating and fixed connections are combined.
        graph.setPortsEnabled(false);
        
        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();


        // Disables floating connections (only connections via ports allowed)
        graph.connectionHandler.isConnectableCell = function(cell)
        {
            return false;
        };
        mxEdgeHandler.prototype.isConnectableCell = function(cell)
        {
            return graph.connectionHandler.isConnectableCell(cell);
        };
        
        // Special case: Snaps source of new connections to fixed points
        // Without a connect preview in connectionHandler.createEdgeState mouseMove
        // and getSourcePerimeterPoint should be overriden by setting sourceConstraint
        // sourceConstraint to null in mouseMove and updating it and returning the
        // nearest point (cp) in getSourcePerimeterPoint (see below)
        var mxConnectionHandlerUpdateEdgeState =
            mxConnectionHandler.prototype.updateEdgeState;
        mxConnectionHandler.prototype.updateEdgeState = function(pt, constraint)
        {
            if (pt != null && this.previous != null)
            {
                var constraints = this.graph.getAllConnectionConstraints(this.previous);
                var nearestConstraint = null;
                var dist = null;
            
                for (var i = 0; i < constraints.length; i++)
                {
                    var cp = this.graph.getConnectionPoint(this.previous, constraints[i]);
                    
                    if (cp != null)
                    {
                        var tmp = (cp.x - pt.x) * (cp.x - pt.x) + (cp.y - pt.y) * (cp.y - pt.y);
                    
                        if (dist == null || tmp < dist)
                        {
                            nearestConstraint = constraints[i];
                            dist = tmp;
                        }
                    }
                }
                
                if (nearestConstraint != null)
                {
                    this.sourceConstraint = nearestConstraint;
                }
            }
        
            mxConnectionHandlerUpdateEdgeState.apply(this, arguments);
        };

        graph.getAllConnectionConstraints = function(terminal)
            {
                //do not put port constriants when cell is selected,
                //this causes bad experience in wanting to resize cell but accidentally
                //drag edge out of ports.
                if(graph.getSelectionModel().isSelected(terminal.cell))
                    return;

                if (terminal != null && this.model.isVertex(terminal.cell))
                {
                    return [
                        new mxConnectionConstraint(new mxPoint(0.5, 0), true),
                        new mxConnectionConstraint(new mxPoint(0, 0.5), true),
                        new mxConnectionConstraint(new mxPoint(1, 0.5), true),
                        new mxConnectionConstraint(new mxPoint(0.5, 1), true),
                    ];
                }

                return null;
            };
    }

    isCellExist() {
        var cells = this.graph.getChildVertices(this.graph.getDefaultParent());
        if(cells.length > 0)
            return true;
        else
            return false;
    }
}