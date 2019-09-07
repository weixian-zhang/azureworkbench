import { AdalConfig, Authentication, AuthenticationContext, User } from 'adal-typescript'

export class AuthService {
  public init () {
    let config = this.getAdalConfig()
    this._authContext = Authentication.getContext(config)
  }

  public login () {
    let accessToken = this._authContext.getAccessToken()

    if (accessToken == null) { this._authContext.login() }
  }

  public logout () {
    this._authContext.login()
  }

  public GetSignedInUserProfile (): User {
    return this._authContext.getUser()
  }

  public GetAccessToken (): string {
    return this._authContext.getAccessToken()
  }

  private getAdalConfig (): AdalConfig {
    let config =
            new AdalConfig(this._clientId,
              'https://login.microsoftonline.com/common', 'http://localhost')

    return config
  }

    private _clientId: string = '16afdc21-ffd3-4cf8-aeae-63bebf9e327e';
    private _authContext: AuthenticationContext;
}
