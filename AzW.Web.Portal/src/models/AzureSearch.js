import ResourceType from './ResourceType'
export default class AzureSearch
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AzureSearch(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AzureSearch(),
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