import ResourceType from '../../../models/ResourceType';
import NSG from '../../../models/NSG';
import RouteTable from '../../../models/RouteTable';
import ServiceEndpoint from '../../../models/ServiceEndpoint';
import ShortUniqueId from 'short-unique-id';
import * as go from 'gojs';

export default class Utils
{
    //follows Tooltip name
    static isResourceTypeVIR(resourceType) {
        var VIR = [ResourceType.VM(), ResourceType.WindowsVM(), ResourceType.LinuxVM(), ResourceType.VMSS(),
            ResourceType.HdInsight(), ResourceType.Databricks(), ResourceType.AADDomainService(),
            ResourceType.Kubernetes(),ResourceType.NetAppFile(), ResourceType.VirtualNetworkGateway(),
            ResourceType.ASE(),ResourceType.AppGw(),ResourceType.Firewall(),ResourceType.Bastion(),
            ResourceType.VMSS(), ResourceType.SQLMI(), ResourceType.ISE(),
            ResourceType.PrivateEndpoint(), ResourceType.ServiceFabricCluster(), ResourceType.HPCCache(),
            ResourceType.ServiceFabricManagedCluster()];

        for(var x of VIR) {
            if(x == resourceType)
                return true;
        }
        return false;
    }

    static isResourceSubnetSharable(resourceType) {
        var VIR = [ResourceType.VM(), ResourceType.VMSS(),
            ResourceType.PrivateEndpoint(), ResourceType.NLB(), ResourceType.Subnet()];

        for(var x of VIR) {
            if(x == resourceType)
                return true;
        }
        return false;
    }

    static GetVNetNames(diagram) {

        var vnetAzContexts = [];

        if(diagram.nodes != null && diagram.nodes.count == 0) {
            return vnetAzContexts;
        }

        diagram.nodes.each((node) => {
            if(Utils.isVNet(node)) {
                vnetAzContexts.push(Utils.AzContext(node));
            }
        });

        return vnetAzContexts;
    }

    static isPartVIR(part) {
        if(!Utils.isAzContextExist(part))
            return false;

        if(Utils.isResourceTypeVIR(Utils.getAzContextResourceType(part)))
            return true;
        else
            return false;
    }

    static isDedicatedSubnetVIR(node) {

        if(!Utils.isAzContextExist(node))
             return false;

        var VIR = [ ResourceType.ASE(),ResourceType.AppGw(), ResourceType.ISE(),
            ResourceType.Firewall(),ResourceType.Bastion(), ResourceType.VirtualNetworkGateway(),
            ResourceType.SQLMI(), ResourceType.NetAppFile(), ResourceType.ServiceFabricCluster(),
            ResourceType.ServiceFabricManagedCluster(), ResourceType.SpringCloud()];

        var resourceType = node.data.azcontext.ProvisionContext.ResourceType;

        for(var x of VIR) {
            if(x == resourceType)
                return true;
        }
        return false;
    }

    static isNonVIRAzResource(part) {
        if(!Utils.isPartVIR(part))
            return true;
        else
            return false;
    }

    static isCanvasEmpty(diagram) {
        if(diagram != undefined && diagram.nodes.count == 0)
            return true;
        else
            return false;
    }

    static isVIRinDedicatedSubnet(subnetNode) {

        if(subnetNode.memberParts.count > 0)
            return false;
        else
            return true;
    }

    static isSubnetTakenByDedicatedSubnetVIR(subnet) {

        var it = subnet.memberParts.iterator;
        while(it.next()) {
           var node =  it.value;

           if(Utils.isDedicatedSubnetVIR(node)) {
            return true;
            }
        }
        return false;
    }

    static isAzContextExist(node) {
        if(node == null)
            return false;

        if(node.data === undefined)
            return false;
        if(node.data.azcontext === undefined)
            return false;
        if( node.data.azcontext.ProvisionContext === undefined)
            return false;

        return true;
    }

    static isAzureResource(node) {
        if(Utils.isAzContextExist(node))
            return true;
        else
            return false;
    }

    static getAzContextResourceType(node) {
        if(!Utils.isAzContextExist(node))
            return null;

        return node.data.azcontext.ProvisionContext.ResourceType;
    }

    static IsNonAzureShape(node) {
        if(!Utils.isAzContextExist(node))
            return true;
        else
            return false;
    }

    static isVNet(node) {
        if(!Utils.isAzContextExist(node))
            return false;

        if(Utils.getAzContextResourceType(node) == ResourceType.VNet())
            return true;
        else
            return false;
    }

    static isVNetPeering(node) {
        if(!Utils.isAzContextExist(node))
            return false;

        if(Utils.getAzContextResourceType(node) == ResourceType.VNetPeering())
            return true;
        else
            return false;
    }

    static isSubnet(node) {
        if(!Utils.isAzContextExist(node))
            return false;

        if(Utils.getAzContextResourceType(node) == ResourceType.Subnet())
            return true;
        else
            return false;
    }

