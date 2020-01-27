import {
    mxGraph,
    mxGeomemxVertexHandlertry,
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
    mxCellEditor,
    mxConnectionHandler,
    mxCodecRegistry,
    mxCell,
    mxObjectCodec,
    mxDragSource
  } from "mxgraph-js";
  import Utils from '../Helpers/Utils';

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
        
        //vertex rotatable
        mxVertexHandler.prototype.rotationEnabled = true;

        // Disables built-in context menu
        mxEvent.disableContextMenu(this.container);
        
        this.graph.setConnectable(true);

        this.initGraphMouseEvents();
        
        this.initLabelBehaviour();

        this.addConnectablePortsToAllAddedVertex();
         
        //contrain drag boundary of child within parent
        mxGraphHandler.prototype.removeCellsFromParent = false
        
        // // Enables guides
        mxGraphHandler.prototype.guidesEnabled = true;
    
        // Enables snapping waypoints to terminals
        //mxEdgeHandler.prototype.snapToTerminals = true;
    }

    initGraphMouseEvents() {
        // this.graph.addMouseListener(
        // {
        // // mouseDown: function(sender, evt)
        // // {
        // //     mxLog.debug('mouseDown');
        // // },
        // mouseMove: function(sender, evt)
        // {
        //     var event = evt;
        // },
        // // mouseUp: function(sender, evt)
        // // {
        // //     mxLog.debug('mouseUp');
        // // }
        // });
    }

    initLabelBehaviour(){
        
        //this.graph.htmlLabels = true;
        this.graph.setHtmlLabels(false);
        this.graph.htmlLabels = false;
        this.graph.autoSizeCellsOnAdd = true;

        this.renderLabelFromUserObject();

        //whell up/down zoom in/out
        mxEvent.addMouseWheelListener(function (evt, up) {
                if (evt.shiftKey && up) {
                    //this.graph.zoomIn();
                    mxEvent.consume(evt);
                } else if (evt.ctrlKey) {
                    //this.graph.zoomOut();
                    mxEvent.consume(evt);
                }
            });

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
    }

    renderLabelFromUserObject(){
        try {
            // Overrides method to provide GraphModel.DisplayName as label to vertex
            this.graph.convertValueToString = function(cell)
            {
                if(cell.isEdge())
                return;

                var result = Utils.TryParseUserObject(cell.value);

                if(result.isUserObject)
                {
                    return  result.userObject.GraphModel.DisplayName;
                }
                else
                    return cell.value;
            }
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
        vnetCellStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "TOP";
        vnetCellStyle[mxConstants.STYLE_ALIGN] = "ALIGN_LEFT";
        vnetCellStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "TOP";
        vnetCellStyle[mxConstants.STYLE_EDITABLE] = '0';
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
        subnetCellStyle[mxConstants.STYLE_EDITABLE] = '0';
        subnetCellStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "ALIGN_BOTTOM";
        subnetCellStyle[mxConstants.STYLE_ALIGN] = "ALIGN_LEFT";
        subnetCellStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "ALIGN_TOP";
       
        this.graph.getStylesheet().putCellStyle('subnetstyle', subnetCellStyle);

        //elbow edge style
        var elbowEdgeStyle = new Object();
        elbowEdgeStyle[mxConstants.STYLE_ROUNDED] = true;
        elbowEdgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
        elbowEdgeStyle[mxConstants.CURSOR_MOVABLE_EDGE] = "move";
        elbowEdgeStyle[mxConstants.STYLE_EDITABLE] = '0';
        this.graph.alternateEdgeStyle = 'elbow=vertical';
        this.graph.getStylesheet().putCellStyle('elbowedgestyle', elbowEdgeStyle);
            
        // Creates the default style for edges
        var straightEdgeStyle = new Object();
        straightEdgeStyle[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
        straightEdgeStyle[mxConstants.STYLE_STROKEWIDTH] = '1.5';
        straightEdgeStyle[mxConstants.STYLE_ROUNDED] = false;
        straightEdgeStyle[mxConstants.CURSOR_MOVABLE_EDGE] = "move";
        straightEdgeStyle[mxConstants.STYLE_EDITABLE] = '0';
        this.graph.getStylesheet().putCellStyle('straightedgestyle', straightEdgeStyle);

        // dashed edges
        var dashedEdgeStyle = new Object();
        dashedEdgeStyle[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
        dashedEdgeStyle[mxConstants.STYLE_STROKEWIDTH] = '1.5';
        dashedEdgeStyle[mxConstants.STYLE_ROUNDED] = false;
        dashedEdgeStyle[mxConstants.CURSOR_MOVABLE_EDGE] = "move";
        dashedEdgeStyle[mxConstants.STYLE_DASHED] = '1';
        dashedEdgeStyle[mxConstants.STYLE_EDITABLE] = '0';
        this.graph.getStylesheet().putCellStyle('dashededgestyle', dashedEdgeStyle);

        // label/text
        var labelStyle = new Object();
        labelStyle[mxConstants.DEFAULT_FONTSIZE] = '14';
        labelStyle[mxConstants.DEFAULT_FONTFAMILY] = 'Segoe UI';
        labelStyle[mxConstants.HANDLE_FILLCOLOR] = '0';
        labelStyle[mxConstants.HANDLE_STROKECOLOR] = '0';
        labelStyle[mxConstants.STYLE_EDITABLE] = '1';
        labelStyle[mxConstants.STYLE_AUTOSIZE] = '0';
        labelStyle[mxConstants.STYLE_RESIZABLE] = '0';
        
        this.graph.getStylesheet().putCellStyle('labelstyle', labelStyle);
    }

    makeIconDraggable(htmlElement, resourceTypeName, onDropCallback) {
        var thisComp = this;
        
        //https://stackoverflow.com/questions/18107231/jgraphx-how-can-i-get-a-vertex-by-mouse-coordinates-mousemoved-method
        
        mxUtils.makeDraggable(htmlElement, this.graph,
            function(graph, evt, target, x, y,)
            {
                var evtPoint = graph.getPointForEvent(evt);

                var dropContext = {
                    x: evtPoint.x,
                    y: evtPoint.y,
                    resourceType: resourceTypeName
                };
                onDropCallback(dropContext);
            }, null,null, this.graph.autoscroll, true);        
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

    translateToParentGeometryPoint(dropContext, parentCellToAdd) {
        
        var targetState = this.graph.getView().getState(parentCellToAdd);
        if(targetState != null)
        {
            var scale = this.graph.getView().scale;

            dropContext.x -= targetState.origin.x * scale;
            dropContext.y -= targetState.origin.y * scale;
        }
        
        return dropContext;
    }

    isCellExist() {
        var cells = this.graph.getChildVertices(this.graph.getDefaultParent());
        if(cells.length > 0)
            return true;
        else
            return false;
    }
}