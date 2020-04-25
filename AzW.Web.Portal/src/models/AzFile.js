import ResourceType from './ResourceType'
export default class AzFile
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AzFile(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AzFile(),
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