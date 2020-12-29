export default class UserProfile
{
    constructor (){
        this.Account = null;
        this.TenantId = '';
        this.Name = '';
        this.Surname = '';
        this.UserName = '';
        this.AccessTokenExpiresOn = '';
        this.Scopes = [];
        this.Issuer = "";
        this.IdToken = "";
        this.AccessToken = '';
        this.Organization = '';
        this.isNewUser = false;
    }
}