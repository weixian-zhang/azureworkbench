import ResourceType from './ResourceType'
export default class ServiceBus
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.RouteTable(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.RouteTable(),
            
            Name: '',
            ResourceGroupName: '',
            Location: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}