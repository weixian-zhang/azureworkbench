import ResourceType from './ResourceType'
export default class AADDomainService
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
            Location: '',
            ResourceGroupName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}