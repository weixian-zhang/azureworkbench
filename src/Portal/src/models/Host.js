import ResourceType from './ResourceType'
export default class Host
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Host(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Host(),
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