import ResourceType from './ResourceType'
export default class AppGateway
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AppGw(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AppGw(),
            Name: '',
            Location: '',
            ResourceGroupName: '',
            VNetName: '',
            SubnetName: '',
            NumberofInstances: 2,
            WAFEnabled: false,
            RoutingRuleName: 'Rule-HTTP-80-to-80',
            FrontendListenerName: 'FEListener-Http-80',
            FrontendPort: 80,
            BackendPoolName: 'Backendpool-VMs',
            BackendPort: 80,
            LoadBalanceToExistingVMNames: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}