import ResourceType from './ResourceType'
export default class ContainerApps
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ContainerApps(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ContainerApps(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}