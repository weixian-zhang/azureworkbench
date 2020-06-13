import ResourceType from './ResourceType'
export default class DNS
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DNS(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DNS(),
            
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