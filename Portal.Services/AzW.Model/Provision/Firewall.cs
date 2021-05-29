using System.Collections.Generic;

namespace AzW.Model
{
     public class Firewall : Resource
     {
          public string Location { get; set; }
          public string PublicIPName { get; set; }
          public string VNetName { get; set; }
          public string SubnetName { get; set; }
          public string SubnetAddressSpace { get; set; }
     }
 }