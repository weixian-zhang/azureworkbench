import ResourceType from './ResourceType'
export default class VirtualWAN
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.VirtualWAN(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.VirtualWAN(),
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