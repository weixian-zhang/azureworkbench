import ResourceType from './ResourceType'
export default class RecoveryServiceVault
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.RecoveryServiceVault(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.RecoveryServiceVault(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: [],
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}