export default class LocalStorage
{
    static set(key, data) {
        localStorage.removeItem(key);
        localStorage.setItem(key, data);
    }

    static get(key) {
      return localStorage.getItem(key);
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static KeyNames = {
        TempLocalDiagram: '__temp-anonymousdiagram__'
    }
}