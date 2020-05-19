import ResourceType from './ResourceType'
export default class Cognitive
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Cognitive(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Cognitive(),
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