import ResourceType from './ResourceType'
export default class Hostgroup
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Hostgroup(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Hostgroup(),
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