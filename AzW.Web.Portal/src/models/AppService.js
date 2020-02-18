import ResourceType from './ResourceType'
export default class AppService
{
    constructor (){
        this.GraphModel = {
            ResourceType: ResourceType.AppService(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            Name: '',
            Location: '',
            ResourceType: ResourceType.AppService(),
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}