import ResourceType from './ResourceType'
export default class VirtualNetworkGateway
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.VirtualNetworkGateway(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.VirtualNetworkGateway(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: [],

            VNetAddress: '',
            SubnetName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}