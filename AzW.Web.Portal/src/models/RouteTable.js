import ResourceType from './ResourceType'
export default class RouteTable
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
            Location: 'westus',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}