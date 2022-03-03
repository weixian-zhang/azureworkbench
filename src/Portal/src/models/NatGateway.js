import ResourceType from './ResourceType'
export default class NatGateway
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.NatGateway(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.NatGateway(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}