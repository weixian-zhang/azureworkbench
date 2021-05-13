import ResourceType from './ResourceType'
export default class VMWareSolution
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.VMWareSolution(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.VMWareSolution(),
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