import ResourceType from './ResourceType'
export default class AppConfig
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AppConfig(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AppConfig(),
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