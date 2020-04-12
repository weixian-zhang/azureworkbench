import ResourceType from './ResourceType'
export default class AppService
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AppService(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AppService(),
            Name: '',
            Location: '',
            ResourceGroupName: '',
            PlanName: '',
            IsLinux: false,
            PricingTier: '',
            RuntimeStack: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}