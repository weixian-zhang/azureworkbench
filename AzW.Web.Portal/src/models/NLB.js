import ResourceType from './ResourceType'
export default class NLB
{
    constructor (){
        this.GraphModel = {
            ResourceType: ResourceType.NLB(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            Name: '',
            Location: '',
            PublicIP: false,
            IsInternal: false,
            Tags: [],
            Depends: {
                VNet: {
                    VNetAddress: '',
                    SubnetName: ''
                }
            }
        }; 
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}