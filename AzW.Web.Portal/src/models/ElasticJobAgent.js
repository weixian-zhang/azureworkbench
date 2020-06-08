import ResourceType from './ResourceType'
export default class ElasticJobAgent
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ElasticJobAgent(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ElasticJobAgent(),
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