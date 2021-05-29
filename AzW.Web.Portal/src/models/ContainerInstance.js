import ResourceType from './ResourceType'
export default class ContainerInstance
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ContainerInstance(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ContainerInstance(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}