import ResourceType from './ResourceType'
export default class LogicApp
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.LogicApp(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.LogicApp(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}