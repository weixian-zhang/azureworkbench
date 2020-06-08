import ResourceType from './ResourceType'
export default class NetworkWatcher
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.NetworkWatcher(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.NetworkWatcher(),
            Name: '',
            Location: '',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}