export default class Config
{
    constructor(){
    }

    static BaseAPIUrl() {
        return 'http://localhost:8089';
     }
    static AADClientId() {return '16afdc21-ffd3-4cf8-aeae-63bebf9e327e'; }
    static Authority() {return 'https://login.microsoftonline.com/common'; }
    static Scope() {
        return 'api://16afdc21-ffd3-4cf8-aeae-63bebf9e327e/azworkbench-azure-deploy';
     }
}