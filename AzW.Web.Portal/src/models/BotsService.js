import ResourceType from './ResourceType'
export default class BotsService
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.BotsService(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.BotsService(),
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