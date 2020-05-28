import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';


import Utils from '../Helpers/Utils';
import ResourceType from '../../../models/ResourceType';

export default class GojsManager
{
    constructor(container)
    {
    }

    initDiagramCanvas(containerId) {
        var gojs = go.GraphObject.make;
        var graph =
            gojs(go.Diagram, containerId,
                { // enable Ctrl-Z to undo and Ctrl-Y to redo
                  "undoManager.isEnabled": true,
                    isReadOnly: false,
                    allowHorizontalScroll: true,
                    allowVerticalScroll: true,
                    allowZoom: true,
                    allowSelect: true,
                    autoScale: Diagram.Uniform
                });
    
        return graph;
    }
}