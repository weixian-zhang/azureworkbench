import ResourceType from './ResourceType'
export default class Subnet
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Subnet(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Subnet(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            VNetName: '',
            CIDR: '',
            NSG: []
        };
        this.CalculatorContext = {
            IsFree: true,
            Tier: ''
        }
    }
}