import ResourceType from './ResourceType'
export default class AppServicePlan
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AppServicePlan(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AppServicePlan(),
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