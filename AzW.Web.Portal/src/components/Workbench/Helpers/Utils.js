import ResourceType from '../../../models/ResourceType';

export default class Utils
{
    static TryParseUserObject(str) {
        
        try {
            if(str == null)
              return {isUserObject: false, userObject: null};

            var usrObj = JSON.parse(str);
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
}