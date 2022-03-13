import Utils from "./Utils";
import ResourceType from '../../../models/ResourceType';
import * as go from 'gojs';
import AzContextValidator from './AzContextValidator';

export default class AzContextCollector
{
    ExtractAzContexts = (diagram) => {

        if(Utils.isCanvasEmpty())
            return [];

        var provisionContexts = [];

        var allNodes = diagram.nodes;

        while (allNodes.next()) {

            var node = allNodes.value;

            if(!(node instanceof go.Link) &&
                !Utils.isSubnet(node) &&
                Utils.isAzContextExist(node)) {

                //ordering is important!
                if(this.getNSGs(node, provisionContexts))
                    continue;

                if(this.getVNetContext(node, provisionContexts))
                    continue;

                if(this.getVMContexts(node, provisionContexts))
                    continue;

                if(this.getVMSSContexts(node, provisionContexts))
                    continue;

                if(this.getVNetPeering(node, provisionContexts))
                    continue;

                if(this.getInternalNLBContexts(node, provisionContexts))
                    continue;

                if(this.getExternalNLBContexts(node, provisionContexts))
                    continue;

                if(this.getAppGatewayContexts(node, provisionContexts))
                    continue;

                if(this.getFirewallContexts(node, provisionContexts))
                    continue;

                if(this.getASEContexts(node, provisionContexts))
                    continue;

                if(this.getLAWContexts(node, provisionContexts))
                    continue;

                if(this.getASCContext(node, provisionContexts))
                    continue;

                if(this.getAllNonVIRContexts(node, provisionContexts))
                    continue;

            }
        }

        var sortedContexts = this.sortProvisionContexts(provisionContexts);

        var result = AzContextValidator.Validate(sortedContexts);

        return result;
    }   

    sortProvisionContexts(proContexts) {

        if(proContexts.length == 0)
            return [];

        var sortedContexts = [];

        var i = 0;

        //nsg
        if(proContexts.find(p => p.ResourceType == ResourceType.NSG()) != null) {

            while(proContexts.find(p => p.ResourceType == ResourceType.NSG()) != null) {
                for(var pc of proContexts) {

                    if(pc.ResourceType == ResourceType.NSG()) {

                        sortedContexts.push(pc);

                        var index = proContexts.findIndex
                            (p => p.Name == pc.Name && p.ResourceType == pc.ResourceType);

                        proContexts.splice(index, 1);

                        continue;
                    }
                }
            }
        }

        //vnet
        if(proContexts.find(p => p.ResourceType == ResourceType.VNet()) != null){

            while(proContexts.find(p => p.ResourceType == ResourceType.VNet()) != null) {
                for(var pc of proContexts) {

                    if(pc.ResourceType == ResourceType.VNet()) {

                        sortedContexts.push(pc);

                        var index = proContexts.findIndex
                            (p => p.Name == pc.Name && p.ResourceType == pc.ResourceType);

                        proContexts.splice(index, 1);

                        continue;
                    }
                }
            }
        }

        //vm
        if(proContexts.find(p => p.ResourceType == ResourceType.WindowsVM() ||
                p.ResourceType == ResourceType.LinuxVM()) != null) {

            while(proContexts.find(p =>
                p.ResourceType == ResourceType.WindowsVM()||
                p.ResourceType == ResourceType.LinuxVM()) != null) {

                for(var pc of proContexts) {

                    if(pc.ResourceType == ResourceType.WindowsVM() ||
                        pc.ResourceType == ResourceType.LinuxVM()) {

                        sortedContexts.push(pc);

                        var index = proContexts.findIndex
                            (p => p.Name == pc.Name && p.ResourceType == pc.ResourceType);

                        proContexts.splice(index, 1);

                        continue;
                    }
                }
            }
        }

        //law
        if(proContexts.find(p => p.ResourceType == ResourceType.LogAnalytics()) != null){

            while(proContexts.find(p => p.ResourceType == ResourceType.LogAnalytics()) != null) {
                for(var pc of proContexts) {

                    if(pc.ResourceType == ResourceType.LogAnalytics()) {

                        sortedContexts.push(pc);

                        var index = proContexts.findIndex
                            (p => p.Name == pc.Name && p.ResourceType == pc.ResourceType);

                        proContexts.splice(index, 1);

                        continue;
                    }
                }
            }
        }

        //rest of resources
        for(var pc of proContexts) {
            sortedContexts.push(pc);
        }

        return sortedContexts;
    }

    getVNetContext = (node, provisionContexts) => {

        if(Utils.isVNet(node))
        {
            var vnet = node;

            var subnets = this.getSubnetNodes(vnet);

            if(subnets.length == 0)
                return;

                var subnetProContexts = [];

                subnets.map(subNode => {

                    if(Utils.isSubnet(subNode)) {

                        var subnetProContext = Utils.AzContext(subNode);

                        //get NSG name for subnet
                        var nsgName = this.getNSGNameForSubnet(subNode);
                        subnetProContext.NSGName = nsgName;

                        //get service endpoints
                        var svcEndpointNames =
                            this.getServiceEndpointsResourceNameForSubnet(subNode);
                        subnetProContext.ServiceEndpointTargetServices = svcEndpointNames;

                        subnetProContexts.push(subnetProContext);
                    }
                });

            var vnetProContext = Utils.AzContext(vnet);

            vnetProContext.Subnets = subnetProContexts; //set subnets

            provisionContexts.push(vnetProContext);

            return true;
        }
    }

