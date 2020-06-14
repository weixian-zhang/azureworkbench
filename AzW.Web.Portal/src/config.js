export default class Config
{
    constructor(){
    }

    static BaseAPIUrl() {
        return  'https://api.azureworkbench.com';
        //'http://localhost:8089';
        //'https://beta-api.azureworkbench.com'
        //'https://api.azureworkbench.com'
     }
     static PortalUrl() {
         return 'https://www.azureworkbench.com';
         //'http://localhost:8090';
         //https://beta.azureworkbench.com
         //'https://www.azureworkbench.com';
     }
    static AADClientId() {return '16afdc21-ffd3-4cf8-aeae-63bebf9e327e'; }
    static Authority() {return 'https://login.microsoftonline.com/common'; }
    static Scope() {
        return 'api://16afdc21-ffd3-4cf8-aeae-63bebf9e327e/azworkbench-azure-deploy';
     }
}