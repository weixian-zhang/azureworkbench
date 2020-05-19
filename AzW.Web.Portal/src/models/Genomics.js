import ResourceType from './ResourceType'
export default class Genomics
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Genomics(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Genomics(),
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