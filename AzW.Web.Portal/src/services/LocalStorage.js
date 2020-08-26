export default class LocalStorage
{
    static set(key, data) {
        try{
            localStorage.removeItem(key);
            localStorage.setItem(key, data);
            return true;
        }
        catch (e) {
            if (e.name === 'QuotaExceededError') {
                return false;
            }
        }
    }

    static get(key) {
      return localStorage.getItem(key);
    }

    static isExist(key) {
       var item = localStorage.getItem(key);
       if(item == null)
            return false;
        else
            return true;
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static KeyNames = {
        TempLocalDiagram: '__temp-anonymousdiagram__',
        AutoSave: '__azwb-temp-autosave__'
    }
}