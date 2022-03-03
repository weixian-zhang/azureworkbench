import ResourceType from './ResourceType'
export default class Function
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Function(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Function(),
            Name: 'func-web',
            Location: 'westus',
            ResourceGroupName: '',
            IsConsumptionPlan: true,
            IsLinux: false,
            PricingTier: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}