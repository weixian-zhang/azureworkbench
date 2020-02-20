import ResourceType from './ResourceType'
export default class AppService
{
    constructor (){
        this.GraphModel = {
            ResourceType: ResourceType.AppService(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AppService(),
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