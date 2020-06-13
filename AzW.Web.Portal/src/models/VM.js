import ResourceType from './ResourceType'
export default class VM
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.VM(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.VM(),
            
            Name: 'vm-',
            ResourceGroupName: '',
            Location: '',

            HasPublicIP: false,
            PublicIPName: '',
            
            VNetName: '',
            SubnetName: '',

            AdminUsername: 'AzureUser',
            AdminPassword: '',
            
            VMPublisher: '',
            VMOffer: '',
            VMSKU: '',
            VMVersion: '',

            SizeName: 'STANDARD_DS2_V2',
            IsLinux: false
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}