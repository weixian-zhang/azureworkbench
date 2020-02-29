import ResourceType from './ResourceType'
export default class DataFactory
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DataFactory(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DataFactory(),
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