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