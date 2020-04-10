import ResourceType from '../../../models/ResourceType';
import { mxCell } from 'mxgraph-js';

export default class Utils
{
    static TryParseUserObject(str) {
        
        try {
            if(str == null)
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
            if(String(text).length == lengthToLimit)
                return limitedText
            else
                return limitedText + "...";
        }
        else
            return '';
    }
}