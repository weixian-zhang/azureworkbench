import ResourceType from './ResourceType';
export default class DNSPrivateZone
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DNSPrivateZone(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DNSPrivateZone(),
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