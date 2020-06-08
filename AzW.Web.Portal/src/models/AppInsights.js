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
            Name: '',
            Location: '',
            ResourceGroupName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}