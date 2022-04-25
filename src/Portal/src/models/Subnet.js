import ResourceType from './ResourceType'
export default class Subnet
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Subnet(),
            DisplayName: '',
            IsGatewaySubnet: false,
            VNetAddressSpace: '10.0.0.0/16',
            SubnetsAndCidrs: []
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Subnet(),

            Name: 'subnet-web',
            AddressSpace: '10.0.0.0/27',
            NSGName: '',
            ServiceEndpointTargetServices:[]
        };
        this.CalculatorContext = {
            IsFree: true,
            Tier: ''
        }
    }
}