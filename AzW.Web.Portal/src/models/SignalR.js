import ResourceType from './ResourceType'
export default class SignalR
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.SignalR(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.SignalR(),
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