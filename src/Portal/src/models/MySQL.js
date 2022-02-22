import ResourceType from './ResourceType'
export default class MySQL
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.MySQL(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.MySQL(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}