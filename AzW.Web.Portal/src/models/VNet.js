import ResourceType from './ResourceType'
export default class VNet
{
    constructor (){
        this.GraphModel = {
            ResourceType: ResourceType.VNet(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            Name: '',
            Location: '',
            AddressSpace: false,
            Subnets: []
        }; 
        this.CalculatorContext = {
            IsFree: true,
            Tier: ''
        }
    }
}