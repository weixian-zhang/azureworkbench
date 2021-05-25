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
            Location: 'westus',
            ResourceGroupName: '',
            PlanName: 'asp-web-dev',
            IsLinux: false,
            PricingTier: 'S1',
            NumberOfInstance: 1,
            AppInsightsName: 'appinsights-webapp',
            LogAnalyticsWorkspaceName: 'law-appinsights-webapp'
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}