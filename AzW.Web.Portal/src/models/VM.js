export default class VM
{
    constructor (){
        this.ResourceType = 'm';

        this.GraphModel = {
            Id: '',
            ParentId: '',
            IsParent: false,
            X: '',
            Y: '',
            Width: '',
            Height: '',
            Edges: []
        };

        this.ProvisionContext = {
            Name: '',
            Location: '',
            PublicIP: false,
            VMPublisher: '',
            VMOffer: '',
            VMSKU: '',
            RootUsername: '',
            RootPassword: '',
            Tags: [],
            Dependencies: {
                VNetAddress: '',
                SubnetName: ''
            }
        }; 
    }
}