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
            ResourceType: ResourceType.VMSS(),
            Name: 'vmss-',
            ResourceGroupName: '',
            Location: '',
            Instances: 2,
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