import ResourceType from './ResourceType'
export default class NLB
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.NLB(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.NLB(),
            Deployable: true,
            HighCost: false,

            Name: 'nlb-web',
            Location: 'westus',
            ResourceGroupName: '',
            IsInternalNLB: false,
            PublicIPName: '',
            IsStandardSku: true,
            VNetName: '',
            SubnetName: '',
            FrontendPort: 443,
            // BackendpoolName: 'backend-web',
            // LoadBalancingRuleName: 'lbrule-web',
            LoadBalanceToExistingVMNames: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}