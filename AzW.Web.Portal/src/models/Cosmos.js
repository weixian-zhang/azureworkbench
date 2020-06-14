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
            Name: 'cosmosdb-app',
            Location: '',
            ResourceGroupName: '',
            CosmosDBType: 'SQL'
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}