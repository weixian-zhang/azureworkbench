import ResourceType from './ResourceType'
export default class Cosmos
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.CosmosDB(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.CosmosDB(),
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