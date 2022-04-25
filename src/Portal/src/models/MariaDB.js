import ResourceType from './ResourceType'
export default class MariaDB
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.MariaDB(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.MariaDB(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
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