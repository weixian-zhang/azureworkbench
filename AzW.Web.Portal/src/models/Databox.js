import ResourceType from './ResourceType'
export default class Databox
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Databox(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Databox(),
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