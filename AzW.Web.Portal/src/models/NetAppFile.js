import ResourceType from './ResourceType'
export default class NetAppFile
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.NetAppFile(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.NetAppFile(),
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