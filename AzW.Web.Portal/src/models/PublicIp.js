import ResourceType from './ResourceType'
export default class PublicIp
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.PublicIp(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.PublicIp(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: [],

            VNetAddress: '',
            SubnetName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}