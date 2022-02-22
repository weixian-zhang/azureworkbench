import ResourceType from './ResourceType'
export default class HPCCache
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.HPCCache(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.HPCCache(),
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