import ResourceType from './ResourceType'
export default class ServiceFabricCluster
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ServiceFabricCluster(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ServiceFabricCluster(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}