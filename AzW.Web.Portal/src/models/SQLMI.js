import ResourceType from './ResourceType'
export default class SQLMI
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.SQLMI(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.SQLMI(),
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