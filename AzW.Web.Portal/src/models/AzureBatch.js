import ResourceType from './ResourceType'
export default class AzureBatch
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Batch(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Batch(),
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