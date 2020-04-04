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
            ResourceType: ResourceType.VNet(),
           
            Name: '',
            Location: '',
            ResourceGroupName: '',
            AddressSpace: '',
            Subnets: []
        }; 
        this.CalculatorContext = {
            IsFree: true,
            Tier: ''
        }
    }
}