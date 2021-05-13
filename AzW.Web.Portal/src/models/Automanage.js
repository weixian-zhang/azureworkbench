import ResourceType from './ResourceType'
export default class Automanage
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Automanage(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Automanage(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}