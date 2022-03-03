import ResourceType from './ResourceType'
export default class AppServiceDomain
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AppServiceDomain(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AppServiceDomain(),
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