import ResourceType from './ResourceType'
export default class NotificationHub
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.NotificationHub(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.NotificationHub(),
            
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