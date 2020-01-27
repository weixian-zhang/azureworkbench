import ResourceType from './ResourceType'
export default class Subnet
{
    constructor (){
        this.GraphModel = {
            ResourceType: ResourceType.Subnet(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            Name: '',
            CIDR: '',
            NSG: []
        };
        this.CalculatorContext = {
            IsFree: true,
            Tier: ''
        }
    }
}