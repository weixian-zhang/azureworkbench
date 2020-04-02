import ResourceType from './ResourceType'
export default class NSG
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.NSG(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.NSG(),
            Deployable: true,
            HighCost: false,
            
            Name: ''
        }; 
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}