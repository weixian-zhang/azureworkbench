import ResourceType from './ResourceType'
export default class AMPLS
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AMPLS(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AMPLS(),
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