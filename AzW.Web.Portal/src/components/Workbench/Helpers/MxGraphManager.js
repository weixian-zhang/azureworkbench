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
    mxShape,
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
        
        //this.graph.setPanning(true);
        //this.graph.setTooltips(true);
        this.graph.setConnectable(true);
        
        this.initLabelBehaviour();

        this.addConnectablePortsToAllAddedVertex();
         
        //contrain drag boundary of child within parent
        mxGraphHandler.prototype.removeCellsFromParent = false
        
        // // Enables guides
        mxGraphHandler.prototype.guidesEnabled = true;
        
        // // Alt disables guides
        // mxGuide.prototype.isEnabledForEvent = function(evt)
        // {
        //     return !mxEvent.isAltDown(evt);
        // };
    
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
                return cell.value.ProvisionContext.Name;
            else
                return cell.value;
        };

        // Truncates the label to the size of the vertex
        // this.graph.getLabel = function(cell)
        // {
        //     var label = (this.labelsVisible) ? getCellLabelValue(cell) : '';
        //     var geometry = this.model.getGeometry(cell);
            
        //     if (!this.model.isCollapsed(cell) && geometry != null && (geometry.offset == null ||
        //         (geometry.offset.x == 0 && geometry.offset.y == 0)) && this.model.isVertex(cell) &&
        //         geometry.width >= 2)
        //     {
        //         var style = this.getCellStyle(cell);
        //         var fontSize = style[mxConstants.STYLE_FONTSIZE] || mxConstants.DEFAULT_FONTSIZE;
                
        //         //var max = geometry.width / (fontSize * 0.625);
        //         // if (max < label.length)
        //         // {
        //         //     return label.substring(0, max) + '...';
        //         // }
        //     }
            
        //     return label;
        // };

        // Enables wrapping for vertex labels
        // this.graph.isWrapping = function(cell)
        // {
        //     return this.model.isCollapsed(cell);
        // };
        
        //Enables clipping of vertex labels if no offset is defined
        // this.graph.isLabelClipped = function(cell)
        // {
        //     var geometry = this.model.getGeometry(cell);
            
        //     return geometry != null && !geometry.relative && (geometry.offset == null ||
        //         (geometry.offset.x == 0 && geometry.offset.y == 0));
        // };
                   

        // Returns a HTML representation of the cell
        // this.graph.getLabel = function(cell)
        // {
        //     var div = document.createElement('div');
        //     div.style.height = '100%';
        //     div.style.width = '100%';
        //     div.style.textAlign = 'center';
        //     div.style.fontSize = '12px';
        //     div.style.color = '#774400';
        //     div.style.position = "fixed";
        //     div.style.top = cell.getGeometry().x + 100;
        //     div.style.left = cell.getGeometry().y + 50;
        //     mxUtils.write(div, getCellLabelValue(cell));

        //     return div;
        // };
    }

    initGraphStyle(){
        
        //rubberband selection style
        mxConstants.HANDLE_FILLCOLOR = '#99ccff';
        mxConstants.HANDLE_STROKECOLOR = '#0088cf';
        mxConstants.VERTEX_SELECTION_COLOR = '#00a8ff';
                
        // Creates the default style for vertices
        var style = this.graph.getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        style[mxConstants.STYLE_ROUNDED] = false;
        style[mxConstants.STYLE_SHADOW] = false;
        style[mxConstants.STYLE_FILLCOLOR] = 'white';
        style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
        style[mxConstants.STYLE_FONTCOLOR] = 'black';
        style[mxConstants.STYLE_FONTSIZE] = '12';
        style[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
            
        // Creates the default style for edges
        style = this.graph.getStylesheet().getDefaultEdgeStyle();
        style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
        style[mxConstants.STYLE_STROKEWIDTH] = '1.5';
        style[mxConstants.STYLE_ROUNDED] = false;
        //style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
        style[mxConstants.CURSOR_MOVABLE_EDGE] = "move";
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

        // Ports are equal for all shapes...
        // var ports = new Array();
        
        // // NOTE: Constraint is used later for orthogonal edge routing (currently ignored)
        // ports['w'] = {x: 0, y: 0.5, perimeter: true, constraint: 'west'};
        // ports['e'] = {x: 1, y: 0.5, perimeter: true, constraint: 'east'};
        // ports['n'] = {x: 0.5, y: 0, perimeter: true, constraint: 'north'};
        // ports['s'] = {x: 0.5, y: 1, perimeter: true, constraint: 'south'};
        // ports['nw'] = {x: 0, y: 0, perimeter: true, constraint: 'north west'};
        // ports['ne'] = {x: 1, y: 0, perimeter: true, constraint: 'north east'};
        // ports['sw'] = {x: 0, y: 1, perimeter: true, constraint: 'south west'};
        // ports['se'] = {x: 1, y: 1, perimeter: true, constraint: 'south east'};			
        
        // Extends shapes classes to return their ports
        // mxShape.prototype.getPorts = function()
        // {
        //     return ports;
        // };

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
        mxConstraintHandler.prototype.intersects = function(icon, point, source, existingEdge)
        {
            return (!source || existingEdge) || mxUtils.intersects(icon.bounds, point);
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