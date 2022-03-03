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