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
}