import ResourceType from './ResourceType'
export default class AppGateway
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Bastion(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Bastion(),
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