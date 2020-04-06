import ResourceType from './ResourceType'
export default class VM
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: '',
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.VM(),
            
            Name: '',
            ResourceGroupName: '',
            Location: '',

            HasPublicIP: false,
            PublicIPName: '',
            
            VNetName: '',
            SubnetName: '',

            AdminUsername: '',
            AdminPassword: '',
            
            VMPublisher: '',
            VMOffer: '',
            VMSKU: '',
            VMVersion: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}