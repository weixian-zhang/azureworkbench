import ResourceType from './ResourceType'
export default class PrivateEndpoint
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.PrivateEndpoint(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.PrivateEndpoint(),

            Name: '',
            Location: 'westus',
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