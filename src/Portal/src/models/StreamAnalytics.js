import ResourceType from './ResourceType'
export default class StreamAnalytics
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.StreamAnalytics(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.StreamAnalytics(),
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