import ResourceType from './ResourceType'
export default class ASE
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ASE(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ASE(),
            Name: '',
            Location: '',
            ResourceGroupName: '',
            VNetName: '',
            SubnetName: '',
            IsInternalASE: true
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}