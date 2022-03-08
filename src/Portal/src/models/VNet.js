import ResourceType from './ResourceType'
export default class VNet
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.VNet(),
            DisplayName: '',
            SubnetsAndCidrs: []
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.VNet(),

            Name: 'vnet-internet',
            Location: 'westus',
            ResourceGroupName: '',
            AddressSpace: '10.0.0.0/16',
            Subnets: []
        };
        this.CalculatorContext = {
            IsFree: true,
            Tier: ''
        }
    }
}