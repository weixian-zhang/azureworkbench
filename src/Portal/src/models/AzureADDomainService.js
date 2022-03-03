import ResourceType from './ResourceType'
export default class AzureADDomainService
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AADDomainService(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AADDomainService(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}