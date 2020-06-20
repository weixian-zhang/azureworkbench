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
            Name: '',
            Location: '',
            ResourceGroupName: '',
            VMNamesToBackup: []

        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}