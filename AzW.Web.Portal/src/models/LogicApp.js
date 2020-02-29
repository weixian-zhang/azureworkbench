import ResourceType from './ResourceType'
export default class LogicApp
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.LogicApp(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.LogicApp(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: [],

            VNetAddress: '',
            SubnetName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}