export default class VMSS
{
    constructor (){
        this.GraphModel = {
            ResourceType: 'vmss',
            DisplayName: ''
        };

        this.ProvisionContext = {
            Name: '',
            Location: '',
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
    }
}