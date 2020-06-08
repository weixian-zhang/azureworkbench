import ResourceType from './ResourceType'
export default class DedicatedHost
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DedicatedHost(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DedicatedHost(),
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