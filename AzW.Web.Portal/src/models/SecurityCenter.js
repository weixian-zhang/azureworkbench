import ResourceType from './ResourceType'
export default class SecurityCenter
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.SecurityCenter(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.SecurityCenter(),
            IsStandardTier: false,
            LogAnalyticsWorkspaceName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}