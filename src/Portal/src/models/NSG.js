import ResourceType from './ResourceType'
export default class NSG
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.NSG(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.NSG(),

            Name: '',
            Location: 'westus',
            ResourceGroupName: '',
            VNetName: '',
            SubnetName: '',
            InboundRules: [],
            OutboundRules: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}