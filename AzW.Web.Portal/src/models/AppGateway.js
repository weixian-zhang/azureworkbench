import ResourceType from './ResourceType'
export default class AppGateway
{
    constructor (){
        this.GraphModel = {
            ResourceType: ResourceType.AppGw(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            Name: '',
            Location: '',
            ResourceType: ResourceType.AppGw(),
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