import ResourceType from './ResourceType'
export default class RouteFilters
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.RouteFilters(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.RouteFilters(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: '',
            VNetName: '',
            SubnetName: '',
            IsInternalASE: true
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}