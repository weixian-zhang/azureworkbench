import ResourceType from './ResourceType'
export default class Function
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Function(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Function(),
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