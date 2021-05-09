import ResourceType from './ResourceType'
export default class StaticApp
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.StaticApp(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.StaticApp(),
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