import ResourceType from './ResourceType'
export default class AzureStackEdge
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AzureStackEdge(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AzureStackEdge(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}