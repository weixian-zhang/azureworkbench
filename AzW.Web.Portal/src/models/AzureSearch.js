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