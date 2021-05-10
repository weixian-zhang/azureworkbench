import ResourceType from './ResourceType'
export default class DataBoxEdge
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DataboxEdge(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DataboxEdge(),
            Name: '',
            Location: '',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}