    getVNetPeering = (node, provisionContexts) => {
        if(Utils.isVNetPeering(node))
        {
            var azcontext = Utils.AzContext(node);

            if(azcontext.LocalVNetName == '' || azcontext.RemoteVNetName == '') {
                   return true;
            }

            provisionContexts.push(azcontext);

            return true;
        }
    }

    getInternalNLBContexts = (node, provisionContexts) => {

        if(Utils.isInternalNLB(node))
        {
            var nlb = node;

            var nlbProContext = Utils.AzContext(nlb);

            nlbProContext.VNetName = this.getResourceVNetName(nlb);

            nlbProContext.SubnetName = this.getResourceSubnetName(nlb);

            var vmNames = this.getLinkConnectedVMs(nlb);
            nlbProContext.LoadBalanceToExistingVMNames = vmNames;

            provisionContexts.push(nlbProContext);

            return true;
        }
    }

    getExternalNLBContexts(node, provisionContexts) {

        if(Utils.isNLB(node) && !Utils.isInternalNLB(node))
        {
            var nlbProContext = Utils.AzContext(node);

            var vmNames = this.getLinkConnectedVMs(node);

            nlbProContext.LoadBalanceToExistingVMNames = vmNames;

            provisionContexts.push(nlbProContext);

            return true;
        }
    }

    getAppGatewayContexts = (node, provisionContexts) => {

        if(Utils.isAppGw(node))
        {
            var appgw = node;

            var appgwProContext = Utils.AzContext(node);

            appgwProContext.VNetName = this.getResourceVNetName(appgw);

            appgwProContext.SubnetName = this.getResourceSubnetName(appgw);

            var vmNames = this.getLinkConnectedVMs(appgw);
            appgwProContext.LoadBalanceToExistingVMNames = vmNames;

            provisionContexts.push(appgwProContext);

            return true;
        }
    }

    getVMContexts = (node, provisionContexts) => {

        if(Utils.IsVM(node))
        {
            var vm = node;

            var vmProContext = Utils.AzContext(vm);

            vmProContext.VNetName = this.getResourceVNetName(vm);

            vmProContext.SubnetName = this.getResourceSubnetName(vm);

            provisionContexts.push(vmProContext);

            return true;
        }
    }

    getVMSSContexts = (node, provisionContexts) => {
        if(Utils.IsVMSS(node))
        {
            var vmss = node;

            var vmssProContext = Utils.AzContext(vmss);

            vmssProContext.VNetName = this.getResourceVNetName(vmss);

            vmssProContext.SubnetName = this.getResourceSubnetName(vmss);

            provisionContexts.push(vmssProContext);

            return true;
        }
    }

    getNSGs = (node, provisionContexts) => {

        if(!Utils.isVNet(node))
            return;

        var vnetNode = node;

        var subnets = this.getSubnetNodes(vnetNode);

        if(subnets.length == 0)
            return;

        subnets.map(sub => {

            var nsgPart = sub.findObject("NSG");

            if(nsgPart.visible == true) {

                var vnetNode = sub.containingGroup;

                nsgPart.nsgazcontext.ProvisionContext.VNetName =
                    this.getVNetNameFromNode(vnetNode);

                nsgPart.nsgazcontext.ProvisionContext.SubnetName =
                    this.getSubnetNameFromNode(sub);

                provisionContexts.push(nsgPart.nsgazcontext.ProvisionContext);

                return true;
            }
        });
    }

    getFirewallContexts= (node, provisionContexts) => {

        if(Utils.isFirewall(node))
        {
            var azfw = node;

            var azfwProContext = Utils.AzContext(azfw);

            azfwProContext.VNetName = this.getResourceVNetName(azfw);

            azfwProContext.SubnetName = 'AzureFirewallSubnet'; //this.getResourceSubnetName(azfw);
            this.setAzureFirewallSubnetName(azfw); 

            azfwProContext.SubnetAddressSpace = this.getResourceSubnetIPAddressSpace(azfw);

            provisionContexts.push(azfwProContext);

            return true;
        }
    }

    getASEContexts= (node, provisionContexts) => {
        if(Utils.isASE(node))
        {
            var ase = node;

            var aseProContext = Utils.AzContext(ase);

            aseProContext.VNetName = this.getResourceVNetName(ase);

            aseProContext.SubnetName = this.getResourceSubnetName(ase);

            provisionContexts.push(aseProContext);

            return true;
        }
    }

    getLAWContexts= (node, provisionContexts) => {
        if(Utils.isLAW(node))
        {
            var ase = node;

            var aseProContext = Utils.AzContext(ase);

            provisionContexts.push(aseProContext);

            return true;
        }
    }

