import ResourceType from './ResourceType'
export default class FileSync
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AzFileSync(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AzFileSync(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}