import ResourceType from './ResourceType'
export default class VNet
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.VNet(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.VM(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: [],
            AddressSpace: false,
            Subnets: []
        }; 
        this.CalculatorContext = {
            IsFree: true,
            Tier: ''
        }
    }
}