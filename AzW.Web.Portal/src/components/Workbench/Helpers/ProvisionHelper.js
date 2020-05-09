import Utils from "./Utils";
import ResourceType from '../../../models/ResourceType';
import VM from "../../../models/VM";

export default class ProvisionHelper
{
    ExtractProvisionContexts = (graph) => {
        this.graph = graph;
        var cells = this.graph.getChildVertices(this.graph.getDefaultParent());

        var provisionContexts = [];

        cells.map(cell => {

            var result = Utils.TryParseUserObject(cell.value);

            if(result.isUserObject)
            {
                var userObject = result.userObject;

                //ordering is important!
                this.getNSGs(userObject, cell, provisionContexts);

                this.getVNetContext(userObject, cell, provisionContexts);

                this.getVMContexts(userObject, cell, provisionContexts);

                this.getInternalNLBContexts(userObject, cell, provisionContexts);

                this.getExternalNLBContexts(userObject, cell, provisionContexts);

                this.getAllResourcesOutsideVNetContexts(userObject, cell, provisionContexts);
            }
        });

        return provisionContexts;
    }

    getVNetContext = (userObject, cell, provisionContexts) => {
        
        if(userObject.ProvisionContext.ResourceType == ResourceType.VNet())
        {
            var vnetUserObject = userObject;

            var subnetCells = this.getSubnetCells(userObject, cell);
        
            if(Utils.IsNullOrUndefine(subnetCells))
                return;
            
                var subnetProContexts = [];

                subnetCells.map(subnetCell => {

                var subnet = Utils.TryParseUserObject(subnetCell.value);

                var nsgName = this.getNSGNameForSubnet(subnetCell);
                subnet.userObject.ProvisionContext.NSGName = nsgName;

                subnetProContexts.push(subnet.userObject.ProvisionContext);
            });

            vnetUserObject.ProvisionContext.Subnets = subnetProContexts; //set subnets

            provisionContexts.push(vnetUserObject.ProvisionContext);
        }
    }

    getInternalNLBContexts = (userObject, cell, provisionContexts) => {
        var subnetCells = this.getSubnetCells(userObject, cell);

        if(Utils.IsNullOrUndefine(subnetCells.length))
            return;

        var cellsInSubnets = this.getCellsInSubnets(subnetCells);

        cellsInSubnets.map(cell => {
            var result = Utils.TryParseUserObject(cell.value);

            if(result.isUserObject &&
                result.userObject.ProvisionContext.ResourceType == ResourceType.NLB())
            {
                var nlbCell = cell;
                var nlbContext = result.userObject.ProvisionContext;

                //get vnet name
                var vnetCell = nlbCell.parent.parent;
                var vnetResult = Utils.TryParseUserObject(vnetCell.value);
                nlbContext.VNetName = vnetResult.userObject.ProvisionContext.Name;

                //get subnet name
                var subnetCell = nlbCell.parent;
                var subnetResult =  Utils.TryParseUserObject(subnetCell.value);
                nlbContext.SubnetName = subnetResult.userObject.ProvisionContext.Name;

                var vmNames = this.getEdgeConnectedVMs(nlbCell);
                nlbContext.LoadBalanceToExistingVMNames = vmNames;

                provisionContexts.push(nlbContext);
            }
            
        });
    }

    getExternalNLBContexts(userObject, cell, provisionContexts) {
        if(userObject.ProvisionContext.ResourceType == ResourceType.NLB() &&
            userObject.ProvisionContext.IsInternalNLB == false)
        {
            var nlbContext = userObject.ProvisionContext;
            var vmNames = this.getEdgeConnectedVMs(cell);
            nlbContext.LoadBalanceToExistingVMNames = vmNames;

            provisionContexts.push(nlbContext);
        }
    }

    getEdgeConnectedVMs(cell) {
        if(cell.edges == null || cell.edges.length == 0)
            return null;

        var vmNames = [];

        cell.edges.map(x => {

            var source = x.source;
            var target = x.target;

            if(Utils.IsVM(source))
            {
                var result =  Utils.TryParseUserObject(source);
                vmNames.push(result.userObject.ProvisionContext.Name);
            }

            if(Utils.IsVM(target))
            {
                var result =  Utils.TryParseUserObject(target);
                vmNames.push(result.userObject.ProvisionContext.Name);
            }
        });

        return vmNames;
    }
    
