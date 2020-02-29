import ResourceType from './ResourceType'
export default class Maps
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AzureMaps(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AzureMaps(),
            Deployable: true,
            HighCost: true,
            
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