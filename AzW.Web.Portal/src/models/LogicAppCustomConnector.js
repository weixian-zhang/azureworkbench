import ResourceType from './ResourceType'
export default class LogicAppCustomConnector
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.LogicAppCustomConnector(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.LogicAppCustomConnector(),
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