    getVMContexts = (userObject, cell, provisionContexts) => {

        var subnetCells = this.getSubnetCells(userObject, cell);

        if(Utils.IsNullOrUndefine(subnetCells.length))
            return;
        
        var vms = [];

        var cellsInSubnets = this.getCellsInSubnets(subnetCells);

        if(Utils.IsNullOrUndefine(cellsInSubnets))
            return provisionContexts;
        
        cellsInSubnets.map(cell => {

            var result = Utils.TryParseUserObject(cell.value);

            if(result.isUserObject &&
                result.userObject.ProvisionContext.ResourceType == ResourceType.VM())
            {
                var vmCell = cell;
                var vmContext = result.userObject.ProvisionContext;

                //get vnet name
                var vnetCell = vmCell.parent.parent;
                var vnetResult = Utils.TryParseUserObject(vnetCell.value);
                vmContext.VNetName = vnetResult.userObject.ProvisionContext.Name;

                //get subnet name
                var subnetCell = vmCell.parent;
                var subnetResult =  Utils.TryParseUserObject(subnetCell.value);
                vmContext.SubnetName = subnetResult.userObject.ProvisionContext.Name;

                provisionContexts.push(vmContext);
            }
        })

        return provisionContexts;
    }
    
    getNSGs = (userObject, cell, provisionContexts) => {

        if(userObject.ProvisionContext.ResourceType != ResourceType.VNet())
            return;

        var subnetCells = this.getSubnetCells(userObject, cell);

        if(Utils.IsNullOrUndefine(subnetCells.length))
            return;
        
        var nsgs = [];

        var cellsInSubnets = this.getCellsInSubnets(subnetCells);

        if(Utils.IsNullOrUndefine(cellsInSubnets))
            return provisionContexts;
        
        cellsInSubnets.map(cell => {

            var result = Utils.TryParseUserObject(cell.value);

            if(result.isUserObject &&
               result.userObject.ProvisionContext.ResourceType == ResourceType.NSG())
               {
                    var nsgProContext = result.userObject.ProvisionContext;

                    provisionContexts.push(nsgProContext);
               }
        });
    }

    getAllResourcesOutsideVNetContexts = (userObject, cell, provisionContexts) => {

        if(userObject.ProvisionContext.ResourceType != ResourceType.VNet() &&
        userObject.ProvisionContext.ResourceType != ResourceType.NLB())
        {
            var proContext = userObject.ProvisionContext;
            provisionContexts.push(proContext);
        }
        return provisionContexts;
    }

    //helper
    getNSGNameForSubnet(subnetCell)
    {
        var children = this.graph.getChildVertices(subnetCell);

        if(Utils.IsNullOrUndefine(children))
            return '';
        
        for(var x of children)
        {
            var result = Utils.TryParseUserObject(x.value);

            if(result.isUserObject &&
                result.userObject.ProvisionContext.ResourceType == ResourceType.NSG())
            {
                return result.userObject.ProvisionContext.Name;
            }
        }
        return '';
    }

    getSubnetCells(userObject, cell) {

        if(userObject.ProvisionContext.ResourceType == ResourceType.VNet())
        {
            var subnetCells = [];

            var cellsInVNets = this.graph.getChildVertices(cell);
    
            if(Utils.IsNullOrUndefine(cellsInVNets))
                return [];
            else
            {
                cellsInVNets.map(cell => {

                    var result = Utils.TryParseUserObject(cell);

                    if(result.isUserObject &&
                       result.userObject.ProvisionContext.ResourceType == ResourceType.Subnet())
                       {
                        subnetCells.push(cell);
                       }
                });
            }
            
            return subnetCells;

        }
        else return [];
    }

    //helper
    getCellsInSubnets(subnetCells) {
        
        var cellsInSubnets = [];

        subnetCells.map(cell => {

            var cellsInSubnet = this.graph.getChildVertices(cell);

            if(!Utils.IsNullOrUndefine(cellsInSubnet))
            {
                cellsInSubnet.map(cellInSub => {

                    cellsInSubnets.push(cellInSub);
                    
                })
               
            }

        });

        return cellsInSubnets;

    }
}