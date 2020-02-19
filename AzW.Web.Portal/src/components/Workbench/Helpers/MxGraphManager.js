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

        this.initGlobalSettings();

        //this.initMouseEvent();
				
        // Disables built-in context menu
        mxEvent.disableContextMenu(this.container);
    
        this.initCodecBehaviour();

        this.initLabelBehaviour();

        this.addConnectablePortsToAllAddedVertex();
      }

    initGlobalSettings(){
        //global settings
        //contrain drag boundary of child within parent
        mxGraphHandler.prototype.removeCellsFromParent = false

        //adds page break on vertex move
        this.graph.view.setScale(0.70); //initial zoomed out degree
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

    initGlobalPanningSettings(){
        this.graph.setPanning(true);
        this.graph.panningHandler.useLeftButtonForPanning = false;
        this.graph.panningHandler.ignoreCell = false;
        
        this.graph.panningHandler.addListener(mxEvent.PAN_START, 
            function() { this.graph.container.style.cursor = 'grab'; });

        this.graph.panningHandler.addListener(mxEvent.PAN_END, 
            function() { this.graph.container.style.cursor = 'default'; });
    }

    initMouseEvent(){
        this.graph.addMouseListener(
            {
              mouseDown: function(sender, evt)
              {
                //disable connectable ports to prevent accidental drag that creates
                //edges
                //mxConstraintHandler.prototype.setEnabled(false);
              },
              mouseMove: function(sender, evt)
              {

              },
              mouseUp: function(sender, evt)
              {
                //mxConstraintHandler.prototype.setEnabled(true);
              }
            });
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

    initLabelBehaviour(){
        
        //this.graph.htmlLabels = true;
        this.graph.setHtmlLabels(false);
        this.graph.htmlLabels = false;
        this.graph.autoSizeCellsOnAdd = true;

        this.renderLabelFromUserObject();
        
    }

    initCodecBehaviour() {
        // remove overlays from exclude list for mxCellCodec so that overlays are encoded into XML
        var cellCodec = mxCodecRegistry.getCodec(mxCell);
        var excludes = cellCodec.exclude;
        excludes.splice(excludes.indexOf('geometry'), 1);
        excludes.splice(excludes.indexOf('overlays'), 1);
        excludes.splice(excludes.indexOf('children'), 1);
        excludes.splice(excludes.indexOf('parent'), 1);
        excludes.splice(excludes.indexOf('source'), 1);
        excludes.splice(excludes.indexOf('target'), 1);
        excludes.splice(excludes.indexOf('edges'), 1);
        excludes.splice(excludes.indexOf('mxTransient'), 1);
        excludes.splice(excludes.indexOf('mxPoint'), 1);
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

        var elbowEdgeStyle = new Object();
        //elbowEdgeStyle[mxConstants.STYLE_ROUNDED] = true;
        elbowEdgeStyle[mxConstants.STYLE_STROKEWIDTH] = 1;
        // elbowEdgeStyle[mxConstants.STYLE_EXIT_X] = 0.5; // center
        // elbowEdgeStyle[mxConstants.STYLE_EXIT_Y] = 1.0; // bottom
        // elbowEdgeStyle[mxConstants.STYLE_EXIT_PERIMETER] = 0; // disabled
        // elbowEdgeStyle[mxConstants.STYLE_ENTRY_X] = 0.5; // center
        // elbowEdgeStyle[mxConstants.STYLE_ENTRY_Y] = 0; // top
        // elbowEdgeStyle[mxConstants.STYLE_ENTRY_PERIMETER] = 0; // disabled
        elbowEdgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.OrthConnector;
        this.graph.getStylesheet().putCellStyle('elbowedgestyle', elbowEdgeStyle);

        var curvedEdgeStyle = new Object();
        curvedEdgeStyle[mxConstants.STYLE_ROUNDED] = true;
        curvedEdgeStyle[mxConstants.STYLE_CURVED] = '1';
        curvedEdgeStyle[mxConstants.STYLE_STROKEWIDTH] = 1;
        // curvedEdgeStyle[mxConstants.STYLE_EXIT_X] = 0.5; // center
        // curvedEdgeStyle[mxConstants.STYLE_EXIT_Y] = 1.0; // bottom
        // curvedEdgeStyle[mxConstants.STYLE_EXIT_PERIMETER] = 0; // disabled
        // curvedEdgeStyle[mxConstants.STYLE_ENTRY_X] = 0.5; // center
        // curvedEdgeStyle[mxConstants.STYLE_ENTRY_Y] = 0; // top
        // curvedEdgeStyle[mxConstants.STYLE_ENTRY_PERIMETER] = 0; // disabled
        curvedEdgeStyle[mxConstants.STYLE_EDGE] =  mxEdgeStyle.EDGESTYLE_ENTITY_RELATION;
        this.graph.getStylesheet().putCellStyle('curvededgestyle', curvedEdgeStyle);

        // dashed edges
        var dashedEdgeStyle = new Object();
        dashedEdgeStyle[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
        dashedEdgeStyle[mxConstants.STYLE_STROKEWIDTH] = '1.0';
        dashedEdgeStyle[mxConstants.STYLE_ROUNDED] = false;
        dashedEdgeStyle[mxConstants.CURSOR_MOVABLE_EDGE] = "move";
        dashedEdgeStyle[mxConstants.STYLE_DASHED] = '1';
        dashedEdgeStyle[mxConstants.STYLE_EDITABLE] = '0';
        this.graph.getStylesheet().putCellStyle('dashededgestyle', dashedEdgeStyle);
            
       // Creates the default style for edges
        var straightEdgeStyle = new Object();
        //straightEdgeStyle[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
        straightEdgeStyle[mxConstants.STYLE_EXIT_X] = 0.5; // center
        straightEdgeStyle[mxConstants.STYLE_EXIT_Y] = 1.0; // bottom
        straightEdgeStyle[mxConstants.STYLE_EXIT_PERIMETER] = 0; // disabled
        straightEdgeStyle[mxConstants.STYLE_ENTRY_X] = 0.5; // center
        straightEdgeStyle[mxConstants.STYLE_ENTRY_Y] = 0; // top
        straightEdgeStyle[mxConstants.STYLE_ENTRY_PERIMETER] = 0; // disabled
        straightEdgeStyle[mxConstants.STYLE_STROKEWIDTH] = '1.0';
        straightEdgeStyle[mxConstants.STYLE_ROUNDED] = false;
        straightEdgeStyle[mxConstants.CURSOR_MOVABLE_EDGE] = "move";
        straightEdgeStyle[mxConstants.STYLE_EDITABLE] = '0';
        this.graph.getStylesheet().putCellStyle('straightedgestyle', straightEdgeStyle);

        //text label style
        var textStyle = new Object();
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
        rectStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        rectStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        rectStyle[mxConstants.STYLE_RESIZABLE] = '1';
        rectStyle[mxConstants.STYLE_EDITABLE] = '1';
        rectStyle[mxConstants.STYLE_AUTOSIZE] = '0';
        rectStyle[mxConstants.STYLE_FONTSIZE] = '15';
        rectStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        rectStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        rectStyle[mxConstants.STYLE_SHAPE] = 'rectangle';
        this.graph.getStylesheet().putCellStyle('rectstyle', rectStyle);

        //triangle style
        var triangleStyle = new Object();
        triangleStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        triangleStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        triangleStyle[mxConstants.STYLE_RESIZABLE] = '1';
        triangleStyle[mxConstants.STYLE_EDITABLE] = '1';
        triangleStyle[mxConstants.STYLE_AUTOSIZE] = '0';
        triangleStyle[mxConstants.STYLE_FONTSIZE] = '15';
        triangleStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        triangleStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        triangleStyle[mxConstants.STYLE_SHAPE] = 'triangle';
        this.graph.getStylesheet().putCellStyle('trianglestyle', triangleStyle);

        //ellipse style
        var ellipseStyle = new Object();
        ellipseStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        ellipseStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        ellipseStyle[mxConstants.STYLE_RESIZABLE] = '1';
        ellipseStyle[mxConstants.STYLE_EDITABLE] = '1';
        ellipseStyle[mxConstants.STYLE_AUTOSIZE] = '0';
        ellipseStyle[mxConstants.STYLE_FONTSIZE] = '15';
        ellipseStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        ellipseStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        ellipseStyle['shape'] = 'ellipse';
        this.graph.getStylesheet().putCellStyle('ellipsestyle', ellipseStyle);

        //vnet style
        var vnetCellStyle  = new Object();
        vnetCellStyle[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        vnetCellStyle[mxConstants.SHAPE_RECTANGLE] = 'rectangle';
        vnetCellStyle[mxConstants.RECTANGLE_ROUNDING_FACTOR] = '0.0';
        vnetCellStyle[mxConstants.STYLE_SHADOW] = false;
        vnetCellStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        vnetCellStyle[mxConstants.STYLE_GRADIENTCOLOR] = 'none';
        vnetCellStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        vnetCellStyle[mxConstants.STYLE_FONTSIZE] = '12';
        vnetCellStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        vnetCellStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "TOP";
        vnetCellStyle[mxConstants.STYLE_ALIGN] = "right";
        vnetCellStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "TOP";
        vnetCellStyle[mxConstants.STYLE_EDITABLE] = '0';
        vnetCellStyle[mxConstants.STYLE_FOLDABLE] = '1';
        this.graph.getStylesheet().putCellStyle('vnetstyle', vnetCellStyle);

        var subnetCellStyle  = new Object();
        subnetCellStyle[mxConstants.STYLE_STROKECOLOR] = 'black';
        subnetCellStyle[mxConstants.STYLE_STROKEWIDTH] = '0.5';
        subnetCellStyle[mxConstants.SHAPE_RECTANGLE] = 'rectangle';
        subnetCellStyle[mxConstants.RECTANGLE_ROUNDING_FACTOR] = '0.0';
        subnetCellStyle[mxConstants.STYLE_SHADOW] = false;
        subnetCellStyle[mxConstants.STYLE_FILLCOLOR] = '#f9f9f9';
        subnetCellStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
        subnetCellStyle[mxConstants.STYLE_FONTSIZE] = '12';
        subnetCellStyle[mxConstants.STYLE_FONTFAMILY] = 'Segoe UI';
        subnetCellStyle[mxConstants.STYLE_EDITABLE] = '0';
        subnetCellStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "ALIGN_BOTTOM";
        subnetCellStyle[mxConstants.STYLE_ALIGN] = "ALIGN_LEFT";
        subnetCellStyle[mxConstants.STYLE_VERTICAL_ALIGN] = "ALIGN_TOP";
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
            new mxImage(require('../../../assets/azure_icons/vertex-port.gif'), 5, 5);
        
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

                if (terminal != null && this.model.isVertex(terminal.cell))
                {
                     var ports = [
                        new mxConnectionConstraint(new mxPoint(0.5, 0), true),
                        new mxConnectionConstraint(new mxPoint(0, 0.5), true),
                        new mxConnectionConstraint(new mxPoint(1, 0.5), true),
                        new mxConnectionConstraint(new mxPoint(0.5, 1), true),
                    ];

                    return ports;
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

    pasteInImageFromClipboard () {
        //https://github.com/jgraph/mxgraph/blob/master/javascript/examples/images.html

        //https://github.com/jgraph/mxgraph/blob/master/javascript/examples/images.html

        //http://jsfiddle.net/viliusl/xq2aLj4b/5/
    }

    isCellExist() {
        var cells = this.graph.getChildCells(this.graph.getDefaultParent());
        // mxGraphModel.getChildCells
        //     (this.graph.getModel(), this.graph.getDefaultParent(), true, true);
        //this.graph.getChildVertices(this.graph.getDefaultParent());
        if(cells.length > 0)
            return true;
        else
            return false;
    }

    isNonAzureShape(cell){
        if(this.isRect(cell) || this.isEllipse(cell) || this.isTriangle(cell) ||
            this.isText(cell) || cell.isEdge())
            return true;
        else
            return false;
    }

    isRect(cell) {
        if(cell == null)
        return;

        var style = this.convertStyleStringAsObject(cell.style);

        if(style != undefined || style != null)
        {
            if(style['shape'] == 'rectangle')
                return true;
        }
        return false;
    }

    isEllipse(cell) {
        if(cell == null)
        return;

        var style = this.convertStyleStringAsObject(cell.style);

        if(style != undefined || style != null)
        {
            if(style['shape'] == 'ellipse')
                return true;
        }
        return false;
    }

    isTriangle(cell) {
        if(cell == null)
        return;

        if(cell.style != undefined || cell.style != null)
        {
            if(cell.style['shape'] == 'triangle')
                return true;
        }
        
        return false;
    }

    isText(cell) {
        if(cell == null)
        return;

        if(cell.style != undefined || cell.style != null)
        {
            if(cell.style['fillColor'] == 'none' && cell.style['strokeColor'] == 'none')
                return true;
        }
        
        return false;
    }
    
    //styles = map
    changeShapeOnlyCellStyle(cell, newStyles) {

        if(cell == null || newStyles == null || newStyles.length <= 0)
            return;

        this.graph.getModel().beginUpdate();

        var newStyleObj= this.setNewStyleString(cell.style, newStyles);
           
        this.graph.getModel().setStyle(cell, newStyleObj);

        this.graph.getModel().endUpdate();

        this.graph.refresh();
    }

    setNewStyleString(existingStyles, selectedStyles) {
        
        var splitted = existingStyles.split(';');
        var newStyles = [];

        var i = 0;
        splitted.map(style => {
            var matchExistingStylKey = false;
            var keyval = style.split('=');
            var existingKey = keyval[0];
            
            selectedStyles.forEach(function styleElements(value, key, map) {
                if(existingKey == key)
                {
                    var newStyleKeyVal = key + '=' + value;

                    newStyles.push(newStyleKeyVal);

                    matchExistingStylKey = true;
                }
            });

            if(!matchExistingStylKey)
            {
                newStyles.push(style);
            }

            i++;
        })

        //form back full style string
        var newStyleStr = '';
        newStyles.map(style => {
            if(style != '')
                newStyleStr += style + ';';
        });
        
        return newStyleStr;        
    }

    convertStyleObjectAsString(styleObj){
        if(styleObj == null)
            return;
        
        var styleStr = '';
        for(var p in styleObj){
            var prop = Object.getOwnPropertyDescriptor(styleObj, p);
            styleStr += p + '=' + prop.value + ';';
        }
        return styleStr;
    }

    convertStyleStringAsObject(styleString){
        if(styleString == null)
            return;
        
        var styleObj = this.graph.getStylesheet().getCellStyle(styleString);
        
        return styleObj;;
    }

    getDefaultRectStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('rectstyle');
        return this.convertStyleObjectAsString(style);
    }

    getDefaultTriangleStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('trianglestyle');
        return this.convertStyleObjectAsString(style);
    }

    getDefaultTextStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('textstyle');
        return this.convertStyleObjectAsString(style);
    }

    getDefaultEllipseStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('ellipsestyle');
        return this.convertStyleObjectAsString(style);
    }

    getDefaultElbowEdgeStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('elbowedgestyle');
        return this.convertStyleObjectAsString(style);
    }

    getDefaultStraightEdgeStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('straightedgestyle');
        return this.convertStyleObjectAsString(style);
    }

    getDefaultDashEdgeStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('dashededgestyle');
        return this.convertStyleObjectAsString(style);
    }

    getDefaultCurvedEdgeStyleString() {
        var style = this.graph.getStylesheet().getCellStyle('curvededgestyle');
        return this.convertStyleObjectAsString(style);
    }
}