import ResourceType from './ResourceType'
export default class EventGridDomain
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.EventGridDomain(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.EventGridDomain()

        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}