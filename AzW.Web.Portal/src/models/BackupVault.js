import ResourceType from './ResourceType'
export default class BackupVault
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.BackupVault(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.BackupVault(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: [],
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}