import ResourceType from './ResourceType'
export default class Relay
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Relay(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Relay(),
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