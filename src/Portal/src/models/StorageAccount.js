import ResourceType from './ResourceType'
export default class StorageAccount
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.StorageAccount(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.StorageAccount(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: '',
            SkuName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}