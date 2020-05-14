import ResourceType from '../../../models/ResourceType';
import { mxCell } from 'mxgraph-js';
import SubnetsCidrs from '../../../models/services/SubnetsCidrs';

export default class Utils
{
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

    static IsNonAzureResource(cell) {
        if(cell != null && cell.value != null){
            var result = this.TryParseUserObject(cell.value);

            if(!result.isUserObject)
                return true;
            else
                return false;
        }
        return true;
    }

    static IsVNet(cell) {
        if(cell != null && cell.value != null){
            var result = this.TryParseUserObject(cell.value);

            if(result.isUserObject &&
                result.userObject.GraphModel.ResourceType == ResourceType.VNet())
              {
                    return true;
              }
        }
        return false;
    }

    static IsSubnet(cell) {
        if(cell != null && cell.value != null){
            var result = this.TryParseUserObject(cell.value);

            if(result.isUserObject &&
                result.userObject.GraphModel.ResourceType == ResourceType.Subnet())
              {
                    return true;
              }
        }
        return false;
    }

    static IsVM(cell) {
        if(cell != null && cell.value != null){
            var result = this.TryParseUserObject(cell.value);

            if(!result.isUserObject)
                return false;

            if(result.isUserObject &&
                result.userObject.ProvisionContext.ResourceType == ResourceType.WindowsVM() ||
                result.userObject.ProvisionContext.ResourceType == ResourceType.LinuxVM() ||
                result.userObject.ProvisionContext.ResourceType == ResourceType.VM())
              {
                    return true;
              }
        }
        return false;
    }

    static IsNullOrUndefine(obj) {

        if(!obj || 0 === obj.length || obj == "")
            return true;
        //if(obj == null || obj == undefined)
            //return true;
        
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
        if(Utils.IsNullOrUndefine(cidr))
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

    static vnetGetSubnetsAndCidrs = (graph, vnetCell, subnetName) => {
        if(Utils.IsNullOrUndefine(vnetCell))
          return [];
        
        var subnetNamesAndCidrs = [];
  
        var childs = graph.getChildVertices(vnetCell);
  
        childs.map(x => {
            var result = Utils.TryParseUserObject(x);
  
            if(result.isUserObject == true &&
               result.userObject.ProvisionContext.ResourceType == ResourceType.Subnet())
            {
                var context = result.userObject.ProvisionContext;
                var addressCount = Utils.getIPCountFromCidr(context.AddressSpace);
                var usableAddresses = 0;
                if(addressCount != 0)
                  usableAddresses = addressCount - 5;
                
                var snc = new SubnetsCidrs();
                snc.subnetName = context.Name;
                snc.cidr = context.AddressSpace;
                snc.addressCount = addressCount;
                snc.usableAddress = usableAddresses;

              //check and prevent adding of subnet & cidr for active Subnet Prop panel
              if(Utils.IsNullOrUndefine(subnetName))
                    subnetNamesAndCidrs.push(snc);
              else
              {
                if(result.userObject.ProvisionContext.Name != subnetName)               
                    subnetNamesAndCidrs.push(snc);
              }
            }
        });
  
        return subnetNamesAndCidrs;
    }
}