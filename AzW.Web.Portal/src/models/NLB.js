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
            
            Name: '',
            Location: '',
            Tags: [],

            PublicIP: false,
            IsInternal: false,
            VNetAddress: '',
            SubnetName: ''
        }; 
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}