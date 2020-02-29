import ResourceType from './ResourceType'
export default class Monitor
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Monitor(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Monitor(),
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