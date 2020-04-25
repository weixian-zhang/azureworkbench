import ResourceType from './ResourceType'
export default class BlobStorage
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.BlobStorage(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.BlobStorage(),
            Name: '',
            Location: '',
            ResourceGroupName: '',
            SkuName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}