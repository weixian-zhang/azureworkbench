import ResourceType from './ResourceType'
export default class IoTCentral
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.IoTCentral(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.IoTCentral(),
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