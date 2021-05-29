import ResourceType from './ResourceType'
export default class QueueStorage
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.QueueStorage(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.QueueStorage(),
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