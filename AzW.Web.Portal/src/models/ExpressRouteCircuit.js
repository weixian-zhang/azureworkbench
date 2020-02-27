import ResourceType from './ResourceType'
export default class ExpressRouteCircuit
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ExpressRouteCircuit(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ExpressRouteCircuit(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: [],
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}