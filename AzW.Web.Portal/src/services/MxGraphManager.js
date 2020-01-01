import {
    mxGraph,
    mxGuide,
    mxEdgeHandler,
    mxGraphHandler,
    Drawer,
    Switch,
    FormGroup, InputGroup,
    mxRectangle,
    mxParallelEdgeLayout,
    mxConstants,
    mxEdgeStyle,
    mxLayoutManager,
    mxCell,
    mxGeometry,
    mxRubberband,
    mxDragSource,
    mxKeyHandler,
    mxCodec,
    mxClient,
    mxConnectionHandler,
    mxUtils,
    mxToolbar,
    mxEvent,
    mxCellTracker,
    mxImage,
    mxFastOrganicLayout
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

    initGraph()
    {
        var graph = new mxGraph(this.container);
        this.graph = graph;
        

        this.initGraphBehavior();

        this.initGraphStyle();
        
        return this.graph;
    }

    initGraphBehavior(){

        var rubberband = new mxRubberband(this.graph);
        
        // Enables guides
        mxGraphHandler.prototype.guidesEnabled = true;
        
        // Alt disables guides
        mxGuide.prototype.isEnabledForEvent = function(evt)
        {
        return !mxEvent.isAltDown(evt);
        };
    
        // Enables snapping waypoints to terminals
        mxEdgeHandler.prototype.snapToTerminals = true;
    }

    initGraphStyle(){
        
        // Creates the default style for vertices
        var style = this.graph.getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_STROKECOLOR] = 'darkblue';
        style[mxConstants.STYLE_ROUNDED] = false;
        style[mxConstants.STYLE_SHADOW] = false;
        style[mxConstants.STYLE_FILLCOLOR] = 'white';
        style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
        style[mxConstants.STYLE_FONTCOLOR] = 'black';
        style[mxConstants.STYLE_FONTSIZE] = '12';
        style[mxConstants.STYLE_SPACING] = 4;
        style[mxConstants.STYLE_EDITABLE] = '0';

        // Creates the default style for edges
        style = this.graph.getStylesheet().getDefaultEdgeStyle();
        style[mxConstants.STYLE_STROKECOLOR] = '#0C0C0C';
        style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
        style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
        style[mxConstants.STYLE_ROUNDED] = true;
        style[mxConstants.STYLE_FONTCOLOR] = 'black';
        style[mxConstants.STYLE_FONTSIZE] = '10';
        style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
    }

    makeIconDraggable(htmlElement, resourceTypeName, onDropCallback) {
        var vmss = mxUtils.makeDraggable(htmlElement, this.graph,
            function(graph, evt, target, x, y)
            {
              var dropContext = {
                x: x,
                y: y,
                resourceType: resourceTypeName
              };
              onDropCallback(dropContext);
            }, null);
    }

    addDefaultEventListeners(onDoubleClickFuncInvoke){
        //double click load properties
        

        // delete key remove vertex
        // var keyHandler = new mxKeyHandler(graph);
        // keyHandler.bindKey(46, (evt) =>
        // {
        //   this.graph.removeCells();
        // });
        // }
    }

    
}