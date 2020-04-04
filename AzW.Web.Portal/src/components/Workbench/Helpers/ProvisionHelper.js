import Utils from "./Utils";
import ResourceType from '../../../models/ResourceType';

export default class ProvisionHelper
{
    ExtractProvisionContexts = (graph) => {
        this.graph = graph;
        var cells = this.graph.getChildVertices(this.graph.getDefaultParent());

        var contexts = [];

        cells.map(cell => {

            var result = Utils.TryParseUserObject(cell.value);

            if(result.isUserObject)
            {
                this.getVNetContext(result.userObject, cell, contexts);
            }
        });

        return contexts;
    }

    getVNetContext = (vnetUserObject, cell, contexts) => {
          
        if(vnetUserObject.ProvisionContext.ResourceType == ResourceType.VNet())
        {
            var subnetCells = this.graph.getChildVertices(cell);
    
            if(Utils.IsNullOrUndefine(subnetCells))
              return [];
            
              var subnets = [];
    
              subnetCells.map(cell => {
                  var subnet = Utils.TryParseUserObject(cell.value);
                  subnets.push(subnet.userObject.ProvisionContext);
            });
    
            vnetUserObject.ProvisionContext.Subnets = subnets;
    
            contexts.push(vnetUserObject.ProvisionContext);
        }
    
        return contexts;
      }
}