    getASCContext = (node, provisionContexts) => {
        if(Utils.isASC(node))
        {
            var asc = node;

            var ascContext = Utils.AzContext(asc);

            if(ascContext.IsStandardTier) {
                ascContext.LogAnalyticsWorkspaceName = this.getLAWNameConnectedToASC(asc);
                provisionContexts.push(ascContext);
            }

            return true;
        }
    }

    //for ASC to LAW
    getLAWNameConnectedToASC(ascNode) {
        var links = ascNode.findLinksOutOf();

        while (links.next()) {

            var link = links.value;

            var toNode = link.toNode;
            var fromNode  = link.fromNode ; //could be from instead of to

            if(toNode != null && Utils.isLAW(toNode)) {
                return toNode.data.azcontext.ProvisionContext.Name;
            }

            if(fromNode != null && Utils.isLAW(fromNode)) {
                return fromNode.data.azcontext.ProvisionContext.Name;
            }
        }
    }

    //for nlb and appgw
    getLinkConnectedVMs(node) {

        // get all links out from it
        //appgw, nlb
        var links = node.findLinksOutOf();

        var vmNames = [];

        while (links.next()) { // for each link get the link text and toNode text

            var link = links.value;

            var toNode = link.toNode;
            var fromNode  = link.fromNode ; //could be from instead of to

            if(toNode != null && Utils.IsVM(toNode)) {
                vmNames.push(toNode.data.azcontext.ProvisionContext.Name);
            }

            if(fromNode != null && Utils.IsVM(fromNode)) {
                vmNames.push(fromNode.data.azcontext.ProvisionContext.Name);
            }
        }

        return vmNames;
    }

    getAllNonVIRContexts = (node, provisionContexts) => {

        if(!Utils.isPartVIR(node) && !Utils.isLAW(node))
        {
            var proContext = Utils.AzContext(node);
            provisionContexts.push(proContext);
            return true;
        }
        return provisionContexts;
    }

    //helper
    getResourceVNetName(node) {
        var vnet = node.containingGroup.containingGroup;
        if(Utils.isVNet(vnet))
            return vnet.data.azcontext.ProvisionContext.Name;
        else
            return "";
    }

    setAzureFirewallSubnetName(node) {
        var subnet = node.containingGroup;
        if(Utils.isSubnet(subnet))
            var azfwSubnetName = 'AzureFirewallSubnet';
            var subnetName = subnet.data.azcontext.ProvisionContext.Name;
            if(subnetName != azfwSubnetName)
                subnet.data.azcontext.ProvisionContext.Name = azfwSubnetName;
        else
            return "";
    }

    getResourceSubnetName(node) {
        var subnet = node.containingGroup;
        if(Utils.isSubnet(subnet))
            return subnet.data.azcontext.ProvisionContext.Name;
        else
            return "";
    }

    getResourceSubnetIPAddressSpace(node) {
        var subnet = node.containingGroup;
        if(Utils.isSubnet(subnet))
            return subnet.data.azcontext.ProvisionContext.AddressSpace;
        else
            return "";
    }

    getVNetNameFromNode(vnetNode) {
        if(!Utils.isAzContextExist(vnetNode))
            return "";

        return vnetNode.data.azcontext.ProvisionContext.Name;
    }

    getSubnetNameFromNode(subnetNode) {
        if(!Utils.isAzContextExist(subnetNode))
            return "";

        return subnetNode.data.azcontext.ProvisionContext.Name;
    }

    getNSGNameForSubnet(subnetNode)
    {
        var nsgPart = subnetNode.findObject("NSG");

        if(nsgPart.visible == true)
            return nsgPart.nsgazcontext.ProvisionContext.Name;
        else
            return "";
    }

    getServiceEndpointsResourceNameForSubnet(subnetNode)
    {
        var part = subnetNode.findObject("SVCEndpoint");

        if(part.visible == true) {
            var svcEndpoints = [];

            for(var svcend of
                part.svcendazcontext.ProvisionContext.ServiceEndpointTargetServices) {

                if(svcend.isSelected)
                    svcEndpoints.push(svcend.resourceName);
            }
            return svcEndpoints;
        }
        else
            return [];
    }

    getSubnetNodes(vnetNode) {

        if(Utils.isVNet(vnetNode))
        {
            var subnets = [];

            var ite = vnetNode.memberParts.iterator;

            while(ite.next()) {
                var childNode = ite.value;

                if(Utils.isSubnet(childNode)) {
                    subnets.push(childNode);
                }
            }

            return subnets;
        }
        else return [];
    }

    //helper
    getNodesInSubnets(subnets) {

        var nodesInSubnets = [];

        subnets.map(sub => {

            if(Utils.isSubnet(sub)) {

                var childs = sub.memberParts;

                childs.each((c) => {

                    if(Utils.isAzureResource(c)) {
                        nodesInSubnets.push(c);
                    }
                })
            }
        });

        return nodesInSubnets;

    }
}