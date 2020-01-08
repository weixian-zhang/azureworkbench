export default class Subnet
{
    constructor (){
        this.GraphModel = {
            ResourceType: 'subnet',
            DisplayName: ''
        };

        this.ProvisionContext = {
            Name: '',
            CIDR: '',
            NSG: []
        };
    }
}