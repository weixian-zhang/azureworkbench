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
            Location: '',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}