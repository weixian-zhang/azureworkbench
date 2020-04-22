export default class NSGRule
{
    constructor()
    {
       this.UITableRowID =  '';
       this.Name = '';
       this.Allow = false;
       this.FromAddressIsTag = false;
       this.FromAddresses = '';
       this.FromPorts = '*';
       this.ToAddressIsTag = false;
       this.ToAddresses = '';
       this.ToPorts = '*';
       this.Protocol = '*'; //tcp, udp, icmp, *
       this.Priority = 100; //100 and 4096
    }
}