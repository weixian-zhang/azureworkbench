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