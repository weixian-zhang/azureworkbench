import ResourceType from './ResourceType'
export default class AzureCDN
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.CDN(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.CDN(),
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