import ResourceType from './ResourceType'
export default class ServiceFabricManagedCluster
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ServiceFabricManagedCluster(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ServiceFabricManagedCluster(),
            Name: '',
            Location: '',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}