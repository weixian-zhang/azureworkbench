import ResourceType from './ResourceType'
export default class NIC
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.NIC(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.NIC(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}