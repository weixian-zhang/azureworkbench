export default class NSG
{
    constructor()
    {
        this.Name = '';
        this.Location = '';
        this.ResourceGroupName = '';
        this.VNetName  = '';
        this.SubnetName = '';
        this.InboundRules = [];
        this.OutboundRules = [];
    }
}