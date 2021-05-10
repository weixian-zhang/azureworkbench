import ResourceType from './ResourceType'
export default class PublicIpPrefixes
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.PublicIpPrefixes(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.PublicIpPrefixes(),
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