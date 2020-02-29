import ResourceType from './ResourceType'
export default class SQLDB
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.SQLDB(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.SQLDB(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}