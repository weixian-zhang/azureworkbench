import ResourceType from './ResourceType'
export default class AppInsights
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AppInsights(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AppInsights(),
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