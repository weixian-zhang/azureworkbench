import ResourceType from './ResourceType'
export default class AzureFirewallManager
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.FirewallManager(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.FirewallManager(),
            Name: '',
            Location: '',
            ResourceGroupName: '',
            VNetName: '',
            SubnetName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}