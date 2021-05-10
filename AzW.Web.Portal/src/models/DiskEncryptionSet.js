import ResourceType from './ResourceType'
export default class DiskEncryptionSet
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DiskEncryptionSet(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DiskEncryptionSet(),
            Name: '',
            Location: '',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}