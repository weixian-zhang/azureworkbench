import ResourceType from './ResourceType'
export default class Kubernetes
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Kubernetes(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Kubernetes(),
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