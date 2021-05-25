import ResourceType from './ResourceType'
export default class AnalysisService
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AnalysisService(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AnalysisService(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}