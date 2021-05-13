import ResourceType from './ResourceType'
export default class DiskSnapshot
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DiskSnapshot(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DiskSnapshot(),
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