export default class ASE
{
    constructor (){
        this.GraphModel = {
            ResourceType: 'ase',
            DisplayName: ''
        };

        this.ProvisionContext = {
            Name: '',
            Location: '',
            AddressSpace: false,
            Subnet: ''
        }; 
    }
}