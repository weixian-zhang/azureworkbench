import Utils from "./Utils";
import ResourceType from '../../../models/ResourceType';
import VM from "../../../models/VM";

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
                this.getVNetAndVMContext(result.userObject, cell, contexts);
            }
        });

        return contexts;
    }

    getVNetAndVMContext = (vnetUserObject, cell, contexts) => {
          
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
    
    getVMContexts(graph, subnetCell, resources) {
        var vms = graph.getChildVertices(subnetCell);

        if(!Utils.IsNullOrUndefine(vms))
            return resources;
        
        vms.map(vm => {
            var vm = new VM();
        })
    }
}