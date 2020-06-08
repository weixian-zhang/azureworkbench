import ResourceType from './ResourceType'
export default class SendGrid
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.SendGrid(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.SendGrid(),
            Name: '',
            Location: '',
            ResourceGroupName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}