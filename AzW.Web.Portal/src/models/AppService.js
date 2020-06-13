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
            Name: 'appsvc-web',
            Location: '',
            ResourceGroupName: '',
            PlanName: 'asp-web-dev',
            IsLinux: false,
            PricingTier: 'Standard1',
            RuntimeStack: 'NETCore_V2_2'
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}