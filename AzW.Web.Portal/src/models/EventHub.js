import ResourceType from './ResourceType'
export default class EventHub
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.EventHub(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.EventHub(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}