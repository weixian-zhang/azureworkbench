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
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: [],

            VNetAddress: '',
            SubnetName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}