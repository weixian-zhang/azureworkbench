import ResourceType from './ResourceType'
export default class DDoSStandard
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DDoSStandard(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DDoSStandard(),
            Deployable: true,
            HighCost: true,

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