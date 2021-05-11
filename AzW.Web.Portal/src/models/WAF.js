import ResourceType from './ResourceType'
export default class WAF
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.WAF(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.WAF(),
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