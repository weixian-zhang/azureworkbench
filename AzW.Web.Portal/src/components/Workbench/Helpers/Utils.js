import ResourceType from '../../../models/ResourceType';
import { mxCell } from 'mxgraph-js';
import SubnetsCidrs from '../../../models/services/SubnetsCidrs';
import ShortUniqueId from 'short-unique-id';

export default class Utils
{
    //follows Tooltip name
    static isResourceTypeVIR(resourceType) {
        var VIR = [ResourceType.VM(), ResourceType.WindowsVM(), ResourceType.LinuxVM(), ResourceType.VMSS(),
            ResourceType.Batch(), ResourceType.HdInsight(), ResourceType.Databricks(), ResourceType.AADDomainService(),
            ResourceType.Kubernetes(),ResourceType.NetAppFile(), ResourceType.VirtualNetworkGateway(),
            ResourceType.ASE(),ResourceType.AppGw(),ResourceType.Firewall(),ResourceType.Bastion(),
            ResourceType.VMSS(), ResourceType.SQLMI(), ResourceType.ISE(),
            ResourceType.PrivateEndpoint()];
            
        for(var x of VIR) {
            if(x == resourceType)
                return true;
        }
        return false;
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
            ResourceType.SQLMI(), ResourceType.NetAppFile()];
        
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

    static TryParseUserObject(str) {
        
        try {
            if(str == null || str == "")
              return {isUserObject: false, userObject: null};
            
            var usrObj = null;

            if(str instanceof mxCell)
                usrObj = JSON.parse(str.value)
            else if((typeof str) == "string")
                usrObj = JSON.parse(str);

            return {isUserObject: true, userObject: usrObj};
        } 
        catch (e) {
            return {isUserObject: false, userObject: null};
        }
    };

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

    static ProContext(node) {
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

    static isNSG(part) {
        if(!Utils.isAzContextExist(part))
            return false;
        
        if(part.data.nsgazcontext.ProvisionContext.ResourceType == ResourceType.NSG())
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

    static isNATGW(part) {
        if(!Utils.isAzContextExist(part))
            return false;
        
        if(part.data.natgwazcontext.ProvisionContext.ResourceType == ResourceType.NatGateway())
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

    static isCidr(cidr) {
        if(Utils.IsNullOrUndefine(cidr))
            return false;
        var cidrArr = cidr.split('/');
        if(cidrArr.length == 2)
            return true;
        else
            return false;
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