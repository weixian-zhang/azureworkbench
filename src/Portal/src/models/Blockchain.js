import ResourceType from './ResourceType'
export default class Blockchain
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Blockchain(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Blockchain(),
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