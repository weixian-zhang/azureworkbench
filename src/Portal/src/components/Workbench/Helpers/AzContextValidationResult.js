

export default class AzContextValidationResult {
    constructor() {
        this.ErrorMessages = [];
        this.AllMessages = '';
        this.AzContexts = [];
    }

    HasErrors() {
        if(this.ErrorMessages.length > 0)
            return true;
        return false;
    }

    Messages() {
        return this.ErrorMessages.join(', \n');
    }
}