import ResourceType from './ResourceType'
export default class TimeSeriesInsightsEventSource
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.TimeSeriesInsightsEventSource(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.TimeSeriesInsightsEventSource(),
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