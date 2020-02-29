import ResourceType from './ResourceType'
export default class EventGridTopic
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.EventGridTopic(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.EventGridTopic(),
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