import ResourceType from './ResourceType'
export default class MLServiceWorkspace
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.MLServiceWorkspace(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.MLServiceWorkspace(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: [],
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}