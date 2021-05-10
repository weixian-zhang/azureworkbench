import ResourceType from './ResourceType'
export default class WorkspaceWVD
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.WorkspaceWVD(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.WorkspaceWVD(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}