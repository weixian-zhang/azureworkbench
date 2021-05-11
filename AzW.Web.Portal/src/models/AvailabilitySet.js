import ResourceType from './ResourceType'
export default class AvailabilitySet
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AvailabilitySet(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AvailabilitySet(),
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