    static isNLB(node) {
        if(!Utils.isAzContextExist(node))
            return false;

        if(Utils.getAzContextResourceType(node) == ResourceType.NLB())
            return true;
        else
            return false;
    }

    static isInternalNLB(node) {
        if(!Utils.isAzContextExist(node))
            return false;

        var pc = node.data.azcontext.ProvisionContext;

        if(Utils.getAzContextResourceType(node) == ResourceType.NLB() &&
            pc.IsInternalNLB == true)
            return true;
        else
            return false;
    }

    static isAppGw(node) {
        if(!Utils.isAzContextExist(node))
            return false;

        if(Utils.getAzContextResourceType(node) == ResourceType.AppGw())
            return true;
        else
            return false;
    }

    static isFirewall(node) {
        if(!Utils.isAzContextExist(node))
            return false;

        if(Utils.getAzContextResourceType(node) == ResourceType.Firewall())
            return true;
        else
            return false;
    }

    static isASE(node) {
        if(!Utils.isAzContextExist(node))
            return false;

        if(Utils.getAzContextResourceType(node) == ResourceType.ASE())
            return true;
        else
            return false;
    }

    static AzContext(node) {
        if(!Utils.isAzContextExist(node))
            return null;

        return node.data.azcontext.ProvisionContext;
    }

    static uniqueId(prefix) {
        if(prefix != null)
            return prefix + '-' + new ShortUniqueId().randomUUID(6);
        else
            return new ShortUniqueId().randomUUID(6);
    }

    static deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    static IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    static isObject(obj)
    {
        return obj !== undefined && obj !== null && obj.constructor == Object;
    }

    static getResourceType(node)
    {
        if(!Utils.isAzContextExist(node))
        return '';

        var azcontext = Utils.AzContext(node);
        return azcontext.ResourceType;
    }

    static IsVM(node) {
        if(!Utils.isAzContextExist(node))
        return false;

        var pc = node.data.azcontext.ProvisionContext;

        if(pc.ResourceType == ResourceType.VM() ||
            pc.ResourceType == ResourceType.WindowsVM() ||
            pc.ResourceType == ResourceType.LinuxVM())
            return true;
        else
            return false;
    }

    static IsManagementGroup(node) {
        if(!Utils.isAzContextExist(node))
            return false;

        var pc = node.data.azcontext.ProvisionContext;

        if(pc.ResourceType == ResourceType.ManagementGroup())
            return true;
        
        return false;
    }

    static IsSubscription(node) {
        if(!Utils.isAzContextExist(node))
            return false;

        var pc = node.data.azcontext.ProvisionContext;

        if(pc.ResourceType == ResourceType.Subscription())
            return true;
        
        return false;
    }

    static IsResourceGroup(node) {
        if(!Utils.isAzContextExist(node))
            return false;

        var pc = node.data.azcontext.ProvisionContext;

        if(pc.ResourceType == ResourceType.ResourceGroup())
            return true;
        
        return false;
    }

    static IsVMSS(node) {
        if(!Utils.isAzContextExist(node))
        return false;

        var pc = node.data.azcontext.ProvisionContext;

        if(pc.ResourceType == ResourceType.VMSS())
            return true;
        else
            return false;
    }

    static NSGAzContext(part) {
        if(part.data.nsgazcontext == null)
            return NSG();
        else
            return part.data.nsgazcontext;
    }

    static UDRAzContext(part) {
        if(part.data.udrazcontext == null)
            return RouteTable();
        else
            return part.data.udrazcontext;
    }

    static ServiceEndpointAzContext(part) {
        if(part.data.svcendazcontext == null)
            return new ServiceEndpoint();
        else
            return part.data.svcendazcontext;
    }

    static isNSG(part) {
        if(!Utils.isAzContextExist(part))
            return false;

        if(part.data.nsgazcontext.ProvisionContext.ResourceType == ResourceType.NSG())
            return true;
        else
            return false;
    }

    static isLAW(part) {
        if(!Utils.isAzContextExist(part))
            return false;

        if(part.data.azcontext.ProvisionContext.ResourceType == ResourceType.LogAnalytics())
            return true;
        else
            return false;
    }

    static isUDR(part) {
        if(!Utils.isAzContextExist(part))
            return false;

        if(part.data.udrazcontext.ProvisionContext.ResourceType == ResourceType.RouteTable())
            return true;
        else
            return false;
    }

    static isPrivateEndpoint(part) {
        if(!Utils.isAzContextExist(part))
            return false;

        if(part.data.azcontext.ProvisionContext.ResourceType == ResourceType.PrivateEndpoint())
            return true;
        else
            return false;
    }

    static isNATGW(part) {
        if(!Utils.isAzContextExist(part))
            return false;

        if(part.data.natgwazcontext.ProvisionContext.ResourceType == ResourceType.NatGateway())
            return true;
        else
            return false;
    }

    static isASC(part) {
        if(!Utils.isAzContextExist(part))
            return false;

        if(part.data.azcontext.ProvisionContext.ResourceType == ResourceType.SecurityCenter())
            return true;
        else
            return false;
    }

