import ResourceType from './ResourceType'
export default class LogAnalytics
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.LogAnalytics(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.LogAnalytics(),
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