import ResourceType from './ResourceType'
export default class ASG
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ASG(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ASG(),
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