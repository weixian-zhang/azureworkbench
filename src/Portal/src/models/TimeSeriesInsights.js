import ResourceType from './ResourceType'
export default class TimeSeriesInsights
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.TimeSeriesInsights(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.TimeSeriesInsights(),
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