import ResourceType from './ResourceType'
export default class NetworkManager
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.NetworkManager(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.NetworkManager(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: [],
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}