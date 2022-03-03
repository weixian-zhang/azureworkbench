import ResourceType from './ResourceType'
export default class EventHubCluster
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.EventHubCluster(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.EventHubCluster(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}