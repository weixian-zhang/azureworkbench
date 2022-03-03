import ResourceType from './ResourceType'
export default class KeyVault
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.KeyVault(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.KeyVault(),
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