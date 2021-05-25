import ResourceType from './ResourceType'
export default class TrafficManager
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.TrafficManager(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.TrafficManager(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}