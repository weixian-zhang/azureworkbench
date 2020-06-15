export default class Config
{
    constructor(){
    }

    static BaseAPIUrl() {
        if(process.env.REACT_APP_ENV == 'local')
            return  'http://localhost:8089';
        else if(process.env.REACT_APP_ENV == 'beta')
            return 'https://beta-api.azureworkbench.com';
        else if(process.env.REACT_APP_ENV == 'prod')
            return 'https://api.azureworkbench.com';
        else
            return  'http://localhost:8089';
     }
     static PortalUrl() {
        if(process.env.REACT_APP_ENV == 'local')
            return  'http://localhost:3000';
        else if(process.env.REACT_APP_ENV == 'beta')
            return 'https://beta.azureworkbench.com';
        else if(process.env.REACT_APP_ENV == 'prod')
            return 'https://www.azureworkbench.com';
        else
            return 'http://localhost:3000';
     }
    static AADClientId() {return '16afdc21-ffd3-4cf8-aeae-63bebf9e327e'; }
    static Authority() {return 'https://login.microsoftonline.com/common'; }
    static Scope() {
        return 'api://16afdc21-ffd3-4cf8-aeae-63bebf9e327e/azworkbench-azure-deploy';
     }
}