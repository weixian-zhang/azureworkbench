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