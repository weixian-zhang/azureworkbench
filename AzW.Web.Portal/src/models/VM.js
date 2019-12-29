export default class VM
{
    constructor (){
        this.ResourceType = '';
        this.ResourceCategory = '';
        this.GraphModel = {
            IconId: '',
            X: '',
            Y: '',
            Width: '',
            Height: '',
            Edges: {
                subnets: [],
                loadbalancer: {
                    edge: ''
                },
                appGateway: {
                    edge: ''
                }
            }
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