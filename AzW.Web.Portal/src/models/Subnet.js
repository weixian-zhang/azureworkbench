export default class Subnet
{
    constructor (){
        this.ResourceType = 'subnet';

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
            CIDR: '',
            NSG: []
        };
    }
}