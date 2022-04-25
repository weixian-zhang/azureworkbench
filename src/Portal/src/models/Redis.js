import ResourceType from './ResourceType'
export default class Redis
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Redis(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Redis(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: [],
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}