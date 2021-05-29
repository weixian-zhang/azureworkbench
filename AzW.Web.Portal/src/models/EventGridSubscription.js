import ResourceType from './ResourceType'
export default class EventGridSubscription
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.EventGridSubscription(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.EventGridSubscription(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: [],
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}