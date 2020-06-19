import ResourceType from './ResourceType'
export default class MeshApplication
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.MeshApplication(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.MeshApplication(),
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