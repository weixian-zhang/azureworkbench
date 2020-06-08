import ResourceType from './ResourceType'
export default class AzureArc
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Arc(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Arc(),
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