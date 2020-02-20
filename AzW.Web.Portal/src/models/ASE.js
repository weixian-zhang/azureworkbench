import ResourceType from './ResourceType'
export default class ASE
{
    constructor (){
        this.GraphModel = {
            ResourceType: ResourceType.ASE(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ASE(),
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