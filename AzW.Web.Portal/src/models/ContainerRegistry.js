import ResourceType from './ResourceType'
export default class ContainerRegistry
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ContainerRegistry(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ContainerRegistry(),
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