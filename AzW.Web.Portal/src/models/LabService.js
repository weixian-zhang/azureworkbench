import ResourceType from './ResourceType'
export default class LabService
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.LabService(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.LabService(),
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