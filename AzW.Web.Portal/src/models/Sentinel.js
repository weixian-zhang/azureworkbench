import ResourceType from './ResourceType'
export default class Sentinel
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Sentinel(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Sentinel(),
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