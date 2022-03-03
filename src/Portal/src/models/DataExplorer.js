import ResourceType from './ResourceType'
export default class DataExplorer
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DataExplorer(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DataExplorer(),
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