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

            Name: '',
            AddressSpace: ''
        };
        this.CalculatorContext = {
            IsFree: true,
            Tier: ''
        }
    }
}