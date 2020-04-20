import Utils from './Utils';
import ResourceType from '../../../models/ResourceType';

export default class AzureValidator {
    constructor(graph){
        this.graph = graph;
    }
    
    isResourceDropinSubnet(droppedCell) {
        var cell = null;

        if(!Utils.IsNullOrUndefine(droppedCell))
            cell = droppedCell;
        else
            cell = this.graph.getSelectionCell();
        
            if(Utils.IsNullOrUndefine(cell))
                return false;

         if(this.isSubnet(cell))
            return {isInSubnet: true, subnetCell: cell};
         else
            return {isInSubnet: false, subnetCell: cell};
    }

    isVMinSubnetTakenByDedicatedSubnetResource(subnet) {
        var childCount = this.graph.getModel().getChildCount(subnet);

        if(childCount <=0 )
            return false;
        
        var childCells = this.graph.getChildVertices(subnet)

        var result = false;
        
        for (var i = 0; i < childCells.length; i++) {
            if(this.isPaaSInVNetResource(childCells[i]))
            {
                result = true;
                break;
            }
        };

        return result;
    }

    isResourceinDedicatedSubnet(subnetCell) {

        var result = this.isResourceDropinSubnet(subnetCell);

        if(result.isInSubnet)
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

    isVM(cell) {
        
        if(Utils.IsNullOrUndefine(cell))
            return false;

        var obj = Utils.TryParseUserObject(cell.value);

        if(!obj.isUserObject)
            return false;
        
        if(obj.isUserObject &&
           obj.userObject.GraphModel.ResourceType == ResourceType.WindowsVM() ||
           obj.userObject.GraphModel.ResourceType == ResourceType.LinuxVM())
            return true;
        else
            return false;

    }

    isVNet(cell){
        if(Utils.IsNullOrUndefine(cell))
            return false;

        var obj = Utils.TryParseUserObject(cell.value);

        if(Utils.IsNullOrUndefine(obj))
            return false;
        
        if(obj.isUserObject && obj.userObject.GraphModel.ResourceType == ResourceType.VNet())
            return true;
        else
            return false;
    }

    isSubnet(cell){
        if(Utils.IsNullOrUndefine(cell))
        return false;

        var obj = Utils.TryParseUserObject(cell.value);

        if(Utils.IsNullOrUndefine(obj))
            return false;
        
        if(obj.isUserObject && obj.userObject.GraphModel.ResourceType == ResourceType.Subnet())
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    subnetHasNSG(subnetCell) {
        var childs = this.graph.getChildVertices(subnetCell);

        if(!Utils.IsNullOrUndefine(childs))
        {
            for(var child of childs)
            {
                var result = Utils.TryParseUserObject(child.value);
                
                if(result.isUserObject &&
                    result.userObject.ProvisionContext.ResourceType == ResourceType.NSG())
                    {
                        return true;
                    }
            }
        }
        else
            return false;
    }

    subnetHasUDR(subnetCell) {
        var childs = this.graph.getChildVertices(subnetCell);

        if(!Utils.IsNullOrUndefine(childs))
        {
            for(var child of childs)
            {
                var result = Utils.TryParseUserObject(child.value);
                
                if(result.isUserObject &&
                    result.userObject.ProvisionContext.ResourceType == ResourceType.RouteTable())
                    {
                        return true;
                    }
            }
        }
        else
            return false;
    }

    isGatewaySubnetExist(vnetCell){
        if(Utils.IsNullOrUndefine(vnetCell))
            return false;
        
        var subnets = this.graph.getChildVertices(vnetCell);

        if(subnets.length <= 0)
            return false;
        
        var gatewaySubnetExist = false;
        
        for (var i = 0; i < subnets.length; i++) {
            var sub = subnets[i];

            var result = Utils.TryParseUserObject(sub.value);

            if(result.isUserObject) {
                
                if(result.userObject.GraphModel.ResourceType == ResourceType.Subnet()
                    && result.userObject.GraphModel.IsGatewaySubnet == true)
                    {
                        gatewaySubnetExist = true;
                        break;
                    }
            }
        }

        return gatewaySubnetExist;
    }

    isGatewaySubnet(subnetCell){

        if(Utils.IsNullOrUndefine(subnetCell))
            return false;

        var result = Utils.TryParseUserObject(subnetCell.value);

        if(result.userObject.GraphModel.ResourceType == ResourceType.Subnet()
        && result.userObject.GraphModel.IsGatewaySubnet == true)
        {
            return true;
        }
        else
            return false;
    }

    isAppGateway(cell){
        if(Utils.IsNullOrUndefine(cell))
        return false;

        var obj = Utils.TryParseUserObject(cell.value);

        if(!obj.isUserObject)
            return false;
        
        if(obj.isUserObject && obj.userObject.GraphModel.ResourceType == ResourceType.AppGw())
            return true;
        else
            return false;
    }

    isPaaSInVNetResource(cell) {
        if(Utils.IsNullOrUndefine(cell))
        return false;

        var obj = Utils.TryParseUserObject(cell.value);

        if(!obj.isUserObject)
            return false;
        
        if(obj.isUserObject && 
            obj.userObject.GraphModel.ResourceType == ResourceType.AppGw() ||
            obj.userObject.GraphModel.ResourceType == ResourceType.ASE() ||
            obj.userObject.GraphModel.ResourceType == ResourceType.Bastion() ||
            obj.userObject.GraphModel.ResourceType == ResourceType.Firewall() ||
            obj.userObject.GraphModel.ResourceType == ResourceType.SQLMI()
          )
            return true;
        else
            return false;
    }
}