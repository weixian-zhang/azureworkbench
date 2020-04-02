import ResourceType from './ResourceType'
export default class Subnet
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Subnet(),
            DisplayName: '',
            IsGatewaySubnet: false
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Subnet(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            CIDR: ''
        };
        this.CalculatorContext = {
            IsFree: true,
            Tier: ''
        }
    }
}