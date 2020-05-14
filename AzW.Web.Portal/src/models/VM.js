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

            AdminUsername: 'admin',
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