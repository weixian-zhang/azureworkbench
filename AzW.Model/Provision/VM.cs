
using System.Collections.Generic;

namespace AzW.Model
 {
     public class VM
     {
          public string Name { get; set; }
          public string Location { get; set; }
          public string ResourceGroupName { get; set; }
          public string AddressSpace { get; set; }
          public string VNetName { get; set; }
          public string SubnetName { get; set; }
          public bool HasPublicIP { get; set; }
          public string PublicIPName { get; set; }

          public string Publisher { get; set; }
          public string Offer { get; set; }
          public string SKU { get; set; }
          public string Version { get; set; }
          public string AdminUsername { get; set; }
          public string AdminPassword { get; set; }
     }
 }