import ResourceType from './ResourceType'
export default class Subnet
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Subnet(),
            DisplayName: '',
            IsGatewaySubnet: false,
            VNetAddressSpace: '',
            SubnetsAndCidrs: []
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Subnet(),

            Name: 'subnet-web',
            AddressSpace: '',
            NSGName: '',
            ServiceEndpointTargetServices:[]
        };
        this.CalculatorContext = {
            IsFree: true,
            Tier: ''
        }
    }
}