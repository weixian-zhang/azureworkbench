import ResourceType from './ResourceType'
export default class PrivateLink
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.PrivateLink(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.PrivateLink(),
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