    static IsNullOrUndefine(obj) {

        if(typeof obj === 'undefined' || obj == null)
            return true;

        if(Array.isArray(obj) && obj.length <= 0)
            return true;

        return false;
    }

    static IsEmptyString(str) {
        if (str == "")
            return true;
        else
            return false;
    }

    static hasMultiParents(node) {
        var parent = node.findNodesInto();

        if(parent.count > 1)
            return true;
        
        return false;
    }

    static getParent(node) {
        var parent = node.findNodesInto();

        if(parent.count == 0)
            return null;

        if(parent.count == 1) {
            return parent.value;
        }
    }

    static getChildren(node) {

        var children = [];

        var links = node.findLinksOutOf();

        while (links.next()) { // for each link get the link text and toNode text

            var link = links.value;

            var toNode = link.toNode;

            children.push(toNode);
        }

        return children;
    }


    static getCellCenterPoint(cell){
        var geo = cell.geometry;
        var x = (geo.width / 2) - 20;
        var y = (geo.height / 2) - 20;
        return {
            x: x,
            y: y
        };
    }

    static limitTextLength(text, lengthToLimit) {
        if(text)
        {
            var limitedText = String(text).substring(0, lengthToLimit);
            if(String(text).length <= lengthToLimit)
                return limitedText
            else
                return limitedText + "...";
        }
        else
            return '';
    }

    convertUTCDateToLocalDate(date) {
        var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();

        newDate.setHours(hours - offset);

        return newDate;
    }

    static getIPCountFromCidr(cidr) {
        if(Utils.IsNullOrUndefine(cidr) ** Utils.isCidr(cidr))
            return 0;

        var addrCount = 0;
        var cidrArr = cidr.split('/');
        if(cidrArr.length == 2)
        {
            var bit = cidrArr[1];
            addrCount = Math.pow(2, 32 - bit);
        }

        return addrCount;
    }

    static getVMProContextsOnCanvas(diagram) {

        if(diagram == undefined)
            return;
        if(Utils.isCanvasEmpty())
            return;

        var allNodes = diagram.nodes;

        var vms = [];
        while (allNodes.next()) {

            var node = allNodes.value;

            if(node instanceof go.Link)
                continue;

            if(Utils.IsVM(node)) {
                var proContext = node.data.azcontext.ProvisionContext;
                vms.push(proContext);
            }
        }
        return vms;
    }

    static isObjPropChange(existing, newObj) {
        if(JSON.stringify(existing) == JSON.stringify(newObj)) {
            return false;
        }
        else
            return true;
    }

    static getCidrPrefix(cidr) {
        if(Utils.IsNullOrUndefine(cidr))
            return 0;

        var addrCount = 0;
        var cidrArr = cidr.split('/');
        if(cidrArr.length == 2)
        {
            var bit = cidrArr[1];
            return bit;
        }
        else
        {
            return 0
        }

    }

    static pngDataUrl(base64Image) {
        return 'data:image/png;base64,' + base64Image;
    }

    static svgDataUrl(base64Image) {
        return 'data:image/svg+xml;base64,' + base64Image;
    }

    static isCidr(cidr) {
        if(Utils.IsNullOrUndefine(cidr))
            return false;
        var cidrArr = cidr.split('/');
        if(cidrArr.length == 2)
            return true;
        else
            return false;
    }

    static randomNum(max) {
        return Math.floor(Math.random() * max);
    }


    // static vnetGetSubnetsAndCidrs = (graph, vnetCell, subnetName) => {
    //     if(Utils.IsNullOrUndefine(vnetCell))
    //       return [];

    //     var subnetNamesAndCidrs = [];

    //     var childs = graph.getChildVertices(vnetCell);

    //     childs.map(x => {
    //         var result = Utils.TryParseUserObject(x);

    //         if(result.isUserObject == true &&
    //            result.userObject.ProvisionContext.ResourceType == ResourceType.Subnet())
    //         {
    //             var context = result.userObject.ProvisionContext;
    //             var addressCount = Utils.getIPCountFromCidr(context.AddressSpace);
    //             var usableAddresses = 0;
    //             if(addressCount != 0)
    //               usableAddresses = addressCount - 5;

    //             var snc = new SubnetsCidrs();
    //             snc.subnetName = context.Name;
    //             snc.cidr = context.AddressSpace;
    //             snc.addressCount = addressCount;
    //             snc.usableAddress = usableAddresses;

    //           //check and prevent adding of subnet & cidr for active Subnet Prop panel
    //           if(Utils.IsNullOrUndefine(subnetName))
    //                 subnetNamesAndCidrs.push(snc);
    //           else
    //           {
    //             if(result.userObject.ProvisionContext.Name != subnetName)
    //                 subnetNamesAndCidrs.push(snc);
    //           }
    //         }
    //     });

    //     return subnetNamesAndCidrs;
    // }
}