import ResourceType from './ResourceType'
export default class SecurityCenter
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.SecurityCenter(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.SecurityCenter(),
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