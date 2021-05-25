import ResourceType from './ResourceType'
export default class HdInsight
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.HdInsight(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.HdInsight(),
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