export default class SessionStorage
{
    static set(key, data) {
        sessionStorage.setItem(key, data);
    }

    static get(key) {
      return sessionStorage.getItem(key);
    }

    static remove(key) {
        sessionStorage.removeItem(key);
    }

    static KeyNames = {
        CurrentSubscription: 'currentsub',
        UserProfile: 'userprofile'
    }
}