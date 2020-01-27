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
            Tags: [],
            Depends: {
                VNet: {
                    VNetAddress: '',
                    SubnetName: ''
                }
            }
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}