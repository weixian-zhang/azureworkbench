import ResourceType from './ResourceType'
export default class DataShare
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DataShare(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DataShare(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}