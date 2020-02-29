import ResourceType from './ResourceType'
export default class Automation
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Automation(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Automation(),
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