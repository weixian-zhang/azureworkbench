import ResourceType from './ResourceType'
export default class ProximityPlacementGroup
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ProximityPlacementGroup(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ProximityPlacementGroup(),
            Name: '',
            Location: 'westus',
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