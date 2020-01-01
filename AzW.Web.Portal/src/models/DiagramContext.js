export default class DiagramContext
{
    constructor(){
        this.diagramId = '';
        this.subscriptionId = '';
        this.resourceGroup = '';
        this.vertices = new Array();
        
        //EdgeVisual objects. lines for visual only. to be created after vertices
        this.visualedges = new Array();
    }
}