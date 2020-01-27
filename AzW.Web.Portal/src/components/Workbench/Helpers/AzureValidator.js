export default class AzureValidator {
    constructor(graph){
        this.graph = graph;
    }
    
    isResourceDropinSubnet(dropx, dropy) {
         var cell = this.graph.getCellAt(dropx, dropy);

         if(cell == null ||
            JSON.parse(cell.value).GraphModel.ResourceType != "subnet")
            return {isInSubnet: false, subnetCell: cell};
         else
            return {isInSubnet: true, subnetCell: cell};
    }

    isResourceinDedicatedSubnet(subnetCell) {

        if(this.isResourceDropinSubnet(subnetCell))
        {
           var childCellCount = this.graph.getModel().getChildCount(subnetCell);

           if(childCellCount > 0)
              return false;
            else
              return true;
        }
        else
            return false;
    }
}