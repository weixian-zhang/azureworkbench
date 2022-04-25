export default class LoginState
{
    constructor (){
        this.callbackFunc = null
    }

    static initLoginStateChangeCallback(callbackFunc) {
        this.callbackFunc = callbackFunc;
    }

    static onUserLoginStateChange(isLogin) {
        this.callbackFunc(isLogin)
    }
}