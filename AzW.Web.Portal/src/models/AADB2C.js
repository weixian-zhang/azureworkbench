import ResourceType from './ResourceType'
export default class AADB2C
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AADB2C(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AADB2C(),
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