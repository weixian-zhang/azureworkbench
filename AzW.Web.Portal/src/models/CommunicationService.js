import ResourceType from './ResourceType'
export default class CommunicationService
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.CommunicationService(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.CommunicationService(),
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