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

    static setWithExpiry(key, data, noOfDays) {
        try{
            const now = new Date()
            var expiryDate =  now.setDate(now.getDate() + noOfDays);

            const item = {
                value: data,
                expiry: expiryDate,
            }

            localStorage.setItem(key, JSON.stringify(item))

            return true;
        }
        catch (e) {
            if (e.name === 'QuotaExceededError') {
                return false;
            }
        }
    }

    static getWithExpiry(key) {
        try{
            const itemStr = localStorage.getItem(key)
            // if the item doesn't exist, return null
            if (!itemStr) {
                return null
            }

            const item = JSON.parse(itemStr)
            const now = new Date()
            // compare the expiry time of the item with the current time
            if (now.getTime() > item.expiry) {
                // If the item is expired, delete the item from storage
                // and return null
                localStorage.removeItem(key)
                return null
            }
            return item.value;
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
        AutoSave: '__azwb-temp-autosave__',
        VMImagePublishers: '__VMImagePublishers__'
    }
}