import ResourceType from './ResourceType'
export default class PostgreSQL
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.PostgreSQL(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.PostgreSQL(),
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