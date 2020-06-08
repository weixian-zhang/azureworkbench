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
            Name: '',
            Location: '',
            ResourceGroupName: '',

            VNetAddress: '',
            SubnetName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}