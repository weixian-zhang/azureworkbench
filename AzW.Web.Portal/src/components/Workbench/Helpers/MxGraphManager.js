import {
    mxGraph,
    mxGuide,
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
    mxConnectionHandler
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
        mxEdgeHandler.prototype.snapToTerminals = true;
    }

    initLabelBehaviour(){

        //this.graph.htmlLabels = true;
        this.graph.setHtmlLabels(true);
        this.graph.htmlLabels = true;
        this.graph.autoSizeCellsOnAdd = true;

        // Overrides method to provide ProvisionContext.Name as label
        this.graph.convertValueToString = function(cell)
        {
            if(cell.value != null && cell.value.ProvisionContext != null)
                return cell.value.GraphModel.DisplayName;
            else
                return cell.value;
        };
    }

    initGraphStyle(){
        
        //rubberband selection style
        mxConstants.HANDLE_FILLCOLOR = '#99ccff';
        mxConstants.HANDLE_STROKECOLOR = '#0088cf';
        mxConstants.VERTEX_SELECTION_COLOR = '#00a8ff';
                
        //default vertex style
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
        vnetCellStyle[mxConstants.STYLE_ROUNDED] = '1';
        vnetCellStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "TOP";
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
        subnetCellStyle[mxConstants.STYLE_ROUNDED] = '1';
        subnetCellStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "TOP";
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
        
        // Snaps to fixed points
        // mxConstraintHandler.prototype.intersects = function(icon, point, source, existingEdge)
        // {
        //     return (!source || existingEdge) || mxUtils.intersects(icon.bounds, point);
        // };
        
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

    exportDiagram() {
        var enc = new mxCodec(mxUtils.createXmlDocument());
        var node = enc.encode(this.graph.getModel());
        return mxUtils.getPrettyXml(node);
    }
}