import ResourceType from './ResourceType'
export default class IPGroups
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.IPGroup(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.IPGroup(),
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