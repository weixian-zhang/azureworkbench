import ResourceType from './ResourceType'
export default class VM
{
    constructor (){
        this.GraphModel = {
            ResourceType: '',
            DisplayName: ''
        };

        this.ProvisionContext = {
            Name: '',
            Location: '',
            PublicIP: false,
            RootUsername: '',
            RootPassword: '',
            Tags: [],
            Depends: {
                VNet: {
                    VNetAddress: '',
                    SubnetName: ''
                }
            },
            SkuSpec: {
                VMPublisher: '',
                VMOffer: '',
                VMSKU: '',
            }
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}