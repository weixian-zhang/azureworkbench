import ResourceType from './ResourceType'
export default class SynapseAnalytics
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Synapse(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Synapse(),
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