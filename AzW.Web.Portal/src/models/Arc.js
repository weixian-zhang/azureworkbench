import ResourceType from './ResourceType'
export default class Arc
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
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}