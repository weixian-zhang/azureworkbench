export default class VNet
{
    constructor (){
        this.ResourceType = '';

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
            AddressSpace: false,
            Subnets: [] //dict<string,string>: subnet name, subnet range
        }; 
    }
}