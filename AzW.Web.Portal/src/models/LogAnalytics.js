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
            Name: '',
            Location: '',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}