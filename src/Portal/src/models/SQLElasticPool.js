import ResourceType from './ResourceType'
export default class SQLElasticPool
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.SQLElasticPool(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.SQLElasticPool(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}