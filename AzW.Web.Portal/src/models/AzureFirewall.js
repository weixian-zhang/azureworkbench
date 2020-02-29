import ResourceType from './ResourceType'
export default class AzureFirewall
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Firewall(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Firewall(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
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