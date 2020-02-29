import ResourceType from './ResourceType'
export default class IntegratedServiceEnvironment
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ISE(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ISE(),
            Deployable: true,
            HighCost: true,
            
            Name: '',
            Location: '',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}