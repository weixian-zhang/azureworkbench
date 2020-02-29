import ResourceType from './ResourceType'
export default class ServiceBus
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ASB(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ASB(),
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