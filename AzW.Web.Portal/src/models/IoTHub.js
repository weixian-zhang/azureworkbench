import ResourceType from './ResourceType'
export default class IoTHub
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.IoTHub(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.IoTHub(),
            Deployable: true,
            HighCost: false,
            
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