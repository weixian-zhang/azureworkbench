import ResourceType from './ResourceType'
export default class LocalNetworkGateway
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.LocalNetworkGateway(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.LocalNetworkGateway(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}