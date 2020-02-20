import ResourceType from './ResourceType'
export default class AppGateway
{
    constructor (){
        this.GraphModel = {
            ResourceType: ResourceType.AppGw(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AppGw(),
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