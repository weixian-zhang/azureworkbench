import ResourceType from './ResourceType'
export default class ManagedIdentity
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ManagedIdentity(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ManagedIdentity(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}