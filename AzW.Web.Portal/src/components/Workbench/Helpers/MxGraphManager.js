import {
    mxGraph,
    mxRectangle,
    mxEdgeHandler,
    mxGraphHandler,
    mxConstants,
    mxDictionary,
    mxRubberband,
    mxUtils,
    mxEvent,
    mxImage,
    mxVertexHandler,
    mxPoint,
    mxConnectionConstraint,
    mxConstraintHandler,
    mxConnectionHandler,
    mxCellEditor,
    mxEventObject,
    mxEdgeStyle,
    mxStyleRegistry,
    mxGraphCreateHandler,
    mxEdgeSegmentHandler
  } from "mxgraph-js";

import Utils from '../Helpers/Utils';
import ResourceType from '../../../models/ResourceType';

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

        this.initGlobalSettings();

        this.setEdgeEasyToConnectVertex();
				
        // Disables built-in context menu
        mxEvent.disableContextMenu(this.container);

        this.overrideRemoveCell();

        //NSG and RouteTable
        this.overrideMxClientForUDRNSGNATGWFloatAtParentEdge();
    
        this.initCodecBehaviour();

        this.initLabelBehaviour();

        this.addConnectablePortsToAllAddedVertex();
      }

    initGlobalSettings(){

        this.initResizeVertexSettings();

        this.graph.foldingEnabled = false;

        mxVertexHandler.prototype.livePreview = false;

        //global settings
        //contrain drag boundary of child within parent
        mxGraphHandler.prototype.removeCellsFromParent = false

        //this prevents Quickstart template loading to source for "expanded.gif"
        //which slows down template loading
        // Sets the collapse and expand icons. The values below are the default
        // values, but this is how to replace them if you need to.
        mxGraph.prototype.collapsedImage = new mxImage(require('../../../assets/azure_icons/vertex-port.gif'), 9, 9);
        mxGraph.prototype.expandedImage = new mxImage(require('../../../assets/azure_icons/vertex-port.gif'), 9, 9);

        this.graph.setTooltips(false);

        //adds page break on vertex move
        this.graph.view.setScale(0.9); //initial zoomed out degree
        this.graph.pageBreaksVisible = false;
        this.graph.pageBreakDashed = true;
        this.graph.preferPageSize = true;
        this.graph.centerZoom = false;
        // Takes zoom into account for moving cells
        this.graph.graphHandler.scaleGrid = true;

        var headerSize = 100;
        var footerSize = 100;
        // Removes header and footer from page height
        this.graph.pageFormat.height -= headerSize + footerSize;

        // // Enables guides
        mxGraphHandler.prototype.guidesEnabled = true;    
        this.graph.setAllowDanglingEdges(true);
        this.graph.model.ignoreRelativeEdgeParent = true;
        this.graph.model.maintainEdgeParent = false;
        this.graph.extendParentsOnAdd = false;
        this.graph.extendParents = false;

        var thisComp = this;
        window.addEventListener("wheel", function(e) {
            var dir = Math.sign(e.deltaY);
            if(e.shiftKey == true && dir == -1){ //up
                thisComp.graph.zoomIn();
            }
            else if(e.shiftKey == true && dir == 1)
            {
                //e.preventDefault()
                thisComp.graph.zoomOut();
            }
        });
        
        this.initGlobalPanningSettings();
    }

    setEdgeEasyToConnectVertex() {
        this.graph.setTolerance(1);

        // Centers the port icon on the target port
        this.graph.connectionHandler.targetConnectImage = true;
                
        // Overrides the mouse event dispatching mechanism to update the
        // cell which is associated with the event in case the native hit
        // detection did not return anything.
        var mxGraphFireMouseEvent = mxGraph.prototype.fireMouseEvent;
        mxGraph.prototype.fireMouseEvent = function(evtName, me, sender)
        {
            // Checks if native hit detection did not return anything
            if (me.getState() == null)
            {
                // Updates the graph coordinates in the event since we need
                // them here. Storing them in the event means the overridden
                // method doesn't have to do this again.
                if (me.graphX == null || me.graphY == null)
                {
                    var pt = mxUtils.convertPoint(this.container, me.getX(), me.getY());
                    
                    me.graphX = pt.x;
                    me.graphY = pt.y;
                }
                
                var cell = this.getCellAt(me.graphX, me.graphY);
                
                if (this.getModel().isEdge(cell))
                {
                    me.state = this.view.getState(cell);
                    
                    // if (me.state != null && me.state.shape != null)
                    // {
                    //     this.graph.container.style.cursor = me.state.shape.node.style.cursor;
                    // }
                }
            }
            
            // if (me.state == null)
            // {
            //     this.graph.container.style.cursor = 'default';
            // }
            
            mxGraphFireMouseEvent.apply(this, arguments);
        };
    }

    //prevent resize of children when parent resize
    initResizeVertexSettings() {
        this.graph.resizeContainer = false;
        this.graph.extendParentsOnAdd = false;
        this.graph.constrainChildren = true;
        this.graph.recursiveResize = false;
        mxVertexHandler.prototype.singleSizer = false;
    }

    initGlobalPanningSettings(){
        this.graph.setPanning(true);
        this.graph.panningHandler.useLeftButtonForPanning = false;
        this.graph.panningHandler.ignoreCell = false;
        
        this.graph.panningHandler.addListener(mxEvent.PAN_START, 
            function() { this.graph.container.style.cursor = 'grab'; });

        this.graph.panningHandler.addListener(mxEvent.PAN_END, 
            function() { this.graph.container.style.cursor = 'default'; });
    }

    overrideMxClientForUDRNSGNATGWFloatAtParentEdge() {

        var graph = this.graph;

        // Replaces translation for relative children
        mxGraph.prototype.translateCell = function(cell, dx, dy)
        {
            var result = Utils.TryParseUserObject(cell.value);

            //original translate cell codes
            if(result.isUserObject == false) {
                mxGraphTranslateCellOriginal(graph,cell, dx, dy)
            }
            else if(result.isUserObject == true &&
                result.userObject.ProvisionContext.ResourceType != ResourceType.NSG() &&
                result.userObject.ProvisionContext.ResourceType != ResourceType.RouteTable() &&
                result.userObject.ProvisionContext.ResourceType != ResourceType.NatGateway())
            {
                mxGraphTranslateCellOriginal(graph,cell, dx, dy)
            }
            else {
                    var rel = getRelativePosition(graph.view.getState(cell), dx * graph.view.scale, dy * graph.view.scale);
                        
                    if (rel != null)
                    {
                        var geo = this.model.getGeometry(cell);
                        
                        if (geo != null && geo.relative)
                        {
                            geo = geo.clone();
                            geo.x = rel.x;
                            geo.y = rel.y;
                            
                            this.model.setGeometry(cell, geo);
                        }
                    }
                }
        };

        // Enables moving of relative children
        mxGraph.prototype.isCellLocked = function(cell)
        {
            return false;
        };

        // // Replaces move preview for relative children
        mxGraph.prototype.getDelta = function(me)
        {
            var point = mxUtils.convertPoint(graph.container, me.getX(), me.getY());
            var delta = new mxPoint(point.x - this.first.x, point.y - this.first.y);
            
            if (this.cells != null && this.cells.length > 0 && this.cells[0] != null)
            {
                var state = graph.view.getState(this.cells[0]);
                var rel = getRelativePosition(state, delta.x, delta.y);
                
                if (rel != null)
                {
                    var pstate = graph.view.getState(graph.model.getParent(state.cell));
                    
                    if (pstate != null)
                    {
                        delta = new mxPoint(pstate.x + pstate.width * rel.x - state.getCenterX(),
                                pstate.y + pstate.height * rel.y - state.getCenterY());
                    }
                }
            }
            
            return delta;
        };

        //helper
        function mxGraphTranslateCellOriginal(graph, cell, dx, dy) {
                //origin codes from framework
                var geo = graph.model.getGeometry(cell);
            
                if (geo != null)
                {
                    dx = parseFloat(dx);
                    dy = parseFloat(dy);
                    geo = geo.clone();
                    geo.translate(dx, dy);
        
                    if (!geo.relative && graph.model.isVertex(cell) && !graph.isAllowNegativeCoordinates())
                    {
                        geo.x = Math.max(0, parseFloat(geo.x));
                        geo.y = Math.max(0, parseFloat(geo.y));
                    }
                    
                    if (geo.relative && !graph.model.isEdge(cell))
                    {
                        var parent = this.model.getParent(cell);
                        var angle = 0;
                        
                        if (graph.model.isVertex(parent))
                        {
                            var state = graph.view.getState(parent);
                            var style = (state != null) ? state.style : graph.getCellStyle(parent);
                            
                            angle = mxUtils.getValue(style, mxConstants.STYLE_ROTATION, 0);
                        }
                        
                        if (angle != 0)
                        {
                            var rad = mxUtils.toRadians(-angle);
                            var cos = Math.cos(rad);
                            var sin = Math.sin(rad);
                            var pt = mxUtils.getRotatedPoint(new mxPoint(dx, dy), cos, sin, new mxPoint(0, 0));
                            dx = pt.x;
                            dy = pt.y;
                        }
                        
                        if (geo.offset == null)
                        {
                            geo.offset = new mxPoint(dx, dy);
                        }
                        else
                        {
                            geo.offset.x = parseFloat(geo.offset.x) + dx;
                            geo.offset.y = parseFloat(geo.offset.y) + dy;
                        }
                    }
        
                    graph.model.setGeometry(cell, geo);
                }
        }

        function getRelativePosition(state, dx, dy)
        {
            if (state != null)
            {
                var model = graph.getModel();
                var geo = model.getGeometry(state.cell);
                
                if (geo != null && geo.relative && !model.isEdge(state.cell))
                {
                    var parent = model.getParent(state.cell);
                    
                    if (model.isVertex(parent))
                    {
                        var pstate = graph.view.getState(parent);
                        
                        if (pstate != null)
                        {
                            var scale = graph.view.scale;
                            var x = state.x + dx;
                            var y = state.y + dy;
                            
                            if (geo.offset != null)
                            {
                                x -= geo.offset.x * scale;
                                y -= geo.offset.y * scale;
                            }
                            
                            x = (x - pstate.x) / pstate.width;
                            y = (y - pstate.y) / pstate.height;
                            
                            if (Math.abs(y - 0.5) <= Math.abs((x - 0.5) / 2))
                            {
                                x = (x > 0.5) ? 1 : 0;
                                y = Math.min(1, Math.max(0, y));
                            }
                            else
                            {
                                x = Math.min(1, Math.max(0, x));
                                y = (y > 0.5) ? 1 : 0;
                            }
                            
                            return new mxPoint(x, y);
                        }
                    }
                }
            }
            
            return null;
        };
    }

    //auto snap edge to terminal points. Some users might not like this
    //but it solves a problem of edge not able to snap to port due to cursor blocking
    autoSnapEdgeToPorts = (toAutoSnap) => {

        if(!toAutoSnap)
        {
            //original intersects code
            mxConstraintHandler.prototype.intersects = function(icon, mouse, source, existingEdge)
            {
                return mxUtils.intersects(icon.bounds, mouse);
            };
        }
        else
        {
            mxConstraintHandler.prototype.intersects = function(icon, point, source, existingEdge)
            {
                return (!source || existingEdge) || mxUtils.intersects(icon.bounds, point);
            };

            // Special case: Snaps source of new connections to fixed points
        // Without a connect preview in connectionHandler.createEdgeState mouseMove
        // and getSourcePerimeterPoint should be overriden by setting sourceConstraint
        // sourceConstraint to null in mouseMove and updating it and returning the
        // nearest point (cp) in getSourcePerimeterPoint (see below)
        var mxConnectionHandlerUpdateEdgeState = mxConnectionHandler.prototype.updateEdgeState;
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
                    
                    // In case the edge style must be changed during the preview:
                    // this.edgeState.style['edgeStyle'] = 'orthogonalEdgeStyle';
                    // And to use the new edge style in the new edge inserted into the graph,
                    // update the cell style as follows:
                    //this.edgeState.cell.style = mxUtils.setStyle(this.edgeState.cell.style, 'edgeStyle', this.edgeState.style['edgeStyle']);
                }
            
                mxConnectionHandlerUpdateEdgeState.apply(this, arguments);
            };
        }
    }

    overrideRemoveCell() {
        mxGraph.prototype.removeCells = function(cells, includeEdges)
        {
            includeEdges = (includeEdges != null) ? includeEdges : true;
            
            if (cells == null)
            {
                cells = this.getDeletableCells(this.getSelectionCells());
            }

            // Adds all edges to the cells
            if (includeEdges)
            {
                // FIXME: Remove duplicate cells in result or do not add if
                // in cells or descendant of cells
                cells = this.getDeletableCells(this.addAllEdges(cells));
            }
            else
            {
                cells = cells.slice();
                
                // Removes edges that are currently not
                // visible as those cannot be updated
                var edges = this.getDeletableCells(this.getAllEdges(cells));
                var dict = new mxDictionary();
                
                for (var i = 0; i < cells.length; i++)
                {
                    dict.put(cells[i], true);
                }
                
                for (var i = 0; i < edges.length; i++)
                {
                    if (this.view.getState(edges[i]) == null &&
                        !dict.get(edges[i]))
                    {
                        dict.put(edges[i], true);
                        cells.push(edges[i]);
                    }
                }
            }

            this.model.beginUpdate();
            try
            {
                this.cellsRemoved(cells);
                this.fireEvent(new mxEventObject(mxEvent.REMOVE_CELLS, 
                        'cells', cells, 'includeEdges', includeEdges));
            }
            finally
            {
                this.model.endUpdate();
            }
            
            return cells;
        };
    

        mxGraph.prototype.cellsRemoved = function(cells)
        {
            if (cells != null && cells.length > 0)
            {
                var scale = this.view.scale;
                var tr = this.view.translate;
                
                this.model.beginUpdate();
                try
                {
                    // Creates hashtable for faster lookup
                    var dict = new mxDictionary();
                    
                    for (var i = 0; i < cells.length; i++)
                    {
                        dict.put(cells[i], true);
                    }
                    
                    for (var i = 0; i < cells.length; i++)
                    {
                        // Disconnects edges which are not being removed
                        var edges = this.getAllEdges([cells[i]]);
                        
                        var disconnectTerminal = mxUtils.bind(this, function(edge, source)
                        {
                            var geo = this.model.getGeometry(edge);

                            if (geo != null)
                            {
                                // Checks if terminal is being removed
                                var terminal = this.model.getTerminal(edge, source);
                                var connected = false;
                                var tmp = terminal;
                                
                                while (tmp != null)
                                {
                                    if (cells[i] == tmp)
                                    {
                                        connected = true;
                                        break;
                                    }
                                    
                                    tmp = this.model.getParent(tmp);
                                }

                                if (connected)
                                {
                                    geo = geo.clone();
                                    var state = this.view.getState(edge);

                                    if (state != null && state.absolutePoints != null)
                                    {
                                        var pts = state.absolutePoints;
                                        var n = (source) ? 0 : pts.length - 1;

                                        geo.setTerminalPoint(new mxPoint(
                                            pts[n].x / scale - tr.x - state.origin.x,
                                            pts[n].y / scale - tr.y - state.origin.y), source);
                                    }
                                    else
                                    {
                                        // Fallback to center of terminal if routing
                                        // points are not available to add new point
                                        // KNOWN: Should recurse to find parent offset
                                        // of edge for nested groups but invisible edges
                                        // should be removed in removeCells step
                                        var tstate = this.view.getState(terminal);
                                        
                                        if (tstate != null)
                                        {
                                            geo.setTerminalPoint(new mxPoint(
                                                tstate.getCenterX() / scale - tr.x,
                                                tstate.getCenterY() / scale - tr.y), source);
                                        }
                                    }

                                    this.model.setGeometry(edge, geo);
                                    this.model.setTerminal(edge, null, source);
                                }
                            }
                        });
                        
                        for (var j = 0; j < edges.length; j++)
                        {
                            if (!dict.get(edges[j]))
                            {
                                dict.put(edges[j], true);
                                disconnectTerminal(edges[j], true);
                                disconnectTerminal(edges[j], false);
                            }
                        }

                        this.model.remove(cells[i]);
                    }
                    
                    this.fireEvent(new mxEventObject(mxEvent.CELLS_REMOVED, 'cells', cells));
                }
                finally
                {
                    this.model.endUpdate();
                }
            }
        };
    }

    initLabelBehaviour() {
                
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
        
        this.graph.setHtmlLabels(true);
        this.graph.autoSizeCellsOnAdd = true;

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

    initMouseEvent(){
        // this.graph.addMouseListener(
        //     {
        //       mouseDown: function(sender, evt)
        //       {
        //         //disable connectable ports to prevent accidental drag that creates
        //         //edges
        //         //mxConstraintHandler.prototype.setEnabled(false);
        //       },
        //       mouseMove: function(sender, evt)
        //       {

        //       },
        //       mouseUp: function(sender, evt)
        //       {
        //         //mxConstraintHandler.prototype.setEnabled(true);
        //       }
        //     });
    }

    initExtendCanvas(){

        /*
        * Specifies the size of the size for "tiles" to be used for a graph with
        * scrollbars but no visible background page. A good value is large
        * enough to reduce the number of repaints that is caused for auto-
        * translation, which depends on this value, and small enough to give
        * a small empty buffer around the graph. Default is 400x400.
        */
        this.graph.scrollTileSize = new mxRectangle(0, 0, 400, 400);

        /**
         * Returns the padding for pages in page view with scrollbars.
         */
        this.graph.getPagePadding = function()
        {
            return new mxPoint(Math.max(0, Math.round(this.container.offsetWidth - 34)),
                    Math.max(0, Math.round(this.container.offsetHeight - 34)));
        };
        
        // /**
        //  * Returns the size of the page format scaled with the page size.
        //  */
        this.graph.getPageSize = function()
        {
            return (this.pageVisible) ? new mxRectangle(0, 0, this.pageFormat.width * this.pageScale,
                    this.pageFormat.height * this.pageScale) : this.scrollTileSize;
        };

        // /**
        //  * Returns a rectangle describing the position and count of the
        //  * background pages, where x and y are the position of the top,
        //  * left page and width and height are the vertical and horizontal
        //  * page count.
        //  */
        this.graph.getPageLayout = function()
        {
            var size = (this.pageVisible) ? this.getPageSize() : this.scrollTileSize;
            var bounds = this.getGraphBounds();

            if (bounds.width == 0 || bounds.height == 0)
            {
                return new mxRectangle(0, 0, 1, 1);
            }
            else
            {
                // Computes untransformed graph bounds
                var x = Math.ceil(bounds.x / this.view.scale - this.view.translate.x);
                var y = Math.ceil(bounds.y / this.view.scale - this.view.translate.y);
                var w = Math.floor(bounds.width / this.view.scale);
                var h = Math.floor(bounds.height / this.view.scale);
                
                var x0 = Math.floor(x / size.width);
                var y0 = Math.floor(y / size.height);
                var w0 = Math.ceil((x + w) / size.width) - x0;
                var h0 = Math.ceil((y + h) / size.height) - y0;
                
                return new mxRectangle(x0, y0, w0, h0);
            }
        };

        // // Fits the number of background pages to the graph
        this.graph.view.getBackgroundPageBounds = function()
        {
            var layout = this.graph.getPageLayout();
            var page = this.graph.getPageSize();
            
            return new mxRectangle(this.scale * (this.translate.x + layout.x * page.width),
                    this.scale * (this.translate.y + layout.y * page.height),
                    this.scale * layout.width * page.width,
                    this.scale * layout.height * page.height);
        };

        this.graph.getPreferredPageSize = function(bounds, width, height)
				{
					var pages = this.getPageLayout();
					var size = this.getPageSize();
					
					return new mxRectangle(0, 0, pages.width * size.width, pages.height * size.height);
                };
        
        /**
         * Guesses autoTranslate to avoid another repaint (see below).
         * Works if only the scale of the graph changes or if pages
         * are visible and the visible pages do not change.
         */
        var graphViewValidate = this.graph.view.validate;
        this.graph.view.validate = function()
        {
            if (this.container != null && mxUtils.hasScrollbars(this.container))
            {
                var pad = this.graph.getPagePadding();
                var size = this.graph.getPageSize();
                
                // Updating scrollbars here causes flickering in quirks and is not needed
                // if zoom method is always used to set the current scale on the graph.
                var tx = this.translate.x;
                var ty = this.translate.y;
                this.translate.x = pad.x / this.scale - (this.x0 || 0) * size.width;
                this.translate.y = pad.y / this.scale - (this.y0 || 0) * size.height;
            }
            
            graphViewValidate.apply(this, arguments);
        };
        
        var thisComp = this;
        var graphSizeDidChange = this.graph.sizeDidChange;
        
        this.graph.sizeDidChange = function()
        {
            if (this.container != null && mxUtils.hasScrollbars(this.container))
            {
                var pages = this.getPageLayout();
                var pad = this.getPagePadding();
                var size = this.getPageSize();
                
                // Updates the minimum graph size
                var minw = Math.ceil(2 * pad.x / this.view.scale + pages.width * size.width);
                var minh = Math.ceil(2 * pad.y / this.view.scale + pages.height * size.height);
                
                var min = thisComp.graph.minimumGraphSize;
                
                // LATER: Fix flicker of scrollbar size in IE quirks mode
                // after delayed call in window.resize event handler
                if (min == null || min.width != minw || min.height != minh)
                {
                    thisComp.graph.minimumGraphSize = new mxRectangle(0, 0, minw, minh);
                }
                
                // Updates auto-translate to include padding and graph size
                var dx = pad.x / this.view.scale - pages.x * size.width;
                var dy = pad.y / this.view.scale - pages.y * size.height;
                
                if (!this.autoTranslate && (this.view.translate.x != dx || this.view.translate.y != dy))
                {
                    this.autoTranslate = true;
                    this.view.x0 = pages.x;
                    this.view.y0 = pages.y;

                    var tx = thisComp.graph.view.translate.x;
                    var ty = thisComp.graph.view.translate.y;

                    thisComp.graph.view.setTranslate(dx, dy);
                    thisComp.graph.container.scrollLeft += (dx - tx) * thisComp.graph.view.scale;
                    thisComp.graph.container.scrollTop += (dy - ty) * thisComp.graph.view.scale;

                    this.autoTranslate = false;
                    return;
                }

                graphSizeDidChange.apply(this, arguments);
            }
        };

    }

    initCodecBehaviour() {
        // remove overlays from exclude list for mxCellCodec so that overlays are encoded into XML
        // var cellCodec = mxCodecRegistry.getCodec(mxCell);
        // var excludes = cellCodec.exclude;
        // excludes.splice(excludes.indexOf('geometry'), 1);
        // excludes.splice(excludes.indexOf('overlays'), 1);
        // excludes.splice(excludes.indexOf('children'), 1);
        // excludes.splice(excludes.indexOf('parent'), 1);
        // excludes.splice(excludes.indexOf('source'), 1);
        // excludes.splice(excludes.indexOf('target'), 1);
        // excludes.splice(excludes.indexOf('edges'), 1);
        // excludes.splice(excludes.indexOf('mxTransient'), 1);
        // excludes.splice(excludes.indexOf('mxPoint'), 1);
        //  excludes.splice(excludes.indexOf('mxKeyHandler'), 1);
        // excludes.splice(excludes.indexOf('mxGraphSelectionModel'), 1);
        // set flag to allow expressions (function) to be encoded
        //cellCodec.allowEval = true;
        // set flag to allow expressions (function) to be decoded
        //mxObjectCodec.allowEval = true;
    }

    initGraphStyle(){

        
        mxConstants.CURSOR_MOVABLE_VERTEX = 'pointer';
        mxConstants.CURSOR_MOVABLE_EDGE   = 'pointer';
        //rubberband selection style
        mxConstants.HANDLE_FILLCOLOR = '#99ccff';
        mxConstants.HANDLE_STROKECOLOR = '#0088cf';
        mxConstants.VERTEX_SELECTION_COLOR = '#00a8ff';

        var elbowEdgeStyle = new Object();
        elbowEdgeStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        elbowEdgeStyle[mxConstants.STYLE_STROKEWIDTH] = 1;
        elbowEdgeStyle[mxConstants.STYLE_DASHED] = '0';
        elbowEdgeStyle[mxConstants.STYLE_ROUNDED] = '1';
        elbowEdgeStyle[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_CLASSIC;
        elbowEdgeStyle[mxConstants.STYLE_ENDARROW] = 'none';
        elbowEdgeStyle['edgeStyle'] = 'orthogonalEdgeStyle';
        this.graph.getStylesheet().putCellStyle('elbowedgestyle', elbowEdgeStyle);

        //straight arrow
        var straightEdgeStyle = new Object();
        straightEdgeStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        straightEdgeStyle[mxConstants.STYLE_STROKEWIDTH] = 1;
        straightEdgeStyle[mxConstants.STYLE_DASHED] = '0';
        straightEdgeStyle[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_CLASSIC;
        straightEdgeStyle[mxConstants.STYLE_ENDARROW] = 'none';
        straightEdgeStyle[mxConstants.CURSOR_MOVABLE_EDGE] = "move";
        straightEdgeStyle[mxConstants.STYLE_EDITABLE] = '0';
        this.graph.getStylesheet().putCellStyle('straightedgestyle', straightEdgeStyle);

        //text label style
        var textStyle = new Object();
        textStyle[mxConstants.STYLE_RESIZABLE] = '1';
        textStyle[mxConstants.STYLE_STROKECOLOR] = 'none';
        textStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        textStyle[mxConstants.STYLE_RESIZABLE] = '0';
        textStyle[mxConstants.STYLE_AUTOSIZE] = '0';
        textStyle[mxConstants.STYLE_FONTSIZE] = '15';
        textStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        textStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        this.graph.getStylesheet().putCellStyle('textstyle', textStyle);

        //rectangle style
        var rectStyle = new Object();
        rectStyle[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RECTANGLE;
        rectStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        rectStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        rectStyle[mxConstants.STYLE_RESIZABLE] = '1';
        rectStyle[mxConstants.STYLE_EDITABLE] = '1';
        rectStyle[mxConstants.STYLE_AUTOSIZE] = '0';
        rectStyle[mxConstants.STYLE_FONTSIZE] = '15';
        rectStyle[mxConstants.STYLE_ROUNDED] = '0';
        rectStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        rectStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        rectStyle[mxConstants.STYLE_DASHED] = '0';
        rectStyle[mxConstants.STYLE_SHAPE] = 'rectangle';
        rectStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "middle";
        rectStyle[mxConstants.STYLE_ALIGN] = "center";
        rectStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "none";//out-bounds
        this.graph.getStylesheet().putCellStyle('rectstyle', rectStyle);

        var roundedRectStyle = new Object();
        roundedRectStyle[mxConstants.STYLE_ARCSIZE] = 8;
        roundedRectStyle[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RECTANGLE;
        roundedRectStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        roundedRectStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        roundedRectStyle[mxConstants.STYLE_RESIZABLE] = '1';
        roundedRectStyle[mxConstants.STYLE_EDITABLE] = '1';
        roundedRectStyle[mxConstants.STYLE_AUTOSIZE] = '0';
        roundedRectStyle[mxConstants.STYLE_FONTSIZE] = '15';
        roundedRectStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        roundedRectStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        roundedRectStyle[mxConstants.STYLE_DASHED] = '0';
        roundedRectStyle[mxConstants.RECTANGLE_ROUNDING_FACTOR] = 0.1;
        roundedRectStyle[mxConstants.STYLE_ROUNDED] = 1;
        roundedRectStyle[mxConstants.STYLE_SHAPE] = 'rectangle';
        roundedRectStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "middle";
        roundedRectStyle[mxConstants.STYLE_ALIGN] = "center";
        roundedRectStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "none";//out-bounds
        //roundedRectStyle[mxConstants.STYLE_LABEL_POSITION] = "top";//control out-bounds
       
        this.graph.getStylesheet().putCellStyle('roundedrectstyle', roundedRectStyle);

        //triangle style
        var triangleStyle = new Object();
        triangleStyle[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_TRIANGLE;
        triangleStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        triangleStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        triangleStyle[mxConstants.STYLE_DASHED] = '0';
        triangleStyle[mxConstants.STYLE_RESIZABLE] = '1';
        triangleStyle[mxConstants.STYLE_EDITABLE] = '1';
        triangleStyle[mxConstants.STYLE_AUTOSIZE] = '0';
        triangleStyle[mxConstants.STYLE_FONTSIZE] = '15';
        triangleStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        triangleStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        triangleStyle[mxConstants.STYLE_SHAPE] = 'triangle';
        triangleStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "middle";
        triangleStyle[mxConstants.STYLE_ALIGN] = "center";
        triangleStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "none";//out-bounds
        this.graph.getStylesheet().putCellStyle('trianglestyle', triangleStyle);

        //ellipse style
        var ellipseStyle = new Object();
        ellipseStyle[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_ELLIPSE;
        ellipseStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        ellipseStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        ellipseStyle[mxConstants.STYLE_DASHED] = '0';
        ellipseStyle[mxConstants.STYLE_RESIZABLE] = '1';
        ellipseStyle[mxConstants.STYLE_EDITABLE] = '1';
        ellipseStyle[mxConstants.STYLE_AUTOSIZE] = '0';
        ellipseStyle[mxConstants.STYLE_FONTSIZE] = '15';
        ellipseStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        ellipseStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        ellipseStyle['shape'] = 'ellipse';
        ellipseStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "middle";
        ellipseStyle[mxConstants.STYLE_ALIGN] = "center";
        ellipseStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "none";//out-bounds
        this.graph.getStylesheet().putCellStyle('ellipsestyle', ellipseStyle);

        //cylinder
        var cylinderStyle = new Object();
        cylinderStyle[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RECTANGLE;
        cylinderStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        cylinderStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        cylinderStyle[mxConstants.STYLE_DASHED] = '0';
        cylinderStyle[mxConstants.STYLE_RESIZABLE] = '1';
        cylinderStyle[mxConstants.STYLE_EDITABLE] = '1';
        cylinderStyle[mxConstants.STYLE_AUTOSIZE] = '0';
        cylinderStyle[mxConstants.STYLE_FONTSIZE] = '15';
        cylinderStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        cylinderStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        cylinderStyle['shape'] = 'cylinder';
        cylinderStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "middle";
        cylinderStyle[mxConstants.STYLE_ALIGN] = "center";
        cylinderStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "none";//out-bounds
        this.graph.getStylesheet().putCellStyle('cylinderstyle', cylinderStyle);

        //hexagon
        var hexagonStyle = new Object();
        hexagonStyle[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_HEXAGON;
        hexagonStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        hexagonStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        hexagonStyle[mxConstants.STYLE_DASHED] = '0';
        hexagonStyle[mxConstants.STYLE_RESIZABLE] = '1';
        hexagonStyle[mxConstants.STYLE_EDITABLE] = '1';
        hexagonStyle[mxConstants.STYLE_AUTOSIZE] = '0';
        hexagonStyle[mxConstants.STYLE_FONTSIZE] = '15';
        hexagonStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        hexagonStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        hexagonStyle['shape'] = 'hexagon';
        hexagonStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "middle";
        hexagonStyle[mxConstants.STYLE_ALIGN] = "center";
        hexagonStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "none";//out-bounds
        this.graph.getStylesheet().putCellStyle('hexagonstyle', hexagonStyle);

        //vnet style
        var vnetCellStyle  = new Object();
        vnetCellStyle[mxConstants.STYLE_ARCSIZE] = 8;
        vnetCellStyle[mxConstants.STYLE_STROKECOLOR] = '#00B0F0';
        vnetCellStyle[mxConstants.SHAPE_RECTANGLE] = 'rectangle';
        vnetCellStyle[mxConstants.STYLE_DASHED] = '0';
        vnetCellStyle[mxConstants.STYLE_ROUNDED] = '0';
        vnetCellStyle[mxConstants.STYLE_SHADOW] = false;
        vnetCellStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        vnetCellStyle[mxConstants.STYLE_GRADIENTCOLOR] = 'none';
        vnetCellStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        vnetCellStyle[mxConstants.STYLE_FONTSIZE] = '13';
        vnetCellStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        vnetCellStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "top";
        vnetCellStyle[mxConstants.STYLE_ALIGN] = "right";
        vnetCellStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "none";//out-bounds
        vnetCellStyle[mxConstants.STYLE_EDITABLE] = '0';
        vnetCellStyle[mxConstants.STYLE_FOLDABLE] = '0';
        this.graph.getStylesheet().putCellStyle('vnetstyle', vnetCellStyle);

        var subnetCellStyle  = new Object();
        subnetCellStyle[mxConstants.STYLE_ARCSIZE] = 8;
        subnetCellStyle[mxConstants.STYLE_STROKECOLOR] = '#2F528F';
        subnetCellStyle[mxConstants.STYLE_STROKEWIDTH] = '0.5';
        subnetCellStyle[mxConstants.STYLE_DASHED] = '0';
        subnetCellStyle[mxConstants.SHAPE_RECTANGLE] = 'rectangle';
        subnetCellStyle[mxConstants.STYLE_ROUNDED] = '1';
        subnetCellStyle[mxConstants.RECTANGLE_ROUNDING_FACTOR] = '0.2';
        subnetCellStyle[mxConstants.STYLE_SHADOW] = false;
        subnetCellStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        subnetCellStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        subnetCellStyle[mxConstants.STYLE_FONTSIZE] = '13';
        subnetCellStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        subnetCellStyle[mxConstants.STYLE_EDITABLE] = '0';
        subnetCellStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "top";
        subnetCellStyle[mxConstants.STYLE_ALIGN] = "left";
        subnetCellStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "none";//out-bounds

        this.graph.getStylesheet().putCellStyle('subnetstyle', subnetCellStyle);
    }

    makeIconDraggable(htmlElement, resourceTypeName, onDropCallback) {
        var thisComp =   this;
        
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
        
        // Replaces the port image
        mxConstraintHandler.prototype.pointImage =
            new mxImage(require('../../../assets/azure_icons/vertex-port.gif'), 8, 8);
        
        var graph = this.graph;
        
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

        var thisComp = this;
        graph.getAllConnectionConstraints = function(terminal)
            {
                //do not put port constriants when cell is selected,
                //this causes bad experience in wanting to resize cell but accidentally
                //drag edge out of ports.
                if(graph.getSelectionModel().isSelected(terminal.cell))
                    return;

                if (terminal != null && this.model.isVertex(terminal.cell) &&
                thisComp.isImage(terminal.cell))
                {
                    var val = Utils.TryParseUserObject(terminal.cell.value);

                    if(val.isUserObject && 
                       !Utils.IsNullOrUndefine(val.userObject.GraphModel.DisplayName) &&
                       val.userObject.GraphModel.DisplayName != '')
                    {
                        return [
                            new mxConnectionConstraint(new mxPoint(0, 0.5), false, 'west', 1.3, 0.0),//w
                            new mxConnectionConstraint(new mxPoint(0.95, 0.5), false, 'east', 0.0, 0.0), //e
                            new mxConnectionConstraint(new mxPoint(0.5, 0), false, 'north', 0.0, 0.5),//n
                            new mxConnectionConstraint(new mxPoint(0.5, 1), false, 'south', 0.0, 0.9),//s
                            new mxConnectionConstraint(new mxPoint(0.5, 1.5), false, 'belowLabel', 0.0, 0.9)]//below label
                    }
                    else
                        return [
                            new mxConnectionConstraint(new mxPoint(0, 0.5), false, 'west', 1.3, 0.0),//w
                            new mxConnectionConstraint(new mxPoint(0.95, 0.5), false, 'east', 0.0, 0.0), //e
                            new mxConnectionConstraint(new mxPoint(0.5, 0), false, 'north', 0.0, 0.5),//n
                            new mxConnectionConstraint(new mxPoint(0.5, 1), false, 'south', 0.0, 0.9)]//s
                        

                        
                        // new mxConnectionConstraint(new mxPoint(0.65, 0.5), false),//ne
                        // new mxConnectionConstraint(new mxPoint(0.15, 0.8), false), //sw
                        // new mxConnectionConstraint(new mxPoint(0.5, 0.5), false), //s
                        // new mxConnectionConstraint(new mxPoint(1, 0.9), false)];//se

                       

                }
                else if (terminal != null && this.model.isVertex(terminal.cell))
                {
                    return [new mxConnectionConstraint(new mxPoint(0, 0), true),
                        new mxConnectionConstraint(new mxPoint(0.5, 0), true),
                        new mxConnectionConstraint(new mxPoint(1, 0), true),
                        new mxConnectionConstraint(new mxPoint(0, 0.5), true),
                        new mxConnectionConstraint(new mxPoint(1, 0.5), true),
                        new mxConnectionConstraint(new mxPoint(0, 1), true),
                        new mxConnectionConstraint(new mxPoint(0.5, 1), true),
                        new mxConnectionConstraint(new mxPoint(1, 1), true)];
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
        var cells = this.graph.getChildCells(this.graph.getDefaultParent());

        if(cells.length > 0)
            return true;
        else
            return false;
    }

    isNonAzureShape(cell){
        if(cell == null)
            return false;

        if(this.isRect(cell) || this.isEllipse(cell) || this.isTriangle(cell) ||
            this.isText(cell) || cell.isEdge() || this.isCylinder(cell) || this.isHexagon(cell))
            return true;
        else
            return false;
    }

    isRect(cell) {
        if(cell == null)
        return;

        var style = this.convertStyleStringToObject(cell.style);

        if(style.shape == mxConstants.SHAPE_RECTANGLE)
            return true;
        else
            return false;
    }

    isEllipse(cell) {
        if(cell == null)
        return;

        var style = this.convertStyleStringToObject(cell.style);

        if(style.shape == mxConstants.SHAPE_ELLIPSE)
            return true;
        else
            return false;
    }

    isTriangle(cell) {
        if(cell == null)
        return;

        var style = this.convertStyleStringToObject(cell.style);

        if(style.shape == mxConstants.SHAPE_TRIANGLE)
            return true;
        else
            return false;
    }

    isCylinder(cell) {
        if(cell == null)
        return;

        var style = this.convertStyleStringToObject(cell.style);

        if(style.shape == mxConstants.SHAPE_CYLINDER)
            return true;
        else
            return false;
    }

    isHexagon(cell) {
        if(cell == null)
        return;

        if(cell.style != undefined || cell.style != null)
        {
            var style = this.convertStyleStringToObject(cell.style);

            if(style.shape == mxConstants.SHAPE_HEXAGON)
                return true;
        }
        
        return false;
    }

    isText = (cell) => {
        if(cell == null)
        return;

        if(cell.style != undefined || cell.style != null)
        {
            var style = this.convertStyleStringToObject(cell.style);

            if(style.fillColor == 'none' && style.strokeColor == 'none')
                return true;
        }
        
        return false;
    }

    isImage = (cell) => {
        if(cell == null)
        return;

        if(cell.style != undefined || cell.style != null)
        {
            var style = this.convertStyleStringToObject(cell.style);
            
            if(style.shape == 'image')
                return true;
            else
                return false;
        }
        return false;
    }
    
    setNewStyleFromStylePropPanel(cell, newStyles) {

        if(cell == null || newStyles == null || newStyles.length <= 0)
            return;

        this.graph.getModel().beginUpdate();

        var newStyleObj= this.setNewStyleString(cell.style, newStyles);
           
        this.graph.getModel().setStyle(cell, newStyleObj);

        this.graph.getModel().endUpdate();

        this.graph.refresh();
    }

    setNewStyleString(existingStyles, selectedStyles) {
        
        var existingStyleSplitted = existingStyles.split(';');

        var newStyles = [];

        existingStyleSplitted.map(style => {

            var i = 0;
            let matchExistingStyleKey = false;
            var keyval = style.split('=');
            var existingStyleKey = keyval[0];
        
            selectedStyles.forEach(function styleElements(value, newKey, map) {
                if(existingStyleKey == newKey)
                {
                    var newStyleKeyVal = newKey + '=' + value;

                    newStyles.push(newStyleKeyVal);

                    matchExistingStyleKey = true;
                }
            });

            if(!matchExistingStyleKey)
            {
                newStyles.push(style);
            }

            i++;
        })

        //form back full style string, existing styles +
        //new selected styles from style prop panel
        var newStyleStr = '';

        newStyles.map(style => {
            if(style != '')
                newStyleStr += style + ';';
        });
        
        return newStyleStr;        
    }

    convertStyleObjectToString(styleObj){
        if(styleObj == null)
            return;
        
        var styleStr = '';
        for(var p in styleObj){
            var prop = Object.getOwnPropertyDescriptor(styleObj, p);
            styleStr += p + '=' + prop.value + ';';
        }
        return styleStr;
    }

    //reason for getting style as string e.g: fillColor='red';strokeWidth=1
    //is to support dynamic style change by deserializing the semicolon string
    //into object to set new style then serialize back to semicolon string.
    convertStyleStringToObject(styleString){
        if(styleString == null)
            return;
        
        var styleObj = new Object();
        var styleArray = styleString.split(';');

        styleArray.map(style => {
            var keyVal = style.split('=');

            Object.defineProperty(styleObj, keyVal[0], { value: keyVal[1] })
        });
                
        return styleObj;;
    }

    getVNetStyle() {
        var style = this.graph.getStylesheet().getCellStyle('vnetstyle');
        return this.convertStyleObjectToString(style);
    }

    getSubnetStyle() {
        var style = this.graph.getStylesheet().getCellStyle('subnetstyle');
        return this.convertStyleObjectToString(style);
    }

    getDefaultRectStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('rectstyle');
        return this.convertStyleObjectToString(style);
    }

    getDefaultRoundedRectStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('roundedrectstyle');
        return this.convertStyleObjectToString(style);
    }

    getDefaultTriangleStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('trianglestyle');
        return this.convertStyleObjectToString(style);
    }

    getDefaultTextStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('textstyle');
        return this.convertStyleObjectToString(style);
    }

    getDefaultEllipseStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('ellipsestyle');
        return this.convertStyleObjectToString(style);
    }

    getDefaultElbowEdgeStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('elbowedgestyle');
        return this.convertStyleObjectToString(style);
    }

    getDefaultStraightEdgeStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('straightedgestyle');
        return this.convertStyleObjectToString(style);
    }

    getDefaultCylinderStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('cylinderstyle');
        return this.convertStyleObjectToString(style);
    }

    getDefaultHexagonStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('hexagonstyle');
        return this.convertStyleObjectToString(style);
    }
}