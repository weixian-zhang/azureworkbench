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
            Name: '',
            Location: 'westus',
            ResourceGroupName: '',
            PublicIPName: 'pip-azfw',
            VNetName: '',
            SubnetName: '',
            SubnetAddressSpace: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}