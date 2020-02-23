import ResourceType from './ResourceType'
export default class VMSS
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.VMSS(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.VM(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: [],

            PublicIP: false,
            RootUsername: '',
            RootPassword: '',
            VNetAddress: '',
            SubnetName: '',
            VMPublisher: '',
            VMOffer: '',
            VMSKU: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}